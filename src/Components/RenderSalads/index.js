import React from "react";
import { useState, Fragment, useEffect } from "react";
//Axios 
import axios from "axios";
//Material UI
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
//Imported Consts
import { saladChoices } from "../../Constants/consts";
//Imported Components
import OrderTaker from "../OrderTaker";

const RenderSalads = ({ total, setTotal, setSaladsAddedToCart, saladsAddedToCart }) => {



    const [ selectedSalad, setSelectedSalad ] = useState("")
    const [ checkOutModal, setCheckOutModal ]= useState(false)
    const [ saladOptions, setSaladOptions ] = useState([{}])
    const [ checkedItems, setCheckedItems ] = useState([{}])

    const fetchSalads = async () => {
        try{
            const res = await axios.get('http://localhost:8800/SaladsChoices')
            setSaladOptions(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    
    useEffect(() => {
        fetchSalads()

    },[])

    
    const placeOrder = (id) => {
        setSelectedSalad(saladOptions[id].Title)
        const userSelectedSalad = saladOptions[id].Title
        // console.log(userSelectedSalad, 'userselected')
        setCheckOutModal(true)
        setTotal(saladOptions[id].price)
        setCheckedItems( items => {
            let obj = []
            const toArray = Array(saladOptions[id])
            const salad= toArray.find(salad => salad.Title === userSelectedSalad)
            const splitToArr = salad.defaultToppings.split(',')
            splitToArr.map((el) => {      
                obj[el] = true
                
            })
            return obj
        })
    }
    // console.log(selectedSalad, 'selectedsalad')

//    console.log(checkedItems, 'checked?')
    return(
        <Fragment>
        <div style = {{display:'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)', gap: '10px', margin: '40px'}}>
            { saladOptions.length === 0 ?   <div>
                <p>Loading Salads...</p>
                </div>:
                  saladOptions.map((salad, id) => {
                    return (
                        <Fragment key={id}>
                            <Card sx={{ width: 300, height: 400, backgroundColor: 'aliceblue' }}>
                                <Typography sx={{fontSize: '15px', margin:'15px'}}>
                                    {salad.Title}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={salad.img}
                                    alt="Paella dish" />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {salad.description}
                                    </Typography>
                                </CardContent>
                                <CardActions  style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography>
                                        {salad.price}
                                    </Typography>
                                    <Button variant="contained" onClick={() => placeOrder(id)} endIcon={<SendIcon />}>Get Started</Button>
                                </CardActions>
                            </Card>
                        </Fragment>
                    )
                })
           }
        </div>
        <OrderTaker selectedSalad={selectedSalad} checkOutModal={checkOutModal} setCheckOutModal={setCheckOutModal} saladOptions={saladOptions} setSaladOptions={setSaladOptions} total={total} setTotal={setTotal} checkedItems={checkedItems} setCheckedItems={setCheckedItems} setSaladsAddedToCart={setSaladsAddedToCart} saladsAddedToCart={saladsAddedToCart}/>
        </Fragment>
    )
}

export default RenderSalads