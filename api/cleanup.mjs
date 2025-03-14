import fs from "fs";
import path from "path";

// Configuration
// const MAX_STORAGE_MB = 100; // Set your storage limit (e.g., 100MB)
const MAX_STORAGE_MB = 100; // Set your storage limit (e.g., 100MB)
const DIRECTORY = "./"; // Change this if your videos are in a specific folder
const EXTENSIONS = [".mp4"]; // File types to check

// Convert MB to bytes
const MAX_STORAGE_BYTES = MAX_STORAGE_MB * 1024 * 1024;

/**
 * Get all video files sorted by creation time (oldest first)
 */
function getVideoFiles() {
  return fs
    .readdirSync(DIRECTORY)
    .filter((file) => EXTENSIONS.some((ext) => file.endsWith(ext)))
    .map((file) => {
      const filePath = path.join(DIRECTORY, file);
      return {
        name: file,
        path: filePath,
        size: fs.statSync(filePath).size, // Get file size in bytes
        createdAt: fs.statSync(filePath).birthtimeMs, // Get file creation time
      };
    })
    .sort((a, b) => a.createdAt - b.createdAt); // Oldest files first
}

/**
 * Calculate total storage used by videos
 */
function getTotalStorage(files) {
  return files.reduce((total, file) => total + file.size, 0);
}

/**
 * Delete the oldest files until storage is below the limit
 */
function cleanupOldVideos() {
  let videoFiles = getVideoFiles();
  let totalStorage = getTotalStorage(videoFiles);

  console.log(
    `Current storage usage: ${(totalStorage / (1024 * 1024)).toFixed(2)} MB`
  );

  while (totalStorage > MAX_STORAGE_BYTES && videoFiles.length > 0) {
    const oldestFile = videoFiles.shift();
    try {
      fs.unlinkSync(oldestFile.path);
      totalStorage -= oldestFile.size;
      console.log(
        `Deleted: ${oldestFile.name} | Freed ${(
          oldestFile.size /
          (1024 * 1024)
        ).toFixed(2)} MB`
      );
    } catch (error) {
      console.error(`Error deleting ${oldestFile.name}:`, error);
    }
  }

  console.log(
    `Cleanup complete. Current storage: ${(
      totalStorage /
      (1024 * 1024)
    ).toFixed(2)} / ${MAX_STORAGE_MB} MB`
  );
}

// Run the cleanup
cleanupOldVideos();
