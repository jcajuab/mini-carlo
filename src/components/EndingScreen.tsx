import { useEffect, useState, useCallback } from "react";
import type { GameAction } from "../types";
import { getPhoto } from "../db/photoDb";
import { PixelButton } from "./ui/PixelButton";
import { downloadMemories, ACTIVITY_LABELS } from "../utils/downloadMemories";

interface EndingScreenProps {
  dispatch: React.Dispatch<GameAction>;
}

const ACTIVITY_IDS = Object.keys(ACTIVITY_LABELS);

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

  const handleDownload = useCallback(
    () => downloadMemories(photoUrls),
    [photoUrls],
  );

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
          onClick={handleDownload}
          style={{
            width: "100%",
            maxWidth: "340px",
            backgroundColor: "var(--bg-secondary)",
            position: "relative",
            padding: "10px 0",
            border: "3px solid var(--border-color)",
            cursor: "pointer",
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
              fontSize: "var(--font-size-base)",
              color: "var(--text-accent)",
              fontFamily: "var(--font-pixel)",
              padding: "6px 0 10px",
              letterSpacing: "2px",
            }}
          >
            memories
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "0 28px 12px",
            }}
          >
            {photoIds.map((id, i) => (
              <div key={id}>
                <div
                  style={{
                    border: "2px solid var(--bg-card)",
                    backgroundColor: "var(--bg-primary)",
                    padding: "3px",
                  }}
                >
                  <img
                    src={photoUrls[id]}
                    alt={`Photo ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      display: "block",
                      imageRendering: "auto",
                    }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "5px",
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-pixel)",
                    marginTop: "2px",
                  }}
                >
                  {ACTIVITY_LABELS[id]}
                </div>
              </div>
            ))}
          </div>
        </div>
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
