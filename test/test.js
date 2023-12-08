const { expect } = require('chai');
const { ethers } = require('ethers');

// Import the compiled contract artifacts
const HelloWorldArtifact = require('./path/to/HelloWorld.json');

// Test suite
describe('HelloWorld Smart Contract', () => {
  let HelloWorld;
  let helloWorldInstance;
  let deployer;

  // Before each test, deploy a new instance of the contract
  beforeEach(async () => {
    // Connect to a local Ethereum node (you can change the provider URL if needed)
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

    // Get the signer (deployer) from the local node
    const [deployerSigner] = await ethers.getSigners();
    deployer = deployerSigner;

    // Deploy the contract
    HelloWorld = new ethers.ContractFactory(
      HelloWorldArtifact.abi,
      HelloWorldArtifact.bytecode,
      deployerSigner
    );

    helloWorldInstance = await HelloWorld.deploy();
  });

  // Test case 1
  it('Should initialize with the correct greeting message', async () => {
    const greeting = await helloWorldInstance.speak();
    expect(greeting).to.equal('Hello World!');
  });

  // Test case 2
  it('Should allow updating the greeting message', async () => {
    const newGreeting = 'New Greeting!';

    // Ensure the new greeting is not the same as the initial one
    expect(newGreeting).to.not.equal('Hello World!');

    // Update the greeting message
    await helloWorldInstance.setGreeting(newGreeting);

    // Verify that the greeting message has been updated
    const updatedGreeting = await helloWorldInstance.speak();
    expect(updatedGreeting).to.equal(newGreeting);
  });

  // Additional test cases can be added to cover more scenarios

  // ...

});
