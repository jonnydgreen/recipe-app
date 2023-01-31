import { Logger } from "../logger";

export interface ServerContextInput {
  serviceName: string;
}

export interface Context {
  log: Logger;
}
