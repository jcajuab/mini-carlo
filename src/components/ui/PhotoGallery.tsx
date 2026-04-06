import { useEffect, useState } from "react";
import { getPhoto } from "../../db/photoDb";

interface PhotoGalleryProps {
  activityIds: string[];
}

export function PhotoGallery({ activityIds }: PhotoGalleryProps) {
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    async function loadPhotos() {
      const urls: Record<string, string> = {};
      for (const id of activityIds) {
        const blob = await getPhoto(id);
        if (blob && !cancelled) {
          urls[id] = URL.createObjectURL(blob);
        }
      }
      if (!cancelled) setPhotoUrls(urls);
    }
    loadPhotos();
    return () => {
      cancelled = true;
      Object.values(photoUrls).forEach(URL.revokeObjectURL);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityIds]);

  if (Object.keys(photoUrls).length === 0) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(Object.keys(photoUrls).length, 3)}, 1fr)`,
        gap: "8px",
        width: "100%",
      }}
    >
      {activityIds.map((id) =>
        photoUrls[id] ? (
          <div
            key={id}
            style={{
              border: "3px solid var(--border-color)",
              overflow: "hidden",
              aspectRatio: "1",
            }}
          >
            <img
              src={photoUrls[id]}
              alt={`Photo from ${id}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                imageRendering: "auto",
              }}
            />
          </div>
        ) : null,
      )}
    </div>
  );
}
