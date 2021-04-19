
export type {default as ILogger} from './ILogger'
import  ConsoleLogger from './ConsoleLogger'

const logger = {
  ConsoleLogger
}
export {logger as default}