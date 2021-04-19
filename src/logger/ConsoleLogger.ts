import type ILogger from './ILogger'

class ConsoleLogger implements ILogger
{
  write(message: string): void{
    console.log(message)
  }
}

export {ConsoleLogger as default}