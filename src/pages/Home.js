import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Link } from "react-router-dom";
import { useContract, useNFT } from "@thirdweb-dev/react";
import { Bars } from "react-loading-icons";

import Slide from "../components/Slide";

const Home = () => {
  const [listings, setListings] = useState([]);

  const { contract, isLoading } = useContract("0x1fe1da2C775c491c40cBF451735495b0F5932B8E");

  const { data: nftDrop, isLoaading, error } = useNFT(contract, 0);

  const [nft, setNFT] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sdk = new ThirdwebSDK("mumbai", {
          clientId: "598b4f1195f15842446b09538ba00622",
        });

        const contract = await sdk.getContract(
          "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36"
        );
        setLoading(false)
        const fetchedListings = await contract.directListings.getAll();

        // Update the state with the fetched listings
        setListings(fetchedListings);
        setLoading(true)
        // NFT

        const contractNFT = await sdk.getContract("0x1BB3B7B5dD5DE77bB2994BE0c88461331f25B373");
        const nfts = await contractNFT.erc1155.getAll();
        console.log(nfts);
        setNFT(nfts)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(listings)

  return (
    <>
    <section style={{minHeight:"100vh"}}>
       <div>
        <Slide />
      </div>
      <div className=" rounded-lg p-4 mx-20 border-gray flex gap-4 flex-wrap">

        <div className={`${loading ? "hidden" : "d-flex justify-content-center align-items-center"}`} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(1, 1, 1, 0.6)", zIndex: 9999 }}>
          <Bars />
        </div>


        <h2 className="font-bold text-[28px] w-full pl-5">Buy NFT</h2>
        {listings.map((listing, index) => (
          <>
            <div key={index} className={listing.status == 3 ? "hidden" : ""}>
              <Link to={`/nft/${index}`} >
                <Card img={listing.asset.image} name={listing.asset.name} creatorAddress={listing.creatorAddress} price={listing.pricePerToken} status={listing.status} />
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
