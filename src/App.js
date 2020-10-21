import React, {useEffect} from 'react';
import {Grid, Container} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import {useDispatch, useSelector} from "react-redux";
import {getTodos} from "./redux/actions/todoActions";
import _ from 'lodash';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function App() {
    const dispatch = useDispatch();
    const todoState = useSelector((state) => state.TodoReducer)
    const classes = useStyles();

    const getData = () => {
        dispatch(getTodos())
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [])

    const showTodos = () => {
        if (_.isEmpty(todoState.todos)) {
            return (
                <Paper className={classes.paper}>Loading...</Paper>
            )
        } else if (todoState.errorMessage !== "") {
            return (
                <Paper className={classes.paper}>Loading...</Paper>
            )
        } else {
            return(
                todoState.todos.map((todo) => {
                    return(
                        <Paper key={todo._id} className={classes.paper}>{todo.name}</Paper>
                    )
                })
            )
        }
    }

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                    {showTodos()}
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
