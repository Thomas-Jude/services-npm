import ISearch from './ISearch'
import IFunctionalLib from '../functionalLib/IFunctionalLib'
import { ILogger } from '../logger'

import type {TFilter, TSearchResult, TPropSelector} from './ISearch'


class TokenSearch implements ISearch
{
  #funclib: IFunctionalLib
  #logger: ILogger

  constructor(funclib: IFunctionalLib, logger: ILogger){
    this.#funclib = funclib
    this.#logger = logger
  }

  search = <TData, TSelectedProp>(uniquePropSelector: TPropSelector<TData, TSelectedProp>, searchFilters: TFilter<TData>[], searchText:string, data: TData[])  => {
    const {flat, trim, pipe, split, replace, map,
           uniqueBy, identity, filter} = this.#funclib
    
    // prep search tokens
    const collapseSpaces = replace(/\s+/g)(' ')
    const splitOnSpace = split(' ')
    const tokenizeSearch = (searchStr:string): string[] => pipe(
      trim,
      collapseSpaces,
      splitOnSpace,
    )(searchStr)
    const searchTokens = tokenizeSearch(searchText)

    type TFilterWithParamPred<TParam, TVal> = (param: TParam, val: TVal) => boolean
    type TAnypassWithParam = <TParam>(param:TParam) => <TVal>(preds: TFilterWithParamPred<TParam, TVal>[]) => (data:TVal) => boolean
    type TFilterWithAnyParam = <TParam>(param:TParam) => <TVal>(preds: TFilterWithParamPred<TParam, TVal>[]) => (data:TVal[]) => TVal[]
    type TDuplicateCount<TItem> = {
      item: TItem,
      count: number
    }

    const anyPassWithParam: TAnypassWithParam = param => preds => data => preds.map(x => x.bind(null, param)).some(x => x(data))
    const filterAllWithParam: TFilterWithAnyParam = param => preds => data => filter(anyPassWithParam(param)(preds))(data)

    const getDuplicateCounts = <TDataItem, TSelectedProp>(uniquePropSelector: TPropSelector<TDataItem, TSelectedProp>, data: TDataItem[]): TDuplicateCount<TDataItem>[] => pipe(
      map(uniquePropSelector),
      uniqueBy(identity),
      map((uniqueVal: TSelectedProp): TDuplicateCount<TDataItem> => ({
        item: data.find(x => uniquePropSelector(x) === uniqueVal),
        count: data.map(uniquePropSelector).filter(x => x === uniqueVal).length
      }))
    )(data)

    const searchResultsArr = map(token => {
      const filterAllWithToken = filterAllWithParam(token)
      const searchWithToken = filterAllWithToken(searchFilters)
      return searchWithToken(data)
    })(searchTokens)

    const flattenedResults = flat(searchResultsArr)
    const dupes = getDuplicateCounts(uniquePropSelector, flattenedResults)

    const result = map((x:TDuplicateCount<TData>): TSearchResult<TData> => ({
      data: x.item,
      relevance: x.count
    }))(dupes)
    

    return result
  }
}

export {TokenSearch as default}