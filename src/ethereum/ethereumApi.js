import { ethers } from "ethers";
import {
    contractAddress as serviceManagerContractAdress,
    abi as serviceManagerAbi
} from "./serviceManagerContract";
import ethersProvider from "./ethereumProvider";

const ethereumApiFactory = (web3Provider) => {
    const { getContractReader, getContractWriter, provider, signer } =
        ethersProvider(web3Provider);

    const createNewServiceProvider = async (
        companyName,
        email,
        phone,
        serviceCost,
        category
    ) => {
        const contractWriter = getContractWriter(
            serviceManagerContractAdress,
            serviceManagerAbi
        );

        return await contractWriter.createNewServiceProvider(
            companyName,
            email,
            phone,
            serviceCost,
            category
        );
    };

    const parseUnits = (value, denomination) => {
        return ethers.utils.parseUnits(value, denomination);
    };

    return {
        createNewServiceProvider,
        parseUnits,
        getContractReader,
        getContractWriter,
        provider,
        signer
    };
};

export default ethereumApiFactory;
