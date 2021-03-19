import { Result, makeFailure, makeOk, bind, either, isOk } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult = <T>(pred: (x: T)=>boolean, a: T[]): Result<T> =>{
    const okElements:T[] = a.filter(pred)
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

export const returnSquaredIfFoundEven_v2 = (a: number[]): number | Result<number> => {
    return bind(findResult((x:number)=>x%2===0,a),(x:number)=>makeOk(x*x))
}

export const returnSquaredIfFoundEven_v3 = (a: number[]): number | Result<number> => {
    return either(findResult((x:number)=>x%2===0,a),(x:number)=>x*x,(s:string)=>-1)
}