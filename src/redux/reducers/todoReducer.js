

const defaultState = {
    loading: false,
    todos: [],
    currentTodo: undefined,
    errorMessage: "",
    showModal: false,
    updateState: false,
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
        case "ADD_TODO_SUCCESS":
            return {
                ...state,
                todos: action.payload.todos,
                showModal: false
            }
        case "SELECT_TODO":
            return {
                ...state,
                currentTodo: action.payload
            }
        case "CHANGE_MODAL_STATE":
            return {
                ...state,
                showModal: !state.showModal
            }
        case "CHANGE_TODO_STATUS":
            return {
                ...state,
                currentTodo: {
                    ...state.currentTodo,
                    status: action.payload.todo.status
                },
                todos: action.payload.todos
            }
        case "DELETE_TODO_SUCCESS":
            return {
                ...state,
                todos: action.payload.todos,
                currentTodo: undefined
            }
        default:
            return state;
    }
}

export default TodoReducer;