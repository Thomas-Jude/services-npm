import R from 'ramda'

export default interface IFunctionalLib{
  anyPass: typeof R.anyPass
  curry: typeof R.curry
  filter: typeof R.filter
  filterAll: TFilterAll
  filterThenMap: TFilterThenMap
  flat: TFlat
  flip: typeof R.flip
  identity: TIdentity
  includes: typeof R.includes
  includesCaseIns: TIncludesCaseIns
  map: TMap
  pipe: typeof R.pipe
  reduce: typeof R.reduce
  replace: TReplace
  reverse: TReverse
  sortBy: typeof R.sortBy
  split: TSplit
  toLowerCase: TToLowerCase
  trim: TTrim
  uniqueBy: typeof R.uniqBy
}

export type TFilterAll = <TType extends any>(filterPreds: TFilterPred<TType>[]) => (data:TType[]) => TType[]
export type TFilterThenMap = <TInitial extends any, TResult extends any>(filterPreds: TFilterPred<TInitial>[], mapPred: TMapPred<TInitial, TResult>) => (data:TInitial[]) => TResult[]
type TFilterPred<TVal> = (val: TVal) => boolean
export type TFlat = <TData>(arr: TData[]) => (TData extends readonly (infer InnerArr)[] ? InnerArr : TData)[]
export type TIdentity = <TVal>(val:TVal) => TVal
type TIncludesCaseIns = (val:string) => (target:string) => boolean
export type TMap = <TIn, TOut>(mapFunc: (val:TIn) => TOut) => (arr:TIn[]) => TOut[]
type TMapPred<TInitial, TResult> = (val: TInitial) => TResult
type TReplace = (pattern: string | RegExp) => (replacement: string) => (val:string) => string
type TReverse = <TVal>(data: TVal[]) => TVal[]
type TSplit = (delimiter:string | RegExp) => (val:string) => string[]
type TToLowerCase = (val:string) => string
type TTrim = (val:string) => string