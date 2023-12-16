import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useParams } from "react-router-dom";
import { useAddress } from "@thirdweb-dev/react";
import {
  useBuyDirectListing,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";

const contractAddress = "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36";

const DetailNFT = () => {
  const { contract } = useContract(contractAddress, "marketplace-v3");
  const address = useAddress();
  const {
    mutateAsync: buyDirectListing,
    isLoading,
    error,
  } = useBuyDirectListing(contract);
  const [nft, setNFT] = useState([]);
  const [contractNFT, setContractNFT] = useState();
  const [contractMarket, setContractMarket] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sdk = new ThirdwebSDK("mumbai", {
          clientId: "598b4f1195f15842446b09538ba00622",
        });

        // get detail NFT by id 

        const contractNFT = await sdk.getContract(
          "0x1BB3B7B5dD5DE77bB2994BE0c88461331f25B373"
        );
        setContractNFT(contractNFT);
        
        // market 
        const contractMarket = await sdk.getContract("0x5237bcc6f1848CDdF2785a12e1114Cd639895e36");
        setContractMarket(contractMarket)

        // get nft detail like wei, creater
        const listing = await contractMarket.directListings.getListing(0);
        // console.log()
        // console.log(listing)
        const nfts = await contractNFT.erc1155.get(id);
        // console.log("nft")
        // console.log(nfts);
        setNFT(nfts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, [id]); 
  return (
    <div>
      <Card />
      <Web3Button
      contractAddress={contractAddress}
      action={() =>
        buyDirectListing({
          listingId: nft.metadata.id, 
          quantity: 1,
          buyer: address, 
        })
      }
    >
      Buy Now
    </Web3Button>
    </div>
  );
};

export default DetailNFT;
