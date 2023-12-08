const { ethers } = require('ethers');
const fs = require('fs');

// Function to deploy the contract
async function deployContract() {
  // Connect to a local Ethereum node (you can change the provider URL if needed)
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

  // Get the signer (deployer) from the local node
  const [deployerSigner] = await ethers.getSigners();

  // Read the compiled contract ABI and bytecode from the build output
  const compiledContract = JSON.parse(fs.readFileSync('./path/to/HelloWorld.json', 'utf-8'));

  // Get the contract ABI and bytecode
  const abi = compiledContract.abi;
  const bytecode = compiledContract.bytecode;

  // Deploy the contract
  const HelloWorld = new ethers.ContractFactory(abi, bytecode, deployerSigner);
  const helloWorldInstance = await HelloWorld.deploy();

  // Wait for the contract to be mined
  await helloWorldInstance.deployed();

  // Log the contract address
  console.log('HelloWorld Contract deployed to:', helloWorldInstance.address);
}

// Call the deployContract function
deployContract();
