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
            console.log(data, 'data')
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


app.get("/", (req,res) => {
    res.json('this is our backend')
})

app.listen(8800, ()  =>{
    console.log('connected')
})