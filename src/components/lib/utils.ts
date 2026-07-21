type ClassValue = string | number | null | undefined | false | ClassValue[] | Record<string, boolean | null | undefined>;

function flatten(value: ClassValue, out: string[]): void {
  if (!value) return;
  if (typeof value === "string" || typeof value === "number") {
    out.push(String(value));
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v) => flatten(v, out));
    return;
  }
  for (const key in value) {
    if (value[key]) out.push(key);
  }
}

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  inputs.forEach((input) => flatten(input, out));
  return out.join(" ");
}
