import classes from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../../..';
import { Auth } from '../../../api';
import Button from '../../../components/Button/Button';
import CatchPhrase from '../../../components/CatchPhrase/CatchPhrase';
import OrdersList from '../../../components/OrdersList/OrdersList';
import Section from '../../../components/Section/Section';
import { globalGetListOrders } from '../../../redux/GlobalReducer';
import BasePage from '../../BasePage/BasePage';
import styles from './OrdersPage.module.scss';

const OrdersPage = () => {

    const navigate = useNavigate();
    const reduxDispatch = useDispatch();
    const orders = useSelector((state: RootState) => state.global.orders);

    useEffect(() => {
        Auth().then(() => reduxDispatch(globalGetListOrders()))
        .catch(() => {
            alert("Nie masz uprawnień do tej podstrony. Zostaniesz przekierowany");
            navigate("/");
        })
        
    }, [])

    return (
        <BasePage>
            <CatchPhrase className={classes("u-margin-layout-bottom--small")} heading="Zamówienia" content="Poniżej znajduje się lista wszystkich zamówień klientów" />
            <Section className={classes(styles.list)}>
                <Button className={classes("u-margin-bottom--medium")} color="primary" onClick={() => navigate("/")}>Wróć</Button>
                <OrdersList orders={orders} />
            </Section>
        </BasePage>
    )
}

export default OrdersPage;