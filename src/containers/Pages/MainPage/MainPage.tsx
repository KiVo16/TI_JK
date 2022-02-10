import classes from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../../..';
import Button from '../../../components/Button/Button';
import CatchPhrase from '../../../components/CatchPhrase/CatchPhrase';
import Hint from '../../../components/Hint/Hint';
import InputField from '../../../components/InputField/InputField';
import ProductList from '../../../components/ProductList/ProductList';
import Section from '../../../components/Section/Section';
import ShoppingCart from '../../../components/ShoppingCart/ShoppingCart';
import { useInputFieldReducer } from '../../../reducers/InputFieldReducer';
import { globalAuth, globalGetListProducts, globalSetProductOpen } from '../../../redux/GlobalReducer';
import BasePage from '../../BasePage/BasePage';
import styles from './MainPage.module.scss';

const MainPage = () => {
    const [searchReducer, dispatchSearchReducer] = useInputFieldReducer();
    const navigate = useNavigate();

    const reduxDispatch = useDispatch();
    const products = useSelector((state: RootState) => state.global.products);
    const token = useSelector((state: RootState) => state.global.token);

    useEffect(() => {
        reduxDispatch(globalGetListProducts());
        reduxDispatch(globalAuth());
    }, [])

    useEffect(() => {
        reduxDispatch(globalGetListProducts(searchReducer.value));
    }, [searchReducer.value])

    return (
        <BasePage>
            <CatchPhrase className={classes("u-margin-layout-bottom--small")} heading="Umawiaj wizyty szybko i prosto" content="Bez zakładnia konta i innych niepotrzebnych rzeczy" />
            <Section className={classes(styles.list)}>
                <div className={classes(styles.list__header, "u-margin-bottom--medium")}>
                    <InputField
                        dispatch={dispatchSearchReducer}
                        value={searchReducer.value}
                        placeholder="Wyszukaj usługi"
                        fieldStyle="modern"
                        type="text"
                        className={classes(styles.list__header__input)}
                    />
                    {token !== "" && <Button color="primary" onClick={() => reduxDispatch(globalSetProductOpen(true))}>Dodaj produkt</Button>}
                </div>
                <ProductList buyMode adminMode={token !== ""} products={products} />
            </Section>

            <div className={classes(styles.floated)}>
                <ShoppingCart onClick={() => navigate("/cart")} />
                <Hint />
            </div>
        </BasePage>
    )
}

export default MainPage;