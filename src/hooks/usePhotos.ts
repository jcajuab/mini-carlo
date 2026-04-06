import { useCallback } from "react";
import { savePhoto, getPhoto } from "../db/photoDb";
import { processPhoto } from "../utils/photoUtils";

export function usePhotos() {
  const save = useCallback(async (activityId: string, file: File) => {
    const processed = await processPhoto(file);
    await savePhoto(activityId, processed);
  }, []);

  const load = useCallback(async (activityId: string) => {
    return getPhoto(activityId);
  }, []);

  return { save, load };
}
