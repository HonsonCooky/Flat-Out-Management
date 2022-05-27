export function getParent<T>(t: any): T {
  if (!t) throw new Error('500: Unable to get parent with null')
  return t.parent();
}