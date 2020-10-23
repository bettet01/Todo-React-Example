import React from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {selectTodo} from "../redux/actions/todoActions";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: 10,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    completed: {
        textDecoration: 'line-through'
    }
}));

const TodoItem = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const todoState = useSelector((state) => state.TodoReducer, shallowEqual)

    const selectNewTodo = (id) => {
        const todo = todoState.todos.filter((todo) => todo._id === id)[0];
        dispatch(selectTodo(todo))
    }

    return(
        <Paper onClick={() => selectNewTodo(props.todo._id)} key={props.todo._id} className={classes.paper}>
            <Typography variant={'body1'} className={`${props.todo.status ? "" : classes.completed}`}>{props.todo.name}</Typography>
        </Paper>
    )
}

export default TodoItem;