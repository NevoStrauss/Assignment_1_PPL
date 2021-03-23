import { Result, makeFailure, makeOk, bind, either, isOk } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

/**
 * Function which takes a predicate and an array, and returns an
 * Ok of the first element that the predicate returns true for, or a Failure if no such element exists.
 * @param a an array of elements
 * @param pred a boolean function
 */
export const findResult = <T>(pred: (x: T)=>boolean, a: T[]): Result<T> =>{
    const okElements:T[] = a.filter(pred) //create T[] of elements that pred(element)=true
    return okElements.length>0 ? makeOk(okElements[0]) : makeFailure("No such element exist")
}


/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

/**
 * Function return an Ok of the first even value squared, or a Failure if no even numbers exist.
 * Find returns a Result<T>:
 * If result is OK:
 * the result of findResult will be { tag: "Ok", value:@first value passed the predicate of findResult},
 * and the bind will return makeOk[(f(r.value)] -> makeOk[value*value] -> {tag: "Ok", value: value*value}
 * If result is Failure:
 * the result of findResult will be { tag: "Failure", message: No such element exist },
 * and the bind will return r -> the Failure object.
 * @param a an array to scan for even value
 */
export const returnSquaredIfFoundEven_v2 = (a: number[]): number | Result<number> => {
    return bind(findResult((x:number)=>x%2===0,a),(x:number)=>makeOk(x*x))
}

/**
 * Function return the first even value squared, or a −1 if no even numbers exist
 * It uses findResult to return an OK or Failure
 * the either function gets 3 params: 1.Result<T>, 2.function ifOK, 3. function ifFailure.
 * if the Result is Ok, it returns ifOk(Result.value)
 * if the Result is Failure, it returns ifFailure(Result.message)
 * @param a the origin array
 */

export const returnSquaredIfFoundEven_v3 = (a: number[]): number => {
    return either(findResult((x:number)=>x%2===0,a),(x:number)=>x*x,(s:string)=>-1)
}