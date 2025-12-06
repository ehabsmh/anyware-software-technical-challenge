export interface IValidationError {
  success: boolean;
  errors: { field: string; message: string }[];
}
