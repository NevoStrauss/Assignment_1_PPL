import { access } from "node:fs";
import * as R from "ramda";

const stringToArray = R.split("");

/**
 * Function for checking whether {@code c} is a vowel.
 * It's called from 'countVowels' function.
 * @param c string to check
 */
const isVowel = (c:string):boolean=> {
    return ['a','e','i','o','u'].indexOf(R.toLower(c))>-1;
}

/* Question 1 */
/**
 * Function for checking whether how many vowels are in {@code s}.
 * @param s string to count vowels in.
 */
export const countVowels = (s: string):number =>{
    return stringToArray(s).filter(isVowel).length;
};

/**
 * Function for increasing the last number at the current accumulator encoding process.
 * Called from the "compressString" function if the proper condition is met.
 * @param acc the current encoded string during the process.
 */
const increaseLastNumber = (acc:string):string =>{
    const curr:number = Number(acc[acc.length-1])
    const next:number = curr+1;
    return acc.slice(0,acc.length-1).concat(next.toString())
}

/**
 * Function called from the reduce function in runLengthEncoding.
 * @param acc the reduce accumulator, starts with an empty string.
 * @param elem an array of the original string to encode, separated.
 */
const compressString = (acc:string, elem:string):string =>{
    return acc.length===0 ? acc.concat(elem) : acc.charAt(acc.length-1) === elem ?  //empty string, or the second appearance of this char
        acc.concat("2") : acc.length === 1 ||  //or this is the second char
        isNaN(Number(acc.charAt(acc.length-1))) ||    //or last char is not a number
        (Number(acc.charAt(acc.length-1)) && elem!==acc.charAt(acc.length-2)) ? //or last char is a number and elem equals to the char before the number
            acc.concat(elem) : increaseLastNumber(acc) //Need to increase last number.
}



/* Question 2 */
/**
 * Function to "compress/encode" a string
 * @param s string to encode.
 */
export const runLengthEncoding = (s:string):string =>{
    return R.reduce(compressString, "", stringToArray(s))
}

/**
 * Function to check whether a string is a legal parenthesis.
 * @param s the string to check.
 */
const isParenthesis = (s:string):boolean => {
    return ["(",")","{","}","[","]"].indexOf(s) > -1
}


/**
 * Function of the reduce function of isPaired method.
 * It manipulates the current string at the process, by setting condition to check
 * whether the parenthesis order is  legal.
 * Its logic is that if an opening brackets discovered, we concat them into the accumulator.
 * Else if a closing brackets discovered, and the matched opening brackets are before them,
 * we slice them from the accumulator.
 * @param acc the current string at the process, starts with a dummy value (@).
 * @param elem
 */
const countParenthesis = (acc: string, elem:string):string => {
    return acc === "" ? "" : ["(","[","{"].indexOf(elem)>-1 ?
        acc.concat(elem) : (elem === ")" && acc.charAt(acc.length-1) === "(") ||
        (elem === "]" && acc.charAt(acc.length-1) === "[") ||
        (elem === "}" && acc.charAt(acc.length-1) === "{") ?
            acc.slice(0,acc.length-1) :
            ""
}

/* Question 3 */
/**
 * Function to check whether the parenthesis in the string are paired.
 * @param s the string to check.
 * Calls for 2 assistance functions.
 */
export const isPaired = (s:string):boolean =>{
    //removing all characters which are not parenthesis.
    const parenthesis:string[] = stringToArray(s).filter(isParenthesis)
    //using the reduce function with a dummy value (@)
    //if the parenthesis are paired, only the dummy value will remain in the accumulator.
    return R.reduce(countParenthesis,"@",parenthesis) === "@"
}