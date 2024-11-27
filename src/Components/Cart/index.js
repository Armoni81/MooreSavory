import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


const Cart = ({saladsAddedToCart, setSaladsAddedToCart, total, setTotal }) => {

const grabSalads = JSON.parse(sessionStorage.getItem('cart'))


const removeSalad = (key) => {
    const items = JSON.parse(sessionStorage.getItem('cart'))
    items.splice(key,1)
    sessionStorage.setItem('cart',JSON.stringify(items) )

    if(items.length <= 0){
        window.location.href = '/order'
    }
    setTotal('0.00')


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
    <Button variant="contained">Place Order</Button>
</Box>

        </Container>

        </React.Fragment>
    )
}

export default Cart