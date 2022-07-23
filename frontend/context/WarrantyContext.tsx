import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import { NextRouter } from "next/router";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
// import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/contract";

interface WarrantyContextType {
  connection: null | typeof ethers.providers.Web3Provider;
  getContract: () => void;
  isWeb3Enabled: boolean;
  account: null | string;
  connectWallet: (router: NextRouter) => void;
}

export const WarrantyContext = createContext<WarrantyContextType>({
  connection: null,
  getContract: () => {},
  isWeb3Enabled: false,
  account: null,
  connectWallet: () => {},
});

interface WarrantyProviderProps {
  children: React.ReactNode;
}

export const WarrantyProvider: React.FC<WarrantyProviderProps> = ({
  children,
}) => {
  const { enableWeb3, isWeb3Enabled, account, Moralis, deactivateWeb3 } =
    useMoralis();
  const [connection, setConnection] = useState<
    null | typeof ethers.providers.Web3Provider
  >(null);

  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== undefined)
      if (window.localStorage.getItem("WEB_3_CONNECTED")) {
        enableWeb3();
      }
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged(acc => {
      if (acc === null) {
        window.localStorage.removeItem("WEB_3_CONNECTED");
        deactivateWeb3();
      }
    });
  }, []);

  const connectWallet = async (router: NextRouter) => {
    try {
      await enableWeb3();
      if (typeof window !== undefined)
        window.localStorage.setItem("WEB_3_CONNECTED", "TRUE");
      // router.push("/wallet");
    } catch (error) {
      console.log(error);
    }
  };

  const getContract = () => {};

  const value = useMemo(
    () => ({
      connection,
      isWeb3Enabled,
      getContract,
      account,
      connectWallet,
    }),
    [connection, isWeb3Enabled, account]
  );

  return (
    <WarrantyContext.Provider value={value}>
      {children}
    </WarrantyContext.Provider>
  );
};
