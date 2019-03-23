import fnv128Hex from './fnv'

// Create a uuid
// RFC 4122 Version 4 compliant pattern
const from = (h: () => string): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/x/g, h)
    .replace(/y/g, () => Math.floor((parseInt(h(), 16) / 16) * 4 + 8).toString(16))

// Uuid regex
const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// Check if it is a uuid
export const check = (uuid: string): boolean => pattern.test(uuid)

// Create a random uuid
export const create = (): string => from(() => Math.floor(Math.random() * 16).toString(16))

// Create a uuid hash
export const hash = (s: string): string => {
  // Start
  let i = 0

  // Create a hash
  const h = fnv128Hex(s)

  // Return the hash
  return from(() => h[i++])
}
