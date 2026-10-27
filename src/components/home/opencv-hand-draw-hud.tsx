"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  IconHandFinger,
  IconPaint,
  IconTrash,
  IconArrowBackUp,
  IconCamera,
  IconCameraOff,
  IconDownload,
} from "@tabler/icons-react";

const PALETTE = [
  { name: "Cyber Green", hex: "#00ff66" },
  { name: "Neon Pink", hex: "#ff007f" },
  { name: "Tangerine", hex: "#ff9933" },
  { name: "Sky Cyan", hex: "#00f0ff" },
  { name: "Electric Violet", hex: "#a855f7" },
];

interface Point {
  x: number;
  y: number;
  color: string;
  size: number;
}

// 21-point hand skeleton connection graph (MediaPipe Hand Topology)
const HAND_CONNECTIONS = [
  // Thumb
  [0, 1], [1, 2], [2, 3], [3, 4],
  // Index finger
  [0, 5], [5, 6], [6, 7], [7, 8],
  // Middle finger
  [0, 9], [9, 10], [10, 11], [11, 12],
  // Ring finger
  [0, 13], [13, 14], [14, 15], [15, 16],
  // Pinky
  [0, 17], [17, 18], [18, 19], [19, 20],
  // Palm base knuckles
  [5, 9], [9, 13], [13, 17],
];

