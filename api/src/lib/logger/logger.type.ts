export interface LogFn {
  (obj: unknown, msg?: string, ...args: any[]): void
  (msg: string, ...args: any[]): void
}

export type LogChildFn = (bindings: Record<string, any>) => LoggerContract

export enum LogLevel {
  FATAL = 'fatal',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  TRACE = 'trace',
}

export interface LoggerOptions {
  logLevel: LogLevel
  serviceName: string
}

export interface LoggerContract extends Record<LogLevel, LogFn> {
  child: LogChildFn
}

export interface LevelFormatterResponse {
  severity: GCPLogSeverity
}

export enum GCPLogSeverity {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
  DEFAULT = 'DEFAULT',
}

export type LogFormatterResponse = Record<string, unknown>

export type BindingsFormatterResponse = Record<string, unknown>
