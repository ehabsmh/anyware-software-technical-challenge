export function pickAllowedFields<T extends object>(
  data: Partial<T>,
  allowedFields: (keyof T)[]
): Partial<T> {
  const result: Partial<T> = {};

  for (const key of allowedFields) {
    if (data[key]) result[key] = data[key];
  }

  return result;
}
