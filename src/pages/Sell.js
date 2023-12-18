import {
  useContract,
  useOwnedNFTs,
  useAddress,
  NATIVE_TOKEN_ADDRESS,
  useSigner,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Bars } from 'react-loading-icons';
const Sell = () => {
  const address = useAddress();

  const [contractMarket, setContractMarket] = useState();
  const [listings, setListing] = useState();
  const { contract } = useContract(
    "0x1BB3B7B5dD5DE77bB2994BE0c88461331f25B373"
  );
  const {
    data: nfts,
    isLoading,
    error,
  } = useOwnedNFTs(contract, address, { start: 0, count: 100 });

  console.log(nfts);
  const signer = useSigner();
  useEffect(() => {
    const effectData = async () => {
      const sdk = new ThirdwebSDK("mumbai", {
        clientId: "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36",
      });
      const contractMarket = await sdk.getContract(
        "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36"
      );
      const listings = await contractMarket.directListings.getAll();
      setListing(listings);
    };
    effectData();
  }, []);

  const listNFT = async (id) => {
    const sdk = new ThirdwebSDK(signer, "mumbai", {
      clientId: "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36",
    });
    const contractMarket = await sdk.getContract(
      "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36"
    );

    const listing = {
      // address of the contract the asset you want to list is on
      assetContractAddress: "0x1BB3B7B5dD5DE77bB2994BE0c88461331f25B373",
      // token ID of the asset you want to list
      tokenId: id,
      // how many of the asset you want to list
      quantity: 1,
      // address of the currency contract that will be used to pay for the listing
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      // The price to pay per unit of NFTs listed.
      pricePerToken: 0.01,
      // when should the listing open up for offers
      startTimestamp: new Date(Date.now()),
      // how long the listing will be open for
      endTimestamp: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      // Whether the listing is reserved for a specific set of buyers.
      isReservedListing: false,
    };
    await contractMarket.directListings.createListing(listing);
  };

  console.log(listings);
  return (
    <div>
      {nfts
        ? nfts.map((nft) => {
            return (
              <div>
                <div className="border">
                  <div className="w-[150px] h-[150px] overflow-hidden rounded-lg">
                    <img
                      src={nft.metadata.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div> 
                  <button onClick={() => listNFT(nft.metadata.id)}>
                    Create Direct Listing!
                  </button>
                </div>
              </div>
            );
          })
        : <Bars/>}
    </div>
  );
};

export default Sell;
