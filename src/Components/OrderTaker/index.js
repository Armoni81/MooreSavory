import * as React from "react";

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

const 
OrderTaker = ({
  selectedSalad,
  checkOutModal,
  setCheckOutModal,
  saladOptions,
  total,
  checkedItems,
  setCheckedItems,
  setSaladsAddedToCart,
  saladsAddedToCart,

}) => {

  const handleClose = () => {
    setCheckOutModal(false);
   
  };
  const renderSaladCustomizer = Array(
    saladOptions.find((salad) => salad.Title === selectedSalad)
  );
console.log(renderSaladCustomizer, 'l')
  
  const handleCheckBoxBaseIngredients = (event, topping) => {
    setCheckedItems((items) => ({
      ...items, // Spread the current state 
      [topping]: event.target.checked, // Update the specific topping
    }));

  };
  
  const addToCart = () => {
    alert(`Added to cart Total: ${total}`);
    setCheckOutModal(false);
    const sessionStorageItems = JSON.parse(sessionStorage.getItem('cart')) || []

    const currentCheckedItems = checkedItems;
    setSaladsAddedToCart(sessionStorageItems)
    const trimmedSaladIngredients = Object.keys(currentCheckedItems).reduce((acc, key) => {
      // Trim the key and add it to the new object
      acc[key.trim()] = currentCheckedItems[key];
      return acc;
    }, {});
    
    // console.log(trimmedSaladIngredients, 'checkedItems');


    // Append new salad with selected toppings to the cart
    setSaladsAddedToCart(salads => {
        const updatedCart = [
          ...salads,
          { selectedToppings: trimmedSaladIngredients, title: selectedSalad, price: renderSaladCustomizer[0].price }
        ];
        const stringify = JSON.stringify(updatedCart)
        console.log(updatedCart, 'updatedCart');

        // Store the updated cart in sessionStorage
        sessionStorage.setItem('cart', stringify);
    
        // Return the updated cart to update the state
        console.log(updatedCart, 'here')
        return updatedCart;
    });

    // Clear the checked items after adding to cart
    // setCheckedItems([]);
};

  // console.log(JSON.parse(sessionStorage.getItem('cart')), 'sessionStorage after setting cart');
  // console.log(saladsAddedToCart, 'ATC')
  
  // console.log(saladOptions, 'sa option')
  // console.log(checkedItems, 'checked?')
  // console.log(checkOutModal, "checkoutmodal");
  return (
    <div>
      {selectedSalad && checkOutModal
        ? renderSaladCustomizer.map((userSelectedSalad, key) => {
            const seperateEachTopping =
              userSelectedSalad.defaultToppings.split(",");

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
                      console.log(userSelectedSalad, 'HIIYA')
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
                    {/* <Box sx={{ p: 2, bgcolor: "#bbfcfb" }}>
                      <Typography>EXTRAS</Typography>
                   
                      {
                        Object.keys(userSelectedSalad.extraToppings).map((extraTopping, id) => {
                          return(
                        
                            <FormControlLabel key={id} control={<Checkbox disableRipple checked={userSelectedSalad.extraToppings[extraTopping].checked} onChange={(event) => handleCheckBoxBaseIngredients(event,extraTopping) }  value={extraTopping}  />} label={extraTopping} />

                        )   
                    }) }
                
                    </Box> */}

                    <Typography>{`Total:${total}`}</Typography>
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
