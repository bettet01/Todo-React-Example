import axios from 'axios'

export const getTodos = () => async dispatch => {
    try{
        dispatch({
            type: "GET_TODO_LOADING",
        });

        const res = await axios.get(`http://localhost:3001/todos`);
        dispatch({
            type: "GET_TODO_SUCCESS",
            payload: res.data.todos
        });
    } catch(e){
        dispatch({
            type: "GET_TODO_FAIL",
            payload: e.message
        })
    }
}