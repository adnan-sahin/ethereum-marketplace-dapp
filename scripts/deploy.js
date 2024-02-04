const { ethers } = require("hardhat");

async function deploy() {
    const ServiceManager = await ethers.getContractFactory("ServiceManager");

    const serviceManager = await ServiceManager.deploy();

    console.log("Service Manager Address: ", serviceManager.address);
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log("Deployment Error: ", error);
        process.exit(1);
    });
