export type TreeDir = {
  name: string
  children: TreeDir[]
  type: 'file' | 'directory'
}

/**
 * Traverses a directory and returns a tree structure of its contents.
 *
 * @param {FileSystemDirectoryHandle} dirHandle - The directory handle to traverse.
 * @param {string[]} [excludeDirs=[]] - An optional array of directory names to exclude from the tree.
 * @param {number} [depth=-1] - The maximum depth to traverse. Defaults to -1 for unlimited depth.
 * @return {Promise<TreeDir>} - A promise that resolves to the tree structure of the directory contents.
 */
export async function traverseDir(dirHandle: FileSystemDirectoryHandle, excludeDirs: string[] = [], depth = -1): Promise<TreeDir> {
  const traverse = async (dirHandle: FileSystemDirectoryHandle, excludeDirs: string[], depth: number) => {
    if (depth === 0) return

    const treeDir: TreeDir = {
      name: dirHandle.name,
      children: [],
      type: dirHandle.kind
    }
    for await (const [key, value] of dirHandle.entries()) {
      if (excludeDirs?.length && excludeDirs.some(excludeDir => new RegExp(excludeDir).test(key))) {
        continue
      }
      if (value.kind === 'directory') {
        const subDir = await traverse(value, excludeDirs, depth - 1);
        subDir && treeDir.children.push({
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

  return traverse(dirHandle, excludeDirs.filter(Boolean), depth) || {
    name: 'Something went wrong',
    children: [],
    type: 'directory'
  }
}
