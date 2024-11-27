import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import axios from "axios";


const Cart = ({saladsAddedToCart, setSaladsAddedToCart, total, setTotal }) => {

const grabSalads = JSON.parse(sessionStorage.getItem('cart'))

console.log(grabSalads, 'yoo')
const removeSalad = (key) => {
    const items = JSON.parse(sessionStorage.getItem('cart'))
    items.splice(key,1)
    sessionStorage.setItem('cart',JSON.stringify(items) )

    if(items.length <= 0){
        window.location.href = '/order'
    }
    setTotal('0.00')


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
                grabSalads.map((el, key) => {
                 const trueValues = Object.keys(el.selectedToppings).filter(value => el.selectedToppings[value])
                    return (
                        <Box key={key} sx={{ bgcolor: 'white', padding: '20px'}}>
                            <p>{`(${key+ 1}) Price: ${el.price}`}</p>
                            <p>{`Title:${el.title}`}</p>
                            <p>{`Toppings: ${trueValues}`}</p>
                            <button onClick={() => removeSalad(key)}>Delete</button>
                        </Box>
                    )
                })
            }
            <h1>Total: </h1>
    <Button variant="contained" onClick={() => placeOrder()}>Place Order</Button>
</Box>

        </Container>

        </React.Fragment>
    )
}

export default Cart