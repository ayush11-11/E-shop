import React, { useState} from "react";
import {// eslint-disable-next-line
    
    createOrder
} from "./apiCore";
import { emptyCart } from "./cartHelpers";// eslint-disable-next-line
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import "braintree-web";
 

const Checkout = ({ products ,setReload = f => f, reload = undefined}) => {
    console.log(products);
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        address: ""
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
 
    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };
    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-md btn-info">Sign in to checkout</button>
            </Link>
        );
    };
    let delAddress=data.address;


    const buy = () => {
        let NAME = document.getElementById("showhide")
        NAME.className="ui primary loading button fluid";
        setData({ loading: true });
         
                    

                        const createOrderData = {
                            products: products,
                            transaction_id: 123,
                            amount: getTotal(products),
                            address: delAddress
                        };

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    console.log("payment success and empty cart");
                                    setData({ loading: false, success: true });
                                    setReload(!reload);

                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                  
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: "" })}>
            { products.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                            required
                        />
                    </div>
                    

                    
                    <button onClick={buy} id="showhide" className="btn btn-success btn-block">
                        Pay
                    </button>
                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = success => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading =>
        loading && <h2 className="text-danger">Loading...</h2>;

    return (
        <div>
            <h3>Total:<span className='lead text-success'>&#8377;{products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0)}</span></h3>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {isAuthenticated() ? showError(data.error) : null}
            {showCheckout()}
        </div>
    );
};

export default Checkout;
