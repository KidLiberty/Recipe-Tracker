import React, { useState, useContext, useMemo } from 'react'
import Recipe from './Recipe'
import { RecipeContext } from './App'

export default function RecipeList({ recipes }) {
  const [searchedRecipe, setSearchedRecipe] = useState('')
  const { handleRecipeAdd } = useContext(RecipeContext)

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchedRecipe.toLowerCase())
    )
  }, [recipes, searchedRecipe])

  return (
    <div className='recipe-list'>
      <input
        type='text'
        name='search'
        id='search'
        placeholder='Search...'
        className='recipe-edit__input'
        onChange={e => setSearchedRecipe(e.target.value)}
      />
      <div>
        {searchedRecipe !== ''
          ? filteredRecipes.map(recipe => {
              return <Recipe key={recipe.id} {...recipe} />
            })
          : recipes.map(recipe => {
              return <Recipe key={recipe.id} {...recipe} />
            })}
      </div>
      <div className='recipe-list__add-recipe-btn-container'>
        <button className='btn btn--primary' onClick={handleRecipeAdd}>
          Add New Recipe
        </button>
      </div>
    </div>
  )
}
