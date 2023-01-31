import { IResolvers } from 'mercurius';
import { Context } from '../lib';
import { LogLevel } from '../lib/logger'

export interface ServerContextOptions {
  level: LogLevel
  serviceName: string
}

export interface ServerOptions {
  schema: string;
  resolvers: IResolvers<any, Context>
}
