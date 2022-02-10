import classes from 'classnames';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../../..';
import { CreateOrder, handleApiError } from '../../../api';
import Button from '../../../components/Button/Button';
import CatchPhrase from '../../../components/CatchPhrase/CatchPhrase';
import InputField from '../../../components/InputField/InputField';
import ProductList from '../../../components/ProductList/ProductList';
import Section from '../../../components/Section/Section';
import Summary from '../../../components/Summary/Summary';
import { useInputFieldReducer } from '../../../reducers/InputFieldReducer';
import BasePage from '../../BasePage/BasePage';
import styles from './SummaryPage.module.scss';

const SummaryPage = () => {

    const [nameReducer, dispatchNameReducer] = useInputFieldReducer();
    const navigate = useNavigate();
    const shoppingProducts = useSelector((state: RootState) => state.global.shoppingProducts);

    const [errorState, setErrorState] = useState("");

    const onCreate = useCallback(() => {
        if (nameReducer.value === "") {
            alert("Podaj swoje imię");
            return;
        }
        CreateOrder({
            id: 0,
            clientName: nameReducer.value,
            products: shoppingProducts
        }).then((response) => {
            navigate(`/orders/${response.data.id}?key=${response.data.key}`);
            console.log("test: ", response.data.key);
        }).catch(err => {
            handleApiError(err.response);
            setErrorState(`Błąd: ${err.response.data.error}`);

        });
    }, [nameReducer.value, shoppingProducts])

    return (
        <BasePage>
            <CatchPhrase className={classes("u-margin-layout-bottom--small")} heading="Twój koszyk" content="Podaj swoje imię oraz potwierdz zakup" />
            <Section className={classes(styles.list)}>
                <Button className={classes("u-margin-bottom--medium")} color="primary" onClick={() => navigate("/")}>Wróć</Button>
                <ProductList products={shoppingProducts} className={classes("u-margin-bottom--medium")} />
                <div className={classes(styles.list__summary)}>
                    <Summary products={shoppingProducts} />
                    <InputField
                        dispatch={dispatchNameReducer}
                        value={nameReducer.value}
                        placeholder="Podaj swoje imię"
                        fieldStyle="modern"
                        type="text"
                        className={classes(styles.list__summary__input)}
                    />
                    <Button color="primary" onClick={onCreate}>Zarezerwuj</Button>
                </div>
                {
                    errorState !== "" && <div className={classes("text", "text--medium")} style={{ color: "red" }}>{errorState}</div>
                }
            </Section>
        </BasePage>
    )
}

export default SummaryPage;