function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateObj(consts) {
  const newArray = []
  consts.forEach(subarray => {
    const arr = getRandom(subarray)
    newArray.push(arr)
  })
  return newArray
}

function getRandomValues(consts, iter){
  let newValues = []
  
  for (let i = 0; i < iter; i++) {
    const obj = generateObj(consts)
    newValues.push(obj);
  }

  return newValues
}

module.exports = getRandomValues

//console.log(getRandomValues(json.consts, 3))