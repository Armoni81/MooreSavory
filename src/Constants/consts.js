import salad from '../images/Salad.jpg'

export const saladChoices = [
  
    {
        title: "Uncle Rucks",
        description: "680 Cal per Salad (Includes toppings and dressing)",
        img: salad,
        defaultToppings: {Strawberries: true, onions: false, croutons: true, almonds: true }
      },

    {

        title: "Uncle Teddy",
        description: "680 Cal per Salad (Includes toppings and dressing)",
        img: salad,
        defaultToppings: {Strawberries: true, onions: true, croutons: true, almonds: true }
    },
    {
        title: "Cassie Salad",
        description: "480 Cal per Salad (Includes toppings and dressing)",
        img: salad,
        defaultToppings: {Strawberries: true, onions: true, croutons: true, almonds: true }
      },
      {
        title: "Aydens Salad",
        description: "770 Cal per Salad (Includes toppings and dressing)",
        img: salad,
        defaultToppings: {Strawberries: true, onions: true, croutons: true, almonds: true }
      },
      {
        title: "Teria Salad",
        description: "880 Cal per Salad (Includes toppings and dressing)",
        img: salad,
        defaultToppings: {Strawberries: true, onions: true, croutons: true, almonds: true }
      },


  ];

  //Styles

  export const styleForModalPopUp = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    aspectRatio: "16 / 9",
    margin: "0 auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    backgroundColor: 'green'
}