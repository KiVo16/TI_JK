import styles from './ShoppingCart.module.scss';
import classes from 'classnames';
import { PropsWithCustomBase } from '../../utils/sharedTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../..';
import { useEffect } from 'react';

type ShoppingCartProps = PropsWithCustomBase<{
    onClick?: () => void
}>

const ShoppingCart = ({ onClick, className }: ShoppingCartProps) => {


    const products = useSelector((state: RootState) => state.global.shoppingProducts);

    const count = products.reduce<number>((n, v) => v.count ? n + v.count : n, 0)
    const price = products.reduce<number>((n, v) => v.count ? n + (v.count * v.price) : n, 0);

    useEffect(() => {
        console.log("state: ", products);
    }, [products])

    return (
        <div className={classes(styles.cart, className)} onClick={onClick}>
            <div className={classes("text", "text--medium", "font__weight__primary--semi-bold", "text-color--white")}>Koszyk</div>
            <div className={classes("text", "text--medium", "font__weight__primary--regular", "text-color--white")}>{count} - {price.toFixed(2)}zł</div>
        </div>
    )
}

export default ShoppingCart;