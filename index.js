const example = 'oosddwswsssssssssssssssssss'

function checkIsPalindrom(string) {
  const check = {}

  string.split('').forEach(element => {
    if (check[element]) {
      check[element]++
    } else {
      check[element] = 1
    }
  })
  console.log(check)
  let counter = 0
  Object.entries(check).forEach(letter => {
    if (letter[1] % 2 !== 0) {
      counter++
    }
  })
  console.log(counter < 2)
}

checkIsPalindrom(example)