export const ACTIVITY_LABELS: Record<string, string> = {
  coffee: "Coffee",
  intermission: "Intermission",
  dinner: "Dinner",
};

export async function downloadMemories(
  photoUrls: Record<string, string>,
): Promise<void> {
  const canvas = document.createElement("canvas");
  const w = 400;
  const frameH = 280;
  const sprocketW = 28;
  const photoIds = Object.keys(ACTIVITY_LABELS).filter((id) => photoUrls[id]);
  const totalH = photoIds.length * frameH + 60;
  canvas.width = w;
  canvas.height = totalH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#2a1d3e";
  ctx.fillRect(0, 0, w, totalH);

  ctx.fillStyle = "#111118";
  ctx.fillRect(0, 0, sprocketW, totalH);
  ctx.fillRect(w - sprocketW, 0, sprocketW, totalH);

  for (let y = 8; y < totalH; y += 24) {
    ctx.fillStyle = "#2a1d3e";
    ctx.fillRect(6, y, 16, 14);
    ctx.fillRect(w - 22, y, 16, 14);
  }

  const stripX = sprocketW;
  const stripW = w - sprocketW * 2;
  ctx.fillStyle = "#342650";
  ctx.fillRect(stripX, 0, stripW, totalH);

  ctx.fillStyle = "#ffafcc";
  ctx.font = "bold 14px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.fillText("memories", w / 2, 30);

  for (let i = 0; i < photoIds.length; i++) {
    const id = photoIds[i];
    const url = photoUrls[id];
    const y = 50 + i * frameH;
    const photoX = stripX + 12;
    const photoW = stripW - 24;
    const photoH = frameH - 40;

    ctx.fillStyle = "#2a1d3e";
    ctx.fillRect(photoX - 3, y - 3, photoW + 6, photoH + 6);

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = url;
      });

      const scale = Math.max(photoW / img.width, photoH / img.height);
      const sw = photoW / scale;
      const sh = photoH / scale;
      const sx = (img.width - sw) / 2;
      const sy = (img.height - sh) / 2;
      ctx.drawImage(img, sx, sy, sw, sh, photoX, y, photoW, photoH);
    } catch {
      ctx.fillStyle = "#4a2d5c";
      ctx.fillRect(photoX, y, photoW, photoH);
    }

    ctx.fillStyle = "#cdb4db";
    ctx.font = "8px 'Press Start 2P', monospace";
    ctx.textAlign = "center";
    ctx.fillText(ACTIVITY_LABELS[id], w / 2, y + photoH + 20);
  }

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mini-carlo-memories.png";
    a.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}
