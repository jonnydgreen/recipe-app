import { Pino } from '../../deps'
import {
  LogLevel,
  LogFn,
  LoggerContract,
  LoggerOptions,
  GCPLogSeverity,
  LevelFormatterResponse,
  LogFormatterResponse,
  BindingsFormatterResponse,
  LogChildFn
} from './logger.type'

export class Logger implements LoggerContract {
  public readonly fatal: LogFn
  public readonly error: LogFn
  public readonly warn: LogFn
  public readonly info: LogFn
  public readonly debug: LogFn
  public readonly trace: LogFn
  public readonly child: LogChildFn

  constructor (private readonly options: LoggerOptions) {
    const logger = Pino.pino({
      enabled: true,
      level: this.options.logLevel,
      messageKey: 'message',
      formatters: {
        level: this._levelFormatter.bind(this),
        log: this._logFormatter.bind(this),
        bindings: this._bindingsFormatter.bind(this)
      },
      timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`
    })

    this.fatal = logger.fatal.bind(logger)
    this.error = logger.error.bind(logger)
    this.warn = logger.warn.bind(logger)
    this.info = logger.info.bind(logger)
    this.debug = logger.debug.bind(logger)
    this.trace = logger.trace.bind(logger)

    this.child = logger.child.bind(logger)
  }

  private _levelFormatter (label: string): LevelFormatterResponse {
    switch (label) {
      case LogLevel.DEBUG: {
        return { severity: GCPLogSeverity.DEBUG }
      }
      case LogLevel.INFO: {
        return { severity: GCPLogSeverity.INFO }
      }
      case LogLevel.WARN: {
        return { severity: GCPLogSeverity.WARNING }
      }
      case LogLevel.ERROR: {
        return { severity: GCPLogSeverity.ERROR }
      }
      case LogLevel.FATAL: {
        return { severity: GCPLogSeverity.ERROR }
      }
      default: {
        return { severity: GCPLogSeverity.DEFAULT }
      }
    }
  }

  protected _logFormatter (logInput: object): LogFormatterResponse {
    return logInput as LogFormatterResponse
  }

  private _bindingsFormatter (): BindingsFormatterResponse {
    return {}
  }
}

export class LoggerFactory {
  public create (options: LoggerOptions): Logger {
    return new Logger(options)
  }
}
