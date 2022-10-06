import fs from 'fs';
//Q1: What floor does Santa end up on?
// ( --> should go UP 1 floor
// ) --> should go DOWN 1 floor

function question1() {
    fs.readFile('./input.txt', (err, data) => {
        console.time('question1')
        const directions = data.toString()
        const directionsArray = directions.split('')
        const answer = directionsArray.reduce((acc, currentValue) => {
            if(currentValue === '(') {
                acc += 1
            } else if(currentValue === ')') {
                acc -= 1
            }
            return acc
        }, 0)
        console.timeEnd('question1')
        console.log('Floor:', answer)
        
    })
}

question1();

//Q2: When does Santa first enter the basement?

function question2() {
    fs.readFile('./input.txt', (err, data) => {
        console.time('question2')
        const directions = data.toString()
        const directionsArray = directions.split('')
        let accumulator = 0;
        let count = 0;
        directionsArray.some(currentValue => {
            if(currentValue === '(') {
                accumulator++
            } else if(currentValue === ')') {
                accumulator--
            }
            count++
            return accumulator < 0;
        })
        console.timeEnd('question2')
        console.log('Floor (should be -1):', accumulator, 'Santa reached basement after:', count)
    })
}

question2();