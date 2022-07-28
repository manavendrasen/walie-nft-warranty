import React, { useEffect, useState, createContext, useMemo } from "react";
import { NextRouter, useRouter } from "next/router";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { Contract } from "ethers";
// import { Moralis } from "moralis";
import { create } from "ipfs-http-client";
import {
  NFTWARRANTY_ABI,
  PLATFORM_ABI,
  PLATFORM_ADDRESS,
  NFTWARRANTY_ADDRESS,
} from "../config/contract";
import { Product } from "./ProductContext";

const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
});
interface WarrantyContextType {
  loadContracts: () => void;
  isWeb3Enabled: boolean;
  account: null | string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  loading: boolean;
  createNFTWarranty: (product: Product, owner: string) => void;
}

export const WarrantyContext = createContext<WarrantyContextType>({
  loadContracts: () => {},
  isWeb3Enabled: false,
  account: null,
  connectWallet: () => {},
  disconnectWallet: () => {},
  loading: false,
  createNFTWarranty: () => {},
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
    logout,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
    user,
    web3,
  } = useMoralis();

  const [nftWarrantyContract, setNftWarrantyContract] = useState<any>(null);

  const [platformContract, setPlatformContract] = useState<any>(null);

  const [provider, setProvider] = useState<any>();

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

  const loadContracts = () => {
    try {
      console.log("Loading Contracts");
      const ethers = Moralis.web3Library;
      const signer = provider.getSigner();
      console.log("Signer Added");
      const newNftWarrantyContract = new ethers.Contract(
        NFTWARRANTY_ADDRESS,
        NFTWARRANTY_ABI,
        signer
      );

      setNftWarrantyContract(newNftWarrantyContract);

      const newPlatformContract = new ethers.Contract(
        PLATFORM_ADDRESS,
        PLATFORM_ABI,
        signer
      );

      setPlatformContract(newPlatformContract);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const web3Provider = await enableWeb3();
      setProvider(web3Provider);

      // await enableWeb3();
      if (typeof window !== undefined)
        window.localStorage.setItem("WEB_3_CONNECTED", "TRUE");
    } catch (error) {
      console.log(error);
    }
    loadContracts();
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

  const createNFTWarranty = async (product: Product, ownerAddress: string) => {
    try {
      const result = await client.add(JSON.stringify({ ...product }));
      const tokenUri = `https://ipfs.infura.io/ipfs/${result}`;
      await (
        await platformContract!.createWarranty(
          NFTWARRANTY_ADDRESS,
          tokenUri,
          ownerAddress
        )
      ).wait();
      console.log("Minted new NFT Warranty");
    } catch (error) {
      console.log("Create NFT ERROR: ", error);
    }
  };

  const value = useMemo(
    () => ({
      isWeb3Enabled,
      loadContracts,
      account,
      connectWallet,
      disconnectWallet,
      loading: isWeb3EnableLoading,
      createNFTWarranty,
    }),
    [isWeb3Enabled, account]
  );

  return (
    <WarrantyContext.Provider value={value}>
      {children}
    </WarrantyContext.Provider>
  );
};
