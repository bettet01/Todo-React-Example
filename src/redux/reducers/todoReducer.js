

const defaultState = {
    loading: false,
    todos: [],
    currentTodo: {},
    errorMessage: "",
}

const TodoReducer = (state = defaultState, action) => {
    switch (action.type){
        case "GET_TODO_LOADING":
            return {
                ...state,
                loading: true,
                errorMessage: "",
            }
        case "GET_TODO_SUCCESS":
            return  {
                ...state,
                loading: false,
                errorMessage: "",
                todos: action.payload
            }
        case "GET_TODO_FAIL":
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}

export default TodoReducer;