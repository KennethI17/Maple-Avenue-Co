import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
  const [signInUser, setSignInUser] = useState({ email: "", password: "" });
  const [signInAdmin, setSignInAdmin] = useState({ email: "", password: "" });
  const history = useHistory();

  const changeHandler = (event) => {
    //Taking the name and value attribute from the input fields
    const name = event.target.name;
    const value = event.target.value;
    //making a copy of the state variable before making updates
    const tempSignIn = { ...signInUser };
    // updating the field inside the variable based on the attribute name
    // tempSignIn["password"] = ..... same as
    // tempSignIn.password = ..... tempSignIn[name]=value;
    tempSignIn[name] = value;
    setSignInUser(tempSignIn);
  };

  const signInSubmitHandler = () => {
    // in the real world we would use a token to keep track of the user, for this lab we are using the student's email as a token
    axios
      .post("http://localhost:8080/loginUser", signInUser)
      .then((response) => {
        localStorage.setItem("loggedInUser", response.data.email);
        history.push("/store");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("in the future add logic to navigate to an error page");
      });
  };

  const adminHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempAdmin = { ...signInAdmin };
    tempAdmin[name] = value;
    setSignInAdmin(tempAdmin);
  };

  const signInAdminSubmitHandler = () => {
    axios
      .post("http://localhost:8080/loginAdmin", signInAdmin)
      .then((response) => {
        localStorage.setItem("loggedInAdmin", response.data.email);
        history.push("/admin-profile");
      })
      .catch((error) => {
        console.log("in the future add logic to navigate to an error page");
      });
  };

  const signOutHandler = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload(false);
  };
  const email = localStorage.getItem("loggedInUser");
  const toggleDisplay = () => {
    if (localStorage.getItem("loggedInUser")) {
      //Move the div with the UL tag and form tag from header component here and also in the else block below.
      return (
        <div className="header-container">
          <ul>
            <form className="header-holder">
              {email == "admin@email.com" ? (
                <a className="header-text">
                  <Link
                    className="header-text"
                    aria-current="page"
                    to="/orders"
                  >
                    Orders
                  </Link>
                </a>
              ) : (
                <a className="header-text">
                  <Link className="header-text" to="/profile">
                    Profile
                  </Link>
                </a>
              )}
              {email == "admin@email.com" ? (
                <a className="header-text">
                  <Link
                    className="header-text"
                    aria-current="page"
                    to="/add-item"
                  >
                    Add Item
                  </Link>
                </a>
              ) : (
                <a className="header-text">
                  <Link className="header-text" aria-current="page" to="/cart">
                    Cart
                  </Link>
                </a>
              )}
              {email == "admin@email.com" ? (
                <a className="header-text">
                  <Link className="header-text" aria-current="page" to="/store">
                    Store
                  </Link>
                </a>
              ) : (
                <a className="header-text">
                  <Link className="header-text" aria-current="page" to="/store">
                    Store
                  </Link>
                </a>
              )}
              <a className="header-text">
                <Link className="header-text" to="/about-us">
                  About Us
                </Link>
              </a>
              <div className="header-signout-input">
                <button
                  onClick={signOutHandler}
                  className="sign-out-button"
                  type="button"
                >
                  Sign Out
                </button>
              </div>
            </form>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="header-container">
          <ul>
            <form className="header-holder">
              <a className="header-text">
                <Link className="header-text" to="/">
                  Home
                </Link>
              </a>
              <a className="header-text">
                <Link className="header-text" aria-current="page" to="/sign-up">
                  Sign Up
                </Link>
              </a>
              <a className="header-text">
                <Link className="header-text" to="/about-us">
                  About Us
                </Link>
              </a>
              <input
                onChange={changeHandler}
                name="email"
                value={signInUser.email}
                type="email"
                className="header-input"
                placeholder="example@email.com"
                aria-label="E-Mail"
              />
              <input
                onChange={changeHandler}
                name="password"
                value={signInUser.password}
                type="password"
                className="header-input"
                placeholder="Password"
                aria-label="Password"
              />
              <div className="header-input">
                <button
                  className="sign-in-button"
                  onClick={signInSubmitHandler}
                  type="button"
                >
                  Sign In
                </button>
              </div>
            </form>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="header-style">
      <div>{toggleDisplay()}</div>
    </div>
  );
}

export default Header;
