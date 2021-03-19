import { checkServerIdentity } from "node:tls";
import { State, bind } from "./state";

export type Stack = number[];

export const push = (x:number):State<Stack,undefined>=>{
    return (initialState:Stack) => [[x].concat(initialState),undefined]
}

export const pop:State<Stack,number> = (initialState:Stack):[Stack,number]=>{
    const peeked:number = initialState[0]
    return [initialState.slice(1),peeked]
}

export const stackManip = (initialState:Stack):[Stack,undefined]=>{
    return bind(pop,(x:number)=>bind(push(x*x),()=>bind(pop,(y:number)=>(push(x+y))))) (initialState)
}