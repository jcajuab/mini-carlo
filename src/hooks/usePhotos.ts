import { useCallback } from "react";
import { savePhoto } from "../db/photoDb";
import { processPhoto } from "../utils/photoUtils";

export function usePhotos() {
  const save = useCallback(async (activityId: string, file: File) => {
    const processed = await processPhoto(file);
    await savePhoto(activityId, processed);
  }, []);

  return { save };
}
