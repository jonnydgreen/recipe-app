// TODO: deps
import { PrismaClient } from "@prisma/client";
import { Config, ConfigFactory } from "../config";
import { DatabaseClient, DatabaseFactory } from "../database";
import { LogLevel } from "../logger";
import { Logger, LoggerFactory } from "../logger/logger";
import { AsyncInit, Maybe } from "../types/types.utils";
import { assertDefined } from "../utils/utils.assert";

export class ServerContext implements AsyncInit {
  private _config: Maybe<Config>;
  private _logger: Maybe<Logger>;
  private _db: Maybe<DatabaseClient>;

  constructor(
    private readonly _configFactory: ConfigFactory,
    private readonly _loggerFactory: LoggerFactory,
    private readonly _databaseFactory: DatabaseFactory,
  ) {}

  public async init(silent = false): Promise<void> {
    this._config = await this._configFactory.create();
    this._logger = await this._loggerFactory.create({
      serviceName: this.config.serviceName,
      logLevel: silent ? LogLevel.FATAL : LogLevel.DEBUG,
    });
    this._db = await this._databaseFactory.create();
  }

  public get config(): Readonly<Config> {
    assertDefined(
      this._config,
      "Config is not defined on Server Context, please run .init",
    );
    return this._config;
  }

  public get log(): Readonly<Logger> {
    assertDefined(
      this._logger,
      "Logger is not defined on Server Context, please run .init",
    );
    return this._logger;
  }

  public get db(): Readonly<DatabaseClient> {
    assertDefined(
      this._db,
      "Database Client is not defined on Server Context, please run .init",
    );
    return this._db;
  }
}
