'use strict'
var N = 100

// Reference : http://theoryofprogramming.com/2014/12/25/snakes-and-ladders-game-code/
// HackerRank: https://www.hackerrank.com/challenges/the-quickest-way-up

/**
 * Represents the queue entry
 */
class QueueEntry {
  constructor (pos, step) {
    this.pos = pos
    this.step = step
  }
}

/**
 * Reads all the input for a *single* test case
 * and creates the data structure
 * It is a simple Array containing 0 for the standard places
 * AND the diff for stairs and snakes
 */
const readTestCase = (lines) => {
  let store = Array(N + 1).fill(0)
  const numberOfStairs = lines.splice(0, 1)[0]
  const numberOfSnakes = lines.splice(numberOfStairs, 1)[0]
  const assignToStore = (n) => { store[n[0]] = n[1] - n[0] }

  lines.splice(0, numberOfStairs).map(assignToStore)
  lines.splice(0, numberOfSnakes).map(assignToStore)
  return store
}

/**
 * Reads the input data and parse the testCases
 */
const readData = (input) => {
  let inputArray = input
    .split('\n')
    .map(n => n.split(' ').map(Number))

  // Remove number of test cases from array
  inputArray.splice(0, 1)

  let testCases = []
  do {
    testCases.push(readTestCase(inputArray))
  } while (inputArray.length)

  return testCases
}

/**
 * Entry point
 * Creates a queue and apllies BFS to the 'graph'
 */
const processData = (input) => {
  let testCases = readData(input)

  testCases.map(store => {
    // console.log(store)

    // Whenever or not the graph has a solution
    let hasResolution = false
    // Start with the initial point
    let queue = [new QueueEntry(1, 0)]
    // Stores the visited points (We will only visit them once)
    let visited = new Array(N + 1)

    while (queue.length) {
      let entry = queue.shift()

      if (entry.pos === N) {
        console.log(entry.step)
        hasResolution = true
        break
      }

      if (visited[entry.pos] === true) {
        continue
      }

      // Mark the current point as visited
      visited[entry.pos] = true

      for (let i = 1; i <= 6 && entry.pos + i <= N; i++) {
        let nextPos = entry.pos + i
        if (store[nextPos] !== 0) {
          queue.push(new QueueEntry(nextPos + store[nextPos], entry.step + 1))
          // console.log(nextPos + store[nextPos])
        } else {
          queue.push(new QueueEntry(nextPos, entry.step + 1))
        }
      }
    }
    if (!hasResolution) console.log('-1')
  })
}

/**
Expected:
3
5
3
2
2
*/
processData(`5
3
32 62
42 68
12 98
7
95 13
97 25
93 37
79 27
75 19
49 47
67 17
4
8 52
6 80
26 42
2 72
9
51 19
39 11
37 29
81 3
59 5
79 23
53 7
43 33
77 21
2
3 54
37 100
1
56 33
2
3 57
8 100
1
88 44
1
7 98
1
99 1`)
