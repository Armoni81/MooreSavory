import salad from '../images/Salad.jpg'

export const saladChoices = [
    {
        title: "MOORE SAVORY SHRIMP SALAD",
        description: "Tomatoes, onions, strawberries, cranberry/pecan mix, feta cheese",
        img: salad,  // Replace "salad" with the actual image URL or reference
        saladDescription: "A savory mix of shrimp, fresh tomatoes, onions, strawberries, and a cranberry/pecan mix, all topped with feta cheese.",
        defaultToppings: {
          'Shrimp': true,
          'Tomatoes': true,
          'Onions': false,
          'Strawberries': true,
          'Cranberry/Pecan Mix': true,
          'Feta': true
        },
        extraToppings: {
            'Extra Onion + $1.00': {checked: false, price: 1},
            'Extra Shrimp + $3.50':  {checked: false, price: 3.50},
            'Extra Strawberries + $1.00':{checked: false, price: 1},
            'Extra Feta + $2.00': {checked: false, price: 2},
            'Extra Dressing + $1.00': {checked: false, price: 1},
            'Add Cheese + $1.50': {checked: false, price: 1.50},

        },
        price: 17.00
      },
      {
        title: "CHICKEN CAESAR SALAD",
        description: "Romaine lettuce, shaved parmesan, and croutons",
        img: salad,  // Replace "salad" with the actual image URL or reference
        saladDescription: "A classic Caesar salad with fresh romaine lettuce, shaved parmesan, and crunchy croutons.",
        defaultToppings: {
          'Chicken': true,
          'Romaine Lettuce': true,
          'Shaved Parmesan': true,
          'Croutons': false
        },
        extraToppings: {
            'Extra Onion': false,
            'Extra Shrimp':  false,
            'Extra Strawberries': false,
            'Extra Feta': false,
            'Extra Dressing': false,
            'Add Cheese': false,

        },
        price: '$13.75'
      },
      {
        title: 'SMOKED SALMON SALAD',
        description: 'Tomatoes, cucumbers, onion, bell pepper, and feta cheese',
        img: salad,  // Replace "salad" with the actual image URL or reference
        saladDescription: 'A smoky twist on the classic salmon salad with fresh tomatoes, cucumbers, onion, bell pepper, and crumbled feta cheese.',
        defaultToppings: {
          'Smoked Salmon': true,
          'Tomatoes': true,
          'Cucumbers': true,
          'Onions': false,
          'Bell Pepper': true,
          'Feta': true
        },
        extraToppings: {
            'Extra Onion': false,
            'Extra Shrimp':  false,
            'Extra Strawberries': false,
            'Extra Feta': false,
            'Extra Dressing': false,
            'Add Cheese': false,

        },
        price: '$20.00'
      },
      {
        title: 'SALMON CAESAR',
        description: 'Romaine lettuce, shaved parmesan, and croutons',
        img: salad,  // Replace "salad" with the actual image URL or reference
        saladDescription: 'A rich Caesar salad with romaine lettuce, shaved parmesan, croutons, and topped with salmon.',
        defaultToppings: {
          'Salmon': true,
          'Romaine Lettuce': true,
          'Shaved Parmesan': true,
          'Croutons': true
        },
        extraToppings: {
            'Extra Onion': false,
            'Extra Shrimp':  false,
            'Extra Strawberries': false,
            'Extra Feta': false,
            'Extra Dressing': false,
            'Add Cheese': false,

        },
        price: '$17.00'
      },
      {
        title: 'CHARLIES STRAWBERRY CHICKEN',
        description: 'Onions, feta cheese, cranberry/pecan mix, and strawberries',
        img: salad,  // Replace "salad" with the actual image URL or reference
        saladDescription: 'A sweet and savory salad featuring onions, feta cheese, cranberry/pecan mix, and strawberries, topped with grilled chicken.',
        defaultToppings: {
          'Chicken': true,
          'Onions': true,
          'Feta': true,
          'Cranberry/Pecan Mix': true,
          'Strawberries': true
        },
        extraToppings: {
            'Extra Onion': false,
            'Extra Shrimp':  false,
            'Extra Strawberries': false,
            'Extra Feta': false,
            'Extra Dressing': false,
            'Add Cheese': false,

        },
        price: '$14.25'
      },
      {
        title: 'O LOIS CHEF',
        description: 'Ham & turkey, cucumbers, tomatoes, onions, cheese, and bacon bits',
        img: salad,  // Replace "salad" with the actual image URL or reference
        saladDescription: 'A hearty chef salad with ham, turkey, cucumbers, tomatoes, onions, cheese, and crispy bacon bits.',
        defaultToppings: {
          'Ham': true,
          'Turkey': true,
          'Cucumbers': true,
          'Tomatoes': true,
          'Onions': true,
          'Cheese': true,
          'Bacon Bits': true
        },
        extraToppings: {
            'Extra Onion': false,
            'Extra Shrimp':  false,
            'Extra Strawberries': false,
            'Extra Feta': false,
            'Extra Dressing': false,
            'Add Cheese': false,

        },
        price: '$14.25'
      },
      {
        title: 'OLAS VEGGIE DELIGHT',
        description: 'Tomatoes, cucumbers, onions, banana peppers, and pickles',
        img: salad,  // Replace "salad" with the actual image URL or reference
        saladDescription: 'A veggie-packed salad with tomatoes, cucumbers, onions, banana peppers, and pickles.',
        defaultToppings: {
          'Tomatoes': true,
          'Cucumbers': true,
          'Onions': true,
          'Banana Peppers': true,
          'Pickles': true
        },
        extraToppings: {
            'Extra Onion': false,
            'Extra Shrimp':  false,
            'Extra Strawberries': false,
            'Extra Feta': false,
            'Extra Dressing': false,
            'Add Cheese': false,

        },
        price: '$13.25'
      },
      {
        title: 'GREEK SALAD',
        description: 'Tomatoes, onions, olives, bell pepper, banana pepper, and feta cheese',
        img: salad,  // Replace "salad" with the actual image URL or reference
        saladDescription: 'A traditional Greek salad with tomatoes, onions, olives, bell pepper, banana pepper, and feta cheese.',
        defaultToppings: {
          'Tomatoes': true,
          'Onions': true,
          'Olives': true,
          'Bell Pepper': true,
          'Banana Pepper': true,
          'Feta': true
        },
        extraToppings: {
            'Extra Onion': false,
            'Extra Shrimp':  false,
            'Extra Strawberries': false,
            'Extra Feta': false,
            'Extra Dressing': false,
            'Add Cheese': false,

        },
        price: '$13.25'
      },
      {
        title: 'SHRIMP SALAD',
        description: 'Tomatoes, cucumber, onion, olives, and cheese',
        img: salad,  // Replace "salad" with the actual image URL or reference
        saladDescription: 'A seafood delight with shrimp, tomatoes, cucumber, onion, olives, and cheese.',
        defaultToppings: {
          'Shrimp': true,
          'Tomatoes': true,
          'Cucumbers': true,
          'Onions': true,
          'Olives': true,
          'Cheese': true
        },
        extraToppings: {
            'Extra Onion': false,
            'Extra Shrimp':  false,
            'Extra Strawberries': false,
            'Extra Feta': false,
            'Extra Dressing': false,
            'Add Cheese': false,

        },
        price: '$16.00'
      }
      
   
  ];

  //Styles

  export const styleForModalPopUp = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    aspectRatio: "16 / 9",
    margin: "0 auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    backgroundColor: 'aliceblue'
}