import { type LoaderArgs, json, type ActionArgs } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { PageLayout } from '~/components/PageLayout'
import { Hero } from '~/components/Hero'
import { Box } from '~/components/Wrappers/Box'
import { AddFavouriteRecipe, client, GetFavouriteRecipes } from '~/graphql'
import type { GetFavouriteRecipesQuery, GetFavouriteRecipesResponse, AddFavouriteRecipeMutation } from '~/graphql.type'
import { RecipeItem } from '~/components/RecipeItem'
import { TextField } from '~/components/FormFields/TextField'

export async function action({ request }: ActionArgs) {
  const body = await request.formData()
  const ingredients: Record<string, unknown>[] = []
  const method: Record<string, unknown>[] = []
  const input: Record<string, unknown> = {}
  for (const [key, value] of body.entries()) {
    if (key === 'name') {
      input.name = value
    }
    if (key.startsWith('ingredient')) {
      const [, rawIndex, field] = key.split('.')
      const index = Number(rawIndex)
      if (!ingredients[index]) {
        ingredients.push({ measure: {} })
      }

      if (field === 'name') {
        ingredients[index].name = value
      }
      if (field === 'value') {
        ;(ingredients[index].measure as any).value = Number(value)
      }
      if (field === 'unit') {
        ;(ingredients[index].measure as any).unit = value
      }
    }
    if (key.startsWith('method')) {
      method.push({ instructions: value })
    }
  }
  input.ingredients = ingredients
  input.method = method

  try {
    const response = await client.request<AddFavouriteRecipeMutation>(AddFavouriteRecipe, { input })
    const { addFavouriteRecipe } = response
    if (addFavouriteRecipe?.__typename === 'AddFavouriteRecipeResult') {
      return json({})
    }
    if (addFavouriteRecipe?.__typename === 'ServerError') {
      return json({ error: new Error(addFavouriteRecipe.message) })
    }
    return json({})
  } catch (error: any) {
    return json({ error })
  }
}

export async function loader({ request, params }: LoaderArgs) {
  try {
    const url = new URL(request.url)
    const search = new URLSearchParams(url.search)
    const response = await client.request<GetFavouriteRecipesQuery>(GetFavouriteRecipes, {
      input: { name: search.get('recipeName') }
    })
    const { getFavouriteRecipes } = response
    return json({ data: getFavouriteRecipes })
  } catch (error: any) {
    return json({ error })
  }
}

interface LoaderType {
  data?: GetFavouriteRecipesResponse
  error?: any
}

export default function Index() {
  const { data } = useLoaderData<LoaderType>()
  return (
    <PageLayout>
      <Hero />
      <div className="bg-zinc-100">
        <div className="mx-auto max-w-5xl py-6 px-2 lg:px-8">
          <Box>
            <h2 className="text-2xl tracking-tight">My recipes</h2>
            <div className="divide-y-2 divide-slate-400 rounded-md border border-slate-300 bg-slate-100 p-4">
              Press [enter] to search for recipe by name:
              <Form className="text-gray-900">
                <TextField id="search-for-recipe-by-name" type="text" name="recipeName" defaultValue="" />
              </Form>
            </div>
            <div id="recipes" className="space-y-6">
              {data?.edges.map((edge, index) => (
                <RecipeItem key={`recipe-${index}`} {...edge.node} />
              ))}
            </div>
          </Box>
        </div>
      </div>
    </PageLayout>
  )
}
