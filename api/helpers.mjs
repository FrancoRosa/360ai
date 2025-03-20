import { execSync } from "child_process";

export const getScreenResolution = () => {
  try {
    const output = execSync("xrandr | grep '*' | awk '{print $1}'")
      .toString()
      .trim();
    const [width, height] = output.split("x").map(Number);
    console.log(`Screen resolution: ${width}x${height}`);
    return { width, height };
  } catch (error) {
    console.error("Error getting screen resolution:", error);
  }
};

/**
 * Generates a timestamped filename
 */
export const generateFilename = () => {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:]/g, "")
    .split(".")[0];
  return `video_${timestamp}.mp4`;
};
