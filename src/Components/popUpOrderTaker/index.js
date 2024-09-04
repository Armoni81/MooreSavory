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
// console.log(saladI, 'SALADD')
    const handleCheckBox = (event, topping) =>  {
      //bug if i select cease salad and uncheck all and then click on next salad they will all also be unchecked as well

        // saladInfo[0].defaultToppings[topping] = event.target.checked


        // set the changed checkbox in the Array of objects . FInd the index of the object that has changed along with the ingredient and set to either true or false 
        setSaladOptions(salad => {
            // console.log(salad, 'rick')
            const newSaladOptions = [...salad]
            const saladIndex = newSaladOptions.findIndex(salad => salad.title === selectedSalad)
            // console.log(newSaladOptions, 'yeet')

            if(saladIndex > -1){
                // console.log(topping, 'here topping')
                const updatedSalad = { ...newSaladOptions[saladIndex]}
                const updatedToppings = {...updatedSalad.defaultToppings}

                updatedToppings[topping] = event.target.checked
                updatedSalad.defaultToppings = updatedToppings
                newSaladOptions[saladIndex] = updatedSalad
              
            }
            console.log(newSaladOptions, 'final log')
            return newSaladOptions
            
        })
    
    }

   
console.log(saladOptions, 'here saldoptions')
  return (
    <div>
        {
            saladInfo.map((el, key) => {
                // {console.log(Object.keys(el.defaultToppings), 'here el ')}
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
                            {console.log(el, 'here is el')}
                            console.log(el.defaultToppings[topping], 'hererherhe')
                            
                            return(
                                <FormControlLabel key={id} control={<Checkbox disableRipple onChange={() => handleCheckBox(event, topping) } checked={el.defaultToppings[topping]} value={topping}/> } label={topping} />

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
                        
                            <FormControlLabel key ={id} control={<Checkbox disableRipple value='foobar' checked={el.extraToppings[extraTopping] } checked={el.extraToppings[extraTopping]}  value={extraTopping}  />} label={extraTopping} />

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
