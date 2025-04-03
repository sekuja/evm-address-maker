<h1 align="center">🔍 EVM Address Maker</h1>

<!-- The badges section -->
<p align="center">
  <!-- Shields.io Contributors -->
  <a href="https://github.com/sekuja/evm-address-maker/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/sekuja/evm-address-maker"/></a>
  <!-- Shields.io Issues -->
  <a href="https://github.com/sekuja/evm-address-maker/issues"><img alt="Issues" src="https://img.shields.io/github/issues/sekuja/evm-address-maker"/></a>
  <!-- Shields.io License -->
  <a href="https://github.com/sekuja/evm-address-maker/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/sekuja/evm-address-maker"/></a>
  <!-- Shields.io Stars -->
  <a href="https://github.com/sekuja/evm-address-maker/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/sekuja/evm-address-maker"/></a>
  <!-- Shields.io Downloads -->
  <a href="https://www.npmjs.com/package/evm-address-maker"><img alt="Downloads" src="https://img.shields.io/github/downloads/sekuja/evm-address-maker/total"/></a>
</p>

## 📖 Introduction

Generate Ethereum addresses with custom prefixes/suffixes using multi-threading for optimal performance.

## ⚙️ Features

- Find addresses matching any hex prefix/suffix (e.g., `0x000000...` or `...deadbeef`)
- Multi-threaded (automatically uses all CPU cores)
- Real-time stats (speed/checks/elapsed time)
- Lightweight and CLI-friendly

## 📋 Requirements

- [Node.js](https://nodejs.org/) (Latest LTS version is recommended)
- NPM (Comes bundled with Node.js)

## 🚀 Quick Start

1. Install

```
git clone https://github.com/sekuja/evm-address-maker.git
cd evm-address-maker
npm install
```

2. Configure `.env` file

```
PREFIX=000000  # Your desired hex prefix (without 0x)
SUFFIX=        # Optional hex suffix
NUM_THREADS=auto  # Or set manually (e.g., 4)
BUFFER_SIZE=100000  # Tune for performance
```

3. Run

```
npm run build
```

## 📊 Expected Output

```
🚀 Searching for 0x123...abc with 8 threads
[2025-04-02T10:00:00Z] Threads: 8 | Speed: 215,000 keys/s | Checks: 4,200,000 | Elapsed: 20s

✅ Match found!
Address: 0x123def...abc
Private Key: 0x1234...5678
Total checks: 4,200,000
```

## 📈 Performance Tips

1.  For short patterns (≤4 chars):

```
BUFFER_SIZE=50000  # Faster updates
```

2. For long patterns (≥6 chars):

```
BUFFER_SIZE=200000  # Reduced overhead
```

3. If overheating occurs, reduce the number of threads being used (e.g., `NUM_THREADS=6` on an 8-core CPU).

## 👤 Author

- Twitter: [Sekuja](https://x.com/0xSekuja)
- Telegram: [Sekuja](https://t.me/sekuja)
- GitHub: [Sekuja](https://github.com/sekuja)

## 📜 License

- This project is licensed under the MIT License.

## ☕️ Tips

You can support this project by sending tips to `0x03974DdCA9eE8a606287c361AE37e2b78F53CB3a`. ❤️
