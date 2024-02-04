import App from "./App";
import WalletProvider from "./common/context/walletProvider";
import { React, useState } from "react";

const Root = () => {
    const [wallet, setWallet] = useState({
        accounts: []
    });

    return (
        <WalletProvider.Provider value={{ wallet, setWallet }}>
            <App />
        </WalletProvider.Provider>
    );
};

export default Root;
