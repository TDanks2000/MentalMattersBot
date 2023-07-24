import path from "node:path";
import fs from "node:fs";

function getFilePaths(directory: string, nesting?: boolean): string[] {
  let filePaths: string[] = [];

  if (!directory) return filePaths;

  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(directory, file.name);

    if (file.isFile()) {
      filePaths.push(filePath);
    }

    if (nesting && file.isDirectory()) {
      filePaths = [...filePaths, ...getFilePaths(filePath, true)];
    }
  }

  return filePaths;
}

function getFolderPaths(directory: string, nesting?: boolean): string[] {
  let folderPaths: string[] = [];

  if (!directory) return folderPaths;

  const folders = fs.readdirSync(directory, { withFileTypes: true });

  for (const folder of folders) {
    const folderPath = path.join(directory, folder.name);

    if (folder.isDirectory()) {
      folderPaths.push(folderPath);

      if (nesting) {
        folderPaths = [...folderPaths, ...getFolderPaths(folderPath, true)];
      }
    }
  }

  return folderPaths;
}

export { getFilePaths, getFolderPaths };
