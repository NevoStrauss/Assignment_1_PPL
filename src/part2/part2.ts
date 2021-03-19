import { access } from "node:fs";
import * as R from "ramda";

const stringToArray = R.split("");

const isVowel = (c:string):boolean=> {
    return ['a','e','i','o','u'].indexOf(c.toLowerCase())>-1;
}

/* Question 1 */
export const countVowels = (s: string):number =>{
    return stringToArray(s).filter(isVowel).length;
};

const replaceLastNumber = (acc:string):string =>{
    const rep:number = Number(acc[acc.length-1])
    const next:number = rep+1;
    return acc.slice(0,acc.length-1).concat(next.toString())
}

const compressString = (acc:string, elem:string):string =>{
    return acc.length===0 ? acc.concat(elem) : acc.charAt(acc.length-1) === elem ?  //empty string, or the second appearence of this char
                                                 acc.concat("2") : acc.length === 1 ||  //or this is the second char
                                                  isNaN(Number(acc.charAt(acc.length-1))) ||    //or last char is not a number
                                                   (Number(acc.charAt(acc.length-1)) && elem!==acc.charAt(acc.length-2)) ? //or last char is a number and elem equals to the char before the number 
                                                 acc.concat(elem) : replaceLastNumber(acc)
}



/* Question 2 */
export const runLengthEncoding = (s:string):string =>{
    return R.reduce(compressString, "", stringToArray(s))
}

const isParentheses = (s:string):boolean => {
    return ["(",")","{","}","[","]"].indexOf(s) > -1
}


const countParentheses = (acc: string, elem:string):string => {
    return acc === "" ? "" : ["(","[","{"].indexOf(elem)>-1 ? acc.concat(elem) : (elem === ")" && acc.charAt(acc.length-1) === "(") ||
                                                                (elem === "]" && acc.charAt(acc.length-1) === "[") ||
                                                                (elem === "}" && acc.charAt(acc.length-1) === "{") ? 
                                                                acc.slice(0,acc.length-1) :
                                                                ""
}

/* Question 3 */
export const isPaired = (s:string):boolean =>{
    const parantheses:string[] = stringToArray(s).filter(isParentheses)
    return R.reduce(countParentheses,"@",parantheses) === "@"
}