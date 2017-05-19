const express = require('express')
const router = express.Router()

let fs = require('fs')

let tree

function loadTree () {
  tree = JSON.parse(fs.readFileSync('tree.json'))
}

function init () {
  fs.writeFileSync('tree.json', JSON.stringify({cat: []}))
}

function reset () {
  loadTree()
  tree = {cat: []}
  writeFile()
}

function writeFile () {
  fs.writeFileSync('tree.json', JSON.stringify(tree))
}

function add (string, category) {
  loadTree()
  function addNode (node, str) {
    if (str.length === 0 && node.cat.indexOf(category) === -1) {
      node.cat.push(category)
    } else {
      let s = str.slice(0, 1)
      if (node[s] === undefined) node[s] = {cat: []}
      addNode(node[s], str.slice(1))
    }
  }
  let words = string.split(' ')
  let phrases = [string]
  for (let i = 1; i < words.length; i++) {
    phrases.push(words.slice(i).join(' ') + '*' + words.slice(0, i).join(' '))
  }
  for (let phrase of phrases) addNode(tree, phrase)
  writeFile()
  print(' ')
}

function print (string) {
  loadTree()
  let rList = []
  function getLeaves (node, c) {
    if (rList[c] === undefined) rList.push('')
    for (let k in node) {
      if (k !== 'cat') {
        rList[c] += k
        getLeaves(node[k], c + 1)
      }
    }
    rList[c] += ' '
  }
  getLeaves(tree, 0)
  rList = rList.slice(0, -1)
  rList = rList.map(x => x.slice(0, -1))
  for (let s of rList) console.log(s)
}

function get (string) {

  loadTree()
  let r = []

  function getBranches (node, strin, strout, c) {
    if (strin.length === 0 && c == 0) {
      getLeaves(node, strout)
    } else {
      let s0 = strin.slice(0, 1)
      let s1 = strin.slice(1, 2)
      let s1p = strin.slice(1)
      let s2p = strin.slice(2)
      if (node[s0] !== undefined) {
        getBranches(node[s0], s1p, strout + s0, c)
      }
      if (c > 0) {
        if (node[s1] !== undefined) {
          getBranches(node[s1], s0 + s2p, strout + s1, c - 1)
        }
        getBranches(node, s1p, strout, c - 1)
        for (let k in node) {
          if (k !== 'cat') {
            getBranches(node[k], strin, strout + k, c - 1)
            getBranches(node[k], s1p, strout + k, c - 1)
          }
        }
      }
    }
  }

  function getLeaves (node, strout) {
    if (node.cat.length > 0) {
      for (let c of node.cat) r.push({word: strout, cat: c})
    }
    for (let k in node) if (k !== 'cat') getLeaves(node[k], strout + k)
  }

  let errC = 0
  while (errC < string.length && r.length === 0) {
    getBranches(tree, string, '', errC)
    errC++
  }

  r.forEach(x => x.word = x.word.split('*').reverse().join(' '))
  let wordarr = r.map(x => x.word)
  r = r.filter((x, i) => wordarr.indexOf(x.word) === i)
  r.sort((a, b) => (a.word > b.word) * 2 - 1)
  return r
}

router.post('/', (req, res) => {
  let r
  let str = req.body.str
  if (str === "") {
    r = []
  } else {
    r = get(str)
  }
  res.send(r)
})

router.put('/', (req, res) => {
  add(req.body.word, req.body.type)
  res.send('word added')
})

router.add = (string, category) => {add(string, category)}

module.exports = router
