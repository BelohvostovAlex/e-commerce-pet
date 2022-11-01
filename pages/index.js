import React from "react";

import { client } from "../lib/client";

import { HeroBanner, FooterBanner, Product } from "../components";

const Home = ({ products, bannerData }) => {
  const bannerDataExists = bannerData.length && bannerData[0];
  return (
    <>
      <HeroBanner heroBanner={bannerDataExists} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>A lot of variations</p>
      </div>

      <div className="products-container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerDataExists} />
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};
