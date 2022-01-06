import React, { useState, useEffect } from 'react'
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit'
import '../css/app.css'
import { v4 as uuidv4 } from 'uuid'

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'RecipeTracker.recipes'

export default function App() {
  const [recipes, setRecipes] = useState(sampleRecipes)
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      cookTime: '',
      servings: 1,
      instructions: '',
      ingredients: [{ id: uuidv4(), name: '', amount: '' }],
      author: ''
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: "Mark's Kickin' Classic Breast of Chicken",
    author: 'Mark',
    cookTime: '20 minutes @ 425°',
    servings: 3,
    instructions:
      '1.) Preheat oven to 425°F/220°C (200°C fan).\n2.) Pound chicken to 1.5cm / 0.6" at the thickest part - using a rolling pin, meat mallet or even your fist (key tip for even cooking + tender chicken).\n3.) Mix Seasoning.\n4.) Line tray with foil and baking / parchment paper. Place chicken upside down on tray. Drizzle chicken with about 1 tsp oil. Rub over with fingers. Sprinkle with Seasoning.\n5.) Flip chicken. Drizzle with 1 tsp oil, rub with fingers, sprinkle with Seasoning, covering as much of the surface area as you can.\n6.) Bake 18 minutes, or until surface is golden per photos and video, or internal temperature is 165°F/75°C using a meat thermometer.\n7.) Remove from oven and immediately transfer chicken to serving plates.\n8.) Wait 3 - 5 minutes before serving, garnished with freshly chopped parsley if desired. Pictured with a side of Garlic Butter Rice with Kale.',
    ingredients: [
      { id: 1, name: 'Chicken Breast (6 0z.)', amount: '4' },
      { id: 2, name: 'Olive Oil', amount: '2 Tsp' },
      { id: 3, name: 'Salt', amount: '1/2 Tsp' },
      { id: 4, name: 'Pepper', amount: '1/2 Tsp' },
      { id: 5, name: 'Brown Sugar', amount: '1 1/2 Tbsp' },
      { id: 6, name: 'Dried Oregano or Thyme', amount: '1 Tsp' },
      { id: 7, name: 'Garlic Powder', amount: '1/4 Tsp' }
    ]
  }
]
