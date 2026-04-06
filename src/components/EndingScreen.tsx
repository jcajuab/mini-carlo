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
          style={{
            width: "100%",
            maxWidth: "340px",
            backgroundColor: "var(--bg-secondary)",
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
                    backgroundColor: "var(--bg-primary)",
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
                  {ACTIVITY_LABELS[id]}
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
