import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from "@material-ui/icons/Star";

import "./ProductReviews.css";
import {
  clearErrors,
  getAllReviews,
  deleteReview,
} from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    
    if (error) {
      alert.error(error);

      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);

      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      dispatch(getAllReviews(productId));
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.6 },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 380,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 150,
      type: "number",
      flex: 0.6,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
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
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.rating,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - ADMIN`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">All Reviews</h1>

            <div>
              <StarIcon />
              <input
                type="name"
                placeholder="Product ID"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Search
            </Button>
          </form>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
