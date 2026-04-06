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
  const sprocketW = 24;
  const photoIds = Object.keys(ACTIVITY_LABELS).filter((id) => photoUrls[id]);
  const totalH = photoIds.length * frameH + 60;
  canvas.width = w;
  canvas.height = totalH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#2a1d3e";
  ctx.fillRect(0, 0, w, totalH);

  const stripX = sprocketW;
  const stripW = w - sprocketW * 2;
  ctx.fillStyle = "#1e1533";
  ctx.fillRect(stripX, 0, stripW, totalH);

  ctx.fillStyle = "#2a1d3e";
  for (let y = 10; y < totalH; y += 30) {
    ctx.fillRect(4, y, 14, 16);
    ctx.fillRect(w - 18, y, 14, 16);
  }

  ctx.fillStyle = "#4a2d5c";
  ctx.fillRect(stripX, 0, 2, totalH);
  ctx.fillRect(stripX + stripW - 2, 0, 2, totalH);

  ctx.fillStyle = "#ffafcc";
  ctx.font = "bold 16px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.fillText("memories", w / 2, 30);

  for (let i = 0; i < photoIds.length; i++) {
    const id = photoIds[i];
    const url = photoUrls[id];
    const y = 50 + i * frameH;
    const photoX = stripX + 16;
    const photoW = stripW - 32;
    const photoH = frameH - 40;

    ctx.fillStyle = "#2a1d3e";
    ctx.fillRect(photoX - 4, y - 4, photoW + 8, photoH + 8);

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

  ctx.fillStyle = "#ffafcc";
  ctx.font = "8px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.fillText("\u2014 Mini Carlo\u2122 \u2014", w / 2, totalH - 12);

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
