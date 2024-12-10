import React from "react";
import { useState, Fragment, useEffect } from "react";
//Axios
import axios from "axios";
//Material UI
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
//Imported Consts
import { saladChoices } from "../../Constants/consts";
//Imported Components
import OrderTaker from "../OrderTaker";

const RenderSalads = ({
  total,
  setTotal,
  setSaladsAddedToCart,
  saladsAddedToCart,
  cartTotal,
  setCartTotal,
}) => {
  const [selectedSalad, setSelectedSalad] = useState("");
  const [checkOutModal, setCheckOutModal] = useState(false);
  const [saladOptions, setSaladOptions] = useState([]);
  const [checkedItems, setCheckedItems] = useState([{}]);
  const [successMessage, setSuccessMessage] = useState(false);
  const grabSaladChoicesSessionStorage =
    JSON.parse(sessionStorage.getItem("salad Choices")) || [];

  console.log(grabSaladChoicesSessionStorage, "yho");

  const navigatePage = useNavigate();
  // console.log(saladOptions, 'length')
  const fetchSalads = async () => {
    try {
      const res = await axios.get("http://localhost:8800/SaladsChoices");
      setTimeout(() => {
        sessionStorage.setItem("salad Choices", JSON.stringify(res.data));
        setSaladOptions(res.data);
      }, 1200);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSalads();
  }, []);

  const placeOrder = (id) => {
    setSelectedSalad(saladOptions[id].Title);
    const userSelectedSalad = saladOptions[id].Title;
    // console.log(userSelectedSalad, 'userselected')
    setCheckOutModal(true);
    setTotal(saladOptions[id].price);
    setCheckedItems((items) => {
      let obj = [];
      const toArray = Array(saladOptions[id]);
      const salad = toArray.find((salad) => salad.Title === userSelectedSalad);
      const splitToArr = salad.defaultToppings.split(",");
      splitToArr.map((el) => {
        obj[el] = true;
      });
      return obj;
    });
  };
  return (
    <Fragment>
      {successMessage ? (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          variant="filled"
          severity="success"
        >
          Successfully added to Cart
          <Chip
            label="Go to Cart"
            onClick={() => navigatePage("/cart")}
            variant="outlined"
            size="small"
            style={{ marginLeft: "16px" }} // Adds space between the Chip and Alert text
          />
        </Alert>
      ) : null}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr)",
          gap: "10px",
          margin: "40px",
        }}
      >
        {grabSaladChoicesSessionStorage.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress size="10rem" sx={{ padding: "20px" }} />
          </div>
        ) : (
          grabSaladChoicesSessionStorage.map((salad, id) => {
            return (
              <Fragment key={id}>
                <Card
                  sx={{ width: 300, height: 400, backgroundColor: "aliceblue" }}
                >
                  <Typography sx={{ fontSize: "15px", margin: "15px" }}>
                    {salad.Title}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="194"
                    image={salad.img}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {salad.description}
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>{salad.price}</Typography>
                    <Button
                      variant="contained"
                      onClick={() => placeOrder(id)}
                      endIcon={<SendIcon />}
                    >
                      Get Started
                    </Button>
                  </CardActions>
                </Card>
              </Fragment>
            );
          })
        )}
      </div>
      <OrderTaker
        selectedSalad={selectedSalad}
        checkOutModal={checkOutModal}
        setCheckOutModal={setCheckOutModal}
        saladOptions={saladOptions}
        setSaladOptions={setSaladOptions}
        total={total}
        setTotal={setTotal}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        setSaladsAddedToCart={setSaladsAddedToCart}
        saladsAddedToCart={saladsAddedToCart}
        setSuccessMessage={setSuccessMessage}
        cartTotal={cartTotal}
        setCartTotal={setCartTotal}
      />
    </Fragment>
  );
};

export default RenderSalads;
