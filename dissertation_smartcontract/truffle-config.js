const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    bscTestnet: {
      provider: () =>
        new HDWalletProvider(
          ["28cb5413fa251e111d3e0f81ebddab60d80f0f4f5fa01d4ab698681a198de9a2"],
          `https://data-seed-prebsc-1-s1.binance.org:8545/`,
          0,
          1
        ),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  mocha: {},

  compilers: {
    solc: {
      version: "0.8.7",
    },
  },

  plugins: ["truffle-plugin-verify"],

  api_keys: {
    bscscan: "6PHW4P1VEEGTPDRC44RSF49KC7TQVAIN32",
  },
};
