import { useEffect, useState, useCallback } from "react";
import type { GameAction } from "../types";
import { getPhoto } from "../db/photoDb";
import { PixelButton } from "./ui/PixelButton";

interface EndingScreenProps {
  dispatch: React.Dispatch<GameAction>;
}

const ACTIVITY_IDS = ["coffee", "activity2", "dinner"];

export function EndingScreen({ dispatch }: EndingScreenProps) {
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const createdUrls: string[] = [];
    async function load() {
      const urls: Record<string, string> = {};
      for (const id of ACTIVITY_IDS) {
        const blob = await getPhoto(id);
        if (blob && !cancelled) {
          const url = URL.createObjectURL(blob);
          createdUrls.push(url);
          urls[id] = url;
        }
      }
      if (!cancelled) {
        setPhotoUrls(urls);
        setLoaded(true);
      }
    }
    load();
    return () => {
      cancelled = true;
      createdUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleDownload = useCallback(async () => {
    const canvas = document.createElement("canvas");
    const w = 400;
    const frameH = 280;
    const sprocketW = 24;
    const photoIds = ACTIVITY_IDS.filter((id) => photoUrls[id]);
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
      const labels = ["Coffee", "Intermission", "Dinner"];
      ctx.fillText(labels[i], w / 2, y + photoH + 20);
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
  }, [photoUrls]);

  const photoIds = ACTIVITY_IDS.filter((id) => photoUrls[id]);
  const hasPhotos = photoIds.length > 0;

  if (!loaded) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "var(--text-accent)",
          fontSize: "var(--font-size-base)",
          padding: "40px 0",
        }}
      >
        Compiling memories...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        alignItems: "center",
        paddingBottom: "32px",
      }}
    >
      {hasPhotos && (
        <div
          style={{
            width: "100%",
            maxWidth: "340px",
            backgroundColor: "#1e1533",
            position: "relative",
            padding: "20px 0",
            border: "3px solid var(--border-color)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "6px 3px",
              overflow: "hidden",
            }}
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`l${i}`}
                style={{
                  width: "14px",
                  height: "10px",
                  backgroundColor: "var(--bg-primary)",
                  flexShrink: 0,
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>

          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "6px 3px",
              overflow: "hidden",
            }}
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`r${i}`}
                style={{
                  width: "14px",
                  height: "10px",
                  backgroundColor: "var(--bg-primary)",
                  flexShrink: 0,
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: "var(--font-size-lg)",
              color: "var(--text-accent)",
              fontFamily: "var(--font-pixel)",
              padding: "8px 0 16px",
              letterSpacing: "2px",
            }}
          >
            memories
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              padding: "0 28px",
            }}
          >
            {photoIds.map((id, i) => (
              <div key={id}>
                <div
                  style={{
                    border: "3px solid #333",
                    backgroundColor: "#2a1d3e",
                    padding: "4px",
                  }}
                >
                  <img
                    src={photoUrls[id]}
                    alt={`Photo ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      display: "block",
                      imageRendering: "auto",
                    }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "6px",
                    color: "#8a6baa",
                    fontFamily: "var(--font-pixel)",
                    marginTop: "4px",
                  }}
                >
                  {["Coffee", "Intermission", "Dinner"][i]}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: "6px",
              color: "var(--text-accent)",
              fontFamily: "var(--font-pixel)",
              padding: "16px 0 4px",
              opacity: 0.7,
            }}
          >
            &mdash; Mini Carlo&trade; &mdash;
          </div>
        </div>
      )}

      {hasPhotos && (
        <PixelButton onClick={handleDownload}>Save Memories</PixelButton>
      )}

      <PixelButton
        variant="secondary"
        onClick={() => dispatch({ type: "NEXT_SCREEN" })}
      >
        ...
      </PixelButton>
    </div>
  );
}
