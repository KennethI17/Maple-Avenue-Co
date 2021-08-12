import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AddItem() {
  const [addItem, setAddItem] = useState({
    itemName: "",
    size: "",
    description: "",
    itemPicture: {},
    status: "",
    quantity: "",
    price: "",
  });

  const history = useHistory();

  const addItemHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempAddItem = { ...addItem };
    tempAddItem[name] = value;
    setAddItem(tempAddItem);
  };

  const addItemSubmitHandler = () => {
    const formData = new FormData();
    formData.append("file", addItem.itemPicture);
    formData.append("itemName", addItem.itemName);
    formData.append("price", addItem.price);
    formData.append("description", addItem.description);
    formData.append("size", addItem.size);
    formData.append("quantity", addItem.quantity);
    axios
      .post("http://localhost:8080/upload", formData)
      .then((response) => {
        history.push("/store");
      })
      .catch((error) => {});
  };

  const onFileChangeHandler = (e) => {
    e.preventDefault();
    const tempAddItem = { ...addItem };
    tempAddItem.itemPicture = e.target.files[0];
    setAddItem(tempAddItem);
  };

  class ApiService {
    upload(data) {
      return axios.post("http://localhost:8080/upload", data);
    }
  }

  return (
    <div className="container">
      <form className="sign-up-container">
        <div>
          <h2> Add an item to the store!</h2>
          <label for="inputItemName" className="form-label">
            Item Name
          </label>
          <input
            onChange={addItemHandler}
            name="itemName"
            value={addItem.itemName}
            type="text"
            className="form-control"
            id="inputItemName"
          />
          <label for="inputSize" className="form-label">
            Size
          </label>
          <input
            onChange={addItemHandler}
            name="size"
            value={addItem.size}
            type="text"
            className="form-control"
            id="inputSize"
          />
          <label for="inputQuantity" className="form-label">
            Quantity
          </label>
          <input
            onChange={addItemHandler}
            name="quantity"
            value={addItem.quantity}
            type="text"
            className="form-control"
            id="inputQuantity"
          />{" "}
          <label for="inputPrice" className="form-label">
            Price
          </label>
          <input
            onChange={addItemHandler}
            name="price"
            value={addItem.price}
            type="text"
            className="form-control"
            id="inputPrice"
            placeholder="0.00"
          />
          <div></div>
          <label for="inputDescription">Description</label>
          <input
            onChange={addItemHandler}
            name="description"
            value={addItem.description}
            type="text"
            className="form-control"
            id="inputDescription"
          />
          <div className="form-group files color">
            <label>Upload Your File</label>
            <input
              onChange={onFileChangeHandler}
              name="itemPicture"
              type="file"
              className="form-control"
            />
          </div>
          <div className="d-grid gap-2">
            <button
              onClick={addItemSubmitHandler}
              className="bg-dark btn btn-outline-success"
              type="button"
            >
              Add Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddItem;
