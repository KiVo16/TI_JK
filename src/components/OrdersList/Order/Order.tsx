import classes from 'classnames';
import { useState } from 'react';
import { Order as OrderType } from '../../../redux/GlobalReducer';
import { ReactComponent as EditIcon } from '../../../res/edit.svg';
import { ReactComponent as TrashIcon } from '../../../res/trash.svg';
import { PropsWithCustomBase } from '../../../utils/sharedTypes';
import Button from '../../Button/Button';
import DurationIndicator from '../../DurationIndicator/DurationIndicator';
import IconButton from '../../IconButton/IconButton';
import ProductList from '../../ProductList/ProductList';
import styles from './Order.module.scss';

type OrderProps = PropsWithCustomBase<{
    order: OrderType
}>;

const Order = ({ className, order }: OrderProps) => {

    const [open, setOpen] = useState(false);
    const { clientName, id, products } = order;

    const count = products.reduce<number>((n, v) => v.count ? n + v.count : n, 0)
    const price = products.reduce<number>((n, v) => v.count ? n + (v.count * v.price) : n, 0);

    return (
        <li className={classes(styles.order, className)}>
            <div className={classes(styles.order__header, { [styles.order__header__count]: count })} onClick={() => setOpen(state => !state)}>
                <span className={classes("text", "text--medium", "font__weight__primary--semi-bold")}>{clientName}</span>
                <span className={classes("text", "text--medium", "font__weight__primary--semi-bold")}>{count} usługi - {price.toFixed(2)} zł</span>
            </div>
            {
                open &&
                <div className={classes(styles.order__details)}>
                    <ProductList products={products} productClassName={styles.order__product} />
                </div>
            }
        </li>
    )
}

export default Order;