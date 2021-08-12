import React from "react";
import { Route, withRouter } from "react-router-dom";
import Header from "../header/Header";
import SignUp from "../signUp/SignUp";
import AboutUs from "../aboutUs/AboutUs";
import ThankYou from "./../thankYou/ThankYou";
import Profile from "./../profile/Profile";
import Home from "./../home/Home";
import AddItem from "../store/AddItem";
import Store from "../store/Store";
import ShoppingCart from "../shoppingCart/ShoppingCart";
import Orders from "../orders/Orders";

function Layout() {
  return (
    <div>
      <Header />
      <Route path="/about-us" component={AboutUs} />
      <Route exact path="/" component={Home} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/profile" component={Profile} />
      <Route path="/add-item" component={AddItem} />
      <Route path="/store" component={Store} />
      <Route path="/cart" component={ShoppingCart} />
      <Route path="/orders" component={Orders} />
    </div>
  );
}

export default Layout;
