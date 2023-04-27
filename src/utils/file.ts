import { stat, unlink } from "fs/promises";

export default async function deleteFile(filePath: string): Promise<void> {
  try {
    await stat(filePath);
  } catch (error) {
    return;
  }
  await unlink(filePath);
}
