export function timestamp(date = new Date()): string {
  return date.toISOString();
}

export function dateStamp(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}
