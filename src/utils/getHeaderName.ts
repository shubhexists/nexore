export function getHeader(name: string) {
  const accountRegex = /^Account (\d+)$/;
  const match = name.match(accountRegex);
  if (match) {
    return `A${match[1]}`;
  } else {
    return name.charAt(0).toUpperCase();
  }
}
