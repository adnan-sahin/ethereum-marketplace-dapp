/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: "0.8.4",
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
        ganache: {
            url: "http://127.0.0.1:8545",
            accounts: [
                "4d6303c2b9ef98bfb907cfa1c714aeb49e22cff67d272bfd257a86321f618545"
            ]
        }
    }
};
