import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";

function Orders() {
  const [allOrders, setAllOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:8080/findAllOrders").then((response) => {
      setAllOrders(response.data);
      console.log(response.data);
    });
  }, []);

  const orderApproveHandler = (id) => {
    axios
      .get(`http://localhost:8080/approveOrder?orderId=${id}`)
      .then((response) => {
        history.push("/orders");
        window.location.reload(false);
      });
  };

  const orderDeclineHandler = (id) => {
    axios
      .get(`http://localhost:8080/declineOrder?orderId=${id}`)
      .then((response) => {
        history.push("/orders");
        window.location.reload(false);
      });
  };

  return (
    <div className="container">
      {allOrders.map((order, index) => {
        return (
          <div className="sign-up-container">
            <img
              className="picture-size"
              src={"data:image/jpeg;base64," + order.clothingItem.itemPicture}
            />
            <p>
              Buyer: {order.user.firstName} {order.user.lastName}
            </p>
            <p>E-Mail: {order.user.email}</p>
            <p>Size: {order.clothingItem.size}</p>
            <p>Price: ${order.clothingItem.price}</p>
            <button
              className="bg-success btn btn-outline-light"
              onClick={() => {
                orderApproveHandler(order.id);
              }}
            >
              Approve
            </button>
            <button
              className="bg-danger btn btn-outline-light"
              onClick={() => {
                orderDeclineHandler(order.id);
              }}
            >
              Decline
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
