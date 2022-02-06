import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

import "./MyOrders.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { myOrders, clearErrors } from "../../actions/orderAction";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const { user } = useSelector((state) => state.user);

  const rows = [];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 160,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);

      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title={`${user.name}'s ORDERS`} />
      {orders && orders.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Order Yet</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <div className="myOrdersPage">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="myOrdersTable"
                autoHeight
              />
              <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrders;
