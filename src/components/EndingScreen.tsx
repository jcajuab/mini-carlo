import { useEffect, useState } from "react";
import type { GameAction } from "../types";
import { getPhoto } from "../db/photoDb";
import { PixelButton } from "./ui/PixelButton";
import { downloadMemories, ACTIVITY_LABELS } from "../utils/downloadMemories";

interface EndingScreenProps {
  dispatch: React.Dispatch<GameAction>;
}

const ACTIVITY_IDS = Object.keys(ACTIVITY_LABELS);

const sprocketColumnStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "22px",
  backgroundColor: "#111118",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "6px 4px",
  overflow: "hidden",
};

const sprocketHoleStyle: React.CSSProperties = {
  width: "14px",
  height: "10px",
  backgroundColor: "var(--bg-primary)",
  flexShrink: 0,
  borderRadius: "1px",
};

const stripContainerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "380px",
  backgroundColor: "var(--bg-secondary)",
  position: "relative",
  padding: "10px 0",
  border: "3px solid var(--border-color)",
};

const stripTitleStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "var(--font-size-base)",
  color: "var(--text-accent)",
  fontFamily: "var(--font-pixel)",
  padding: "6px 0 10px",
  letterSpacing: "2px",
};

const stripPhotosStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "0 30px 12px",
};

const photoFrameStyle: React.CSSProperties = {
  border: "2px solid var(--bg-card)",
  backgroundColor: "var(--bg-primary)",
  padding: "3px",
};

const photoImgStyle: React.CSSProperties = {
  width: "100%",
  height: "140px",
  objectFit: "cover",
  display: "block",
  imageRendering: "auto",
};

const photoLabelStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "5px",
  color: "var(--text-secondary)",
  fontFamily: "var(--font-pixel)",
  marginTop: "2px",
};

const loadingStyle: React.CSSProperties = {
  textAlign: "center",
  color: "var(--text-accent)",
  fontSize: "var(--font-size-base)",
  padding: "40px 0",
};

const screenStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
  alignItems: "center",
  paddingBottom: "16px",
};

const buttonRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
};

const SPROCKET_HOLES = Array.from({ length: 40 });

function SprocketColumn({ side }: { side: "left" | "right" }) {
  return (
    <div style={{ ...sprocketColumnStyle, [side]: 0 }}>
      {SPROCKET_HOLES.map((_, i) => (
        <div key={i} style={sprocketHoleStyle} />
      ))}
    </div>
  );
}

function FilmStrip({
  photoIds,
  photoUrls,
}: {
  photoIds: string[];
  photoUrls: Record<string, string>;
}) {
  return (
    <div style={stripContainerStyle}>
      <SprocketColumn side="left" />
      <SprocketColumn side="right" />

      <div style={stripTitleStyle}>memories</div>

      <div style={stripPhotosStyle}>
        {photoIds.map((id, i) => (
          <div key={id}>
            <div style={photoFrameStyle}>
              <img
                src={photoUrls[id]}
                alt={`Photo ${i + 1}`}
                style={photoImgStyle}
              />
            </div>
            <div style={photoLabelStyle}>{ACTIVITY_LABELS[id]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

  const photoIds = ACTIVITY_IDS.filter((id) => photoUrls[id]);
  const hasPhotos = photoIds.length > 0;

  if (!loaded) {
    return <div style={loadingStyle}>Compiling memories...</div>;
  }

  return (
    <div style={screenStyle}>
      {hasPhotos && <FilmStrip photoIds={photoIds} photoUrls={photoUrls} />}

      <div style={buttonRowStyle}>
        {hasPhotos && (
          <PixelButton
            onClick={async () => {
              try {
                await downloadMemories(photoUrls);
              } catch {
                // download failed — still advance
              }
              dispatch({ type: "NEXT_SCREEN" });
            }}
          >
            Save
          </PixelButton>
        )}
        <PixelButton
          variant="secondary"
          onClick={() => dispatch({ type: "NEXT_SCREEN" })}
        >
          Skip
        </PixelButton>
      </div>
    </div>
  );
}
