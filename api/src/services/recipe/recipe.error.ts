import { AppError } from "../../lib/error";

export class RecipeServiceError extends AppError {
  override name = "RecipeServiceError";
}