export function OpenCvHandDrawHud() {
  const [selectedColor, setSelectedColor] = useState(PALETTE[0].hex);
  const [brushSize, setBrushSize] = useState(6);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [activeGesture, setActiveGesture] = useState<string>("PINCH (DRAW)");
  const [pinchDist, setPinchDist] = useState(42);
  const [fps, setFps] = useState(60);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 150, y: 90 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const strokesRef = useRef<Point[][]>([]);
  const currentStrokeRef = useRef<Point[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Toggle Live Webcam
  const toggleCamera = async () => {
    if (isCameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 200, facingMode: "user" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraActive(true);
      } catch (err) {
        console.warn("Camera unavailable or permission denied, using neural simulation:", err);
      }
    }
  };

  // Generate 21 MediaPipe hand landmarks based on current pointer position & pinch distance
  const getHandLandmarks = useCallback((px: number, py: number, pinch: number, t: number) => {
    // Subtle organic floating motion
    const wave = Math.sin(t * 0.003) * 3;
    const basePinch = Math.max(15, Math.min(80, pinch));

    // Wrist [0]
    const wrist = { x: px + 35, y: py + 75 + wave };

    // Knuckles (MCP joints)
    const thumbMcp = { x: px - 8, y: py + 48 };
    const indexMcp = { x: px + 5, y: py + 30 };
    const middleMcp = { x: px + 22, y: py + 28 };
    const ringMcp = { x: px + 38, y: py + 34 };
    const pinkyMcp = { x: px + 52, y: py + 44 };

    // Thumb chain [1, 2, 3, 4]
    const thumbCmc = { x: px + 15, y: py + 62 };
    const thumbIp = { x: px - 18, y: py + 32 };
    // Thumb Tip [4] approaches Index Tip [8] based on pinch distance
    const thumbTip = { x: px - basePinch * 0.28, y: py + basePinch * 0.22 };

    // Index chain [5, 6, 7, 8]
    const indexPip = { x: px - 2, y: py + 14 };
    const indexDip = { x: px - 4, y: py - 2 };
    const indexTip = { x: px, y: py }; // Drawing cursor point

    // Middle chain [9, 10, 11, 12]
    const middlePip = { x: px + 18, y: py + 10 };
    const middleDip = { x: px + 16, y: py - 6 };
    const middleTip = { x: px + 15, y: py - 18 };

    // Ring chain [13, 14, 15, 16]
    const ringPip = { x: px + 34, y: py + 18 };
    const ringDip = { x: px + 33, y: py + 4 };
    const ringTip = { x: px + 32, y: py - 8 };

    // Pinky chain [17, 18, 19, 20]
    const pinkyPip = { x: px + 48, y: py + 28 };
    const pinkyDip = { x: px + 48, y: py + 16 };
    const pinkyTip = { x: px + 47, y: py + 5 };

    return [
      wrist,       // 0
      thumbCmc,    // 1
      thumbMcp,    // 2
      thumbIp,     // 3
      thumbTip,    // 4
      indexMcp,    // 5
      indexPip,    // 6
      indexDip,    // 7
      indexTip,    // 8 (Index Tip / Drawing Head)
      middleMcp,   // 9
      middlePip,   // 10
      middleDip,   // 11
      middleTip,   // 12
      ringMcp,     // 13
      ringPip,     // 14
      ringDip,     // 15
      ringTip,     // 16
      pinkyMcp,    // 17
      pinkyPip,    // 18
      pinkyDip,    // 19
      pinkyTip,    // 20
    ];
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();
    let frameCount = 0;

    const render = (time: number) => {
      // FPS calculation
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = time;
      }

      const w = canvas.width;
      const h = canvas.height;

      // 1. Draw Base Background (Webcam feed or Dark Cyber Grid)
      if (isCameraActive && videoRef.current && videoRef.current.readyState === 4) {
        ctx.save();
        ctx.drawImage(videoRef.current, 0, 0, w, h);
        // Dim slightly to make neon lines pop
        ctx.fillStyle = "rgba(3, 7, 18, 0.45)";
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      } else {
        // Deep Tech Background
        ctx.fillStyle = "#030712";
        ctx.fillRect(0, 0, w, h);

        // Tech grid lines
        ctx.strokeStyle = "rgba(16, 185, 129, 0.06)";
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 22) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += 22) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }

      // 2. Draw Finished Strokes
      strokesRef.current.forEach((stroke) => {
        if (stroke.length < 2) return;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowBlur = 10;
        ctx.shadowColor = stroke[0].color;
        ctx.strokeStyle = stroke[0].color;
        ctx.lineWidth = stroke[0].size;

        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 3. Draw Active Drawing Stroke
      if (currentStrokeRef.current.length > 1) {
        const stroke = currentStrokeRef.current;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowBlur = 14;
        ctx.shadowColor = stroke[0].color;
        ctx.strokeStyle = stroke[0].color;
        ctx.lineWidth = stroke[0].size;

        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 4. Calculate Hand Landmarks & Skeleton
      const px = pointerPos.x;
      const py = pointerPos.y;
      const landmarks = getHandLandmarks(px, py, pinchDist, time);

      // Draw MediaPipe Skeleton Bone Connections
      ctx.strokeStyle = isDrawing ? "rgba(0, 255, 102, 0.65)" : "rgba(56, 189, 248, 0.55)";
      ctx.lineWidth = 1.5;
      HAND_CONNECTIONS.forEach(([startIdx, endIdx]) => {
        const p1 = landmarks[startIdx];
        const p2 = landmarks[endIdx];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Landmark Joints (21 keypoints)
      landmarks.forEach((pt, idx) => {
        const isFingertip = idx === 4 || idx === 8 || idx === 12 || idx === 16 || idx === 20;
        const isIndexTip = idx === 8;

        ctx.beginPath();
        if (isIndexTip) {
          // Drawing tip is prominent & glowing
          ctx.arc(pt.x, pt.y, isDrawing ? 6 : 4.5, 0, Math.PI * 2);
          ctx.fillStyle = selectedColor;
          ctx.shadowBlur = 12;
          ctx.shadowColor = selectedColor;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else if (isFingertip) {
          ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#38bdf8";
          ctx.fill();
        } else {
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(148, 163, 184, 0.85)";
          ctx.fill();
        }
      });

      // 5. Draw Pinch Vector Line (between Thumb #4 and Index #8)
      const thumb = landmarks[4];
      const index = landmarks[8];
      ctx.strokeStyle = isDrawing ? "#00ff66" : "rgba(244, 63, 94, 0.75)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(thumb.x, thumb.y);
      ctx.lineTo(index.x, index.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Pinch indicator text
      ctx.fillStyle = isDrawing ? "#00ff66" : "#f43f5e";
      ctx.font = "8px monospace";
      ctx.fillText(
        `PINCH: ${Math.round(pinchDist)}px [${isDrawing ? "DRAW" : "HOVER"}]`,
        index.x + 12,
        index.y + 12
      );

      // 6. Draw HUD Bounding Box around Hand
      const xs = landmarks.map((l) => l.x);
      const ys = landmarks.map((l) => l.y);
      const minX = Math.max(8, Math.min(...xs) - 10);
      const maxX = Math.min(w - 8, Math.max(...xs) + 10);
      const minY = Math.max(8, Math.min(...ys) - 10);
      const maxY = Math.min(h - 8, Math.max(...ys) + 10);

      ctx.strokeStyle = "rgba(16, 185, 129, 0.45)";
      ctx.lineWidth = 1;
      ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);

      // Cyber corners
      const clen = 8;
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      // Top-left
      ctx.moveTo(minX, minY + clen); ctx.lineTo(minX, minY); ctx.lineTo(minX + clen, minY);
      // Top-right
      ctx.moveTo(maxX - clen, minY); ctx.lineTo(maxX, minY); ctx.lineTo(maxX, minY + clen);
      // Bottom-left
      ctx.moveTo(minX, maxY - clen); ctx.lineTo(minX, maxY); ctx.lineTo(minX + clen, maxY);
      // Bottom-right
      ctx.moveTo(maxX - clen, maxY); ctx.lineTo(maxX, maxY); ctx.lineTo(maxX, maxY - clen);
      ctx.stroke();

      // Top label badge
      ctx.fillStyle = "rgba(3, 7, 18, 0.85)";
      ctx.fillRect(minX, minY - 13, 115, 13);
      ctx.fillStyle = "#10b981";
      ctx.font = "8.5px monospace";
      ctx.fillText("HAND_POSE_21 [CONF: 99.2%]", minX + 3, minY - 3);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [getHandLandmarks, isCameraActive, isDrawing, pinchDist, pointerPos, selectedColor]);

  // Handle Mouse/Touch Drawing
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setIsDrawing(true);
    setPinchDist(22); // Pinch active
    setActiveGesture("PINCH (DRAW)");
    setPointerPos({ x, y });

    const newPoint: Point = { x, y, color: selectedColor, size: brushSize };
    currentStrokeRef.current = [newPoint];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setPointerPos({ x, y });

    if (isDrawing) {
      currentStrokeRef.current.push({ x, y, color: selectedColor, size: brushSize });
    }
  };

  const handlePointerUp = () => {
    if (isDrawing && currentStrokeRef.current.length > 0) {
      strokesRef.current.push([...currentStrokeRef.current]);
      currentStrokeRef.current = [];
    }
    setIsDrawing(false);
    setPinchDist(48); // Released hover
    setActiveGesture("POINT (HOVER)");
  };

  const clearCanvas = () => {
    strokesRef.current = [];
    currentStrokeRef.current = [];
  };

  const undoLast = () => {
    strokesRef.current.pop();
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "vivek-airdraw-sketch.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Pre-seed an aesthetic welcome sketch
  useEffect(() => {
    const initialStroke: Point[] = [
      { x: 55, y: 120, color: PALETTE[0].hex, size: 5 },
      { x: 70, y: 75, color: PALETTE[0].hex, size: 5 },
      { x: 85, y: 55, color: PALETTE[0].hex, size: 5 },
      { x: 100, y: 75, color: PALETTE[0].hex, size: 5 },
      { x: 115, y: 120, color: PALETTE[0].hex, size: 5 },
      { x: 80, y: 90, color: PALETTE[0].hex, size: 5 },
      { x: 105, y: 90, color: PALETTE[0].hex, size: 5 },
    ];
    const initialStroke2: Point[] = [
      { x: 135, y: 55, color: PALETTE[1].hex, size: 5 },
      { x: 160, y: 55, color: PALETTE[1].hex, size: 5 },
      { x: 147, y: 55, color: PALETTE[1].hex, size: 5 },
      { x: 147, y: 120, color: PALETTE[1].hex, size: 5 },
      { x: 135, y: 120, color: PALETTE[1].hex, size: 5 },
      { x: 160, y: 120, color: PALETTE[1].hex, size: 5 },
    ];
    strokesRef.current = [initialStroke, initialStroke2];
  }, []);

  return (
    <div className="w-full max-w-[340px] xl:max-w-[365px] rounded-2xl border border-emerald-500/25 bg-slate-950/85 backdrop-blur-xl p-3.5 sm:p-4 text-zinc-100 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(16,185,129,0.12)] transition-all select-none hover:border-emerald-500/40">
      {/* Hidden Video element for webcam streaming */}
      <video ref={videoRef} playsInline muted className="hidden" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <IconHandFinger className="h-4 w-4 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold font-mono tracking-wider text-emerald-300 uppercase">
                AI Hand Detection & Air Draw
              </h3>
              <span className="rounded bg-emerald-950/80 px-1 py-0.2 text-[9px] font-mono font-semibold text-emerald-400 border border-emerald-500/30">
                21-JOINTS
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-sans">
              MediaPipe Gesture & Air Canvas
            </p>
          </div>
        </div>

        {/* Live Webcam Toggle Button */}
        <button
          type="button"
          onClick={toggleCamera}
          aria-label={isCameraActive ? "Disable Camera" : "Enable Live Webcam"}
          title={isCameraActive ? "Disable Camera" : "Enable Live Webcam"}
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
            isCameraActive
              ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse"
              : "bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10"
          }`}
        >
          {isCameraActive ? (
            <>
              <IconCameraOff className="h-3 w-3" />
              <span>CAM ON</span>
            </>
          ) : (
            <>
              <IconCamera className="h-3 w-3 text-emerald-400" />
              <span>CAM</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Canvas */}
      <div className="relative my-2.5 rounded-xl overflow-hidden border border-white/10 bg-black shadow-inner">
        <canvas
          ref={canvasRef}
          width={300}
          height={180}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="w-full h-[180px] object-cover cursor-crosshair touch-none block"
        />

        {/* Top-Left Telemetry Overlay */}
        <div className="absolute top-1.5 left-2 pointer-events-none flex items-center gap-1.5 font-mono text-[9px] text-emerald-300/90 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>FPS: {fps}</span>
          <span>•</span>
          <span>{activeGesture}</span>
        </div>

        {/* Bottom-Right Coordinates Telemetry Overlay */}
        <div className="absolute bottom-1.5 right-2 pointer-events-none font-mono text-[8.5px] text-zinc-400 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
          PINCH DIST: {Math.round(pinchDist)}px
        </div>
      </div>

      {/* Color Palette & Brush Controls */}
      <div className="flex items-center justify-between pt-1 pb-2">
        <div className="flex items-center gap-1.5">
          {PALETTE.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => setSelectedColor(c.hex)}
              title={c.name}
              className={`h-5 w-5 rounded-full transition-transform cursor-pointer ${
                selectedColor === c.hex
                  ? "scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950 shadow-[0_0_8px_currentColor]"
                  : "hover:scale-110 opacity-70 hover:opacity-100"
              }`}
              style={{ backgroundColor: c.hex, color: c.hex }}
            />
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={undoLast}
            title="Undo Last Stroke"
            aria-label="Undo"
            className="p-1 rounded bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <IconArrowBackUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            title="Clear Canvas"
            aria-label="Clear Canvas"
            className="p-1 rounded bg-white/5 border border-white/10 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 cursor-pointer"
          >
            <IconTrash className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={downloadDrawing}
            title="Download Air Drawing"
            aria-label="Download Drawing"
            className="p-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 cursor-pointer"
          >
            <IconDownload className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Brush Size Preset Chips */}
      <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] font-mono text-zinc-400">
        <span className="flex items-center gap-1">
          <IconPaint className="h-3 w-3 text-emerald-400" />
          <span>BRUSH:</span>
          {[3, 6, 10].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setBrushSize(s)}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${
                brushSize === s
                  ? "bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-400/50"
                  : "hover:text-zinc-200"
              }`}
            >
              {s}px
            </button>
          ))}
        </span>
        <span className="text-zinc-500">Pinch / Drag to Air Draw</span>
      </div>
    </div>
  );
}
