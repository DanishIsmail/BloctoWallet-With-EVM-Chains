import BloctoSDK from "@blocto/sdk";

const bloctoSDK = new BloctoSDK({
  ethereum: {
    // (required) chainId to be used
    chainId: "0x1",
    // (required) JSON RPC endpoint
    rpc: "https://eth-mainnet.g.alchemy.com/v2/b99BcR5f0XMTh6NlN2ktVIm3UcJOKS2x",
  },

  // (optional) Blocto app ID
  //   appId: "YOUR_BLOCTO_APP_ID",
});

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
