import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import "./OrderSuccess.css";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  return (
    <div className="emptyCart">
      <MetaData title="ORDER SUCCESS" />
      <CheckCircleIcon />
      <Typography>Your Order has been Placed successfully</Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
