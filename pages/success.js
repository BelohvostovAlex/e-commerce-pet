import React, { useEffect } from "react";
import Link from "next/link";

import { useStateContext } from "../context/StateContext";
import { runSchoolPride } from "../lib/utils";

import { BsBagCheckFill } from "react-icons/bs";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runSchoolPride();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thanks for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt</p>
        <p className="description">
          If you have any questions, please contact us
          <a className="email" href="mailto:order@homeelectro.com">
            order@homeelectro.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn">
            Continue shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
