export type State<S, A> = (initialState: S) => [S, A];

/**
 * Function receives a State and a function that returns a State,
 * and returns a State (a function from initialState:S to a tuple:[S,A]).
 * The initialState is given to the return function as a parameter from the function that calls to bind.
 * It executes the state function on the initialState, then execute f on the result, (getting State),
 * then executes the result State on the new parameter.
 * @param state a function from initialState to tuple.
 * @param f the calculation function.
 */

export const bind = <S, A, B>(state: State<S, A>, f: (x:A) => State<S,B>): State<S,B> => {
    return (initialState: S):[S,B] => {
        const [s1,a1] = state(initialState)
        return f(a1)(s1)
    }
}