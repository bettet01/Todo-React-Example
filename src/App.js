import React, {useEffect} from 'react';
import {Grid, Container, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {addTodo, changeStatus, getTodos, handleModal, selectTodo} from "./redux/actions/todoActions";
import _ from 'lodash';
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import {useFormik} from "formik";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
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
    }
}));

function App() {
    const dispatch = useDispatch();
    const todoState = useSelector((state) => state.TodoReducer, shallowEqual)
    const classes = useStyles();

    useEffect(() => {

    }, [todoState])

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            status: false,
        },
        onSubmit: values => {
            dispatch(addTodo(values))
            React.forceUpdate()
        }
    })

    const handleStatusChange = () => {
        dispatch(changeStatus(todoState.currentTodo))
    }

    const getData = () => {
        dispatch(getTodos())
    }


    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [])

    const selectNewTodo = (id) => {
        const todo = todoState.todos.filter((todo) => todo._id === id)[0];
        dispatch(selectTodo(todo))
    }

    const showTodos = () => {
        if (_.isEmpty(todoState.todos)) {
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
                        <Paper onClick={() => selectNewTodo(todo._id)} key={todo._id} className={classes.paper}>
                            <div>{todo.name}</div>
                        </Paper>
                    )
                })
            )
        }
    }

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid align={'center'} item xs>
                    {showTodos()}
                    <Button onClick={() => dispatch(handleModal())}>Add Todo</Button>
                </Grid>
                <Grid item xs>
                    {todoState.currentTodo && <Paper className={classes.paper}>
                        <Typography variant={'h3'}>{todoState.currentTodo.name}</Typography>
                        <Typography variant={'h5'}>{todoState.currentTodo.description}</Typography>
                        <Typography
                            variant={"body1"}>{todoState.currentTodo.status ? "Incomplete" : "Complete"}</Typography>
                        <div>
                            <Button onClick={() => handleStatusChange()}
                                    variant='outlined'>{todoState.currentTodo.status ? "Mark Complete" : "Mark Incomplete" }</Button>
                            <Button variant='outlined'>Delete</Button>
                        </div>
                    </Paper>}
                </Grid>
            </Grid>
            <Modal open={todoState.showModal} onClose={() => dispatch(handleModal())}>
                <form className={classes.modal} onSubmit={formik.handleSubmit}>
                    <div>
                        <TextField
                            id='name'
                            label='Name'
                            type='text'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id='description'
                            label='Description'
                            type='text'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <Button type='submit'>Add Todo</Button>
                </form>
            </Modal>
        </Container>
    );
}

export default App;
