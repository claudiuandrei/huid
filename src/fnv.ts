// 1000000000000000000013b
const prime = new Uint16Array([
  0x00,
  0x00,
  0x00,
  0x00,
  0x01,
  0x00,
  0x00,
  0x00,
  0x00,
  0x00,
  0x00,
  0x00,
  0x00,
  0x00,
  0x01,
  0x3b
])

const convert = (input: string): Uint16Array => {
  // convert string into byte array
  var str = input.replace(/\r\n/g, '\n')

  // Output
  let output = []

  // Iterate
  for (let i = 0; i < str.length; i++) {
    // Get the character
    var c = str.charCodeAt(i)

    // Convert it to a value
    if (c < 128) {
      output.push(c)
    } else if (c < 2048) {
      output.push((c >> 6) | 192)
      output.push((c & 63) | 128)
    } else {
      output.push((c >> 12) | 224)
      output.push(((c >> 6) & 63) | 128)
      output.push((c & 63) | 128)
    }
  }

  // Return the output
  return new Uint16Array(output)
}

const expand = (input: Uint16Array): Uint16Array => {
  // Output
  const output = new Uint16Array(16)

  // Create the output
  for (let x = 0; x < 16; x++) {
    for (let y = 0; y < 16 - x; y++) {
      // Create a new product
      let product = input[15 - x] * prime[15 - y] + (output[15 - (x + y)] || 0)

      // Product is too big
      if (product > 255) {
        if (x + y + 1 < 16) {
          output[15 - (x + y + 1)] += product >>> 8
        }
        product -= (product >>> 8) << 8
      }

      // Update the array
      output[15 - (x + y)] = product
    }
  }

  // Return the value
  return output
}

const fnv128Hex = (input: string): string => {
  // Convert to a byte array
  const bytes = convert(input)

  // Setup the base for the value
  let base = new Uint16Array([
    0x6c,
    0x62,
    0x27,
    0x2e,
    0x07,
    0xbb,
    0x01,
    0x42,
    0x62,
    0xb8,
    0x21,
    0x75,
    0x62,
    0x95,
    0xc5,
    0x8d
  ])

  // Update the base
  for (let i = 0; i < bytes.length; i++) {
    // Update the value
    base[15] ^= bytes[i]

    // Update the base
    base = expand(base)
  }

  // Convert to hex
  return base.reduce((output, octet) => output + ('00' + octet.toString(16)).slice(-2), '')
}

export default fnv128Hex
