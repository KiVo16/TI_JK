import produce from "immer";
import { Dispatch } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Action, Reducer } from "redux";
import { Auth, GetOrder, GetOrdersList, GetProductList, handleApiError, Login, LogOut } from "../api";
import Product from "../components/ProductList/Product/Product";



export enum GlobalLangs {
    ENG = "ENG",
    PL = "PL",
    DE = "DE",
}

export enum GlobalActions {
    setLoginToken = "setLoginToken",
    setProductList = "setProductList",
    setShoppingProducts = "setShoppingProducts",
    addShoppingProduct = "addShoppingProduct",
    setOrder = "setOrder",
    setLoginOpen = "setLoginOpen",
    setProductOpen = "setProductOpen",
    setSelectedProduct = "setSelectedProduct",
    setOrders = "setOrders"
}

export type Order = {
    id: number
    clientName: string
    products: Product[]
}

export type Product = {
    id: number
    name: string
    description: string
    duration: number
    price: number
    count?: number
}

export const jsonToProduct = (json: string): Product => {
    return JSON.parse(json) as Product;
}

export const jsonToProductArray = (json: string): Product[] => {
    return JSON.parse(json) as Product[];
}

export type GlobalState = {
    login: string
    token: string
    loginOpen: boolean
    productOpen: boolean
    selectedProduct?: Product
    shoppingProducts: Product[]

    order?: Order
    orders: Order[]
    products: Product[]
}

const startGlobalState: GlobalState = {
    login: "",
    token: "",
    loginOpen: false,
    productOpen: false,

    products: [],
    orders: [],
    shoppingProducts: []
}

export interface DispatchGlobalAction extends Action<GlobalActions> {
    params?: Partial<GlobalState> | any;
}

export const useGlobalTypedSelector: TypedUseSelectorHook<GlobalState> = useSelector;


const GlobalReducer: Reducer<GlobalState, DispatchGlobalAction> = (currentState = startGlobalState, action): GlobalState => {
    switch (action.type) {
        case GlobalActions.setLoginToken:
            return setLoginToken(currentState, action.params.login, action.params.token);
        case GlobalActions.setProductList:
            return setProducts(currentState, action.params.products);
        case GlobalActions.setOrder:
            return setOrder(currentState, action.params.order);
        case GlobalActions.setLoginOpen:
            return setLoginOpen(currentState, action.params.open);
        case GlobalActions.setProductOpen:
            return setProductOpen(currentState, action.params.open);
        case GlobalActions.setOrders:
            return setOrders(currentState, action.params.orders);
        case GlobalActions.setSelectedProduct:
            return setSelectedProduct(currentState, action.params.product);
        case GlobalActions.setShoppingProducts:
            return setShoppingProducts(currentState, action.params.products);
        case GlobalActions.addShoppingProduct:
            return addShoppingProduct(currentState, action.params.product);
        default: return currentState
    }
}

export default GlobalReducer;

const setLoginToken = (state: GlobalState, login: string, token: string): GlobalState =>
    produce(state, newState => {
        newState.login = login;
        newState.token = token;
    });

const setProducts = (state: GlobalState, products: Product[]): GlobalState =>
    produce(state, newState => {
        newState.products = products;
    });

const setOrders = (state: GlobalState, orders: Order[]): GlobalState =>
    produce(state, newState => {
        newState.orders = orders;
    });

const setOrder = (state: GlobalState, order?: Order): GlobalState =>
    produce(state, newState => {
        newState.order = order;
    });

const setLoginOpen = (state: GlobalState, open: boolean): GlobalState =>
    produce(state, newState => {
        newState.loginOpen = open;
    });

const setProductOpen = (state: GlobalState, open: boolean): GlobalState =>
    produce(state, newState => {
        newState.productOpen = open;
    });

const setSelectedProduct = (state: GlobalState, product: Product): GlobalState =>
    produce(state, newState => {
        newState.selectedProduct = product;
    });

const setShoppingProducts = (state: GlobalState, product?: Product): GlobalState =>
    produce(state, newState => {
        newState.selectedProduct = product;
    });

const addShoppingProduct = (state: GlobalState, product: Product): GlobalState =>
    produce(state, newState => {

        const index = newState.shoppingProducts.findIndex(i => i.id === product.id);
        console.log("indeX: ", index);
        if (index > -1) {
            let count = newState.shoppingProducts[index].count;
            if (count) count += 1;
            else count = 1;
            newState.shoppingProducts[index].count = count;
        } else newState.shoppingProducts.push({ ...product, count: 1 });
    });



export const globalSetLogin = (login: string, token: string) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setLoginToken, params: { login: login, token: token } });
    }

export const globalSetProducts = (products: Product[]) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setProductList, params: { products: products } });
    }

export const globalSetOrders = (orders: Order[]) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setOrders, params: { orders: orders } });
    }

export const globalSetOrder = (order?: Order) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setOrder, params: { order: order } });
    }

export const globalSetLoginOpen = (open: boolean) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setLoginOpen, params: { open: open } });
    }

export const globalSetProductOpen = (open: boolean) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setProductOpen, params: { open: open } });
    }

export const globalSetSelectedProduct = (product?: Product) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setSelectedProduct, params: { product: product } });
    }

export const globalSetShoppingProducts = (products: Product[]) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setShoppingProducts, params: { products: products } });
    }

export const globalAddShoppingProduct = (product: Product) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.addShoppingProduct, params: { product: product } });
    }





export const globalGetListProducts = (search?: string) =>
    (dispatch: Dispatch<any>) => {
        GetProductList(search).then((response) => {
            dispatch(globalSetProducts(response.data));
        }).catch(handleApiError);
    };


export const globalGetListOrders = () =>
    (dispatch: Dispatch<any>) => {
        GetOrdersList().then((response) => {
            dispatch(globalSetOrders(response.data));
        }).catch(handleApiError);
    };

export const globalGetOrder = (id: number, key: string) =>
    (dispatch: Dispatch<any>) => {
        GetOrder(id, key).then((response) => {
            console.log("ordeR: ", response.data);
            dispatch(globalSetOrder(response.data));
        }).catch(handleApiError);
    };

export const globalLogin = (login: string, pass: string) =>
    (dispatch: Dispatch<any>) => {
        Login({ login: login, pass: pass }).then((response) => {
            dispatch(globalSetLogin(response.data.login, response.data.token));
        }).catch(handleApiError);
    };

export const globalAuth = () =>
    (dispatch: Dispatch<any>) => {
        Auth().then((response) => {
            dispatch(globalSetLogin(response.data.login, response.data.token));
        }).catch(handleApiError);
    };


export const globalLogout = () =>
    (dispatch: Dispatch<any>) => {
        LogOut().then(() => {
            dispatch(globalSetLogin("", ""));
        }).catch(handleApiError);
    };


