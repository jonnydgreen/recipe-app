import { AppError } from "../../lib/error";

export class RecipeDatabaseError extends AppError {
  override name = "RecipeDatabaseError";
}
