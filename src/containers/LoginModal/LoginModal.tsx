import styles from './LoginModal.module.scss';
import classes from 'classnames';
import Modal, { ModalProps } from '../../components/Modal/Modal';
import InputField from '../../components/InputField/InputField';
import { useInputFieldReducer } from '../../reducers/InputFieldReducer';
import Button from '../../components/Button/Button';
import { useCallback, useEffect, useState } from 'react';
import { handleApiError, Login } from '../../api';
import { useDispatch } from 'react-redux';
import { globalSetLogin } from '../../redux/GlobalReducer';

type LoginModalProps = {

} & ModalProps

const LoginModal = (props: LoginModalProps) => {

    const reduxDispatch = useDispatch();
    const [loginReducer, dispatchLoginReducer] = useInputFieldReducer();
    const [passReducer, dispatchPassReducer] = useInputFieldReducer();

    const [errorState, setErrorState] = useState("");

    useEffect(() => {
        setErrorState("");
    }, [props.open])

     const onLogIn = useCallback(() => {
        Login({ login: loginReducer.value, pass: passReducer.value }).then(response => {
            reduxDispatch(globalSetLogin(response.data.login, response.data.token));
            props.onClose();
        }).catch(err => {
            handleApiError(err.response);
            setErrorState(`Błąd: ${err.response.data.error}`);
        })
    }, [loginReducer.value, passReducer.value])

    return (
        <Modal {...props} title="Logowanie" contentClassName={styles.content}>
            <InputField
                dispatch={dispatchLoginReducer}
                value={loginReducer.value}
                placeholder="Login"
                fieldStyle="modern"
                type="text"
                className={classes(styles.list__summary__input)}
            />
            <InputField
                dispatch={dispatchPassReducer}
                value={passReducer.value}
                placeholder="Hasło"
                fieldStyle="modern"
                type="password"
                className={classes(styles.list__summary__input)}
            />
            {
                errorState !== "" && <div className={classes("text", "text--medium")} style={{ color: "red" }}>{errorState}</div>
            }
            <Button color="primary" onClick={onLogIn}>Zaloguj się</Button>
        </Modal>
    )
}

export default LoginModal;