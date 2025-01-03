import * as React from "react";
import { useState } from "react";

//Material UI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

//Imported Consts
import { styleForModalPopUp } from "../../Constants/consts";

const OrderTaker = ({
  selectedSalad,
  checkOutModal,
  setCheckOutModal,
  saladOptions,
  total,
  checkedItems,
  setCheckedItems,
  setSaladsAddedToCart,
  saladsAddedToCart,
  setTotal,
  setSuccessMessage,
}) => {
  const [extraCheckedItems, setExtraCheckedItems] = useState({});

  const handleClose = () => {
    setCheckOutModal(false);
  };
  const renderSaladCustomizer = Array(
    saladOptions.find((salad) => salad.Title === selectedSalad)
  );

  const handleCheckBoxBaseIngredients = (event, topping) => {
    setCheckedItems((items) => {
      let updatedItems = { ...items };
      updatedItems[topping] = event.target.checked;
      return updatedItems;
    });
  };
  const handleExtraToppingsCheckboxes = (event, topping) => {
    setExtraCheckedItems((items) => {
      let updatedItems = { ...items };
      updatedItems[topping] = event.target.checked;

      return updatedItems;
    });
    setTotal((total) => {
      if (event.target.checked) {
        const toNumber = total + 2;
        return toNumber; //bug here  add .00 🚨🐛
      }
      return total - 2; //bug here  add .00
    });
  };

  const addToCart = () => {
    setCheckOutModal(false);
    const sessionStorageItems =
      JSON.parse(sessionStorage.getItem("cart")) || [];
    const currentCheckedItems = checkedItems;
    setSaladsAddedToCart(sessionStorageItems);
    setExtraCheckedItems([]);
    const grabSaladImg = saladOptions.filter(salad => salad.Title === selectedSalad)[0].img

    const trimmedSaladIngredients = Object.keys(currentCheckedItems).reduce( 
      (acc, key) => {
        // Trim the key and add it to the new object
        acc[key.trim()] = currentCheckedItems[key];
        return acc;
      },
      {}
    );

    // Append new salad with selected toppings to the cart
    setSaladsAddedToCart((salads) => {
      const updatedCart = [
        ...salads,
        {
          selectedToppings: trimmedSaladIngredients,
          extraCheckedItems: extraCheckedItems,
          title: selectedSalad,
          price: total,
          img: grabSaladImg
        },
      ];
      const stringify = JSON.stringify(updatedCart);

      // Store the updated cart in sessionStorage
      sessionStorage.setItem("cart", stringify);

      // Return the updated cart to update the state
      console.log(updatedCart, "here");
      return updatedCart;
    });
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
    // Clear the checked items after adding to cart
    // setCheckedItems([]);
  };

  return (
    <div>
      {selectedSalad && checkOutModal
        ? renderSaladCustomizer.map((userSelectedSalad, key) => {
            console.log(userSelectedSalad, "check");
            const seperateEachTopping =
              userSelectedSalad.defaultToppings.split(",");
            const seperateEachExtraToopping =
              userSelectedSalad.extraToppings.split(",");

            return (
              <Modal
                open={checkOutModal}
                onClose={() => handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                keepMounted
                key={key}
              >
                <Box sx={styleForModalPopUp}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <p>X</p>
                    {userSelectedSalad.Title}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {userSelectedSalad.description}
                  </Typography>
                  <Typography sx={{ mt: 1, color: "GrayText" }}>
                    {userSelectedSalad.saladDescription}
                  </Typography>
                  <FormGroup>
                    {seperateEachTopping.map((topping, id) => {
                      return (
                        <FormControlLabel
                          key={id}
                          control={
                            <Checkbox
                              disableRipple
                              key={id}
                              onChange={(event) =>
                                handleCheckBoxBaseIngredients(
                                  event,
                                  topping,
                                  id
                                )
                              }
                              checked={checkedItems[topping]}
                              value={topping}
                            />
                          }
                          label={topping}
                        />
                      );
                    })}
                    <Box sx={{ p: 2, bgcolor: "#bbfcfb" }}>
                      <Typography>EXTRAS</Typography>

                      {seperateEachExtraToopping.map((extraTopping, id) => {
                        return (
                          <FormControlLabel
                            key={id}
                            control={
                              <Checkbox
                                disableRipple
                                checked={
                                  extraCheckedItems[extraTopping] || false
                                }
                                onChange={(event) =>
                                  handleExtraToppingsCheckboxes(
                                    event,
                                    extraTopping
                                  )
                                }
                                value={extraTopping}
                              />
                            }
                            label={`${extraTopping} + $2.00`}
                          />
                        );
                      })}
                    </Box>

                    <Typography>{`Total: $${total}`}</Typography>
                  </FormGroup>
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={addToCart}
                  >
                    Add To Cart
                  </Button>
                </Box>
              </Modal>
            );
          })
        : null}
    </div>
  );
};

export default OrderTaker;
