import React, { useEffect, useState, createContext, useMemo } from "react";
import { NextRouter, useRouter } from "next/router";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
import {
  NFTWARRANTY_ABI,
  PLATFORM_ABI,
  PLATFORM_ADDRESS,
  NFTWARRANTY_ADDRESS,
} from "../config/contract";

interface WarrantyContextType {
  connection: null | typeof ethers.providers.Web3Provider;
  loadContracts: () => void;
  isWeb3Enabled: boolean;
  account: null | string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  loading: boolean;
}

export const WarrantyContext = createContext<WarrantyContextType>({
  connection: null,
  loadContracts: () => {},
  isWeb3Enabled: false,
  account: null,
  connectWallet: () => {},
  disconnectWallet: () => {},
  loading: false,
});

interface WarrantyProviderProps {
  children: React.ReactNode;
}

export const WarrantyProvider: React.FC<WarrantyProviderProps> = ({
  children,
}) => {
  const {
    enableWeb3,
    isWeb3Enabled,
    account,
    Moralis,
    logout,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();
  const [connection, setConnection] = useState<
    null | typeof ethers.providers.Web3Provider
  >(null);

  const router = useRouter();

  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== undefined)
      if (window.localStorage.getItem("WEB_3_CONNECTED")) {
        enableWeb3();
        // router.replace("/my-warranty");
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

  const connectWallet = async () => {
    try {
      await enableWeb3();
      if (typeof window !== undefined)
        window.localStorage.setItem("WEB_3_CONNECTED", "TRUE");
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (typeof window !== undefined) {
        window.localStorage.removeItem("WEB_3_CONNECTED");
      }
      await deactivateWeb3();
    } catch (error) {
      console.log(error);
    }
  };

  const loadContracts = () => {};

  const value = useMemo(
    () => ({
      connection,
      isWeb3Enabled,
      loadContracts,
      account,
      connectWallet,
      disconnectWallet,
      loading: isWeb3EnableLoading,
    }),
    [connection, isWeb3Enabled, account]
  );

  return (
    <WarrantyContext.Provider value={value}>
      {children}
    </WarrantyContext.Provider>
  );
};
