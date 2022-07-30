import React, { useEffect, useState, createContext, useMemo } from "react";
import { NextRouter, useRouter } from "next/router";
import { Contract, ethers } from "ethers";
import Web3Modal from "web3modal";
import { create } from "ipfs-http-client";
import axios from "axios";
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

// interface Warranty {

// }
interface WarrantyContextType {
  isWeb3Enabled: boolean;
  account: null | string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  loading: boolean;
  createNFTWarranty: (product: Product, owner: string) => void;
  fetchMyNfts: () => void;
  warranties: any;
}

export const WarrantyContext = createContext<WarrantyContextType>({
  isWeb3Enabled: false,
  account: null,
  connectWallet: () => {},
  disconnectWallet: () => {},
  loading: false,
  createNFTWarranty: () => {},
  fetchMyNfts: () => {},
  warranties: null,
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

  const [nftWarrantyContract, setNftWarrantyContract] =
    useState<Contract | null>(null);

  const [platformContract, setPlatformContract] = useState<Contract | null>(
    null
  );

  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  const [web3, setWeb3] = useState<Web3Modal | null>(null);

  const [warranties, setWarranties] = useState<any>(null);

  const connectWallet = async () => {
    try {
      setLoading(true);
      const web3Modal = new Web3Modal({
        cacheProvider: true,
      });

      setWeb3(web3Modal);

      const connection = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(connection);

      console.log("Loading Contracts");
      const signer = await web3Provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      setProvider(web3Provider);
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
      if (connection) setIsWeb3Enabled(true);
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
      const tokenUri = `https://ipfs.infura.io/ipfs/${result.path}`;
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

  const fetchMyNfts = async () => {
    try {
      setLoading(true);

      console.log("fetching");
      const data = await platformContract.fetchMyNFTs();
      const items = await Promise.all(
        data.map(async (i: any) => {
          const tokenUri = await nftWarrantyContract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenUri);
          const item = {
            tokenId: i.tokenId.toNumber(),
            owner: i.owner,
            meta,
          };
          return item;
        })
      );

      setWarranties(items);
      console.log("Contract", JSON.stringify(items, null, 2));

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
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
      fetchMyNfts,
      warranties,
    }),
    [isWeb3Enabled, account, warranties, loading]
  );

  return (
    <WarrantyContext.Provider value={value}>
      {children}
    </WarrantyContext.Provider>
  );
};
