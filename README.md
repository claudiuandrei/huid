# HUID

## Hash Unique ID

HUID is a basic utility for generating, checking or hashing UUIDs.

### Setup

```bash
yarn add huid
```

or

```bash
npm install --save huid
```

### Usage

Before you start import the functions from the library

```javascript
import { create, check, hash } from 'huid'
```

#### Basic usage

```javascript
// Create random UUIDs
const randomUuid = create() // c6a4e73f-e60a-497e-a58b-f6b12c894090

// Create consitent UUIDs
const hashedUuid = hash('Hash') // 9155b92f-3db6-4ec4-90de-455bd1bfefb6

// Any string can be passed and will generate consistent values
hash('Hash') === hash('Hash') // true
hash('Hash1') !== hash('Hash2') // true

// Check for valid UUIDs
check('9155b92f-3db6-4ec4-90de-455bd1bfefb6') // true
check('c6e60a97e586b12c894090') // false
```

## License

[MIT](LICENSE)
