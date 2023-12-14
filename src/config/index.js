import BloctoSDK from "@blocto/sdk";
import Web3 from "web3";
import abi from "./ABI.json";

let RPC = process.env.REACT_APP_RPC_URL;

const bloctoSDK = new BloctoSDK({
  ethereum: {
    // (required) chainId to be used
    chainId: "0x1",
    // (required) JSON RPC endpoint
    rpc: RPC,
  },

  // (optional) Blocto app ID
  //   appId: "YOUR_BLOCTO_APP_ID",
});

const web3 = new Web3(bloctoSDK.ethereum);
const contractAddress = "0x2b2B6b0978c236260614440c75a78Fc9ABB1970e";

const toObject = (object) => {
  return JSON.parse(
    JSON.stringify(
      object,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    )
  );
};

export const connectWallet = async () => {
  try {
    // EIP-1193 way (recommended)
    const accounts = bloctoSDK.ethereum.request({
      method: "eth_requestAccounts",
    });
    // console.log("accounts==>", accounts);

    return accounts;
  } catch (error) {
    console.log("error==>", error);
    return null;
  }
};

export const disConnectWallet = async () => {
  try {
    let result = await bloctoSDK.ethereum.request({
      method: "wallet_disconnect",
    });
  } catch (error) {
    console.log("error==>", error);
  }
};

export const setFeeRate = async (account) => {
  try {
    const contract = new web3.eth.Contract(abi, contractAddress);
    const setFee = await contract.methods
      .setFee("1")
      .send({ from: account[0] });

    // console.log(`setFee: ${toObject(setFee)}`);
    return true;
  } catch (error) {
    console.log("error==>", error);
    return null;
  }
};

export const getFee = async () => {
  const contract = new web3.eth.Contract(abi, contractAddress);

  const fee = await contract.methods.getFee().call();
  console.log(`getFee: ${toObject(fee)}`);
  return toObject(fee);
};

export const getFeeRate = async () => {
  const contract = new web3.eth.Contract(abi, contractAddress);
  const feeRate = await contract.methods.feeRate().call();
  console.log(`feeRate: ${toObject(feeRate)}`);
  return toObject(feeRate);
};
