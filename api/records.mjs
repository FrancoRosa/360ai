import { exec, execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { getScreenResolution } from "./helpers.mjs";
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";

const fastify = Fastify();
fastify.register(fastifyCors, {
  origin: "*", // Allow all origins, modify as needed for security
});

let timeoutRef = null; // Timeout for auto-stop
let isRecording = false;

const { width, height } = getScreenResolution();

/**
 * Starts screen recording, with auto-stop after 10s unless extended.
 * @returns {Promise<string>} - The path of the saved video file.
 */
export async function startRecording(filename) {
  return new Promise((resolve, reject) => {
    if (isRecording) {
      reject("Recording is already in progress.");
      return;
    }

    isRecording = true;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filepath = path.join(__dirname, "videos", filename);

    // Adjust input source for Windows/macOS if needed
    // const ffmpegCommand = `ffmpeg -f x11grab -video_size ${width}x${height} -i :0.0 -r 30 -pix_fmt yuv420p "${filepath}"`;
    const ffmpegCommand = `ffmpeg -video_size ${width}x${height} -framerate 10 -f x11grab -i :0.0 ${filepath}`;

    console.log(`Starting screen recording... Saving to ${filename}`);
    exec(ffmpegCommand, (error) => {
      isRecording = false;
      timeoutRef = null;
      // let message = "... ffmpeg error"
      if (error) {
        console.log("ffmpeg error");
        // reject(`Error: ${error.message}`);
        // return;
      }

      console.log(`Recording complete. File saved: ${filepath}`);
      resolve(filepath);
    });

    // Auto-stop after 10 seconds unless extended
    timeoutRef = setTimeout(() => {
      stopRecording();
    }, 10000);
  });
}

/**
 * Extends recording beyond 10 seconds.
 */
export function keepRecording() {
  clearTimeout(timeoutRef);
  timeoutRef = setTimeout(() => {
    stopRecording();
  }, 10000);
  console.log("Recording extended by another 10 seconds.");
}

/**
 * Stops the recording immediately.
 */
export function stopRecording() {
  try {
    execSync("pkill -INT ffmpeg");
    isRecording = false;
    console.log("Recording manually stopped.");
  } catch (error) {
    console.log("Thre was an error killing the process");
  }
}

// Initialize Fastify
// const fastify = Fastify({ logger: true });

// Define the /status endpoint
fastify.get("/", async (request, reply) => {
  reply.send({ message: "recording api" });
});

fastify.post("/start", async (request, reply) => {
  const { name } = request.body;
  console.log({ name });
  startRecording(name)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  reply.send({ message: "recording started" });
});

fastify.get("/stop", async (request, reply) => {
  stopRecording();
  reply.send({ message: "recording stopped" });
});

fastify.get("/keep", async (request, reply) => {
  keepRecording();
  reply.send({ message: "keep recording" });
});

fastify.listen({ port: 8081 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Fastify server running at ${address}`);
});
