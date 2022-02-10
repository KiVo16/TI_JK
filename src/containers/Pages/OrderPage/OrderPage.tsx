import classes from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../../..';
import { DeleteOrder, GetOrder, handleApiError } from '../../../api';
import Button from '../../../components/Button/Button';
import CatchPhrase from '../../../components/CatchPhrase/CatchPhrase';
import ProductList from '../../../components/ProductList/ProductList';
import Section from '../../../components/Section/Section';
import Summary from '../../../components/Summary/Summary';
import { globalGetOrder, globalSetOrder } from '../../../redux/GlobalReducer';
import BasePage from '../../BasePage/BasePage';
import styles from './OrderPage.module.scss';

const OrderPage = () => {

    const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    const reduxDispatch = useDispatch();
    const order = useSelector((state: RootState) => state.global.order);
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        if (!params.id) return;

        if (!searchParams.get("key")) {
            alert("Nie masz dostępu do tego zamówienia. Brakuje pola 'key' w url");
            navigate("/");
            return;
        }

        GetOrder(parseInt(params.id), searchParams.get("key")!).then(response => reduxDispatch(globalSetOrder(response.data)))
            .catch(err => {
                handleApiError(err.response);
                alert("Wystąpił błąd podczas pobierania informacji o zamówieniu: " + err.response.data.error);
                navigate("/");
            })
    }, [params.id])

    const onDelete = () => {
        if (!params.id) return;

        DeleteOrder(parseInt(params.id), searchParams.get("key")!).then(() => {
            alert("Zamówienie zostało usunięte. Zostaniesz przekierowany na stronę główną");
            reduxDispatch(globalSetOrder(undefined));
            navigate("/");
        }).catch(err => {
            handleApiError(err.response);
            alert("Wystąpił błąd podczas usuwania zamówienia: " + err.response.data.error);
            navigate("/");
        })
    }

    return (
        <BasePage>
            <CatchPhrase className={classes("u-margin-layout-bottom--small")} heading={`Zamowienie #${order?.id}`} content="Bez zakładnia konta i innych niepotrzebnych rzeczy" />
            <Section className={classes(styles.list)}>
                <div className={classes(styles.list__header, "u-margin-bottom--medium")}>
                    <Button color="primary" onClick={() => navigate("/")}>Wróć</Button>
                    <span className={classes("text", "text--medium", "font__weight__primary--semi-bold")}>Zamówienie - {order?.clientName}</span>
                    <Button color="primary" onClick={() => onDelete()}>Odwołaj</Button>
                </div>
                <ProductList products={order?.products ? order?.products : []} className={classes("u-margin-bottom--medium")} />
                <Summary products={order?.products ? order?.products : []} />
            </Section>
        </BasePage>
    )
}

export default OrderPage;