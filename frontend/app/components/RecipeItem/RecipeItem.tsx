import type { Recipe } from '~/graphql.type'

export function RecipeItem(props: Recipe) {
  console.log(props)
  return (
    <div className="divide-y-2 divide-slate-400 rounded-md border border-slate-300 bg-slate-100 p-4">
      {/* Meta */}
      <div className=" flex items-center justify-start divide-x-2 divide-slate-400 pb-3">
        <h3 className="text-xl">{props.name}</h3>
      </div>
      <div className="flex divide-x-2 divide-slate-400 pb-3">
        <div className="flex flex-col p-3">
          <h3 className="text-xl">Ingredients:</h3>
          <ul>
            {props.ingredients.map((i, index) => (
              <li key={index.toString()} className=" flex items-left justify-start divide-x-2 divide-slate-400">
                <div className="w-48 mx-2 pl-2 text-s font-medium"> - {i.name}</div>
                <div className="w-48 mx-2 pl-2 text-s">{i.measure.value} {i.measure.unit?.toLowerCase()}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col p-3">
          <h3 className="text-xl">Method:</h3>
          {props.method.map((m, index) => (
            <li key={index.toString()} className=" flex items-left justify-start divide-x-2 divide-slate-400">
              <div className="w-48 mx-2 pl-2 text-s font-medium"> - {m.instructions}</div>
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}
