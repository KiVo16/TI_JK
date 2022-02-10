import classes from 'classnames';
import { Product } from '../../redux/GlobalReducer';
import { PropsWithCustomBase } from '../../utils/sharedTypes';
import styles from './Summary.module.scss';

type SummaryProps = PropsWithCustomBase<{
    products: Product[]
}>;

const Summary = ({ className, products }: SummaryProps) => {


    const count = products.reduce<number>((n, v) => v.count ? n + v.count : n, 0)
    const price = products.reduce<number>((n, v) => v.count ? n + (v.count * v.price) : n, 0);

    return (
        <div className={classes(styles.summary, className)}>
            <span className={classes("text", "text--medium", "font__weight__primary--semi-bold")}>Podsumowanie</span>
            <span className={classes("text", "text--medium", "font__weight__primary--regular")}>{count} usługi - {price.toFixed(2)} ZŁ</span>
        </div>
    )
}

export default Summary;