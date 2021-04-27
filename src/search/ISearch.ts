

interface ISearch
{
  search: <TData, TSelectedProp>(uniquePropSelector: TPropSelector<TData, TSelectedProp>,
                  searchFilters: TFilter<TData>[],
                  searchText: string,
                  data: TData[]) => TSearchResult<TData>[]
}

type TPropSelector<TInput, TSelected> = (obj: TInput) => TSelected
type TFilter<TVal> = (searchText: string, val: TVal) => boolean
type TSearchResult<TVal> = {
  data: TVal
  relevance: number
}

export type {TFilter, TSearchResult, TPropSelector}
export {ISearch as default}