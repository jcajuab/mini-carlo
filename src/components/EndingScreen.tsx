import type { GameState } from "../types";
import { DialogueBox } from "./ui/DialogueBox";
import { PhotoGallery } from "./ui/PhotoGallery";

interface EndingScreenProps {
  state: GameState;
}

export function EndingScreen({ state }: EndingScreenProps) {
  const photoActivityIds = state.photos.map((p) => p.activityId);

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
      <DialogueBox speaker="Mini Carlo">Here's what happened.</DialogueBox>

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

      {/* Photos */}
      {photoActivityIds.length > 0 && (
        <>
          <div
            style={{
              fontSize: "var(--font-size-sm)",
              color: "var(--text-accent)",
              alignSelf: "flex-start",
            }}
          >
            The archives:
          </div>
          <PhotoGallery activityIds={photoActivityIds} />
        </>
      )}

      {/* Final lines */}
      <DialogueBox speaker="Mini Carlo">
        Not bad.
        <br />
        Not bad at all.
        <br />
        <br />
        I'll... log this as a successful run.
      </DialogueBox>

      <div
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--text-secondary)",
          textAlign: "center",
          lineHeight: "2",
          marginTop: "16px",
        }}
      >
        &mdash; Mini Carlo &trade; &mdash;
      </div>
    </div>
  );
}
