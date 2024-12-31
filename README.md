<h1 align="center">EVM Address Maker</h1>

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

## Introduction

**EVM Address Maker** is a tool designed to help you generate Ethereum (or other EVM-compatible network) addresses with custom prefixes and/or suffixes. The tool leverages worker threads for parallel processing to accelerate the search.

## ⚙️ Features

- Custom Address Search: Find addresses with specific prefixes and/or suffixes.
- High Efficiency: Uses multi-threading for faster address generation.
- Loading Feedback: Displays a loading animation during the search process.
- User-Friendly: Configuration via a simple `.env` file.

## 📋 Requirements

- [Node.js](https://nodejs.org/) (Latest LTS version is recommended)
- NPM (Comes bundled with Node.js)

## 🚀 Installation

### Clone the Repository:

```
git clone https://github.com/sekuja/evm-address-maker.git
cd evm-address-maker
```

### Install Dependencies:

```
npm install
```

### Set Up `.env` Configuration: Create a `.env` file in the root directory and add the following:

```
# Replace '0x00' and '00' with the prefix and suffix you want
PREFIX="0x00" # Example: starts with '0x00'
SUFFIX="00" # Example: ends with '00'
```

### Run the Script: Use the following command to start the search:

```
npm run build
```

## 📊 Output: The tool will search for an address that matches the `.env` configuration. Example output:

```
WSL@DESKTOP:~/evm-address-maker$ npm run build

> evm-address-maker@1.0.0 build
> node src/index.js

Looking for addresses with the prefix "0x00" and the suffix "00" using 8 threads.
Address found!
Address: 0x008CeB3e3f52c7F2724927c40efc5F81Fc501D00
Private Key: 0x4706ee536aff8b4c17efa1bfbbd04a404becba1f28dd31a0579e3f0151072734
WSL@DESKTOP:~/evm-address-maker$
```

## ⚠️ Important Notes

- **Security**: Keep your private key secure. Never share it or store it in unsafe locations.
- **Efficiency**: The longer the prefix/suffix, the more time it will take to find a matching address. Use wisely.
- **Multi-threading**: The tool automatically detects the number of CPU cores to determine the number of threads to use.

## 👤 Author

- Twitter: [Sekuja](https://x.com/0xSekuja)
- Telegram: [Sekuja](https://t.me/sekuja)
- GitHub: [Sekuja](https://github.com/sekuja)

## 📜 License

- This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! If you encounter bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

- Fork the repository.
- Create a new branch:

  ```
  git checkout -b your-feature-branch
  ```

- Submit a Pull Request.

## ☕️ Tips

You can support this project by sending tips to `0x03974DdCA9eE8a606287c361AE37e2b78F53CB3a`. ❤️
