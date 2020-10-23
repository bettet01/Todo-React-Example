import React from "react";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {changeStatus, deleteTodo} from "../redux/actions/todoActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        height: '70vh',
        marginTop: 10,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: '30px',
        left: '25%'
    },
    button: {
        margin: '0 10px'
    }
}));

const TodoDisplay = () => {
    const dispatch = useDispatch();
    const todoState = useSelector((state) => state.TodoReducer, shallowEqual)
    const classes = useStyles();


    const handleStatusChange = () => {
        dispatch(changeStatus(todoState.currentTodo))
    }


    const handleDelete = () => {
        dispatch(deleteTodo(todoState.currentTodo._id))
    }

    return (
        <Paper className={classes.paper}>
            <Typography variant={'h3'}>{todoState.currentTodo.name}</Typography>
            <Typography variant={'h5'}>{todoState.currentTodo.description}</Typography>
            <Typography
                variant={"body1"}>{todoState.currentTodo.status ? "Incomplete" : "Complete"}</Typography>
            <div className={classes.buttonContainer}>
                <Button className={classes.button} onClick={() => handleStatusChange()}
                        variant='outlined'>{todoState.currentTodo.status ? "Mark Complete" : "Mark Incomplete"}</Button>
                <Button className={classes.button} onClick={() => handleDelete()} variant='outlined'>Delete</Button>
            </div>
        </Paper>
    )
}

export default TodoDisplay;