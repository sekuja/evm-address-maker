require("dotenv").config();
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const { ethers } = require("ethers");
const os = require("os");

function startTimer() {
  let startTime = Date.now();
  return setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    process.stdout.write(`\rSearching... Elapsed time: ${elapsed} seconds`);
  }, 1000);
}

function stopTimer(interval) {
  clearInterval(interval);
  process.stdout.write("\r"); // Removing the timer effect from the terminal
}

if (isMainThread) {
  const numThreads = parseInt(process.env.NUM_THREADS) || os.cpus().length;
  const prefix = process.env.PREFIX || "";
  const suffix = process.env.SUFFIX || "";

  console.log(
    `Looking for addresses with the prefix "${prefix}" and the suffix "${suffix}" using ${numThreads} threads.`
  );

  let found = false; // Flag to stop other threads once an address is found
  const timerInterval = startTimer();

  for (let i = 0; i < numThreads; i++) {
    const worker = new Worker(__filename, { workerData: { prefix, suffix } });

    worker.on("message", (wallet) => {
      if (!found) {
        found = true; // Ensure only one address is reported
        stopTimer(timerInterval);
        console.log("Address found!");
        console.log(`Address: ${wallet.address}`);
        console.log(`Private Key: ${wallet.privateKey}`);
        process.exit(0); // Terminate all threads
      }
    });

    worker.on("error", (error) => {
      console.error(`Worker ${i} error:`, error);
    });

    worker.on("exit", (code) => {
      if (code !== 0 && !found) {
        console.warn(`Worker ${i} stopped with exit code ${code}`);
      }
    });
  }
} else {
  const { prefix, suffix } = workerData;

  const search = () => {
    let wallet;
    let address;

    while (true) {
      wallet = ethers.Wallet.createRandom();
      address = wallet.address.toLowerCase();

      if (address.startsWith(prefix) && address.endsWith(suffix)) {
        parentPort.postMessage({
          address: wallet.address,
          privateKey: wallet.privateKey,
        });
        break;
      }
    }
  };

  search();
}
