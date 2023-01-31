import { AppError } from "../error";
import { Maybe } from "./utils.type";

export class AssertionError extends AppError {
  override name = "AssertionError";
}

export function assertDefined<T>(
  input: Maybe<T>,
  message = "Input is not defined",
): asserts input is T {
  if (typeof input === "undefined") {
    throw new AssertionError({ message });
  }
}
