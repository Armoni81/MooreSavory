import * as React from 'react';

//Material UI 
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import  { Button }  from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

//Imported Consts
import { styleForModalPopUp } from '../../Constants/consts';


export default function SimpleContainer({ selectedSalad,  checkOutModal, setCheckOutModal, saladOptions, setSaladOptions, setTotal, total }) {
   
    let valueToBeAdded;

    const handleClose = () => setCheckOutModal(false); 

    const saladInfo = Array(saladOptions.find(salad => salad.title === selectedSalad))

    const handleCheckBoxBaseIngredients = (event,topping) =>  {
 
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

                const updatedExtraToppings = {...updatedSalad.extraToppings}
                const updatedCheckedProp = {...updatedExtraToppings[topping]}
           
                updatedCheckedProp.checked = event.target.checked
                updatedSalad.extraToppings[topping] = updatedCheckedProp
                newSaladOptions[saladIndex].extraToppings[topping] = updatedCheckedProp
         
            }

            setTotal(updatedSalad.price)
            let totalToBeAdded = calculateTotal(newSaladOptions,saladIndex,topping)
   
            setTotal(total => {
            const removeDollarSign = Number(total.replace('$', '')) // sets total to a Number and removes the $

            const newTotal = removeDollarSign + totalToBeAdded

              return `$${newTotal.toFixed(2)}`
            })
     
            return newSaladOptions
        })
        

    }

 
    const calculateTotal = (newSaladOptions, saladIndex, topping) => {
        let index = 0
    
        Object.values(newSaladOptions[saladIndex].extraToppings).forEach(obj => {

        if(obj.checked){
            index += obj.price
        }        
    })
    console.log(index)
    return index
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
                                <FormControlLabel key={id} control={<Checkbox disableRipple onChange={(event) => handleCheckBoxBaseIngredients(event,topping) } checked={el.defaultToppings[topping]} value={topping}/> } label={topping} />
                            )
                        })
                    }
                    <Box sx={{ p: 2, bgcolor: '#bbfcfb' }}>
                     <Typography>
                        EXTRAS
                    </Typography>
                    {
                        Object.keys(el.extraToppings).map((extraTopping, id) => {
                          return(
                        
                            <FormControlLabel key={id} control={<Checkbox disableRipple checked={el.extraToppings[extraTopping].checked} onChange={(event) => handleCheckBoxBaseIngredients(event,extraTopping) }  value={extraTopping}  />} label={extraTopping} />

                        )   
                    })
                }
                </Box>
                   
                 <Typography>
                    {`Total:${total}`}
                 </Typography>
                        
                    </FormGroup>
                    <Button variant="contained" endIcon={<SendIcon />}>Add To Cart</Button>
                 </Box>
                 </Modal>
                )
            })
        }

    </div>
   
  );
}
