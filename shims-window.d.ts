interface WindowWithShowDirectoryPicker extends Window {
  showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>;
}

declare global {
  interface Window extends WindowWithShowDirectoryPicker {}
}
