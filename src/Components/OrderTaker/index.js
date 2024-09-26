import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

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
import { styleForModalPopUp, saladInfo } from "../../Constants/consts";

const OrderTaker = ({
  selectedSalad,
  checkOutModal,
  setCheckOutModal,
  saladOptions,
  setSaladOptions,
  setTotal,
  total,
  checkedItems,
  setCheckedItems,
  setSaladsAddedToCart,
  saladsAddedToCart,
}) => {
  //    useEffect(()=> {
  //     setCheckedItems(() => {
  //         saladOptions.map(el => {
  //              [{
  //                 [el.Title] : event.target.checked
  //             }]
  //         })
  //     })
  //    },[])

  const handleClose = () => {
    setCheckOutModal(false);
    setCheckedItems([{}]); 

    // setCheckedItems(item => {
    //     const cacheItem =  [{...item}]
    //     // ended here cacheItem in not a funcation so i cant  map over it. Im trying tp set every value that true in the checkItem obj set it to false
    //     console.log(cacheItem, 'cacheitem')
    //     cacheItem.map((el) => {
    //         // console.log(el[
    //         //     " Onions"
    //         //     ], 'here el')
    //         console.log(event.target, 'VALUEE')
    //             console.log(el[event.target])
    //         if(el[event.target.value] === true){
    //             el[event.target.value] = false

    //         }

    //     })

    //     return cacheItem
    // })
  };
  const renderSaladCustomizer = Array(
    saladOptions.find((salad) => salad.Title === selectedSalad)
  );

  // console.log(renderSaladCustomizer, 'need it')

  const handleCheckBoxBaseIngredients = (event, topping) => {
    setCheckedItems((items) => ({
      ...items, // Spread the current state
      [topping]: event.target.checked, // Update the specific topping
    }));
  };

  const addToCart = () => {
    alert(`Added to cart Total:${total}`);
    setCheckOutModal(false);
    setSaladsAddedToCart(salads => ({...salads, 'selectedToppings':checkedItems})) // 🚨stopped here need to figure out how to preserve  checkedITesm 
  };
  console.log(saladsAddedToCart, 'ATC')
  // console.log(saladOptions, 'sa option')
  // console.log(checkedItems, 'checked?')
  console.log(checkOutModal, "checkoutmodal");
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
                      {/* {
                        Object.keys(userSelectedSalad.extraToppings).map((extraTopping, id) => {
                          return(
                        
                            <FormControlLabel key={id} control={<Checkbox disableRipple checked={userSelectedSalad.extraToppings[extraTopping].checked} onChange={(event) => handleCheckBoxBaseIngredients(event,extraTopping) }  value={extraTopping}  />} label={extraTopping} />

                        )   
                    }) */}
                      {/* } */}
                    </Box>

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
