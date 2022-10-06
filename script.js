import fs from 'fs'

const inputfile = './input.txt'

const computeFloor1 = input => {
    console.time('computeFloor1')
    const inputArr = Array.from(input.trim())
    const iterator = inputArr.values()
    let floor = 0;
    for (const value of iterator) {
        if(value === '(') {
            floor++;
        } else if(value === ')') {
            floor--;
        }
    }
    console.timeEnd('computeFloor1')
    return floor;
}
    
const computeFloor2a = input => {
    console.time('computeFloor2a')
    // const inputArr = Array.from(input.trim())
    const inputArr = input.trim().split('')
    // acc is equal to the floor
    const floor = inputArr.reduce((acc, curr) => {
        if(curr === '(') {
            acc++
        } else if (curr === ')') {
            acc--
        }
        return acc
    }, 0)
    console.timeEnd('computeFloor2a')
    return floor;
}

const computeFloor2b = input => {
    console.time('computeFloor2b')
    const inputArr = Array.from(input.trim(), x => {
        if(x === '(') {
            return 1
        }
        return -1
    })
    // const inputArr = input.trim().split('').map(x => {
    //     if(x === '(') {
    //         return 1
    //     }
    //     return -1
    // })
    //acc is equal to the floor
    const floor = inputArr.reduce((acc, curr) => {
        acc += curr
        return acc
    }, 0)
    console.timeEnd('computeFloor2b')
    return floor;
}

const computeFloor3 = input => {
    console.time('computeFloor3')
    const str = input.trim()
    
    const iterator = str[Symbol.iterator]()
    let theChar = iterator.next();
    let floor = 0;
    while(!theChar.done && theChar.value !== ' ') {
        if(theChar.value === '(') {
            floor++;
        } else if(theChar.value === ')') {
            floor--;
        }
        theChar = iterator.next();
    }
    console.timeEnd('computeFloor3')
    return floor;
}

const computeFloor4 = input => {
    console.time('computeFloor4')
    const inputArr = Array.from(input.trim())
    const upArr = inputArr.filter(x => x === '(')
    const downArr = inputArr.filter(x => x === ')')
    console.timeEnd('computeFloor4')
    return upArr.length - downArr.length;
}

/*
* ASYNC READ FILE
*/
fs.readFile(inputfile, 'utf-8', (err, data) => {
    console.time('funchallenge')
    if (err) {
        console.log(err)
    } else {
        console.log(computeFloor2a(data))
    }
    console.timeEnd('funchallenge')
})

/*
* SYNC READ FILE
*/
// const file = fs.readFileSync(inputfile, {encoding:'utf-8'}) 
// const getFloor = data => {
//     console.time('funchallengeSync')
//     if (!file) {
//         console.log({error: 'File not found'})
//         throw Error
//     } else {
//         console.log(computeFloor4(data))
//     }
//     console.timeEnd('funchallengeSync')
// }
// getFloor(file)

/*
* CONCLUSION
*/
//No discernible difference between sync and async readFile runs
//Difference noted in core input processing: Array reducer fn won
//Even accounting for time to convert string to array:
//Faster to use array fns than string fns; ie reduce, filter, for...of loops with iterator returned from Array.values()
//No discernible difference between using Array from() and String split() to convert string to array of substrings
//Cleanest lines of code from returning the difference in length from filtered arrays
