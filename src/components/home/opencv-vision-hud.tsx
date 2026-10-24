"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  IconCamera,
  IconCameraOff,
  IconEye,
  IconFocus2,
  IconScan,
  IconLayersSubtract,
  IconRefresh,
} from "@tabler/icons-react";

type VisionFilter = "rgb" | "canny" | "thermal" | "mesh";

export function OpenCvVisionHud() {
  const [filter, setFilter] = useState<VisionFilter>("rgb");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [fps, setFps] = useState(60);
  const [targetPos, setTargetPos] = useState({ x: 140, y: 100 });
  const [isHovered, setIsHovered] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const simulatedObjectsRef = useRef([
    { x: 50, y: 60, vx: 0.8, vy: 0.6, label: "person [0.98]", color: "#22d3ee" },
    { x: 180, y: 110, vx: -0.7, vy: 0.5, label: "neural_core [0.96]", color: "#a855f7" },
    { x: 120, y: 140, vx: 0.5, vy: -0.6, label: "face_mesh [468pts]", color: "#34d399" },
  ]);

  // Handle WebCam toggle
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
          video: { width: 320, height: 240, facingMode: "user" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraActive(true);
      } catch (err) {
        console.warn("Camera access denied or unavailable, staying in simulated mode:", err);
      }
    }
  };

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();
    let frameCount = 0;

    const render = (time: number) => {
      // Calculate real FPS
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = time;
      }

      const w = canvas.width;
      const h = canvas.height;

      // 1. Draw Base Feed (Video stream if active, else futuristic grid feed)
      if (isCameraActive && videoRef.current && videoRef.current.readyState === 4) {
        ctx.drawImage(videoRef.current, 0, 0, w, h);
      } else {
        // Futuristic Dark Tech Grid Background
        ctx.fillStyle = "#050811";
        ctx.fillRect(0, 0, w, h);

        // Grid lines
        ctx.strokeStyle = "rgba(6, 182, 212, 0.08)";
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 20) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += 20) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }

      // 2. Apply Filters on Image Data
      if (filter === "canny" || filter === "thermal") {
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r + g + b) / 3;

          if (filter === "canny") {
            // High-contrast edge aesthetic (cyan wireframe)
            const isEdge = brightness > 90 && brightness < 200;
            data[i] = isEdge ? 6 : 4;
            data[i + 1] = isEdge ? 220 : 10;
            data[i + 2] = isEdge ? 245 : 20;
          } else if (filter === "thermal") {
            // Thermal colormap (blue -> cyan -> yellow -> red)
            if (brightness < 64) {
              data[i] = 10;
              data[i + 1] = 20;
              data[i + 2] = brightness * 4;
            } else if (brightness < 128) {
              data[i] = 0;
              data[i + 1] = (brightness - 64) * 4;
              data[i + 2] = 255;
            } else if (brightness < 192) {
              data[i] = (brightness - 128) * 4;
              data[i + 1] = 255;
              data[i + 2] = 0;
            } else {
              data[i] = 255;
              data[i + 1] = 255 - (brightness - 192) * 4;
              data[i + 2] = 0;
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }

      // 3. Draw Moving Simulated Vision Detections
      simulatedObjectsRef.current.forEach((obj) => {
        obj.x += obj.vx;
        obj.y += obj.vy;

        if (obj.x < 20 || obj.x > w - 60) obj.vx *= -1;
        if (obj.y < 20 || obj.y > h - 40) obj.vy *= -1;

        // Bounding Box
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(obj.x, obj.y, 50, 35);

        // Corner reticles
        const len = 6;
        ctx.beginPath();
        ctx.moveTo(obj.x, obj.y + len); ctx.lineTo(obj.x, obj.y); ctx.lineTo(obj.x + len, obj.y);
        ctx.moveTo(obj.x + 50 - len, obj.y); ctx.lineTo(obj.x + 50, obj.y); ctx.lineTo(obj.x + 50, obj.y + len);
        ctx.stroke();

        // Label Tag
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(obj.x, obj.y - 12, 60, 11);
        ctx.fillStyle = obj.color;
        ctx.font = "8px monospace";
        ctx.fillText(obj.label, obj.x + 2, obj.y - 3);
      });

      // 4. Draw Mesh Landmark Points if selected
      if (filter === "mesh") {
        ctx.fillStyle = "#34d399";
        ctx.strokeStyle = "rgba(52, 211, 153, 0.4)";
        ctx.lineWidth = 0.8;

        const points = [
          { x: targetPos.x - 20, y: targetPos.y - 15 },
          { x: targetPos.x + 20, y: targetPos.y - 15 },
          { x: targetPos.x, y: targetPos.y },
          { x: targetPos.x - 12, y: targetPos.y + 18 },
          { x: targetPos.x + 12, y: targetPos.y + 18 },
        ];

        points.forEach((pt, idx) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fill();
          if (idx > 0) {
            ctx.beginPath();
            ctx.moveTo(points[idx - 1].x, points[idx - 1].y);
            ctx.lineTo(pt.x, pt.y);
            ctx.stroke();
          }
        });
      }

      // 5. Draw Interactive Target Reticle on User Cursor
      const tx = targetPos.x;
      const ty = targetPos.y;

      ctx.strokeStyle = isHovered ? "#f43f5e" : "#06b6d4";
      ctx.lineWidth = 1.5;

      // Crosshairs
      ctx.beginPath();
      ctx.arc(tx, ty, 14, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(tx - 22, ty); ctx.lineTo(tx + 22, ty);
      ctx.moveTo(tx, ty - 22); ctx.lineTo(tx, ty + 22);
      ctx.stroke();

      // Target Coordinates Telemetry
      ctx.fillStyle = isHovered ? "#f43f5e" : "#06b6d4";
      ctx.font = "9px monospace";
      ctx.fillText(`TARGET [X:${Math.round(tx)} Y:${Math.round(ty)}]`, tx + 18, ty - 10);
      ctx.fillText(`CONF: 99.4%`, tx + 18, ty + 2);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [filter, isCameraActive, isHovered, targetPos]);

  // Handle Mouse Track
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setTargetPos({ x, y });
  };

  return (
    <div className="w-full max-w-[340px] xl:max-w-[365px] rounded-2xl border border-purple-500/25 bg-slate-950/85 backdrop-blur-xl p-3.5 sm:p-4 text-zinc-100 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(168,85,247,0.12)] transition-all select-none hover:border-purple-500/40">
      {/* Hidden Video element for webcam streaming */}
      <video ref={videoRef} playsInline muted className="hidden" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400">
            <IconEye className="h-4 w-4 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold font-mono tracking-wider text-purple-300 uppercase">
                OpenCV Vision Matrix
              </h3>
              <span className="rounded bg-purple-950/80 px-1 py-0.2 text-[9px] font-mono font-semibold text-purple-400 border border-purple-500/30">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-sans">
              Neural Object & Feature Tracker
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
              <IconCamera className="h-3 w-3 text-cyan-400" />
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
        <div className="absolute top-1.5 left-2 pointer-events-none flex items-center gap-1.5 font-mono text-[9px] text-cyan-300/90 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>FPS: {fps}</span>
          <span>•</span>
          <span>YOLOv11-N</span>
        </div>

        {/* Bottom-Right Coordinates Telemetry Overlay */}
        <div className="absolute bottom-1.5 right-2 pointer-events-none font-mono text-[8.5px] text-zinc-400 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
          OPTICAL FLOW: ACTIVE
        </div>
      </div>

      {/* Filter Mode Switcher Buttons */}
      <div className="grid grid-cols-4 gap-1 pt-1 pb-2">
        <button
          type="button"
          onClick={() => setFilter("rgb")}
          className={`py-1 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer ${
            filter === "rgb"
              ? "bg-cyan-500/25 border border-cyan-400/50 text-cyan-200"
              : "bg-white/5 text-zinc-400 hover:text-white"
          }`}
        >
          RGB
        </button>
        <button
          type="button"
          onClick={() => setFilter("canny")}
          className={`py-1 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer ${
            filter === "canny"
              ? "bg-purple-500/25 border border-purple-400/50 text-purple-200"
              : "bg-white/5 text-zinc-400 hover:text-white"
          }`}
        >
          CANNY
        </button>
        <button
          type="button"
          onClick={() => setFilter("thermal")}
          className={`py-1 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer ${
            filter === "thermal"
              ? "bg-rose-500/25 border border-rose-400/50 text-rose-200"
              : "bg-white/5 text-zinc-400 hover:text-white"
          }`}
        >
          THERMAL
        </button>
        <button
          type="button"
          onClick={() => setFilter("mesh")}
          className={`py-1 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer ${
            filter === "mesh"
              ? "bg-emerald-500/25 border border-emerald-400/50 text-emerald-200"
              : "bg-white/5 text-zinc-400 hover:text-white"
          }`}
        >
          MESH
        </button>
      </div>

      {/* Bottom Live Metrics */}
      <div className="mt-1 pt-2 border-t border-white/10 grid grid-cols-3 gap-1 text-center font-mono">
        <div className="p-1 rounded bg-white/5">
          <div className="text-[8.5px] text-zinc-400">INFERENCE</div>
          <div className="text-[10.5px] font-bold text-purple-300">7.2ms</div>
        </div>
        <div className="p-1 rounded bg-white/5">
          <div className="text-[8.5px] text-zinc-400">RESOLUTION</div>
          <div className="text-[10.5px] font-bold text-cyan-300">1080p</div>
        </div>
        <div className="p-1 rounded bg-white/5">
          <div className="text-[8.5px] text-zinc-400">PRECISION</div>
          <div className="text-[10.5px] font-bold text-emerald-400">FP16 TENSOR</div>
        </div>
      </div>
    </div>
  );
}
