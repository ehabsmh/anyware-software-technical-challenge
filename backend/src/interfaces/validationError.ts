export interface IValidationError {
  success: false;
  errors: { field: string; message: string }[];
  statusCode?: number;
}
