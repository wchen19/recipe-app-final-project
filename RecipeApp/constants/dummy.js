const recipes = [
  {
    id: 1,
    recipeName: 'Pesto Pasta',
    ingredients: [
      '1 pound pasta',
      '1/2 cup pesto sauce',
      '1/4 cup grated Parmesan cheese',
      '1/4 cup pine nuts',
    ],
    instruction:
      'Cook pasta according to package directions. Drain and return to pot. Stir in pesto sauce, Parmesan cheese, and pine nuts. Serve hot.',
  },
  {
    id: 2,
    recipeName: 'Chicken Curry',
    ingredients: [
      '1 pound chicken breast, cubed',
      '1 onion, chopped',
      '2 cloves garlic, minced',
      '1 tablespoon curry powder',
      '1 can coconut milk',
      '1/2 cup chicken broth',
      '1 tablespoon vegetable oil',
    ],
    instruction:
      'Heat oil in a large skillet over medium heat. Add onion and garlic and sauté until softened. Add chicken and curry powder and cook until chicken is browned. Stir in coconut milk and chicken broth. Bring to a simmer and cook until chicken is cooked through. Serve over rice.',
  },
  {
    id: 3,
    recipeName: 'Caprese Salad',
    ingredients: [
      '2 large tomatoes, sliced',
      '8 ounces fresh mozzarella cheese, sliced',
      '1/4 cup fresh basil leaves',
      '2 tablespoons balsamic vinegar',
      '2 tablespoons olive oil',
      'Salt and pepper, to taste',
    ],
    instruction:
      'Arrange tomato and mozzarella slices on a serving platter. Scatter basil leaves over the top. Drizzle with balsamic vinegar and olive oil. Season with salt and pepper.',
  },
  {
    id: 4,
    recipeName: 'Beef Stir-Fry',
    ingredients: [
      '1 pound beef sirloin, thinly sliced',
      '1 red bell pepper, sliced',
      '1 green bell pepper, sliced',
      '1 onion, sliced',
      '2 cloves garlic, minced',
      '1/4 cup soy sauce',
      '1 tablespoon cornstarch',
      '1 tablespoon vegetable oil',
    ],
    instruction:
      'In a small bowl, whisk together soy sauce and cornstarch. Set aside. Heat oil in a large skillet over high heat. Add beef and stir-fry until browned. Add bell peppers, onion, and garlic and stir-fry until vegetables are crisp-tender. Pour soy sauce mixture over the top and stir until sauce thickens. Serve hot over rice.',
  },
  {
    id: 5,
    recipeName: 'Mushroom Risotto',
    ingredients: [
      '1 cup Arborio rice',
      '1/2 pound mushrooms, sliced',
      '1/2 onion, chopped',
      '2 cloves garlic, minced',
      '4 cups chicken broth',
      '1/2 cup white wine',
      '2 tablespoons butter',
      '1/4 cup grated Parmesan cheese',
    ],
    instruction:
      'In a large saucepan, heat butter over medium heat. Add onion and garlic and sauté until softened. Add mushrooms and sauté until mushrooms release their liquid. Add rice and stir to coat. Add wine and stir until wine is absorbed. Add chicken broth, one cup at a time, stirring until each cup is absorbed before adding the next. Continue stirring and adding broth until rice is',
  },
];

const categories = recipes;

export default {
  recipes,
  categories,
};
