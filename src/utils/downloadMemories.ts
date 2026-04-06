export const ACTIVITY_LABELS: Record<string, string> = {
  coffee: "Coffee",
  intermission: "Intermission",
  dinner: "Dinner",
};

const SCALE = 3;

export async function downloadMemories(
  photoUrls: Record<string, string>,
): Promise<void> {
  const canvas = document.createElement("canvas");
  const w = 400 * SCALE;
  const frameH = 280 * SCALE;
  const sprocketW = 28 * SCALE;
  const photoIds = Object.keys(ACTIVITY_LABELS).filter((id) => photoUrls[id]);
  const totalH = photoIds.length * frameH + 60 * SCALE;
  canvas.width = w;
  canvas.height = totalH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const s = SCALE;

  ctx.fillStyle = "#2a1d3e";
  ctx.fillRect(0, 0, w, totalH);

  ctx.fillStyle = "#111118";
  ctx.fillRect(0, 0, sprocketW, totalH);
  ctx.fillRect(w - sprocketW, 0, sprocketW, totalH);

  for (let y = 8 * s; y < totalH; y += 24 * s) {
    ctx.fillStyle = "#2a1d3e";
    ctx.fillRect(6 * s, y, 16 * s, 14 * s);
    ctx.fillRect(w - 22 * s, y, 16 * s, 14 * s);
  }

  const stripX = sprocketW;
  const stripW = w - sprocketW * 2;
  ctx.fillStyle = "#342650";
  ctx.fillRect(stripX, 0, stripW, totalH);

  ctx.fillStyle = "#ffafcc";
  ctx.font = `bold ${14 * s}px 'Press Start 2P', monospace`;
  ctx.textAlign = "center";
  ctx.fillText("memories", w / 2, 30 * s);

  for (let i = 0; i < photoIds.length; i++) {
    const id = photoIds[i];
    const url = photoUrls[id];
    const y = 50 * s + i * frameH;
    const photoX = stripX + 12 * s;
    const photoW = stripW - 24 * s;
    const photoH = frameH - 40 * s;

    ctx.fillStyle = "#2a1d3e";
    ctx.fillRect(photoX - 3 * s, y - 3 * s, photoW + 6 * s, photoH + 6 * s);

    try {
      const img = new Image();
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
    ctx.font = `${8 * s}px 'Press Start 2P', monospace`;
    ctx.textAlign = "center";
    ctx.fillText(ACTIVITY_LABELS[id], w / 2, y + photoH + 20 * s);
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
