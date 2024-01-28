import { test, expect } from '@playwright/test';

function solution(inputString: string): string {
    let alphabet = "abcdefghijklmnopqrstuvwxyz"
    let alphabetArray = Array.from(alphabet)
    let stringArray = Array.from(inputString)
    let finalArray: string[]=[]
    for (const c of stringArray) {
        let index = alphabetArray.indexOf(c)
        if (c === 'z'){
            finalArray.push('a') 
        }
        else {
        finalArray.push(alphabetArray[index+1])  
        }
    }
    return finalArray.join("")
}


test('some testing', async ({ page }) => {
    let result = solution('crazy')
    console.log(result)
   






});