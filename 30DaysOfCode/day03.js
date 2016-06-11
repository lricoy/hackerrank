process.stdin.resume()
process.stdin.setEncoding('ascii')

var input_stdin = ''
var input_stdin_array = ''
var input_currentline = 0

process.stdin.on('data', function (data) {
  input_stdin += data
})

process.stdin.on('end', function () {
  input_stdin_array = input_stdin.split('\n')
  main()
})

function readLine () {
  return input_stdin_array[input_currentline++]
}

/**
If n is odd, print Weird
If n is even and in the inclusive range of 2 to 5, print Not Weird
If n is even and in the inclusive range of 6 to 20, print Weird
If n is even and greater than 20, print Not Weird
*/

function main () {
  let n = parseInt(readLine(), 10)

  if (n % 2 !== 0) {
    console.log('Weird')
  } else {
    if (n >= 2 && n <= 5) {
      console.log('Not Weird')
    } else if (n >= 6 && n <= 20) {
      console.log('Weird')
    } else if (n > 20) {
      console.log('Not Weird')
    }
  }
}
