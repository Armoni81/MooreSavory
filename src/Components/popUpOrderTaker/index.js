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
         
                calculateTotal(newSaladOptions,saladIndex,topping)
            }
            
            return newSaladOptions
        })
    
    }

    const calculateTotal = (newSaladOptions, saladIndex, topping) => {

        // if(newSaladOptions[saladIndex].extraToppings[topping].checked){
        //     newSaladOptions[saladIndex].extraToppings[topping]
        // }
      
       Object.values(newSaladOptions[saladIndex].extraToppings).map(el => {
        // console.log(el.checked)
                
     
                    setTotal(total =>{
                        console.log(total,el.price,el.checked,'price')
                        //bug if el.checked runs everyu check gets added twice on every new click 
                        if(el.checked === true){
                            total += el.price
                            el.price = 0

                        }else{
                            console.log(el.price, 'should be 0')
                            console.log( newSaladOptions[saladIndex].extraToppings[topping], 'word')
                            el.price = saladOptions[saladIndex].extraToppings[topping].price
                            ///stopped here kid
                            total -= el.price
                        }
                       return total
                    } )
               
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
