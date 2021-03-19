export type State<S, A> = (initialState: S) => [S, A];

export const bind = <S, A, B>(state: State<S, A>, f: (x:A) => State<S,B>): State<S,B> => {
    return (initialState: S):[S,B] => {
        const [s1,a1] = state(initialState)
        return f(a1)(s1)
    }
}