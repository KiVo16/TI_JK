import styles from './Product.module.scss';
import classes from 'classnames';
import { PropsWithCustomBase } from '../../../utils/sharedTypes';
import IconButton from '../../IconButton/IconButton';
import { ReactComponent as EditIcon } from '../../../res/edit.svg';
import { ReactComponent as InfoIcon } from '../../../res/info.svg';
import { ReactComponent as TrashIcon } from '../../../res/trash.svg';
import DurationIndicator from '../../DurationIndicator/DurationIndicator';
import Button from '../../Button/Button';
import { useState } from 'react';
import { Product as ProductType } from '../../../redux/GlobalReducer';
import { useDispatch } from 'react-redux';

type ProductProps = PropsWithCustomBase<{
    adminMode?: boolean
    buyMode?: boolean
    product: ProductType
    onDelete?: (product: ProductType) => void
    onUpdate?: (product: ProductType) => void
    onAddToCart?: (product: ProductType) => void
}>;

const Product = ({ className, buyMode, adminMode, product, onAddToCart, onDelete, onUpdate }: ProductProps) => {

    const [open, setOpen] = useState(false);
    const { name, description, duration, price, count } = product;

    const onUpdateClick = (e: any) => {
        e.stopPropagation();
        onUpdate?.(product);
    }

    const onDeleteClick = (e: any) => {
        e.stopPropagation();
        onDelete?.(product)
    }

    const onAddToCartClick = (e: any) => {
        e.stopPropagation();
        onAddToCart?.(product);
    }

    return (
        <li className={classes(styles.product, className)}>
            <div className={classes(styles.product__header, { [styles.product__header__count]: count })} onClick={() => setOpen(state => !state)}>
                {count && <span className={classes("text", "text--medium", "font__weight__primary--semi-bold")}>x{count}</span>}
                <span className={classes("text", "text--medium", "font__weight__primary--semi-bold")}>{name}</span>
                {
                    adminMode &&
                    <>
                        <IconButton icon={EditIcon} color="white" onClick={onUpdateClick} />
                        <IconButton icon={TrashIcon} color="white" onClick={onDeleteClick} />
                    </>
                }
                <DurationIndicator duration={duration} />
                <span className={classes("text", "text--medium", "font__weight__primary--semi-bold")}>{price.toFixed(2)} zł</span>
                {
                    buyMode &&
                    <Button color="primary" onClick={onAddToCartClick} style={{ zIndex: 200 }}>Dodaj do koszyka</Button>
                }
            </div>
            {
                open &&
                <div className={classes(styles.product__details)}>
                    <div className={classes("text", "text--medium", "font__weight__primary--medium", "u-margin-bottom-small")}>Opis</div>
                    <div className={classes("text", "text--medium", "font__weight__primary--regular")}>{description}</div>
                </div>
            }
        </li>
    )
}

export default Product;