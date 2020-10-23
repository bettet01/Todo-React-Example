import React, {useEffect} from 'react';
import {Grid, Container} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getTodos, handleModal} from "./redux/actions/todoActions";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TodoItem from "./components/todoItem";
import TodoDisplay from "./components/todoDisplay";
import AddTodo from "./components/addTodo";


const useStyles = makeStyles((theme) => ({
    paper: {
        margin: 10,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    modal: {
        position: 'absolute',
        height: 400,
        width: '66vw',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '10%',
        transform: 'translate(25%, 25%)'
    },
    button: {
        display: 'block',
        width: '200px',
        marginTop: '75px',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}));

function App() {
    const dispatch = useDispatch();
    const todoState = useSelector((state) => state.TodoReducer, shallowEqual)
    const classes = useStyles();

    const getData = () => {
        dispatch(getTodos())
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [])

    const showTodos = () => {
        if (todoState.loading) {
            return (
                <Paper className={classes.paper}>Loading...</Paper>
            )
        } else if (todoState.errorMessage !== "") {
            return (
                <Paper className={classes.paper}>{todoState.errorMessage}</Paper>
            )
        } else {
            return (
                todoState.todos.map((todo) => {
                    return (
                        <TodoItem key={todo._id} todo={todo}/>
                    )
                })
            )
        }
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid align={'center'} item xs>
                    {showTodos()}
                </Grid>
                <Grid item xs>
                    {todoState.currentTodo && <TodoDisplay/>}
                </Grid>
            </Grid>
            <Button variant={'outlined'} className={classes.button} onClick={() => dispatch(handleModal())}>Add
                Todo</Button>
            <Modal open={todoState.showModal} onClose={() => dispatch(handleModal())}>
                <AddTodo/>
            </Modal>
        </Container>
    );
}

export default App;
