const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  let robj
  if (req.body.str === "") {
    robj = []
  } else {
    robj = [
      {word: "watchmen", type: "title"},
      {word: "alan moore", type: "creator"}
    ]
  }
  res.send(robj)
})

router.put('/', (req, res) => {
  addWord(tree, req.body.word, req.body.type)
  res.send('word added')
})

// router.delete('/', (req, res) => {
//   delWord(tree, req.body.word, req.body.type)
// })

let tree = {}

function addWord (tree, str) {
  function addN (n, s) {
    if (s.length === 0) {
      n.$ = true
    } else {
      if (n[s.slice(0, 1)] === undefined) n[s.slice(0, 1)] = {$: false}
      addN(n[s.slice(0, 1)], s.slice(1))
    }
  }
  addN(tree, str)
}

function getWords (tree, str) {
  let r = {}
  function getBranches (n, s, w, c) {
    if (s.length === 0) {
      getLeaves(n, w, Math.floor(str.length / 2) - c)
    } else {
      console.log(s.typeOf)
      if (n[s.slice(0, 1)] !== undefined) {
        getBranches(n[s.slice(0, 1)], s.slice(1), w + s.slice(0, 1), c)
      }
      if (c > 0) {
        if (n[s.slice(1, 2)] !== undefined) {
          getBranches(
            n[s.slice(1, 2)],
            s.slice(0, 1) + s.slice(2),
            w + s.slice(1, 2),
            c - 1
          )
        }
        getBranches(n, s.slice(1), w, c - 1)
        for (let k in n) {
          if (k !== '$') {
            getBranches(n[k], s, w + k, c - 1)
            getBranches(n[k], s.slice(1), w + k, c - 1)
          }
        }
      }
    }
  }
  function getLeaves (n, s, c) {
    if (n.$) {
      if (r[s] === undefined) r[s] = c
      else if (c < r[s]) r[s] = c
    }
    for (let k in n) if (k !== '$') getLeaves(n[k], s + k, c)
  }
  getBranches(tree, str, '', Math.floor(str.length / 2))

  return Object.keys(r).sort((a, b) => {
    if (r[a] !== r[b]) {
      return r[a] - r[b]
    } else if (a.length !== b.length) {
      return a.length - b.length
    } else {
      if (a < b) return -1
      else return 1
    }
  }).slice(0, 100)
}

module.exports = router