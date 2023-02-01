import { Form, useActionData } from '@remix-run/react'
import { useState } from 'react'
import { AddFavouriteRecipeInput } from '~/graphql.type'

import { Button } from '../Button'
import { TextField } from '../FormFields/TextField'

export function AddFavouriteRecipeForm({ error, onClickHandler }: { onClickHandler: any; error?: any }) {
  const [ingredients, addIngredient] = useState(1)
  const [method, addMethod] = useState(1)

  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-4">
          <label className="text-lg font-medium leading-6" id="new-recipe">
            Submit your new favourite recipe
          </label>
          {error && <p className="mt-2 rounded-lg bg-red-700 py-2 px-6 text-sm font-bold text-white">{error}</p>}
        </div>
      </div>
      <div className="p2">
        <Form method="post" className="text-gray-900">
          <div className="flex flex-col">
            <div className="mr-4 w-full py-2">
              <b>Name:</b>
              <TextField id="recipe-name" name="name" defaultValue="Fave recipe" />
            </div>
            <div className="mr-4 w-full py-2">
              <b>Ingredients:</b>
              <div>
                {[...Array(ingredients)].map((i, index) => (
                  <div key={`${index}`} className="flex py-2">
                    <div key={`ingredient.${index}.name`} className="px-2">
                      <TextField id={`recipe-ingredient-${index}-name`} name={`ingredient.${index}.name`} defaultValue="Sugar" />
                    </div>
                    <div key={`ingredient.${index}.value`} className="px-2">
                      <TextField id={`recipe-ingredient-${index}-value`} name={`ingredient.${index}.value`} defaultValue="1" />
                    </div>
                    <div key={`ingredient.${index}.unit`} className="px-2">
                      {/* TODO: select box */}
                      <TextField id={`recipe-ingredient-${index}-unit`} name={`ingredient.${index}.unit`} defaultValue="G" />
                    </div>
                    <Button
                      id={`add-another-recipe-ingredient-${index}`}
                      className={`${index === ingredients - 1 ? "bg-cyan-700 hover:bg-cyan-600": "bg-indigo-100 disabled:pointer-events-none"} py-2`}
                      type="button"
                      onClick={() => {
                        addIngredient(ingredients + 1)
                      }}
                      disabled={index < ingredients - 1}
                    >
                      +
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mr-4 w-full py-2">
              <b>Method:</b>
              <div>
                {[...Array(method)].map((i, index) => (
                  <div key={`${index}`} className="flex py-2">
                    <div key={`method.${index}.instructions`} className="px-2">
                      <TextField id={`recipe-method-${index}-instructions`} name={`method.${index}.instructions`} defaultValue="Add it in" />
                    </div>
                    <Button
                      id={`add-another-recipe-method-step-${index}`}
                      className={`${index === method - 1 ? "bg-cyan-700 hover:bg-cyan-600": "bg-indigo-100 disabled:pointer-events-none"} py-2`}
                      type="button"
                      onClick={() => {
                        addMethod(method + 1)
                      }}
                      disabled={index < method - 1}
                    >
                      +
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Button id="submit-recipe" className="bg-cyan-700 hover:bg-cyan-600 py-2" type="submit" onClick={onClickHandler}>
              Confirm
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
