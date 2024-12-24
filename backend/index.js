import express from "express";
import mysql2 from "mysql2"
import cors from "cors"

const app = express()
const db = mysql2.createConnection({
    host:"localhost",
    user: "root",
    password: 'tigner81',
    database: "MooreSavory Salads"
})
app.use(express.json())
app.use(cors())
app.get("/SaladsChoices",(req,res) => {
    const q = 'SELECT * FROM `MooreSavory Salads`.`Salad Choices`;'
    db.query(q, (err,data)=> {
        if(err) return res.json(err)
            (data, 'data')
        return res.json(data)
    })
})
app.post("/SaladsChoices", (req,res) => {
    const q = "INSERT INTO `MooreSavory Salads`.`Salad Choices` (`title`, `price`,`description`, `saladDesc`) VALUES (?)"

    const values = [
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.saladDesc
    ]
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
            return res.json('added')
    })
})
app.get("/customerOrder",(req,res) => {
    const q = 'SELECT * FROM `MooreSavory Salads`.`customer_orders`;'
    db.query(q, (err,data)=> {
        if(err) return res.json(err)
            (data, 'data')
        return res.json(data)
    })
})
app.post("/customerOrder", (req, res) => {
    const q = "INSERT INTO `MooreSavory Salads`.`customer_orders` (`salad`, `toppings`, `total`, `customerName`, `date`) VALUES ?";

    // Prepare values for all orders
    const values = req.body.map((order) => {
        const toppings = Object.keys(order.selectedToppings).join(",");
        order['date'] = new Date()
        console.log(order.price, 'loaded')
        return [order.title, toppings, order.price, order.name, order.date];
    });

    // Execute a single query for all orders
    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Error inserting orders:", err);
            return res.status(500).json({ error: "Failed to insert orders", details: err });
        }
        return res.status(201).json({ message: "Orders added successfully", data });
    });
});



app.get("/", (req,res) => {
    res.json('this is our backend')
})

app.listen(8800, ()  =>{
    ('connected')
})