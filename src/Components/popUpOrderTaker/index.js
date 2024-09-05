import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styleForModalPopUp } from '../../Constants/consts';


export default function SimpleContainer({ selectedSalad,  checkOutModal, setCheckOutModal, saladOptions, setSaladOptions, setTotal, total }) {
    
    

    const handleClose = () => setCheckOutModal(false);

    const saladI = saladOptions.findIndex(salad => salad.title === selectedSalad)
    const saladInfo = Array(saladOptions.find(salad => salad.title === selectedSalad))
    const handleCheckBoxBaseIngredients = (event, topping) =>  {
 
        setSaladOptions(salad => {
          
            const newSaladOptions = [...salad]
            const saladIndex = newSaladOptions.findIndex(salad => salad.title === selectedSalad)
            const  selectedSaladDefaultToppingsArray = Object.keys(newSaladOptions[saladIndex].defaultToppings)
            const updatedSalad = { ...newSaladOptions[saladIndex]}

            if(selectedSaladDefaultToppingsArray.includes(event.target.value)){
                if(saladIndex > -1){

                    const updatedToppings = {...updatedSalad.defaultToppings}
    
                    updatedToppings[topping] = event.target.checked
                    updatedSalad.defaultToppings = updatedToppings
                    newSaladOptions[saladIndex] = updatedSalad
                }
                
            }else{
                console.log(topping, 'toppin')
                const updatedExtraToppings = {...updatedSalad.extraToppings}
                updatedExtraToppings[topping] = event.target.checked
                updatedSalad.extraToppings = updatedExtraToppings
                newSaladOptions[saladIndex] = updatedSalad

                console.log(updatedExtraToppings, 'need')
                //write logic to setTotla to whatever is true under updatedExtraToppings
            }

            return newSaladOptions
        })
    
    }


   
  return (
    <div>
        {
            saladInfo.map((el, key) => {
                return (
                    <Modal
                    open={checkOutModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    keepMounted
                    >
                 <Box sx={styleForModalPopUp}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                     {el.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {el.description}
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'GrayText' }}>
                        {el.saladDescription}
                    </Typography>
                    <FormGroup>
                    {
                        
                        Object.keys(el.defaultToppings).map((topping,id) => {
                           
                            
                            return(
                                <FormControlLabel key={id} control={<Checkbox disableRipple onChange={() => handleCheckBoxBaseIngredients(event, topping) } checked={el.defaultToppings[topping]} value={topping}/> } label={topping} />

                            )
                        })
                    }
                    <Box sx={{ p: 2, bgcolor: '#bbfcfb' }}>
                     <Typography>
                        EXTRAS----------
                    </Typography>
                    {
                        Object.keys(el.extraToppings).map((extraTopping, id) => {
                          return(
                        
                            <FormControlLabel key ={id} control={<Checkbox disableRipple checked={el.extraToppings[extraTopping]} onChange={() => handleCheckBoxBaseIngredients(event, extraTopping) }  value={extraTopping}  />} label={extraTopping} />

                        )   
                    })
                }
                </Box>
                   
                 <Typography>
                    {`Total:${total}`}
                 </Typography>
                        
                    </FormGroup>
                 </Box>
                 </Modal>
                )
            })
        }

    </div>
   
  );
}
