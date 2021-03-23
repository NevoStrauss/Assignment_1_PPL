import { State, bind } from "./state";

/**
 * Queue implemented with array of number.
 * Convection: first element in the queue is placed at cell 0.
 */
export type Queue = number[];

/**
 * @param q the Queue to peek into
 */
const peek = (q:Queue):number => {
    return q[0]
}

/**
 * Function which takes a number x and returns a State that adds x to the queue
 * @param t the number to enqueue
 */
export const enqueue = (t:number): State<Queue,undefined> => {
    return (q:Queue):[Queue,undefined]=>[q.concat([t]),undefined]
}

/**
 * A State which dequeues a number from the queue,
 * and returns a tuple of the Queue without the element, and the element that removed.
 * @param q the Queue to dequeue the first element from
 */

export const dequeue = (q:Queue):[Queue,number] => {
    const peeked:number = peek(q) //get the first element without taking out.
    return [q.slice(1),peeked]
}

/**
 * 1. Dequeues a number x from the queue
 * 2. Enqueues 2 * x
 * 3. Enqueues x / 3
 * 4. Dequeues
 * returns a tuple of the Queue after the actions, and the number after the last dequeue(action number 4)
 * the outside bind(marked as bind1) gets as a parameter the dequeue function and another bind function(bind 2).
 * bind2 gets the function enqueue(2*x) and another bind(bind3).
 * bind3 gets the function enqueue(x/3) and dequeue.
 * At the end, bind1 returns a State, which is a function, that receives Queue {@code q} as a parameter,
 * and returns a Tuple of the Queue after the actions, and the number after the last dequeue
 * @param q the Queue to manipulate.
 */
export const queueManip = (q:Queue):[Queue,number]=>{
    return bind(dequeue,(x:number)=>bind(enqueue(2*x),()=>bind(enqueue(x/3),()=>dequeue)))(q)
}