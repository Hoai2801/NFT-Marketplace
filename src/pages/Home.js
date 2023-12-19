import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Link } from "react-router-dom";
import { Bars } from "react-loading-icons";

import Slide from "../components/Slide";
import Auction from "../components/Auction";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [auction, setAuction] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {

        // sdk and contract address of marketplace v3
        const sdk = new ThirdwebSDK("mumbai", {
          clientId: "598b4f1195f15842446b09538ba00622",
        });

        const contract = await sdk.getContract(
          "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36"
        );
        setLoading(false);

        // remove in the future 
        // const winningBid = await contract.englishAuctions.getWinningBid(1);
        // console.log(winningBid);


        // fetch listing data
        const fetchedListings = await contract.directListings.getAll();

        // Update the state with the fetched listings
        setListings(fetchedListings);
        setLoading(true);

        // Auction
        const auctions = await contract.englishAuctions.getAllValid();
        setAuction(auctions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(auction)

  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <div>
          <Slide />
        </div>
        <div className=" rounded-lg p-4 mx-20 border-gray flex gap-4 flex-wrap">
          <div
            className={`${
              loading
                ? "hidden"
                : "d-flex justify-content-center align-items-center"
            }`}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(1, 1, 1, 0.6)",
              zIndex: 9999,
            }}
          >
            <Bars />
          </div>

          <h2 className="font-bold text-[28px] w-full pl-5">Buy NFT</h2>
          {listings.map((listing, index) => (
            <>
              <div key={index} className={listing.status == 3 ? "hidden" : ""}>
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
            </>
          ))}
          <h2 className="font-bold text-[28px] w-full pl-5">Aution NFT</h2>
          {auction.map((listing, index) => (
            <>
              <div key={index} className={listing.status == 3 ? "hidden" : ""}>
                <Link to={`/aution/${listing.id}`}>
                  <Auction
                    id={listing.id}
                    img={listing.asset.image}
                    name={listing.asset.name}
                    creatorAddress={listing.creatorAddress}
                    price={listing.pricePerToken}
                    status={listing.status}
                    startTime={listing.startTimeInSeconds}
                  />
                </Link>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
