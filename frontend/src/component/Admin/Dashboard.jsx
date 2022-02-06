import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import SideBar from "./SideBar.jsx";
import "./Dashboard.css";
import { getAdminProduct } from "../../actions/productAction.js";
import { getAllOrders } from "../../actions/orderAction.jsx";
import { getAllUsers } from "../../actions/userAction.jsx";
import MetaData from "../layout/MetaData.jsx";
import Loader from "../layout/Loader/Loader.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders, totalAmount } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAdminProduct());

    dispatch(getAllOrders());

    dispatch(getAllUsers());
  }, [dispatch]);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#6800B4"],
        hoverBackgroundColor: ["#485000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <MetaData title={`${user.name}'s DASHBOARD`} />
          <SideBar />

          <div className="dashboardContainer">
            <Typography component="h1">Dashboard</Typography>
            <div className="dashboardSummary">
              <div>
                <p>
                  Total Amount <br />₹{Math.round(totalAmount * 100) / 100}
                </p>
              </div>

              <div className="dashboardSummaryBox2">
                <Link to="/admin/products">
                  <p>Products</p>
                  <p>{products && products.length}</p>
                </Link>

                <Link to="/admin/orders">
                  <p>Orders</p>
                  <p>{orders && orders.length}</p>
                </Link>

                <Link to="/admin/users">
                  <p>Users</p>
                  <p>{users && users.length}</p>
                </Link>
              </div>
            </div>

            <div className="lineChart">
              <Line data={lineState} />
            </div>

            <div className="doughnutChart">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;
