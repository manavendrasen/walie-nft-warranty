import React, { useEffect, useState, createContext, useMemo } from "react";
import { NextRouter, useRouter } from "next/router";
import { Contract, ethers } from "ethers";
import Web3Modal from "web3modal";
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
  isWeb3Enabled: boolean;
  account: null | string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  loading: boolean;
  createNFTWarranty: (product: Product, owner: string) => void;
}

export const WarrantyContext = createContext<WarrantyContextType>({
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
  const [isWeb3Enabled, setIsWeb3Enabled] = useState(false);

  const [account, setAccount] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [nftWarrantyContract, setNftWarrantyContract] = useState<any>(null);

  const [platformContract, setPlatformContract] = useState<any>(null);

  const [web3, setWeb3] = useState<any>(null);

  const router = useRouter();

  // useEffect(() => {
  //   if (isWeb3Enabled) return;
  //   if (typeof window !== undefined)
  //     if (window.localStorage.getItem("WEB_3_CONNECTED")) {

  //     }
  // }, [isWeb3Enabled]);

  // useEffect(() => {
  //   Moralis.onAccountChanged(acc => {
  //     if (acc === null) {
  //       window.localStorage.removeItem("WEB_3_CONNECTED");
  //       deactivateWeb3();
  //     }
  //   });
  // }, []);

  const connectWallet = async () => {
    try {
      setLoading(true);
      const web3Modal = new Web3Modal({
        cacheProvider: true,
      });

      setWeb3(web3Modal);

      const connection = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(connection);

      if (connection) setIsWeb3Enabled(true);

      console.log("Loading Contracts");
      const signer = await web3Provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      web3.clearCachedProvider();
      setIsWeb3Enabled(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createNFTWarranty = async (product: Product, ownerAddress: string) => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Create NFT ERROR: ", error);
    }
  };

  const value = useMemo(
    () => ({
      isWeb3Enabled,
      account,
      connectWallet,
      disconnectWallet,
      loading,
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
