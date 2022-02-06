import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/all';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from 'react-alert';

import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import MetaData from '../layout/MetaData.jsx';
import { getProduct, clearErrors } from "../../actions/productAction";
import Loader from '../layout/Loader/Loader';

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="E-MARKET" />
                    <div className='banner'>
                        <p>Welcome to E-MARKET</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>
                        <a href='#container'>
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>
                    <h2 className="homeHeading">Featured Products</h2>
                    <div className='container' id="container">
                        {products && products.map((product) => (
                            <ProductCard product={product} key={product._id}/>
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
