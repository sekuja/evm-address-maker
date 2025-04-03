require("dotenv").config();
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const { computeAddress } = require("ethers").utils;
const crypto = require("crypto");
const os = require("os");

// Configuration validation
const validateConfig = () => {
  const prefix = process.env.PREFIX || "";
  const suffix = process.env.SUFFIX || "";

  if (!/^[0-9a-f]*$/.test(prefix))
    throw new Error("PREFIX harus hex (0-9,a-f)");
  if (!/^[0-9a-f]*$/.test(suffix))
    throw new Error("SUFFIX harus hex (0-9,a-f)");

  return {
    PREFIX: prefix.toLowerCase(),
    SUFFIX: suffix.toLowerCase(),
    NUM_THREADS: parseInt(process.env.NUM_THREADS) || os.cpus().length,
    BUFFER_SIZE: parseInt(process.env.BUFFER_SIZE) || 150000, // Optimization: larger buffer
  };
};

const { PREFIX, SUFFIX, NUM_THREADS, BUFFER_SIZE } = validateConfig();

// Worker task
function runWorkerTask() {
  let checks = 0;
  const targetPrefix = "0x" + PREFIX;
  const targetSuffix = SUFFIX;

  while (true) {
    const privateKey = crypto.randomBytes(32).toString("hex");
    const address = computeAddress("0x" + privateKey).toLowerCase();

    checks++;
    if (address.startsWith(targetPrefix) && address.endsWith(targetSuffix)) {
      parentPort.postMessage({
        found: true,
        address,
        privateKey: "0x" + privateKey,
      });
      break;
    }

    if (checks % BUFFER_SIZE === 0) {
      parentPort.postMessage({ checks });
      checks = 0;
    }
  }
}

// Main thread
if (isMainThread) {
  console.log(
    `\n🚀 Starting search for 0x${PREFIX}...${SUFFIX} with ${NUM_THREADS} threads\n`
  );

  const stats = {
    totalChecks: 0,
    startTime: Date.now(),
    update: function (checks) {
      this.totalChecks += checks;
    },
    getStats: function () {
      const elapsed = (Date.now() - this.startTime) / 1000;
      return {
        elapsed: Math.floor(elapsed),
        speed: (this.totalChecks / elapsed).toFixed(2),
      };
    },
  };

  const timer = setInterval(() => {
    const { elapsed, speed } = stats.getStats();
    process.stdout.write(
      `\r[${new Date().toISOString()}] Threads: ${NUM_THREADS} | Speed: ${speed} keys/s | Checks: ${stats.totalChecks.toLocaleString()} | Elapsed: ${elapsed}s`
    );
  }, 1000);

  let found = false;
  const workers = [];

  for (let i = 0; i < NUM_THREADS; i++) {
    const worker = new Worker(__filename, { workerData: { PREFIX, SUFFIX } });
    workers.push(worker);

    worker.on("message", (msg) => {
      if (msg.found && !found) {
        found = true;
        clearInterval(timer);
        console.log("\n\n✅ Address found!");
        console.log(`📍 Address: ${msg.address}`);
        console.log(`🔑 Private Key: ${msg.privateKey}`);
        console.log(`⚡ Total checks: ${stats.totalChecks.toLocaleString()}`);
        workers.forEach((w) => w.terminate());
        process.exit(0);
      } else if (msg.checks) {
        stats.update(msg.checks);
      }
    });

    worker.on("error", (err) => console.error(`Worker ${i} error:`, err));
    worker.on("exit", (code) => {
      if (code !== 0 && !found)
        console.warn(`Worker ${i} exited with code ${code}`);
    });
  }

  process.on("SIGINT", () => {
    clearInterval(timer);
    console.log("\n\n🛑 Process stopped by user");
    workers.forEach((w) => w.terminate());
    process.exit(0);
  });
} else {
  runWorkerTask();
}
