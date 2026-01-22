export const DEFAULT_AUTOSAVE_INTERVAL_MS = 30000;

type AutosaveOptions = {
  getContent: () => string;
  getFileHandle: () => FileSystemFileHandle | null;
  onSaved?: () => void;
  intervalMs?: number;
};

export const writeTranscriptToFile = async (
  fileHandle: FileSystemFileHandle,
  content: string
) => {
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
};

export const startAutosave = ({
  getContent,
  getFileHandle,
  onSaved,
  intervalMs = DEFAULT_AUTOSAVE_INTERVAL_MS,
}: AutosaveOptions) => {
  const id = window.setInterval(async () => {
    const handle = getFileHandle();
    if (!handle) {
      return;
    }

    const content = getContent();
    if (!content.trim()) {
      return;
    }

    try {
      await writeTranscriptToFile(handle, content);
      onSaved?.();
    } catch (error) {
      console.error("Autosave failed", error);
    }
  }, intervalMs);

  return () => window.clearInterval(id);
};

export const requestOutputFile = async (
  suggestedName: string
): Promise<FileSystemFileHandle | null> => {
  if (!window.showSaveFilePicker) {
    return null;
  }

  return window.showSaveFilePicker({
    suggestedName,
    types: [
      {
        description: "Text file",
        accept: { "text/plain": [".txt"] },
      },
    ],
  });
};
