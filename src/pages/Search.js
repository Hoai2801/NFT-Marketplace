import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from '../components/Card';
import Auction from "../components/Auction";

const Search = () => {
  const { name } = useParams();
  const [listings, setListing] = useState();
  const [auctions, setAuction] = useState();
  useEffect(() => {
    const effectData = async () => {
      // sdk and contract address of marketplace v3
      const sdk = new ThirdwebSDK("mumbai", {
        clientId: "598b4f1195f15842446b09538ba00622",
      });
      const contractMarket = await sdk.getContract(
        "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36"
      );
      const listings = await contractMarket.directListings.getAll();
      setListing(listings);
      const auctions = await contractMarket.englishAuctions.getAll();
      setAuction(auctions);
    };
    effectData();
  }, []);

  //   console.log(listings)
  return (
    <div className="w-full flex gap-3 pt-5 px-5">
      {listings
        ? listings.map((listing, index) => {
            const nameOfNFT = listing.asset.name
              ? listing.asset.name.toLowerCase()
              : "";
            console.log(nameOfNFT.includes(name.toLowerCase()));
            const isShow = nameOfNFT
              ? nameOfNFT.includes(name.toLowerCase())
              : false;
            return (
              <div className={`${isShow ? "" : "hidden"}`}>
                 <Link to={`/nft/${index}`}>
                  <Card
                    img={listing.asset.image}
                    name={listing.asset.name}
                    creatorAddress={listing.creatorAddress}
                    price={listing.pricePerToken}
                    status={listing.status}
                    />
                </Link>
              </div>
            );
          })
        : ""}
      {auctions
        ? auctions.map((auction, index) => {
            // nameOfNFT = fear of sea
            // name = Sea
            const nameOfNFT = auction.asset.name.toLowerCase();
            console.log(nameOfNFT.includes(name.toLowerCase()));
            const isShow = nameOfNFT
              ? nameOfNFT.includes(name.toLowerCase())
              : false;
            return (
              <div className={`${isShow ? "" : "hidden"}`}>
                <div key={index} className={auction.status == 3 ? "hidden" : ""}>
                <Link to={`/auction/${auction.id}`}>
                  <Auction
                    id={auction.id}
                    img={auction.asset.image}
                    name={auction.asset.name}
                    creatorAddress={auction.creatorAddress}
                    price={auction.pricePerToken}
                    status={auction.status}
                    startTime={auction.startTimeInSeconds}
                  />
                </Link>
              </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default Search;
