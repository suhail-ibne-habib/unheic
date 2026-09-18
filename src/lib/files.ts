import { siteConfig } from "./site";

export async function filesFromDrop(dataTransfer: DataTransfer): Promise<File[]> {
  const items = Array.from(dataTransfer.items ?? []);
  if (!items.length) return Array.from(dataTransfer.files ?? []);

  const collected: File[] = [];
  const entries: FileSystemEntry[] = [];

  for (const item of items) {
    const entry = item.webkitGetAsEntry?.();
    if (entry) {
      entries.push(entry);
    } else {
      const file = item.getAsFile();
      if (file) collected.push(file);
    }
  }

  for (const entry of entries) {
    collected.push(...(await readEntry(entry)));
  }

  return collected;
}

async function readEntry(entry: FileSystemEntry): Promise<File[]> {
  if (entry.isFile) {
    const file = await new Promise<File>((resolve, reject) => {
      (entry as FileSystemFileEntry).file(resolve, reject);
    });
    return [file];
  }

  if (entry.isDirectory) {
    const reader = (entry as FileSystemDirectoryEntry).createReader();
    const files: File[] = [];

    const readBatch = async (): Promise<void> => {
      const batch = await new Promise<FileSystemEntry[]>((resolve, reject) => {
        reader.readEntries(resolve, reject);
      });
      if (!batch.length) return;
      for (const child of batch) {
        files.push(...(await readEntry(child)));
      }
      await readBatch();
    };

    await readBatch();
    return files;
  }

  return [];
}

export function selectConvertibleFiles(
  files: File[],
  remainingSlots: number,
  isAllowed: (name: string) => boolean,
) {
  const convertible = files.filter((file) => isAllowed(file.name));
  const skipped = files.length - convertible.length;
  const accepted = convertible.slice(0, Math.max(0, remainingSlots));
  const overflow = convertible.length - accepted.length;

  return {
    accepted,
    skipped,
    overflow,
    remainingSlots: siteConfig.maxFiles,
  };
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}
