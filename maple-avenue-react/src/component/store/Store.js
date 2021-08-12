import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import { Link, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AddressInfo from "./../addressInfo/AddressInfo";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Store() {
  const [allStoreItems, setAllStoreItems] = useState([]);
  const [item, setItem] = useState({});
  const history = useHistory();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get("http://localhost:8080/findAllClothingItems").then((response) => {
      setAllStoreItems(response.data);
      console.log(response.data);
    });
  }, []);

  const itemHandler = (index) => {
    console.log(allStoreItems[index]);
    setItem(allStoreItems[index]);
    console.log(item);
    if (item.id) {
      history.push("/store/address-info");
    }
  };

  return (
    <div className="container">
      {allStoreItems.map((clothingItem, index) => {
        return (
          <div className="sign-up-container">
            <img
              className="picture-size"
              src={"data:image/jpeg;base64," + clothingItem.itemPicture}
            />
            <p>Item Name: {clothingItem.itemName}</p>
            <p>Size: {clothingItem.size}</p>
            <p>Quantity: {clothingItem.quantity}</p>
            <p>Price: ${clothingItem.price}</p>
            <p>Description: {clothingItem.description}</p>
            <button
              className="bg-dark btn btn-outline-warning"
              onClick={() => {
                itemHandler(index);
              }}
            >
              Buy
            </button>
          </div>
        );
      })}
      <Route path="/store/address-info">
        <AddressInfo item={item} />
      </Route>
      ;
    </div>
  );
}
export default Store;
