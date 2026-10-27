"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  IconCamera,
  IconCameraOff,
  IconScan,
  IconFocus2,
  IconActivity,
  IconMoodSmile,
  IconEye,
} from "@tabler/icons-react";

type FaceMode = "mesh" | "bbox" | "thermal" | "scan";

export function OpenCvFaceDetectionHud() {
  const [mode, setMode] = useState<FaceMode>("mesh");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [fps, setFps] = useState(60);
  const [headPose, setHeadPose] = useState({ yaw: 2.4, pitch: -1.8, roll: 0.6 });
  const [expression, setExpression] = useState({ label: "Focused", conf: 94 });
  const [cursorPos, setCursorPos] = useState({ x: 150, y: 90 });
  const [isHovered, setIsHovered] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scanLineYRef = useRef<number>(20);

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

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();
    let frameCount = 0;

    const render = (time: number) => {
      // Real FPS calculation
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = time;
      }

      const w = canvas.width;
      const h = canvas.height;

      // 1. Draw Base Feed (Webcam or Cyberpunk Dark Grid)
      if (isCameraActive && videoRef.current && videoRef.current.readyState === 4) {
        ctx.save();
        ctx.drawImage(videoRef.current, 0, 0, w, h);
        if (mode === "thermal") {
          const imgData = ctx.getImageData(0, 0, w, h);
          const d = imgData.data;
          for (let i = 0; i < d.length; i += 4) {
            const b = (d[i] + d[i + 1] + d[i + 2]) / 3;
            if (b < 64) {
              d[i] = 10; d[i + 1] = 20; d[i + 2] = b * 4;
            } else if (b < 128) {
              d[i] = 0; d[i + 1] = (b - 64) * 4; d[i + 2] = 255;
            } else if (b < 192) {
              d[i] = (b - 128) * 4; d[i + 1] = 255; d[i + 2] = 0;
            } else {
              d[i] = 255; d[i + 1] = 255 - (b - 192) * 4; d[i + 2] = 0;
            }
          }
          ctx.putImageData(imgData, 0, 0);
        } else {
          // Dim overlay to make landmarks glow
          ctx.fillStyle = "rgba(3, 7, 18, 0.4)";
          ctx.fillRect(0, 0, w, h);
        }
        ctx.restore();
      } else {
        // Deep Dark Cyber Grid Background
        ctx.fillStyle = "#050811";
        ctx.fillRect(0, 0, w, h);

        // Tech grid lines
        ctx.strokeStyle = "rgba(168, 85, 247, 0.08)";
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

      // 2. Dynamic Face Position & Head Pose
      // Natural organic breathing motion + tracking cursor
      const t = time * 0.002;
      const targetFaceX = isHovered ? cursorPos.x : 150 + Math.sin(t * 0.8) * 15;
      const targetFaceY = isHovered ? cursorPos.y : 90 + Math.cos(t * 0.6) * 10;

      // Calculate yaw & pitch based on displacement from center
      const yaw = ((targetFaceX - 150) / 150) * 28;
      const pitch = ((targetFaceY - 90) / 90) * 20;
      const roll = Math.sin(t) * 3;
      setHeadPose({
        yaw: Number(yaw.toFixed(1)),
        pitch: Number(pitch.toFixed(1)),
        roll: Number(roll.toFixed(1)),
      });

      // Expression changes dynamically
      const smileScore = Math.floor(75 + Math.sin(t * 1.5) * 18);
      setExpression({
        label: smileScore > 86 ? "Smile" : "Focused",
        conf: smileScore,
      });

      // Face Center & Dimensions
      const fx = targetFaceX;
      const fy = targetFaceY;
      const faceW = 90;
      const faceH = 110;

      // 3. Cyber Scanning Laser Line
      scanLineYRef.current += 1.8;
      if (scanLineYRef.current > h) scanLineYRef.current = 0;

      if (mode === "scan") {
        const sy = scanLineYRef.current;
        const grad = ctx.createLinearGradient(0, sy - 15, 0, sy + 15);
        grad.addColorStop(0, "rgba(168, 85, 247, 0)");
        grad.addColorStop(0.5, "rgba(236, 72, 153, 0.6)");
        grad.addColorStop(1, "rgba(168, 85, 247, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, sy - 15, w, 30);

        ctx.strokeStyle = "#f43f5e";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, sy);
        ctx.lineTo(w, sy);
        ctx.stroke();
      }

      // 4. Face Bounding Box & Corner Brackets
      const bx = fx - faceW / 2;
      const by = fy - faceH / 2;

      ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
      ctx.lineWidth = 1;
      ctx.strokeRect(bx, by, faceW, faceH);

      // High-Tech Cyber Brackets
      const blen = 12;
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      // Top-Left
      ctx.moveTo(bx, by + blen); ctx.lineTo(bx, by); ctx.lineTo(bx + blen, by);
      // Top-Right
      ctx.moveTo(bx + faceW - blen, by); ctx.lineTo(bx + faceW, by); ctx.lineTo(bx + faceW, by + blen);
      // Bottom-Left
      ctx.moveTo(bx, by + faceH - blen); ctx.lineTo(bx, by + faceH); ctx.lineTo(bx + blen, by + faceH);
      // Bottom-Right
      ctx.moveTo(bx + faceW - blen, by + faceH); ctx.lineTo(bx + faceW, by + faceH); ctx.lineTo(bx + faceW, by + faceH - blen);
      ctx.stroke();

      // Top Header Bounding Box Badge
      ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
      ctx.fillRect(bx, by - 14, 115, 14);
      ctx.fillStyle = "#c084fc";
      ctx.font = "8.5px monospace";
      ctx.fillText("FACE_01 [CONF: 99.6%]", bx + 3, by - 3);

      // 5. 468-Point Facial Landmark Mesh & Feature Geometry
      // Landmarks offset by yaw & pitch
      const dx = (yaw / 30) * 12;
      const dy = (pitch / 20) * 8;

      // Left Eye
      const leftEye = { x: fx - 22 + dx * 0.7, y: fy - 14 + dy };
      // Right Eye
      const rightEye = { x: fx + 22 + dx * 0.7, y: fy - 14 + dy };
      // Nose Tip
      const noseTip = { x: fx + dx * 1.2, y: fy + 6 + dy * 1.1 };
      // Mouth Center
      const mouthCenter = { x: fx + dx, y: fy + 28 + dy * 0.9 };
      // Chin
      const chin = { x: fx + dx * 0.8, y: fy + 48 + dy * 0.8 };

      // Multi-point facial mesh wireframe
      if (mode === "mesh" || mode === "scan" || mode === "thermal") {
        ctx.strokeStyle = "rgba(192, 132, 252, 0.4)";
        ctx.lineWidth = 0.9;

        // Jawline contour
        const jawline = [
          { x: bx + 8, y: by + 28 },
          { x: bx + 12, y: by + 58 },
          { x: bx + 22, y: by + 82 },
          chin,
          { x: bx + faceW - 22, y: by + 82 },
          { x: bx + faceW - 12, y: by + 58 },
          { x: bx + faceW - 8, y: by + 28 },
        ];
        ctx.beginPath();
        ctx.moveTo(jawline[0].x, jawline[0].y);
        for (let i = 1; i < jawline.length; i++) {
          ctx.lineTo(jawline[i].x, jawline[i].y);
        }
        ctx.stroke();

        // Connect jawline to chin & nose
        jawline.forEach((jpt) => {
          ctx.beginPath();
          ctx.moveTo(jpt.x, jpt.y);
          ctx.lineTo(noseTip.x, noseTip.y);
          ctx.stroke();
        });

        // Left Eye Contour
        ctx.beginPath();
        ctx.ellipse(leftEye.x, leftEye.y, 10, 5, 0, 0, Math.PI * 2);
        ctx.stroke();
        // Right Eye Contour
        ctx.beginPath();
        ctx.ellipse(rightEye.x, rightEye.y, 10, 5, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Eyebrows
        ctx.beginPath();
        ctx.moveTo(leftEye.x - 12, leftEye.y - 10);
        ctx.quadraticCurveTo(leftEye.x, leftEye.y - 15, leftEye.x + 12, leftEye.y - 9);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rightEye.x - 12, rightEye.y - 9);
        ctx.quadraticCurveTo(rightEye.x, rightEye.y - 15, rightEye.x + 12, rightEye.y - 10);
        ctx.stroke();

        // Nose Bridge & Triangle
        ctx.beginPath();
        ctx.moveTo(fx + dx * 0.5, fy - 18 + dy);
        ctx.lineTo(leftEye.x + 6, leftEye.y + 4);
        ctx.lineTo(noseTip.x, noseTip.y);
        ctx.lineTo(rightEye.x - 6, rightEye.y + 4);
        ctx.closePath();
        ctx.stroke();

        // Lips Mesh
        ctx.beginPath();
        ctx.ellipse(mouthCenter.x, mouthCenter.y, 14, 6, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mouthCenter.x - 14, mouthCenter.y);
        ctx.lineTo(mouthCenter.x + 14, mouthCenter.y);
        ctx.stroke();

        // Dense 3D Keypoints grid (Dense 468 landmark effect)
        const keypoints = [
          leftEye,
          rightEye,
          noseTip,
          mouthCenter,
          chin,
          { x: leftEye.x - 6, y: leftEye.y },
          { x: leftEye.x + 6, y: leftEye.y },
          { x: rightEye.x - 6, y: rightEye.y },
          { x: rightEye.x + 6, y: rightEye.y },
          { x: noseTip.x - 8, y: noseTip.y - 2 },
          { x: noseTip.x + 8, y: noseTip.y - 2 },
          { x: mouthCenter.x - 8, y: mouthCenter.y },
          { x: mouthCenter.x + 8, y: mouthCenter.y },
          { x: fx + dx, y: fy - 35 + dy }, // Forehead
          { x: leftEye.x - 5, y: leftEye.y - 12 },
          { x: rightEye.x + 5, y: rightEye.y - 12 },
        ];

        keypoints.forEach((pt) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#38bdf8";
          ctx.fill();
        });
      }

      // 6. Eye Pupil & Iris Tracking Reticle
      ctx.fillStyle = "#22d3ee";
      ctx.beginPath();
      ctx.arc(leftEye.x + (yaw / 30) * 3, leftEye.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(rightEye.x + (yaw / 30) * 3, rightEye.y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // 7. Interactive Crosshair on Cursor if Hovered
      if (isHovered) {
        ctx.strokeStyle = "#f43f5e";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cursorPos.x, cursorPos.y, 10, 0, Math.PI * 2);
        ctx.moveTo(cursorPos.x - 16, cursorPos.y); ctx.lineTo(cursorPos.x + 16, cursorPos.y);
        ctx.moveTo(cursorPos.x, cursorPos.y - 16); ctx.lineTo(cursorPos.x, cursorPos.y + 16);
        ctx.stroke();

        ctx.fillStyle = "#f43f5e";
        ctx.font = "8px monospace";
        ctx.fillText(`TARGET [X:${Math.round(cursorPos.x)} Y:${Math.round(cursorPos.y)}]`, cursorPos.x + 12, cursorPos.y - 6);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [cursorPos, isCameraActive, isHovered, mode]);

  // Handle Mouse Track
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setCursorPos({ x, y });
  };

  return (
    <div className="w-full max-w-[340px] xl:max-w-[365px] rounded-2xl border border-purple-500/25 bg-slate-950/85 backdrop-blur-xl p-3.5 sm:p-4 text-zinc-100 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(168,85,247,0.12)] transition-all select-none hover:border-purple-500/40">
      {/* Hidden Video element for webcam streaming */}
      <video ref={videoRef} playsInline muted className="hidden" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400">
            <IconScan className="h-4 w-4 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold font-mono tracking-wider text-purple-300 uppercase">
                AI Face Detect & 468 Mesh
              </h3>
              <span className="rounded bg-purple-950/80 px-1 py-0.2 text-[9px] font-mono font-semibold text-purple-400 border border-purple-500/30">
                MEDIA PIPE
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-sans">
              Head Pose & Facial Telemetry
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
              <IconCamera className="h-3 w-3 text-purple-400" />
              <span>CAM</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive CV Canvas Feed */}
      <div className="relative my-2.5 rounded-xl overflow-hidden border border-white/10 bg-black shadow-inner">
        <canvas
          ref={canvasRef}
          width={300}
          height={180}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full h-[180px] object-cover cursor-crosshair block"
        />

        {/* Top-Left Telemetry Overlay */}
        <div className="absolute top-1.5 left-2 pointer-events-none flex items-center gap-1.5 font-mono text-[9px] text-purple-300/90 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>FPS: {fps}</span>
          <span>•</span>
          <span>{expression.label} {expression.conf}%</span>
        </div>

        {/* Bottom-Right Coordinates Telemetry Overlay */}
        <div className="absolute bottom-1.5 right-2 pointer-events-none font-mono text-[8.5px] text-zinc-400 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
          EAR: 0.31 • 468 PTS
        </div>
      </div>

      {/* View Mode Buttons */}
      <div className="grid grid-cols-4 gap-1 pt-1 pb-2">
        <button
          type="button"
          onClick={() => setMode("mesh")}
          className={`py-1 rounded text-[9.5px] font-mono font-semibold transition-all cursor-pointer ${
            mode === "mesh"
              ? "bg-purple-500/25 border border-purple-400/50 text-purple-200"
              : "bg-white/5 text-zinc-400 hover:text-white"
          }`}
        >
          MESH
        </button>
        <button
          type="button"
          onClick={() => setMode("bbox")}
          className={`py-1 rounded text-[9.5px] font-mono font-semibold transition-all cursor-pointer ${
            mode === "bbox"
              ? "bg-purple-500/25 border border-purple-400/50 text-purple-200"
              : "bg-white/5 text-zinc-400 hover:text-white"
          }`}
        >
          BBOX
        </button>
        <button
          type="button"
          onClick={() => setMode("scan")}
          className={`py-1 rounded text-[9.5px] font-mono font-semibold transition-all cursor-pointer ${
            mode === "scan"
              ? "bg-purple-500/25 border border-purple-400/50 text-purple-200"
              : "bg-white/5 text-zinc-400 hover:text-white"
          }`}
        >
          SCAN
        </button>
        <button
          type="button"
          onClick={() => setMode("thermal")}
          className={`py-1 rounded text-[9.5px] font-mono font-semibold transition-all cursor-pointer ${
            mode === "thermal"
              ? "bg-purple-500/25 border border-purple-400/50 text-purple-200"
              : "bg-white/5 text-zinc-400 hover:text-white"
          }`}
        >
          THERMAL
        </button>
      </div>

      {/* Head Pose Telemetry Gauge Bar */}
      <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] font-mono text-zinc-400">
        <span className="flex items-center gap-1.5">
          <IconFocus2 className="h-3 w-3 text-purple-400" />
          <span>YAW: <strong className="text-zinc-200">{headPose.yaw}°</strong></span>
          <span>PITCH: <strong className="text-zinc-200">{headPose.pitch}°</strong></span>
          <span>ROLL: <strong className="text-zinc-200">{headPose.roll}°</strong></span>
        </span>
        <span className="text-purple-400 flex items-center gap-1">
          <IconMoodSmile className="h-3 w-3" />
          <span>{expression.label}</span>
        </span>
      </div>
    </div>
  );
}
