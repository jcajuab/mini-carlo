import { useRef, useState } from "react";
import type { GameAction, ScreenNode } from "../types";
import { processPhoto } from "../utils/photoUtils";
import { savePhoto } from "../db/photoDb";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface PhotoUploadProps {
  screen: ScreenNode;
  lineIndex: number;
  dispatch: React.Dispatch<GameAction>;
}

const screenStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
  alignItems: "center",
};

const uploadButtonsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
  alignItems: "center",
};

const uploadButtonStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "280px",
};

const errorStyle: React.CSSProperties = {
  color: "var(--fail)",
  fontSize: "var(--font-size-sm)",
};

const hiddenInputStyle: React.CSSProperties = { display: "none" };

export function PhotoUpload({ screen, lineIndex, dispatch }: PhotoUploadProps) {
  const lines = screen.lines ?? [];
  const currentLine = lines[lineIndex] ?? "";
  const isLastLine = lineIndex >= lines.length - 1;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !screen.activityId) return;

    e.target.value = "";

    setUploading(true);
    setError(null);
    try {
      const processed = await processPhoto(file);
      await savePhoto(screen.activityId, processed);
      dispatch({
        type: "PHOTO_SAVED",
        activityId: screen.activityId,
        timestamp: Date.now(),
      });
    } catch {
      setError("Failed to save photo. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={screenStyle}>
      <DialogueBox speaker="Mini Carlo">{currentLine}</DialogueBox>

      {isLastLine ? (
        <>
          <input
            ref={galleryRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={hiddenInputStyle}
          />
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFile}
            style={hiddenInputStyle}
          />

          <div style={uploadButtonsStyle}>
            <PixelButton
              onClick={() => galleryRef.current?.click()}
              disabled={uploading}
              style={uploadButtonStyle}
            >
              {uploading ? "Saving..." : "Choose from Gallery"}
            </PixelButton>
            <PixelButton
              variant="secondary"
              onClick={() => cameraRef.current?.click()}
              disabled={uploading}
              style={uploadButtonStyle}
            >
              Take a Photo
            </PixelButton>
          </div>

          {error && <div style={errorStyle}>{error}</div>}
        </>
      ) : (
        <PixelButton onClick={() => dispatch({ type: "NEXT_LINE" })}>
          ...
        </PixelButton>
      )}
    </div>
  );
}
