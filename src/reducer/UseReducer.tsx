export const initialState = null;

export const reducer = (state: any, action: { type: string; payload: any; }) => {
    if (action.type === "USER") {
        return action.payload;
    }

    return state;
}