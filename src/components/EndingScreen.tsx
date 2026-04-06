import { useEffect, useState, useRef, useCallback } from "react";
import type { GameState, GameAction } from "../types";
import { getPhoto } from "../db/photoDb";
import { PixelButton } from "./ui/PixelButton";

interface EndingScreenProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const ACTIVITY_IDS = ["coffee", "activity2", "dinner"];

export function EndingScreen({ state, dispatch }: EndingScreenProps) {
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const urls: Record<string, string> = {};
      for (const id of ACTIVITY_IDS) {
        const blob = await getPhoto(id);
        if (blob && !cancelled) {
          urls[id] = URL.createObjectURL(blob);
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

    // Background
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, w, totalH);

    // Film strip background
    const stripX = sprocketW;
    const stripW = w - sprocketW * 2;
    ctx.fillStyle = "#111";
    ctx.fillRect(stripX, 0, stripW, totalH);

    // Sprocket holes
    ctx.fillStyle = "#1a1a2e";
    for (let y = 10; y < totalH; y += 30) {
      // Left sprockets
      ctx.fillRect(4, y, 14, 16);
      // Right sprockets
      ctx.fillRect(w - 18, y, 14, 16);
    }

    // Film strip borders
    ctx.fillStyle = "#333";
    ctx.fillRect(stripX, 0, 2, totalH);
    ctx.fillRect(stripX + stripW - 2, 0, 2, totalH);

    // Title
    ctx.fillStyle = "#e94560";
    ctx.font = "bold 16px 'Press Start 2P', monospace";
    ctx.textAlign = "center";
    ctx.fillText("memories", w / 2, 30);

    // Photos
    for (let i = 0; i < photoIds.length; i++) {
      const id = photoIds[i];
      const url = photoUrls[id];
      const y = 50 + i * frameH;
      const photoX = stripX + 16;
      const photoW = stripW - 32;
      const photoH = frameH - 40;

      // Photo frame
      ctx.fillStyle = "#222";
      ctx.fillRect(photoX - 4, y - 4, photoW + 8, photoH + 8);

      // Load and draw image
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject();
          img.src = url;
        });

        // Cover fit
        const scale = Math.max(photoW / img.width, photoH / img.height);
        const sw = photoW / scale;
        const sh = photoH / scale;
        const sx = (img.width - sw) / 2;
        const sy = (img.height - sh) / 2;
        ctx.drawImage(img, sx, sy, sw, sh, photoX, y, photoW, photoH);
      } catch {
        ctx.fillStyle = "#333";
        ctx.fillRect(photoX, y, photoW, photoH);
      }

      // Label
      ctx.fillStyle = "#a8a8a8";
      ctx.font = "8px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      const labels = ["Coffee", "Activity", "Dinner"];
      ctx.fillText(labels[i], w / 2, y + photoH + 20);
    }

    // Footer
    ctx.fillStyle = "#e94560";
    ctx.font = "8px 'Press Start 2P', monospace";
    ctx.textAlign = "center";
    ctx.fillText("\u2014 Mini Carlo\u2122 \u2014", w / 2, totalH - 12);

    // Download
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
      {/* Film strip */}
      {hasPhotos && (
        <div
          ref={stripRef}
          style={{
            width: "100%",
            maxWidth: "340px",
            backgroundColor: "#111",
            position: "relative",
            padding: "20px 0",
            border: "3px solid var(--border-color)",
          }}
        >
          {/* Left sprocket column */}
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

          {/* Right sprocket column */}
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

          {/* Title */}
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

          {/* Photo frames */}
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
                    backgroundColor: "#222",
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
                    color: "#666",
                    fontFamily: "var(--font-pixel)",
                    marginTop: "4px",
                  }}
                >
                  {["Coffee", "Activity", "Dinner"][i]}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
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

      {/* Choices summary */}
      <div
        style={{
          border: "3px solid var(--border-color)",
          backgroundColor: "var(--bg-secondary)",
          padding: "16px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--text-accent)",
            marginBottom: "12px",
          }}
        >
          You chose:
        </div>
        <div
          style={{
            fontSize: "var(--font-size-sm)",
            lineHeight: "2.2",
            color: "var(--text-primary)",
          }}
        >
          <div>Coffee: {state.choices["coffee"] ?? "???"}</div>
          <div>Activity: {state.choices["activity"] ?? "???"}</div>
        </div>
      </div>

      {/* What you did */}
      <div
        style={{
          border: "3px solid var(--border-color)",
          backgroundColor: "var(--bg-secondary)",
          padding: "16px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--text-accent)",
            marginBottom: "12px",
          }}
        >
          You:
        </div>
        <div
          style={{
            fontSize: "var(--font-size-sm)",
            lineHeight: "2.2",
            color: "var(--text-primary)",
          }}
        >
          <div>- Took photos</div>
          <div>- Answered questions</div>
          <div>- Participated in a structured human interaction event</div>
        </div>
      </div>

      {/* Download button */}
      {hasPhotos && (
        <PixelButton onClick={handleDownload}>Save Memories</PixelButton>
      )}

      {/* Continue to final question */}
      <PixelButton
        variant="secondary"
        onClick={() => dispatch({ type: "NEXT_SCREEN" })}
      >
        ...
      </PixelButton>
    </div>
  );
}
