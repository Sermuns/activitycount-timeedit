/**
 * Procedures for scrambling and unscrambling TimeEdits obfuscated strings
 */

const tabledata = [
    ["h=t&sid=", "6="],
    ["objects=", "1="],
    ["sid=", "2="],
    ["&ox=0&types=0&fe=0", "3=3"],
    ["&types=0&fe=0", "5=5"],
    ["&h=t&p=", "4="],
];

const tabledataspecial = [
    ["=", "ZZZX1"],
    ["&", "ZZZX2"],
    [",", "ZZZX3"],
    [".", "ZZZX4"],
    [" ", "ZZZX5"],
    ["-", "ZZZ'6"],
  ['/', 'ZZZX7'],
  ['%', 'ZZZX8']
]

const pairs = [
  ['=', 'Q'],
  ['&', 'Z'],
  [',', 'X'],
  ['.', 'Y'],
  [' ', 'V'],
  ['-', 'W']
]

const pattern = [
  4, 22, 5, 37, 26, 17, 33, 15, 39, 11, 45, 20, 2, 40, 19, 36, 28, 38, 30, 41,
  44, 42, 7, 24, 14, 27, 35, 25, 12, 1, 43, 23, 6, 16, 3, 9, 47, 46, 48, 50, 21,
  10, 49, 32, 18, 31, 29, 34, 13, 8
]

function tableshort (result) {
  for (const key of tabledata) {
    result = result.replace(key[0], key[1])
  }
  return result
}

function modKey (c) {
  if (97 <= c && c <= 122) {
    return 97 + ((c - 88) % 26)
  }
  if (49 <= c && c <= 57) {
    return 49 + ((c - 45) % 9)
  }
  return c
}

function scrambleChar (c) {
  for (const pair of pairs) {
    if (c === pair[0]) return pair[1]
    if (c === pair[1]) return pair[0]
  }
  return String.fromCharCode(modKey(c.charCodeAt(0)))
}

function swap (result, f, t) {
  if (!(0 <= f && f < result.length)) {
    return
  }
  if (!(0 <= t && t < result.length)) {
    return
  }
  const temp = result[f]
  result[f] = result[t]
  result[t] = temp
}

function swapPattern (result) {
  const steps = result.length
  for (let step = 0; step < steps; step++) {
    for (let index = 1; index < pattern.length; index += 2) {
      const f = pattern[index] + step * pattern.length
      const t = pattern[index - 1] + step * pattern.length
      swap(result, f, t)
    }
  }
  return result
}

function swapChar (result) {
  let split = result.split('')
  split = split.map(c => scrambleChar(c))
  split = swapPattern(split)
  return split.join('')
}

function tablespecial (result) {
  for (let i = 0; i < 100; i++) {
    for (const key of tabledataspecial) {
      result = result.replace(key[0], key[1])
    }
  }
  return result
}

function scramble (query) {
  let result = query
  result = tableshort(result)
  result = swapChar(result)
  result = tablespecial(result)
  return result
}

export default {scramble}