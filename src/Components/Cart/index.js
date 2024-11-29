import React from "react";
import { useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Cart = ({saladsAddedToCart, setSaladsAddedToCart, total, setTotal, cartTotal, setCartTotal }) => {



const grabSalads = JSON.parse(sessionStorage.getItem('cart'))
const navigatePage = useNavigate()

console.log(grabSalads, 'yoo')
const removeSalad = (key) => {
    console.log(key, 'key')
    const items = JSON.parse(sessionStorage.getItem('cart'))
    console.log(items, 'b4 splice')
    items.splice(key,1)
    console.log(items, 'after splice')
    sessionStorage.setItem('cart',JSON.stringify(items) )

    if(items.length <= 0){
        window.location.href = '/order'
    }
    setSaladsAddedToCart(items)
    // setTotal('0.00')


}
const placeOrder =  async () => {
    const z = {salad: 'Armoni', total: 9, toppings: 'toppin'}
    console.log(z.salad, z.total, z.toppings)
    grabSalads[0]['name'] = 'Armoni'
    console.log(grabSalads, 'grabem')

    for(let key in grabSalads){
       
        grabSalads[key]['name'] = 'Armoni'
    }


    try{
      await  axios.post("http://localhost:8800/customerOrder", grabSalads )
        console.log('hi')
        setTotal('0.00')
        navigatePage('/')
        sessionStorage.setItem('cart', JSON.stringify([]))
    }
    catch(err){
        console.error(err)
    }
}
    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100%' }}>
            <h1>Cart</h1>
            { 
    grabSalads.length ===  0 ? 
        <div>
          <p> You have not added any Savory Salads to your to your car yet!</p>  
          <Button size="medium" variant="contained" onClick={() => navigatePage('/order')}>Get started</Button>
        </div> 
        :
        <div>
            { 
                grabSalads.map((el, key) => { 
                    const trueValues = Object.keys(el.selectedToppings).filter(value => el.selectedToppings[value]);
                    return (
                        <React.Fragment>
                            <Box key={key} sx={{ bgcolor: 'white', padding: '20px' }}>
                                <Typography> {`Price: ${el.price}`}</Typography>
                                <Typography>{`Title: ${el.title}`}</Typography>
                                <Typography>{`Toppings: ${trueValues.join(', ')}`}</Typography>
                                <Button size="small" variant="outlined">Edit</Button>
                                <Button size="small" variant="outlined" onClick={() => removeSalad(key)}>Delete</Button>
                            </Box>
                            <Divider />
                        </React.Fragment>
                    );
                })
            }
        
            <h1>Total:0 </h1>
    <Button variant="contained" onClick={() => placeOrder()}>Place Order</Button>
        </div>
}

</Box>

        </Container>

        </React.Fragment>
    )
}

export default Cart