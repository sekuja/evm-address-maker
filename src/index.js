require("dotenv").config();
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const { ethers } = require("ethers");

function startLoading() {
  const loadingChars = ["⢹", "⢺", "⢼", "⣸", "⣇", "⡧", "⡗", "⡏"];
  let index = 0;

  const interval = setInterval(() => {
    process.stdout.write(`\rSearching ${loadingChars[index]}`);
    index = (index + 1) % loadingChars.length;
  }, 80);

  return interval;
}

function stopLoading(interval) {
  clearInterval(interval);
  process.stdout.write("\r"); // Menghapus efek loading dari terminal
}

if (isMainThread) {
  const numThreads = require("os").cpus().length;
  const prefix = process.env.PREFIX || "";
  const suffix = process.env.SUFFIX || "";

  console.log(
    `Looking for addresses with the prefix "${prefix}" and the suffix "${suffix}" using ${numThreads} threads.`
  );

  let found = false; // Flag to stop other threads once an address is found
  const loadingInterval = startLoading();

  for (let i = 0; i < numThreads; i++) {
    const worker = new Worker(__filename, { workerData: { prefix, suffix } });

    worker.on("message", (wallet) => {
      if (!found) {
        found = true; // Ensure only one address is reported
        stopLoading(loadingInterval);
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
