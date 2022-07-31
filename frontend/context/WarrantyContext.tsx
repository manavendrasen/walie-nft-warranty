import React, { useState, createContext, useMemo, useContext } from "react";
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
import { AlertContext } from "./AlertContext";

const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
});
export interface WarrantyInterface {
  tokenId: number;
  owner: string;
  meta: {
    data: {
      id: string;
      name: string;
      image: string;
      details: string[];
      price: number;
    };
  };
}
interface WarrantyContextType {
  isWeb3Enabled: boolean;
  account: undefined | string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  loading: boolean;
  createNFTWarranty: (product: Product, owner: string) => void;
  fetchMyNfts: () => void;
  warranties: WarrantyInterface[] | undefined;
  warranty: WarrantyInterface | undefined;
  setWarranty: (warranty: WarrantyInterface) => void;
  transferWarranty: (to: string, tokenId: number) => void;
}

export const WarrantyContext = createContext<WarrantyContextType>({
  isWeb3Enabled: false,
  account: undefined,
  connectWallet: () => {},
  disconnectWallet: () => {},
  loading: false,
  createNFTWarranty: () => {},
  fetchMyNfts: () => {},
  warranties: undefined,
  warranty: undefined,
  setWarranty: () => {},
  transferWarranty: () => {},
});

interface WarrantyProviderProps {
  children: React.ReactNode;
}

export const WarrantyProvider: React.FC<WarrantyProviderProps> = ({
  children,
}) => {
  const { successAlert, errorAlert } = useContext(AlertContext);
  const [isWeb3Enabled, setIsWeb3Enabled] = useState(false);
  const [account, setAccount] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [nftWarrantyContract, setNftWarrantyContract] = useState<
    Contract | undefined
  >();
  const [platformContract, setPlatformContract] = useState<
    Contract | undefined
  >();
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >();
  const [web3, setWeb3] = useState<Web3Modal | undefined>();
  const [warranties, setWarranties] = useState<
    WarrantyInterface[] | undefined
  >();
  const [warranty, setWarranty] = useState<WarrantyInterface | undefined>();

  const connectWallet = async () => {
    try {
      setLoading(true);
      const web3Modal = new Web3Modal({
        cacheProvider: true,
      });

      setWeb3(web3Modal);

      const connection = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(connection);

      const signer = await web3Provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      setProvider(web3Provider);

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
      successAlert("Connected to Wallet");
      if (connection) setIsWeb3Enabled(true);
    } catch (error) {
      setLoading(false);
      errorAlert("Could Not Connect to Wallet");
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      web3!.clearCachedProvider();
      setIsWeb3Enabled(false);
      successAlert("Disconnected Wallet");
    } catch (error) {
      console.log(error);
      errorAlert("Could Not Disconnect Wallet");
    }
  };

  const createNFTWarranty = async (product: Product, ownerAddress: string) => {
    try {
      setLoading(true);
      const today = new Date();
      const dateOfWarrantyExpire = new Date(
        today.getFullYear() + product.yearsOfWarranty,
        today.getMonth(),
        today.getDate()
      );
      const result = await client.add(
        JSON.stringify({
          ...product,
          dateOfPurchase: today,
          dateOfWarrantyStart: today,
          dateOfWarrantyExpire,
        })
      );
      const tokenUri = `https://ipfs.infura.io/ipfs/${result.path}`;
      successAlert("Generated Warranty");

      await(
        await platformContract!.createWarranty(
          NFTWARRANTY_ADDRESS,
          tokenUri,
          ownerAddress
        )
      ).wait();

      setLoading(false);
      successAlert("Generated and Sent Warranty");
    } catch (error) {
      setLoading(false);
      errorAlert("Could Not Generate Warranty");
      console.log("Create NFT ERROR: ", error);
    }
  };

  const fetchMyNfts = async () => {
    try {
      setLoading(true);

      console.log("fetching");
      const data = await platformContract!.fetchMyNFTs();
      const items = await Promise.all(
        data.map(async (i: any) => {
          const tokenUri = await nftWarrantyContract!.tokenURI(i.tokenId);
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

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const transferWarranty = async (to: string, tokenId: number) => {
    try {
      setLoading(true);
      await nftWarrantyContract!.transferWarranty(account, to, tokenId);
      setLoading(false);
      successAlert("Transferred Warranty");
      fetchMyNfts();
    } catch (error) {
      setLoading(false);
      errorAlert("Could Not Transfer Warranty");
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
      warranty,
      setWarranty,
      transferWarranty,
    }),
    [isWeb3Enabled, account, warranties, loading]
  );

  return (
    <WarrantyContext.Provider value={value}>
      {children}
    </WarrantyContext.Provider>
  );
};
