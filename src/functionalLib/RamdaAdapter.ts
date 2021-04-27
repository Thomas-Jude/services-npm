import R, {pipe, filter, map, anyPass} from 'ramda'

import IFunctionalLib from './IFunctionalLib'
import type {TFilterThenMap, TFilterAll, TIdentity, TMap, TFlat} from './IFunctionalLib'

const _filterAll: TFilterAll = (filterPreds) => filter(anyPass(filterPreds))
const _filterThenMap: TFilterThenMap = (filterPreds, mapPred) => pipe(
  filter(anyPass(filterPreds)),
  map(mapPred)
)
const _flat:TFlat = <TData>(arr: TData[]) => arr.flat()
const _identity: TIdentity = val => val
const _includesCaseIns = (val:string) => (target:string) => R.includes(val.toLowerCase(), target.toLowerCase())
const _map:TMap = mapFunc => arr => arr.map(mapFunc)
const _trim = (val:string) => val.trim()
const _split = (delimiter:string | RegExp) => (val:string) => val.split(delimiter)
const _replace = (pattern: string | RegExp) => (replacement: string) => (val:string) => val.replace(pattern, replacement)
const _toLowerCase = (val:string) => val.toLowerCase()

const RamdaAdapter: IFunctionalLib = {
  anyPass: R.anyPass,
  curry: R.curry,
  filter: R.filter,
  filterAll: _filterAll,
  filterThenMap: _filterThenMap,
  flat: _flat,
  flip: R.flip,
  identity: _identity,
  includes: R.includes,
  includesCaseIns: _includesCaseIns,
  map: _map,
  pipe: R.pipe,
  reduce: R.reduce,
  replace: _replace,
  reverse: R.reverse,
  sortBy: R.sortBy,
  split: _split,
  toLowerCase: _toLowerCase,
  trim: _trim,
  uniqueBy: R.uniqBy,
}

export default RamdaAdapter