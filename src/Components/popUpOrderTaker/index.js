import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styleForModalPopUp } from '../../Constants/consts';
import { saladChoices } from '../../Constants/consts';

export default function SimpleContainer({ selectedSalad,  checkOutModal, setCheckOutModal }) {
    
    const handleClose = () => setCheckOutModal(false);

    const saladInfo = Array(saladChoices.find(salad => salad.title === selectedSalad))

    const handleCheckBox = (event, topping) =>  {
      //bug if i select cease salad and uncheck all and then click on next salad they will all also be unchecked as well
        console.log(saladInfo, 'saladinfo')
        console.log(saladChoices, 'saladChoices')
        saladInfo[0].defaultToppings[topping] = event.target.checked
    
    }

   

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
                            console.log(id, 'hererherhe')
                          
                            return(
                                <FormControlLabel control={<Checkbox disableRipple onChange={() => handleCheckBox(event, topping) } defaultChecked={el.defaultToppings[topping]} value={topping}/> } label={topping} />

                            )
                        })
                    }
                     
                    </FormGroup>
                 </Box>
                 </Modal>
                )
            })
        }

    </div>
   
  );
}
