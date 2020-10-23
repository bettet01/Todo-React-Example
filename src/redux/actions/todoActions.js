import axios from 'axios'

export const getTodos = () => async dispatch => {
    try {
        dispatch({
            type: "GET_TODO_LOADING",
        });

        const res = await axios.get(`http://localhost:3001/todos`);
        dispatch({
            type: "GET_TODO_SUCCESS",
            payload: res.data.todos
        });
    } catch (e) {
        dispatch({
            type: "GET_TODO_FAIL",
            payload: e.message
        })
    }
}

export const addTodo = (values) => async dispatch => {
    const payload = {
        name: values.name,
        description: values.description,
        status: values.status,
    }

    const res = await axios.post(`http://localhost:3001/add-todo`, payload)

    dispatch({
        type: "ADD_TODO_SUCCESS",
        payload: res.data
    })
}

export const selectTodo = (todo) => dispatch => {
    dispatch({
        type: "SELECT_TODO",
        payload: todo,
    })
}

export const deleteTodo = (id) => dispatch => {
    axios.delete(`http://localhost:3001/delete-todo/${id}`).then((res) => {
        dispatch({
            type: "DELETE_TODO_SUCCESS",
            payload: res.data
        })
    })
}

export const changeStatus = (todo) =>  dispatch => {
    const changedStatus = {
        ...todo,
        status: !todo.status
    }
    axios.put(`http://localhost:3001/edit-todo/${todo._id}`, changedStatus).then((res) => {
        dispatch({
            type: 'CHANGE_TODO_STATUS',
            payload: res.data
        })
    })
}

export const handleModal = () => dispatch => {
    dispatch({
        type: "CHANGE_MODAL_STATE"
    })
}