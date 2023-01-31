import { Ajv, AjvTypes } from '../../deps'
import { LogLevel } from '../logger'
import { Environment, IConfig } from './config.type'
import { getMandatoryEnv } from './config.utils'
import configJSONSchema from './schemas/config.schema.json'

export class Config implements IConfig {
  public readonly serviceName: string
  public readonly port: number
  public readonly environment: Environment

  constructor (config: unknown) {
    const validateConfig = new Ajv({ strict: true }).compile(configJSONSchema as AjvTypes.JSONSchemaType<IConfig>)
    const valid = validateConfig(config)
    if (!valid) {
      throw new Error(`Validation Error: ${JSON.stringify(validateConfig.errors)}`)
    }

    this.serviceName = config.serviceName
    this.port = config.port
    this.environment = config.environment
  }
}

export class ConfigFactory {
  private async _loadConfig (): Promise<Config> {
    const serviceName = getMandatoryEnv('SERVICE_NAME')
    const environment = getMandatoryEnv('ENV')
    const port = Number(getMandatoryEnv('PORT'))

    return new Config({
      serviceName,
      environment,
      port
    })
  }

  public async create (): Promise<Config> {
    return await this._loadConfig()
  }
}
