import react from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddSalad = ()=> {

    const navigateHome = useNavigate()

    const [ input , setInput] = useState({
        title:'',
        price: null,
        description:'',
        saladDesc: '',

    })

    const handleChange  = (e) => {
       setInput(input => ({...input, [e.target.name]: e.target.value}))
    }
    const addSalad = async () =>{
        

        try{

            await axios.post("http://localhost:8800/SaladsChoices", input)
            // navigateHome("/")
        }
        catch(err){
            console.log(err)
        }
        const res = await axios.get('http://localhost:8800/SaladsChoices')
        console.log(res.data, 'resss')
    }
console.log(input)
    return(
        <div>
            <h1> ADD SALAD</h1>
            <input type="text" placeholder='title' name='title' onChange={handleChange}/>
            <input type="number" placeholder='price' name='price'onChange={handleChange}/>
            <input type="text" placeholder='description' name='description' onChange={handleChange}/>
            <input type="text" placeholder='saladDesc' name='saladDesc' onChange={handleChange}/>
            <button onClick={addSalad}>Submit</button>

        </div>
    )
}

export default AddSalad