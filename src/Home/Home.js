import { useState } from "react";
import { connectWallet, disConnectWallet } from "../config";

const Home = () => {
  let [walletAddress, setWalletAddress] = useState();
  const walletHandler = async () => {
    try {
      let data = await connectWallet();
      setWalletAddress(data);
      console.log("user account==>", data);
    } catch (error) {
      console.log("error==>", error);
    }
  };

  const disconnectWalletHandler = async () => {
    let data = await disConnectWallet();
    setWalletAddress();
  };

  return (
    <>
      {walletAddress ? (
        <>
          <h4>
            wallet Address: <span>{walletAddress}</span>
          </h4>
          <button onClick={disconnectWalletHandler}>Disconnect wallet</button>
        </>
      ) : (
        <button onClick={walletHandler}>connect wallet</button>
      )}
    </>
  );
};

export default Home;
