import { LogLevel } from '../logger'

export enum Environment {
  prd = 'prd',
  test = 'test',
  dev = 'dev'
}

export type EnvValue<T> = Record<Environment, T>

export interface IConfig {
  serviceName: string
  port: number
  environment: Environment
}
