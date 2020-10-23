import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {addTodo} from "../redux/actions/todoActions";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: 10,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textField: {
        marginTop: '20px',
        marginBottom: '20px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    modal: {
        position: 'absolute',
        height: 400,
        width: '66vw',
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '10%',
        transform: 'translate(25%, 25%)'
    },
    button: {
        marginTop: '75px'
    }
}));

const AddTodo = () => {
    const dispatch = useDispatch();
    const todoState = useSelector((state) => state.TodoReducer, shallowEqual)
    const classes = useStyles();

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

    return(
        <form className={classes.modal} onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    className={classes.textField}
                    variant={'filled'}
                    id='name'
                    label='Name'
                    type='text'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <TextField
                    fullWidth
                    variant={'filled'}
                    className={classes.textField}
                    id='description'
                    label='Description'
                    type='text'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                />
            <Button className={classes.button} type='submit'>Add Todo</Button>
        </form>
    )
}

export default AddTodo;