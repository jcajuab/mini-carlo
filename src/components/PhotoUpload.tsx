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
  const fileRef = useRef<HTMLInputElement>(null);
  const { save } = usePhotos();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !screen.activityId) return;

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

  if (!isLastLine) {
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
        <PixelButton onClick={() => dispatch({ type: "NEXT_LINE" })}>
          ...
        </PixelButton>
      </div>
    );
  }

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

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        style={{ display: "none" }}
      />

      <PixelButton
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? "Saving..." : "Upload Photo"}
      </PixelButton>

      {error && (
        <div style={{ color: "var(--fail)", fontSize: "var(--font-size-sm)" }}>
          {error}
        </div>
      )}

      <PixelButton
        variant="secondary"
        style={{ fontSize: "var(--font-size-sm)" }}
        onClick={() => {
          if (!screen.activityId) return;
          dispatch({
            type: "PHOTO_SKIPPED",
            activityId: screen.activityId,
          });
        }}
      >
        Skip Photo
      </PixelButton>
    </div>
  );
}
