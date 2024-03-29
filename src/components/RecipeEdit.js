import React, { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { v4 as uuidv4 } from 'uuid'

import { RecipeContext } from './App'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'

export default function RecipeEdit({ recipe }) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)

  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes })
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: '',
      amount: ''
    }
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] })
  }

  function handleIngredientDelete(id) {
    handleChange({ ingredients: recipe.ingredients.filter(i => i.id !== id) })
  }

  function handleIngredientChange(id, changes) {
    // const newIngredients = [...recipe.ingredients]
    // const index = newIngredients.findIndex(i => i.id === id)
    // newIngredients[index] = ingredient
    // handleChange({ ingredients: newIngredients })

    handleChange(
      recipe.ingredients.map(ingredient =>
        ingredient.id === id ? { ...ingredient, ...changes } : ingredient
      )
    )
  }

  return (
    <div className='recipe-edit'>
      <div className='recipe-edit__remove-button-container'>
        <button
          className='btn recipe-edit__remove-button'
          onClick={() => handleRecipeSelect(undefined)}
        >
          &times;
        </button>
      </div>
      <span className='recipe-edit__lock-recipe-container'>
        <input
          type='checkbox'
          className='recipe-edit__recipe-lock-checkbox'
          checked={recipe.isLocked}
          onChange={e => handleChange({ isLocked: e.target.checked })}
        />
        {recipe.isLocked ? (
          <FontAwesomeIcon className='recipe-edit__lock-icon' icon={faLock} />
        ) : (
          <FontAwesomeIcon className='recipe-edit__lock-icon' icon={faUnlock} />
        )}
      </span>
      <div className='recipe-edit__details-grid'>
        <label htmlFor='name' className='recipe-edit__label'>
          Name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          value={recipe.name}
          onChange={e => handleChange({ name: e.target.value })}
          className='recipe-edit__input'
        />
        <label
          htmlFor='author'
          className='recipe-edit__label recipe-author__label'
        >
          Author
        </label>
        <input
          type='text'
          name='author'
          id='author'
          value={recipe.author}
          onChange={e => handleChange({ author: e.target.value })}
          className='recipe-edit__input'
        />
        <label htmlFor='cookTime' className='recipe-edit__label'>
          Cook Time
        </label>
        <input
          type='text'
          name='cookTime'
          id='cookTime'
          value={recipe.cookTime}
          onChange={e => handleChange({ cookTime: e.target.value })}
          className='recipe-edit__input'
        />
        <label htmlFor='servings' className='recipe-edit__label'>
          Servings
        </label>
        <input
          type='number'
          min='1'
          name='servings'
          id='servings'
          value={recipe.servings}
          onChange={e =>
            handleChange({ servings: parseInt(e.target.value) || '' })
          }
          className='recipe-edit__input'
        />
        <label htmlFor='instructions' className='recipe-edit__label'>
          Instructions
        </label>
        <textarea
          htmlFor='instructions'
          className='recipe-edit__input'
          value={recipe.instructions}
          onChange={e => handleChange({ instructions: e.target.value })}
          id='instructions'
        ></textarea>
      </div>
      <br />
      <label className='recipe-edit__label'>Ingredients</label>
      <div className='recipe-edit__ingredient-grid'>
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map(ingredient => (
          <RecipeIngredientEdit
            key={ingredient.id}
            ingredient={ingredient}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
            Ingredient
          />
        ))}
      </div>
      <div className='recipe-edit__add-ingredient-btn-container'>
        <button
          className='btn btn--primary'
          onClick={() => handleIngredientAdd()}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  )
}
