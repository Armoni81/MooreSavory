import React from "react";
import { useState } from "react";
import { saladChoices } from "../../Constants/consts";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import SimpleContainer from "../popUpOrderTaker";
import Chip from '@mui/material/Chip';


const OrderTaker = () => {

    const [ editOrder, setEditOrder]= useState(false)
    const [ selectedSalad, setSelectedSalad ] = useState("SMOKED SALMON SALAD")
    const [ checkOutModal, setCheckOutModal ]= useState(false)

    const placeOrder = (id) => {
        setSelectedSalad(saladChoices[id].title)
        setCheckOutModal(true)

     }
     const customerEditOrder = () => {
        setEditOrder(true)
     }

    return(
        <div>
           
        <div style = {{display:'grid', gridTemplateColumns: 'auto auto auto', gap: '10px', margin: '20px'}}>
            {
                  saladChoices.map((el, id) => {
                    
                    return (
                        <>
                        
                        <div key={id}>
                            <Card sx={{ width: 300, height: 400, backgroundColor: 'aliceblue' }}>
                                <Typography sx={{fontSize: '17px', margin:'15px'}}>
                                    {el.title}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={el.img}
                                    alt="Paella dish" />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {el.description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="contained" onClick={() => placeOrder(id)} endIcon={<SendIcon />}>Get Started</Button>
                                </CardActions>
                            </Card>
                        </div>
                        </>
                    )
                })

            }
            
          
        </div>
        <SimpleContainer selectedSalad={selectedSalad} checkOutModal={checkOutModal} setCheckOutModal={setCheckOutModal}/>
        </div>
    )
}

export default OrderTaker