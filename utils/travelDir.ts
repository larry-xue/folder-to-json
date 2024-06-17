export type TreeDir = {
  name: string
  children: TreeDir[]
  type: 'file' | 'directory'
}

export async function traverseDir(dirHandle: FileSystemDirectoryHandle) {
  const treeDir: TreeDir = {
    name: dirHandle.name,
    children: [],
    type: dirHandle.kind
  }
  for await (const [key, value] of dirHandle.entries()) {
    if (value.kind === 'directory') {
      const subDir = await traverseDir(value);
      treeDir.children.push({
        ...subDir,
        type: 'directory'
      });
    } else {
      treeDir.children.push({
        name: key,
        children: [],
        type: 'file'
      })
    }
  }

  return treeDir
}
