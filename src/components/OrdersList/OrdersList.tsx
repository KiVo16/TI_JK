import classes from 'classnames';
import { useDispatch } from 'react-redux';
import { Order as OrderType } from '../../redux/GlobalReducer';
import { PropsWithCustomBase } from '../../utils/sharedTypes';
import Order from './Order/Order';
import styles from './OrdersList.module.scss';

type OrdersListProps = PropsWithCustomBase<{
    orders: OrderType[]
}>;

const OrdersList = ({ className, orders }: OrdersListProps) => {

    return (
        <ul className={classes(styles.list, className)}>
            {
                orders.map(p => <Order key={p.id} order={p} />)
            }
        </ul>
    )
}

export default OrdersList;