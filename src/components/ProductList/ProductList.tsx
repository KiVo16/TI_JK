import styles from './ProductList.module.scss';
import classes from 'classnames';
import { PropsWithCustomBase } from '../../utils/sharedTypes';
import Product from './Product/Product';
import { globalAddShoppingProduct, globalGetListProducts, globalSetProductOpen, globalSetSelectedProduct, Product as ProductType } from '../../redux/GlobalReducer';
import { DeleteProduct, handleApiError } from '../../api';
import { useDispatch } from 'react-redux';

type ProductListProps = PropsWithCustomBase<{
    buyMode?: boolean
    adminMode?: boolean
    products: ProductType[]
    productClassName?: string
}>;

const ProductList = ({ className, adminMode, buyMode, products, productClassName }: ProductListProps) => {

    const reduxDispatch = useDispatch();

    const onDelete = (product: ProductType) => {
        DeleteProduct(product.id).then(() => {
            reduxDispatch(globalGetListProducts());
        }).catch(handleApiError);
    } 

    const onUpdate = (product: ProductType) => {
        reduxDispatch(globalSetSelectedProduct(product));
        reduxDispatch(globalSetProductOpen(true));
    } 

    const onAddToCart = (product: ProductType) => {
        console.log("addProduct: ", product);
        reduxDispatch(globalAddShoppingProduct(product));
    }

    return (
        <ul className={classes(styles.list, className)}>
            {
                products.map(p => <Product key={p.id} className={productClassName} product={p} adminMode={adminMode} buyMode={buyMode} onUpdate={onUpdate} onDelete={onDelete} onAddToCart={onAddToCart} />)
            }
        </ul>
    )
}

export default ProductList;