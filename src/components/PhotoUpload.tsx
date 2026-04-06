import { useRef, useState } from "react";
import type { GameAction, ScreenNode } from "../types";
import { usePhotos } from "../hooks/usePhotos";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface PhotoUploadProps {
  screen: ScreenNode;
  lineIndex: number;
  dispatch: React.Dispatch<GameAction>;
}

export function PhotoUpload({ screen, lineIndex, dispatch }: PhotoUploadProps) {
  const lines = screen.lines ?? [];
  const currentLine = lines[lineIndex] ?? "";
  const isLastLine = lineIndex >= lines.length - 1;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const { save } = usePhotos();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !screen.activityId) return;

    e.target.value = "";

    setUploading(true);
    setError(null);
    try {
      await save(screen.activityId, file);
      dispatch({ type: "PHOTO_SAVED", activityId: screen.activityId });
    } catch {
      setError("Failed to save photo. Try again.");
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
        alignItems: "center",
      }}
    >
      <DialogueBox speaker="Mini Carlo">{currentLine}</DialogueBox>

      {isLastLine ? (
        <>
          <input
            ref={galleryRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ display: "none" }}
          />
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFile}
            style={{ display: "none" }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <PixelButton
              onClick={() => galleryRef.current?.click()}
              disabled={uploading}
              style={{ width: "100%", maxWidth: "280px" }}
            >
              {uploading ? "Saving..." : "Choose from Gallery"}
            </PixelButton>
            <PixelButton
              variant="secondary"
              onClick={() => cameraRef.current?.click()}
              disabled={uploading}
              style={{ width: "100%", maxWidth: "280px" }}
            >
              Take a Photo
            </PixelButton>
          </div>

          {error && (
            <div
              style={{ color: "var(--fail)", fontSize: "var(--font-size-sm)" }}
            >
              {error}
            </div>
          )}
        </>
      ) : (
        <PixelButton onClick={() => dispatch({ type: "NEXT_LINE" })}>
          ...
        </PixelButton>
      )}
    </div>
  );
}
