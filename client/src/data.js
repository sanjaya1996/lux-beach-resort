// {
//   id: 1,
//   category: '',
//   title: '',
//   imageUrl: '',
//   duration: 10,
//   ingredients: '',
//   isGlutenFree: false,
//   isVegan: true,
//   isVegetarian: true,
//   isLactoseFree: true,
// },

const MEALS = [
  {
    id: 1,
    category: 'Italian',
    name: 'Spaghetti with Tomato Sauce',
    price: 20.0,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
    duration: 20,
    ingredients: 'Napoletana sauce, garlic, cherry tomato, basil and parmesan.',
    isGlutenFree: false,
    isVegan: true,
    isVegetarian: true,
    isLactoseFree: true,
  },
  {
    id: 2,
    category: 'Quick & Easy',
    name: 'Classic Hawaii',
    price: 15.0,
    imageUrl:
      'https://cdn.pixabay.com/photo/2018/07/11/21/51/toast-3532016_1280.jpg',
    duration: 10,
    ingredients:
      '1 Slice White Bread, 1 Slice Ham, Pinapple Slice, Slice of Cheese and Butter',
    isGlutenFree: false,
    isVegan: false,
    isVegetarian: false,
    isLactoseFree: false,
  },
  {
    id: 3,
    category: 'Hamburgers',
    name: 'Classic Hamburger',
    price: 14.5,
    imageUrl:
      'https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg',
    duration: 45,
    ingredients:
      '300g Cattle Hack, Tomato, Cucumber, Pickel, Onion and Ketchup',
    isGlutenFree: false,
    isVegan: false,
    isVegetarian: false,
    isLactoseFree: true,
  },
];

export default MEALS;
