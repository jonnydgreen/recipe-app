// TODO: deps
import { PrismaClient } from "@prisma/client";
import { DatabaseClient } from "./database.type";

export class DatabaseFactory {
  public async create(): Promise<DatabaseClient> {
    return new PrismaClient();
  }
}
