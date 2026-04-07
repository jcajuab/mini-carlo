import { saveFile } from "./saveFile";

export const ACTIVITY_LABELS: Record<string, string> = {
  coffee: "Coffee",
  intermission: "Intermission",
  dinner: "Dinner",
};

const SCALE = 3;
const CANVAS_WIDTH = 400 * SCALE;
const FRAME_HEIGHT = 280 * SCALE;
const SPROCKET_WIDTH = 28 * SCALE;
const TITLE_OFFSET = 50 * SCALE;
const PHOTO_PADDING = 12 * SCALE;
const PHOTO_BOTTOM_MARGIN = 40 * SCALE;
const LABEL_Y_OFFSET = 20 * SCALE;
const TITLE_FONT_SIZE = 14 * SCALE;
const LABEL_FONT_SIZE = 8 * SCALE;
const SPROCKET_HOLE_HEIGHT = 14 * SCALE;
const SPROCKET_HOLE_WIDTH = 16 * SCALE;
const SPROCKET_HOLE_SPACING = 24 * SCALE;
const SPROCKET_HOLE_MARGIN = 6 * SCALE;
const SPROCKET_HOLE_INSET = 8 * SCALE;

const COLOR_STRIP_BG = "#342650";
const COLOR_FILM_BG = "#2a1d3e";
const COLOR_SPROCKET = "#111118";
const COLOR_PHOTO_PLACEHOLDER = "#4a2d5c";
const COLOR_TITLE = "#ffafcc";
const COLOR_LABEL = "#cdb4db";
const COLOR_FRAME_BORDER = "#2a1d3e";

export async function downloadMemories(
  photoUrls: Record<string, string>,
): Promise<void> {
  const photoIds = Object.keys(ACTIVITY_LABELS).filter((id) => photoUrls[id]);
  const totalH = photoIds.length * FRAME_HEIGHT + 60 * SCALE;

  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_WIDTH;
  canvas.height = totalH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = COLOR_FILM_BG;
  ctx.fillRect(0, 0, CANVAS_WIDTH, totalH);

  ctx.fillStyle = COLOR_SPROCKET;
  ctx.fillRect(0, 0, SPROCKET_WIDTH, totalH);
  ctx.fillRect(CANVAS_WIDTH - SPROCKET_WIDTH, 0, SPROCKET_WIDTH, totalH);

  for (let y = SPROCKET_HOLE_INSET; y < totalH; y += SPROCKET_HOLE_SPACING) {
    ctx.fillStyle = COLOR_FILM_BG;
    ctx.fillRect(
      SPROCKET_HOLE_MARGIN,
      y,
      SPROCKET_HOLE_WIDTH,
      SPROCKET_HOLE_HEIGHT,
    );
    ctx.fillRect(
      CANVAS_WIDTH - SPROCKET_HOLE_MARGIN - SPROCKET_HOLE_WIDTH,
      y,
      SPROCKET_HOLE_WIDTH,
      SPROCKET_HOLE_HEIGHT,
    );
  }

  const stripX = SPROCKET_WIDTH;
  const stripW = CANVAS_WIDTH - SPROCKET_WIDTH * 2;
  ctx.fillStyle = COLOR_STRIP_BG;
  ctx.fillRect(stripX, 0, stripW, totalH);

  ctx.fillStyle = COLOR_TITLE;
  ctx.font = `bold ${TITLE_FONT_SIZE}px 'Press Start 2P', monospace`;
  ctx.textAlign = "center";
  ctx.fillText("memories", CANVAS_WIDTH / 2, 30 * SCALE);

  for (let i = 0; i < photoIds.length; i++) {
    const id = photoIds[i];
    const url = photoUrls[id];
    const y = TITLE_OFFSET + i * FRAME_HEIGHT;
    const photoX = stripX + PHOTO_PADDING;
    const photoW = stripW - PHOTO_PADDING * 2;
    const photoH = FRAME_HEIGHT - PHOTO_BOTTOM_MARGIN;
    const border = 3 * SCALE;

    ctx.fillStyle = COLOR_FRAME_BORDER;
    ctx.fillRect(
      photoX - border,
      y - border,
      photoW + border * 2,
      photoH + border * 2,
    );

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
      ctx.fillStyle = COLOR_PHOTO_PLACEHOLDER;
      ctx.fillRect(photoX, y, photoW, photoH);
    }

    ctx.fillStyle = COLOR_LABEL;
    ctx.font = `${LABEL_FONT_SIZE}px 'Press Start 2P', monospace`;
    ctx.textAlign = "center";
    ctx.fillText(
      ACTIVITY_LABELS[id],
      CANVAS_WIDTH / 2,
      y + photoH + LABEL_Y_OFFSET,
    );
  }

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) return;

  await saveFile(blob, "mini-carlo-memories.png");
}
