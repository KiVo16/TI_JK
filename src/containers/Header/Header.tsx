import classes from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../..';
import Button from '../../components/Button/Button';
import { globalSetLoginOpen, globalLogout } from '../../redux/GlobalReducer';
import styles from './Header.module.scss';


const Header = () => {
    const reduxDispatch = useDispatch();

    const token = useSelector((state: RootState) => state.global.token);
    const login = useSelector((state: RootState) => state.global.login);

    return (
        <div className={classes("content__full", styles.header)}>
            {
                token === ""
                    ? <div className={classes("text", "text--medium", "font__weight__primary--semi-bold")} style={{ cursor: "pointer" }} onClick={() => reduxDispatch(globalSetLoginOpen(true))}>Włącz tryb admina</div>
                    : <div className={classes("text", "text--medium", "font__weight__primary--semi-bold")} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: "2rem" }}>Witaj, {login}</div>
                        <span onClick={() => reduxDispatch(globalLogout())} style={{ fontSize: "1.2rem", color: "var(--color-primary)" }}>Wyloguj</span>
                    </div>
            }
        </div>
    )
}

export default Header;