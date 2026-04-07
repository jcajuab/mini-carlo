function canShareFile(file: File): boolean {
  return !!navigator.canShare?.({ files: [file] });
}

function downloadViaAnchor(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

export async function saveFile(blob: Blob, filename: string): Promise<void> {
  const file = new File([blob], filename, { type: blob.type });

  if (canShareFile(file)) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch {
      // user cancelled share sheet or share failed — fall through to download
    }
  }

  const url = URL.createObjectURL(blob);
  downloadViaAnchor(url, filename);
  URL.revokeObjectURL(url);
}

export async function saveFromUrl(
  src: string,
  filename: string,
): Promise<void> {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    await saveFile(blob, filename);
  } catch {
    downloadViaAnchor(src, filename);
  }
}
