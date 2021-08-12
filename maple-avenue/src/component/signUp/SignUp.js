import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignUp() {
  const [signUpUser, setSignUpUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });
  const history = useHistory();

  const userHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempSignUp = { ...signUpUser };
    tempSignUp[name] = value;
    setSignUpUser(tempSignUp);
  };

  const addressHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempSignUp = { ...signUpUser };
    tempSignUp.address[name] = value;
    setSignUpUser(tempSignUp);
  };

  //   const addressHandler = (event) => {
  //     const name = event.target.name;
  //     const value = event.target.value;
  //     const tempSignUp = { ...signUpUser };
  //     tempSignUp.address[name] = value;
  //     setSignUpUser(tempSignUp);
  //   };

  const signUpSubmitHandler = () => {
    // history.push will access the browser history and push a new url on the browser hence routing stated page
    axios
      .post("http://localhost:8080/saveUser", signUpUser)
      .then((response) => {
        history.push("/thank-you");
      })
      .catch((error) => {
        console.log("in the future add logic to navigate to an error page");
      });
  };

  return (
    <div className="container">
      <form className="sign-up-container2">
        <div className="info">
          <h2> Sign up here!!</h2>
          <label for="inputFirstName" className="form-label">
            First Name
          </label>
          <input
            style={{ marginBottom: 5 }}
            onChange={userHandler}
            name="firstName"
            value={signUpUser.firstName}
            type="text"
            className="form-control"
            id="inputFirstName"
          />
          <label for="inputLastName" className="form-label">
            Last Name
          </label>
          <input
            style={{ marginBottom: 5 }}
            onChange={userHandler}
            name="lastName"
            value={signUpUser.lastName}
            type="text"
            className="form-control"
            id="inputLastName"
          />

          <label for="inputEmail4" className="form-label">
            Email
          </label>
          <input
            style={{ marginBottom: 5 }}
            onChange={userHandler}
            name="email"
            value={signUpUser.email}
            type="email"
            className="form-control"
            id="inputEmail4"
          />
          <label for="inputPassword4" className="form-label">
            Password
          </label>
          <input
            style={{ marginBottom: 5 }}
            onChange={userHandler}
            name="password"
            value={signUpUser.password}
            type="password"
            className="form-control"
            id="inputPassword4"
          />
          <label for="inputStreet" className="form-label">
            Steet
          </label>
          <input
            style={{ marginBottom: 5 }}
            onChange={addressHandler}
            name="street"
            value={signUpUser.address.street}
            type="text"
            className="form-control"
            id="inputItemName"
          />
          <label for="inputCity" className="form-label">
            City
          </label>
          <input
            style={{ marginBottom: 5 }}
            onChange={addressHandler}
            name="city"
            value={signUpUser.address.city}
            type="text"
            className="form-control"
            id="inputCity"
          />
          <label for="inputState" className="form-label">
            State
          </label>
          <select
            style={{ marginBottom: 5 }}
            onChange={addressHandler}
            name="state"
            value={signUpUser.address.state}
            id="inputState"
            className="form-select"
          >
            <option selected>Choose...</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AR">AR</option>
            <option value="AZ">AZ</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DC">DC</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="IA">IA</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="MA">MA</option>
            <option value="MD">MD</option>
            <option value="ME">ME</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MO">MO</option>
            <option value="MS">MS</option>
            <option value="MT">MT</option>
            <option value="NC">NC</option>
            <option value="NE">NE</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NV">NV</option>
            <option value="NY">NY</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WI">WI</option> <option value="WV">WV</option>
            <option value="WY">WY</option>
          </select>
          <label for="inputZip" className="form-label">
            Zip Code
          </label>
          <input
            style={{ marginBottom: 10 }}
            onChange={addressHandler}
            name="zip"
            value={signUpUser.address.zip}
            type="text"
            className="form-control"
            id="inputZip"
          />
        </div>
        <div className="d-grid gap-2 ">
          <button
            onClick={signUpSubmitHandler}
            className="bg-dark btn btn-outline-success"
            type="button"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
