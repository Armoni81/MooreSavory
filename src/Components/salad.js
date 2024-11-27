import react from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Salad = () => {
const [ salad, setSalad]= useState([{}])

// useEffect(() => {
//     const fetchSalads = async () => {
//         try{
//             const res = await axios.get('http://localhost:8800/SaladsChoices')
//             console.log(res.data, 'res')
//             setSalad(res.data)

//         }
//         catch(err){
//             console.log(err)
//         }
//     }
//     fetchSalads()
// },[])


    return (
        <div>
            <h1>Mr too SKiii</h1>
            <div>
                {salad.map(salad => {

                    return (
                            <div key={salad.idSalads}>
                                <p>{salad.title}</p>
                                <p>{salad.price}</p>
                            </div>
                        
                    )
                }
                )}
            </div>
            <button><Link to="/add">Add Salad</Link></button>
        </div>
    )
}

export default Salad