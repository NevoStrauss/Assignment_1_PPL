import { checkServerIdentity } from "node:tls";
import { State, bind } from "./state";

/**
 * Stack implemented with array of number
 * Convection: top element in the queue is placed at cell 0
 */
export type Stack = number[];

/**
 * Function which takes a number x and returns a State that adds x to the Stack..
 * @param x the number to add.
 */
export const push = (x:number):State<Stack,undefined>=>{
    return (initialState:Stack) => [[x].concat(initialState),undefined]
}

/**
 * a State which pops a number from the stack and returns it.
 * @param initialState the Stack before the action.
 */
export const pop:State<Stack,number> = (initialState:Stack):[Stack,number]=>{
    const peeked:number = initialState[0]
    return [initialState.slice(1),peeked]
}

/**
 * 1. Pops a number x
 * 2. Pushes x * x
 * 3. Pops a number y
 * 4. Pushes x + y
 * returns a tuple of the Stack after the actions, and the number after the last push(action number 4)
 * the outside bind(marked as bind1) gets as a parameter the pop function and another bind function(bind 2).
 * bind2 gets the function push(2x*x) and another bind(bind3).
 * bind3 gets the function pop(returns number y) and the function push(x+y).
 * At the end, bind1 returns a State, which is a function, that receives Stack {@code initialState} as a parameter,
 * and returns a Tuple of the Stack after the actions, and undefined.
 * @param initialState the Stack to manipulate.
 */
export const stackManip = (initialState:Stack):[Stack,undefined]=>{
    return bind(pop,(x:number)=>bind(push(x*x),()=>bind(pop,(y:number)=>(push(x+y))))) (initialState)
}