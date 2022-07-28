export function easeOut(value) {
  return -(value ** 2) + 2 * value;
}

export function easeInOut(value) {
  return -2 * value ** 3 + 3 * value ** 2;
}
