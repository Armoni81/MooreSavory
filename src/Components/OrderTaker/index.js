import * as React from 'react';
import { useEffect, useMemo } from 'react';
import axios from 'axios';

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
import { styleForModalPopUp, saladInfo} from '../../Constants/consts';


const OrderTaker = ({ selectedSalad,  checkOutModal, setCheckOutModal, saladOptions, setSaladOptions, setTotal, total }) => {
   
   
    const handleClose = () => setCheckOutModal(false); 
    const renderSaladCustomizer = Array(saladOptions.find(salad => salad.Title === selectedSalad))
    
    console.log(renderSaladCustomizer, 'need it')


    

    const handleCheckBoxBaseIngredients = (event,topping) =>  {
 
        setSaladOptions(saladOptions => {
          
            const cacheSaladOptions = [...saladOptions]
            const grabSaladIndex = cacheSaladOptions.findIndex(salad => salad.title === selectedSalad)
            const defaultToppingsArray = Object.keys(cacheSaladOptions[grabSaladIndex].defaultToppings)
            const userSelectedSalad = { ...cacheSaladOptions[grabSaladIndex]}


            if(defaultToppingsArray.includes(event.target.value)){ // if  default topping checked
            
                    const cacheUserSelectedSaladToppings = {...userSelectedSalad.defaultToppings}
    
                    cacheUserSelectedSaladToppings[topping] = event.target.checked
                    userSelectedSalad.defaultToppings = cacheUserSelectedSaladToppings
                    cacheSaladOptions[grabSaladIndex] = userSelectedSalad
                
            }else{ //if extratopping chekced

                const cacheUserSelectedExToppings = {...userSelectedSalad.extraToppings}
                const cacheExToppingsValue = {...cacheUserSelectedExToppings[topping]}
           
                cacheExToppingsValue.checked = event.target.checked
                userSelectedSalad.extraToppings[topping] = cacheExToppingsValue
                cacheSaladOptions[grabSaladIndex].extraToppings[topping] = cacheExToppingsValue
         
            }
            console.log(cacheSaladOptions,'here')
            return cacheSaladOptions
        })
        

    }


    const addToCart = () => {
        alert(`Added to cart Total:${total}`)
        setCheckOutModal(false)
    }
    // console.log(renderSaladCustomizer, 's options')

  return (
    <div>
        { saladOptions.length >= 2 ? (
            renderSaladCustomizer.map((userSelectedSalad, key) => {
                const seperateEachTopping = userSelectedSalad.defaultToppings.split(',')
            
                return (
                    <Modal
                    open={checkOutModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    keepMounted
                    key={key}
                    >
                 <Box sx={styleForModalPopUp}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                     {userSelectedSalad.Title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {userSelectedSalad.description}
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'GrayText' }}>
                        {userSelectedSalad.saladDescription}
                    </Typography>
                    <FormGroup>
                    {
                        
                      seperateEachTopping.map((topping,id) => {
                            return(
                                <FormControlLabel key={id} control={<Checkbox disableRipple checked={userSelectedSalad.defaultToppings[topping]} onChange={(event) => handleCheckBoxBaseIngredients(event,topping) }  value={topping}/> } label={topping} />
                            )
                        })
                    }
                    <Box sx={{ p: 2, bgcolor: '#bbfcfb' }}>
                     <Typography>
                        EXTRAS
                    </Typography>
                    {/* {
                        Object.keys(userSelectedSalad.extraToppings).map((extraTopping, id) => {
                          return(
                        
                            <FormControlLabel key={id} control={<Checkbox disableRipple checked={userSelectedSalad.extraToppings[extraTopping].checked} onChange={(event) => handleCheckBoxBaseIngredients(event,extraTopping) }  value={extraTopping}  />} label={extraTopping} />

                        )   
                    }) */}
                {/* } */}
                </Box>
                   
                 <Typography>
                    {`Total:${total}`}
                 </Typography>
                        
                    </FormGroup>
                    <Button variant="contained" endIcon={<SendIcon />} onClick={addToCart}>Add To Cart</Button>
                 </Box>
                 </Modal>
                )
            })) :(
            <div>loading salads...</div>)
        }

    </div>
   
  );
}

export default OrderTaker