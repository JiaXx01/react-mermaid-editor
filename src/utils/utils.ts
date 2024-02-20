export const formatJSON = (data: unknown): string => {
  return JSON.stringify(data, undefined, 2)
}
