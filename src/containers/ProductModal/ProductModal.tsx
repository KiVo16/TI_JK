import styles from './ProductModal.module.scss';
import classes from 'classnames';
import Modal, { ModalProps } from '../../components/Modal/Modal';
import InputField from '../../components/InputField/InputField';
import { inputChange, useInputFieldReducer } from '../../reducers/InputFieldReducer';
import Button from '../../components/Button/Button';
import { useCallback, useEffect, useState } from 'react';
import { CreateProduct, handleApiError, Login, UpdateProduct } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { globalGetListProducts, globalSetLogin } from '../../redux/GlobalReducer';
import TextAreaField from '../../components/TextAreaField/TextAreaField';
import { RootState } from '../..';

type ProductModalProps = {

} & ModalProps

const ProductModal = (props: ProductModalProps) => {

    const reduxDispatch = useDispatch();
    const [nameReducer, dispatchNameReducer] = useInputFieldReducer();
    const [descReducer, dispatchDescReducer] = useInputFieldReducer();
    const [durationReducer, dispatchDurationReducer] = useInputFieldReducer();
    const [priceReducer, dispatchPriceReducer] = useInputFieldReducer();

    const [errorState, setErrorState] = useState("");

    const selectedProduct = useSelector((state: RootState) => state.global.selectedProduct);

    const onCreate = useCallback(() => {
        CreateProduct({
            id: 0,
            name: nameReducer.value,
            description: descReducer.value,
            duration: parseInt(durationReducer.value),
            price: parseFloat(priceReducer.value)
        }).then(() => {
            reduxDispatch(globalGetListProducts());
            props.onClose();
        }).catch(err => {
            handleApiError(err.response);
            setErrorState(`Błąd: ${err.response.data.error}`);
        })

    }, [nameReducer.value, descReducer.value, durationReducer.value, priceReducer.value])

    const onUpadte = useCallback(() => {
        if (!selectedProduct) return;
        UpdateProduct({
            id: selectedProduct.id,
            name: nameReducer.value,
            description: descReducer.value,
            duration: parseInt(durationReducer.value),
            price: parseFloat(priceReducer.value)
        }).then(() => {
            reduxDispatch(globalGetListProducts());
            props.onClose();
        }).catch(err => {
            handleApiError(err.response);
            setErrorState(`Błąd: ${err.response.data.error}`);
        })

    }, [selectedProduct?.id, nameReducer.value, descReducer.value, durationReducer.value, priceReducer.value])

    useEffect(() => {
        if(!selectedProduct) return;
        const {name, description, price, duration} = selectedProduct;
        inputChange(name, dispatchNameReducer);
        inputChange(description, dispatchDescReducer);
        inputChange(price.toString(), dispatchPriceReducer);
        inputChange(duration.toString(), dispatchDurationReducer);
    }, [selectedProduct])

    return (
        <Modal {...props} title={selectedProduct ? "Aktualizacja produktu" : "Dodawanie produktu"} contentClassName={styles.content}>
            <InputField
                dispatch={dispatchNameReducer}
                value={nameReducer.value}
                placeholder="Nazwa"
                fieldStyle="modern"
                type="text"
                className={classes(styles.list__summary__input)}
            />
            <TextAreaField
                onValueChange={(v) => inputChange(v, dispatchDescReducer)}
                value={descReducer.value}
                placeholder="Opis"
                fieldStyle="modern"
                type="text"
                className={classes(styles.list__summary__input)}
            />
            <InputField
                dispatch={dispatchDurationReducer}
                value={durationReducer.value}
                placeholder="Długość zabiegu"
                fieldStyle="modern"
                type="number"
                className={classes(styles.list__summary__input)}
            />
            <InputField
                dispatch={dispatchPriceReducer}
                value={priceReducer.value}
                placeholder="Cena"
                fieldStyle="modern"
                type="number"
                className={classes(styles.list__summary__input)}
            />
            {
                errorState !== "" && <div className={classes("text", "text--medium")} style={{ color: "red" }}>{errorState}</div>
            }
            <Button color="primary" onClick={() => {
                if (selectedProduct) onUpadte();
                else onCreate();
            }}>
                {selectedProduct ? "Zaaktualizuj" : "Stwórz"}
            </Button>
        </Modal>
    )
}

export default ProductModal;