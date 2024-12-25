import React, { useEffect } from "react";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Badge } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = ({
  saladsAddedToCart,
  setSaladsAddedToCart,
  total,
  setTotal,
}) => {
  const [cartTotal, setCartTotal] = useState(total);
  const grabSalads = JSON.parse(sessionStorage.getItem("cart"));
  const navigatePage = useNavigate();

  useEffect(() => {
    setCartTotal((total) => {
      let counter = 0;

      grabSalads.forEach((val) => {
        let cachePrice = val.price + 0; 
        if (val.price) {
          counter += cachePrice;
        }
      });
      return counter;
    });
  }, [saladsAddedToCart]);

  const removeSalad = (key) => {
    const items = JSON.parse(sessionStorage.getItem("cart"));
    items.splice(key, 1);
    sessionStorage.setItem("cart", JSON.stringify(items));

    if (items.length <= 0) {
      window.location.href = "/order";
    }
    setSaladsAddedToCart(items); // rerender
  };
  const placeOrder = async () => {
    grabSalads[0]["name"] = "Armoni"; // change customer name here
    for (let key in grabSalads) {
      grabSalads[key]["name"] = "Armoni";
    }
    try {
      await axios.post("http://localhost:8800/customerOrder", grabSalads);
      setTotal("0.00");
      navigatePage("/");
      sessionStorage.setItem("cart", JSON.stringify([]));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100%" }}>
          <h1>Cart</h1>
          {grabSalads.length === 0 ? (
            <div>
              <p>
                {" "}
                You have not added any Savory Salads to your to your car yet!
              </p>
              <Button
                size="medium"
                variant="contained"
                onClick={() => navigatePage("/order")}
              >
                Get started
              </Button>
            </div>
          ) : (
            <div>
              {grabSalads.map((el, key) => {
                const trueValuesBaseToppings = Object.keys(
                  el.selectedToppings
                ).filter((value) => el.selectedToppings[value]);
                const trueValuesExtraToppings = Object.keys(
                  el.extraCheckedItems
                ).filter((value) => el.extraCheckedItems[value]);
                console.log(trueValuesExtraToppings.length, 'lemn')
                return (
                  <React.Fragment>
                    <Box key={key} sx={{ bgcolor: "white", padding: "8px" }}>
                      <Typography style={{backgroundColor: '#cfe8fc', padding: "6px", borderRadius: '5px'}}> {`Price: $${el.price}`}</Typography>
                      <Typography style={{padding: "6px"}}>{`Salad: ${el.title}`}</Typography>
                      <Typography style={{backgroundColor: '#cfe8fc', padding: "6px", borderRadius: '5px'}}>{ trueValuesBaseToppings.length ? `Toppings: ${trueValuesBaseToppings.join(
                        " | "
                      )}`: 'Toppings: None selected'}</Typography>
                      <Typography style={{padding: "6px"}}>{trueValuesExtraToppings.length ? `Extra Toppings: ${trueValuesExtraToppings.join(
                        " | "
                      )}`: 'Extra Toppings: None selected'}</Typography>
                      <img src={el.img}></img>
                      <IconButton>
                        <Badge>
                          <EditIcon />
                        </Badge>
                      </IconButton>
                      <IconButton>
                        <Badge>
                          <DeleteIcon onClick={() => removeSalad(key)} />
                        </Badge>
                      </IconButton>
                    </Box>
                    <Divider />
                  </React.Fragment>
                );
              })}
            <div style={{display:'flex', justifyContent: 'space-between', padding: '10px'}}>
              <Typography>{`Total: $${cartTotal}.00`} </Typography>
              <Button variant="contained" onClick={() => placeOrder()}>
                Place Order
              </Button>
            </div>
            </div>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Cart;
