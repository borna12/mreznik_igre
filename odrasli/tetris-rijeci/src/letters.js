export const lettersWithQuantities = {
  'A': 9,
  'B': 2,
  'C': 2,
  'Č': 2,
  'Ć': 2,
  'D': 4,
  'Đ': 2,
  'E': 12,
  'F': 2,
  'G': 3,
  'H': 2,
  'I': 9,
  'J': 1,
  'K': 1,
  'L': 4,
  'M': 2,
  'N': 6,
  'O': 8,
  'P': 2,
  'R': 6,
  'S': 4,
  'Š': 4,
  'T': 6,
  'U': 4,
  'V': 2,
  'Z': 1,
  'Ž': 1
}

export const letterPoints = {
  'A': 1,
  'B': 3,
  'C': 3,
  'Č': 3,
  'Ć': 3,
  'D': 2,
  'Đ': 10,
  'E': 1,
  'F': 4,
  'G': 2,
  'H': 4,
  'I': 1,
  'J': 8,
  'K': 5,
  'L': 1,
  'M': 3,
  'N': 1,
  'O': 1,
  'P': 3,
  'R': 1,
  'S': 1,
  'Š': 10,
  'T': 1,
  'U': 1,
  'Z': 10,
  'Ž': 12
}

export const letterToPoint = letter => letterPoints[letter.toUpperCase()]

export const letters = Object.keys(lettersWithQuantities)

export const distributedLetters = letters.reduce((arr, letter) => {
  arr = [...arr, ...Array(lettersWithQuantities[letter]).fill(letter)]
  return arr
}, [])

export const randomLetter = () => distributedLetters[Math.floor(Math.random() * distributedLetters.length)]