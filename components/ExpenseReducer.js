const _expenses = [];


export default function reducer(state=_expenses, action){
    const initial_state = state;

    switch(action.type){
        case "get_expenses":
            return action.payload;
        case "add_expense":
            return [...initial_state, action.payload]
        case "delete_expense":
            return initial_state.filter(e => e._id !== action.payload._id )
        case "clear":
            return _expenses;
        default:
            return initial_state;
    }
}