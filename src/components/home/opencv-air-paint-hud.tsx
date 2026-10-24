"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  IconPaint,
  IconHandFinger,
  IconTrash,
  IconArrowBackUp,
} from "@tabler/icons-react";

// Color values inspired by TusharSSurve/OpenCV/Virtual Paint/virtualPaint.py
const PALETTE = [
  { name: "Cyber Green", hex: "#00ff66" },
  { name: "Neon Pink", hex: "#ff007f" },
  { name: "Tangerine", hex: "#ff9933" },
  { name: "Sky Cyan", hex: "#00f0ff" },
];

interface Point {
  x: number;
  y: number;
  color: string;
  size: number;
}

export function OpenCvAirPaintHud() {
  const [selectedColor, setSelectedColor] = useState(PALETTE[0].hex);
  const [brushSize, setBrushSize] = useState(6);
  const [pinchDist, setPinchDist] = useState(65);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Point[][]>([]);
  const currentStrokeRef = useRef<Point[]>([]);

  // Redraw canvas with all strokes + hand gesture telemetry
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear background
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle OpenCV grid background
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw all completed strokes
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

    // Draw active stroke
    if (currentStrokeRef.current.length > 1) {
      const stroke = currentStrokeRef.current;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = 12;
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

    // MediaPipe Hand Landmark Overlay (Thumb tip [4] to Index tip [8] pinch vector)
    const handX = canvas.width - 65;
    const handY = 45;

    // Simulated landmark 4 (Thumb) and landmark 8 (Index)
    const thumbX = handX - pinchDist * 0.22;
    const thumbY = handY + 12;
    const indexX = handX + pinchDist * 0.22;
    const indexY = handY - 12;

    // Draw pinch connection line
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(thumbX, thumbY);
    ctx.lineTo(indexX, indexY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Landmark 4 (Thumb)
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(thumbX, thumbY, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#94a3b8";
    ctx.font = "8px monospace";
    ctx.fillText("lm[4]", thumbX - 10, thumbY + 10);

    // Draw Landmark 8 (Index)
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(indexX, indexY, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText("lm[8]", indexX - 10, indexY - 5);

    // Distance HUD text
    ctx.fillStyle = "#38bdf8";
    ctx.font = "8px monospace";
    ctx.fillText(`PINCH: ${Math.round(pinchDist)}px`, handX - 25, handY + 30);
  }, [pinchDist]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Handle Mouse / Touch interactions
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setIsDrawing(true);
    const newPoint: Point = { x, y, color: selectedColor, size: brushSize };
    currentStrokeRef.current = [newPoint];
    renderCanvas();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    currentStrokeRef.current.push({ x, y, color: selectedColor, size: brushSize });
    renderCanvas();
  };

  const handlePointerUp = () => {
    if (isDrawing && currentStrokeRef.current.length > 0) {
      strokesRef.current.push([...currentStrokeRef.current]);
      currentStrokeRef.current = [];
      setIsDrawing(false);
      renderCanvas();
    }
  };

  const clearCanvas = () => {
    strokesRef.current = [];
    currentStrokeRef.current = [];
    renderCanvas();
  };

  const undoLast = () => {
    strokesRef.current.pop();
    renderCanvas();
  };

  // Pre-seed an aesthetic welcome sketch on initial load
  useEffect(() => {
    const welcomeStroke: Point[] = [
      { x: 50, y: 125, color: PALETTE[0].hex, size: 5 },
      { x: 65, y: 75, color: PALETTE[0].hex, size: 5 },
      { x: 80, y: 50, color: PALETTE[0].hex, size: 5 },
      { x: 95, y: 75, color: PALETTE[0].hex, size: 5 },
      { x: 110, y: 125, color: PALETTE[0].hex, size: 5 },
      { x: 75, y: 92, color: PALETTE[0].hex, size: 5 },
      { x: 100, y: 92, color: PALETTE[0].hex, size: 5 },
    ];
    const welcomeStroke2: Point[] = [
      { x: 135, y: 50, color: PALETTE[1].hex, size: 5 },
      { x: 160, y: 50, color: PALETTE[1].hex, size: 5 },
      { x: 147, y: 50, color: PALETTE[1].hex, size: 5 },
      { x: 147, y: 125, color: PALETTE[1].hex, size: 5 },
      { x: 135, y: 125, color: PALETTE[1].hex, size: 5 },
      { x: 160, y: 125, color: PALETTE[1].hex, size: 5 },
    ];
    strokesRef.current = [welcomeStroke, welcomeStroke2];
    renderCanvas();
  }, [renderCanvas]);

  return (
    <div className="w-full max-w-[340px] xl:max-w-[365px] rounded-2xl border border-emerald-500/25 bg-slate-950/85 backdrop-blur-xl p-3.5 sm:p-4 text-zinc-100 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(16,185,129,0.12)] transition-all select-none hover:border-emerald-500/40">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <IconPaint className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold font-mono tracking-wider text-emerald-300 uppercase">
                Virtual Air Paint
              </h3>
              <span className="rounded bg-emerald-950/80 px-1 py-0.2 text-[9px] font-mono font-semibold text-emerald-400 border border-emerald-500/30">
                HSV DRAW
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-sans">
              Hand Gesture & Contour Tracking
            </p>
          </div>
        </div>

        {/* Clear / Undo Quick Actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={undoLast}
            title="Undo last stroke"
            className="p-1 rounded-md bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <IconArrowBackUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            title="Clear canvas"
            className="p-1 rounded-md bg-white/5 border border-white/10 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <IconTrash className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Air Drawing Canvas */}
      <div className="relative my-2.5 rounded-xl overflow-hidden border border-white/10 bg-black shadow-inner">
        <canvas
          ref={canvasRef}
          width={300}
          height={180}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="w-full h-[180px] object-cover cursor-crosshair block touch-none"
        />

        {/* Top-Left Telemetry Overlay */}
        <div className="absolute top-1.5 left-2 pointer-events-none flex items-center gap-1.5 font-mono text-[9px] text-emerald-300/90 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>cv2.findContours()</span>
          <span>•</span>
          <span>HSV MASK</span>
        </div>

        {/* Bottom Hint */}
        <div className="absolute bottom-1.5 left-2 pointer-events-none font-mono text-[8.5px] text-zinc-400 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
          ✨ Draw anywhere on canvas
        </div>
      </div>

      {/* Color Selection Palette (From OpenCV repo) */}
      <div className="flex items-center justify-between pt-1 pb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
            COLOR:
          </span>
          <div className="flex items-center gap-1.5">
            {PALETTE.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => setSelectedColor(c.hex)}
                title={c.name}
                style={{ backgroundColor: c.hex }}
                className={`h-5 w-5 rounded-full border-2 transition-transform cursor-pointer ${
                  selectedColor === c.hex
                    ? "scale-115 border-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                    : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Brush Size / Pinch Slider */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
          <span>SIZE:</span>
          <input
            type="range"
            min="2"
            max="16"
            value={brushSize}
            onChange={(e) => {
              const val = Number(e.target.value);
              setBrushSize(val);
              setPinchDist(val * 8);
            }}
            className="w-16 accent-emerald-400 cursor-pointer h-1 bg-white/20 rounded-lg appearance-none"
          />
          <span className="text-emerald-300 w-3 text-right">{brushSize}</span>
        </div>
      </div>

      {/* Bottom Telemetry: Volume & Distance Interpolation (From VolumeControl.py) */}
      <div className="mt-1 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <div className="flex items-center gap-1 text-emerald-400">
          <IconHandFinger className="h-3.5 w-3.5" />
          <span>np.interp(length, [15, 220])</span>
        </div>
        <span className="text-zinc-500 font-mono text-[9px]">60 FPS</span>
      </div>
    </div>
  );
}
