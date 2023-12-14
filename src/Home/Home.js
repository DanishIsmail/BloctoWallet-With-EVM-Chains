import { useState } from "react";
import {
  connectWallet,
  disConnectWallet,
  getFeeRate,
  setFeeRate,
} from "../config";

const Home = () => {
  let [walletAddress, setWalletAddress] = useState();
  let [fee, setFee] = useState();

  const walletHandler = async () => {
    try {
      let data = await connectWallet();
      setWalletAddress(data);
      // console.log("user account==>", data);
    } catch (error) {
      console.log("error==>", error);
    }
  };

  const disconnectWalletHandler = async () => {
    let data = await disConnectWallet();
    setWalletAddress();
  };

  const getFeeHandler = async () => {
    let data = await getFeeRate();
    setFee(data);
  };

  const setFeeHandler = async () => {
    try {
      let data = await setFeeRate(walletAddress);
    } catch (error) {
      console.log("error==>", error);
    }
  };

  return (
    <>
      {walletAddress ? (
        <>
          <h4>
            wallet Address: <span>{walletAddress}</span>
          </h4>
          <button onClick={disconnectWalletHandler}>Disconnect wallet</button>
          <br></br>
          <br></br>
          <button onClick={getFeeHandler}> Get Fee</button>
          {fee && <p>Fee: {fee}</p>}

          <button onClick={setFeeHandler}> set Fee</button>
        </>
      ) : (
        <button onClick={walletHandler}>connect wallet</button>
      )}
    </>
  );
};

export default Home;
