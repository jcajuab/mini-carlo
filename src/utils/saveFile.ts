function canShareFile(file: File): boolean {
  return !!navigator.canShare?.({ files: [file] });
}

function downloadViaAnchor(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function saveFile(blob: Blob, filename: string): Promise<void> {
  const file = new File([blob], filename, { type: blob.type });

  if (canShareFile(file)) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch {
      // user cancelled or share failed — fall through to download
    }
  }

  const url = URL.createObjectURL(blob);
  downloadViaAnchor(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

export async function saveFromUrl(
  src: string,
  filename: string,
): Promise<void> {
  const response = await fetch(src);
  if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
  const blob = await response.blob();
  await saveFile(blob, filename);
}
