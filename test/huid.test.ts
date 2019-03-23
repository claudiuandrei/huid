import { check, create, hash } from '../src/huid'
import fnv128Hex from '../src/fnv'

describe('FNV1a', () => {
  // Valid UUID should pass the check
  test('Hashes are consistent', () => {
    // Check the valid uuid
    const s = String.fromCharCode(100, 1000, 10000)
    const u1 = fnv128Hex(s)
    const u2 = fnv128Hex(s)

    // Expect rules
    expect(u1).toEqual(u2)
  })
})

// Check
describe('Check', () => {
  // Valid UUID
  const vuuid = '01234567-abcd-4abc-8def-0123456789ab'
  const iuuid = '01234567-abcd-4abc-4def-0123456789ab'

  // Valid UUID should pass the check
  test('Valid UUID should pass the check', () => {
    // Check the valid uuid
    const v = check(vuuid)

    // Expect rules
    expect(v).toEqual(true)
  })

  // Invaid UUID should not pass the check
  test('Inalid UUID should not pass the check', () => {
    // Check invalid uuid
    const v = check(iuuid)

    // Expect rules
    expect(v).toEqual(false)
  })
})

// Random
describe('Random', () => {
  // UUID should be between a valid UUID
  test('Random UUID should be a valid UUID', () => {
    // Check random uuid
    const u = create()
    const v = check(u)

    // Expect rules
    expect(v).toEqual(true)
  })

  // Two random UUIDs should be different
  test('Two random UUIDs should be different', () => {
    // Check random uuids
    const u1 = create()
    const u2 = create()

    // Expect rules
    expect(u1).not.toEqual(u2)
  })
})

// Hash
describe('Hash', () => {
  // Hashed UUID should be between a valid UUID
  test('Hashed UUID should be a valid UUID', () => {
    // Get a hashed uuid
    const u = hash('Hash')
    const v = check(u)

    // Expect rules
    expect(v).toEqual(true)
  })

  // Same hashed input should generate same UUID
  test('Same hashed input should generate same UUID', () => {
    // Get hashed uuids
    const u1 = hash('Hash')
    const u2 = hash('Hash')

    // Expect rules
    expect(u1).toEqual(u2)
  })

  // Different hashed input should generate different UUIDs
  test('Different hashed input should generate different UUIDs', () => {
    // Get hashed uuids
    const u1 = hash('Hash1')
    const u2 = hash('Hash2')

    // Expect rules
    expect(u1).not.toEqual(u2)
  })
})
