import { State, bind } from "./state";

export type Queue = number[];

const peek = (q:Queue):number => {
    return q[0]
}

export const enqueue = (t:number): State<Queue,undefined> => {
    return (q:Queue):[Queue,undefined]=>[q.concat([t]),undefined]
}

export const dequeue = (q:Queue):[Queue,number] => {
    const peeked:number = peek(q)
    return [q.slice(1),peeked]
}

export const queueManip = (q:Queue):[Queue,number]=>{
    return bind(dequeue,(x:number)=>bind(enqueue(2*x),()=>bind(enqueue(x/3),()=>dequeue)))(q)
}