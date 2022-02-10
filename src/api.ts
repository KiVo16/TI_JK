import axios from "axios"
import { Order, Product } from "./redux/GlobalReducer"

const baseURL = "http://localhost/techniki/p1/api"
const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL
  })
  

export const handleApiError = (err: any) => console.error("API error: ", err);



type GeneralResponse = {
    data: string
}

type CreateOrderResponse = {
    id: number
    key: string
}


type TokenResponse = {
    login: string
    token: string
}

export const CreateOrder = (order: Order) => {
    const json = JSON.stringify(order);
    return instance.post<CreateOrderResponse>("orders", json);
}

export const GetOrder = (id: number, key: string) => {
    const params = new URLSearchParams([["key", key]]);
    return instance.get<Order>(`orders/${id}`, { params: params });
}

export const DeleteOrder = (id: number, key: string) => {
    const params = new URLSearchParams([["key", key]]);
    return instance.delete<GeneralResponse>(`orders/${id}`, { params: params });
}


export const GetProductList = async (search?: string) => {
    let params = new URLSearchParams();
    if (search) params = new URLSearchParams([["search", search]]);
    return instance.get<Product[]>(`products`, { params: params });
}


export const CreateProduct = (product: Product) => {
    const json = JSON.stringify(product);
    return instance.post<GeneralResponse>("products", json);
}

export const UpdateProduct = (product: Product) => {
    const json = JSON.stringify(product);
    return instance.put<GeneralResponse>("products", json);
}

export const DeleteProduct = (id: number) => {
    return instance.delete<GeneralResponse>(`products/${id}`);
}



export const Login = (obj: { login: string, pass: string }) => {
    const json = JSON.stringify(obj);
    console.log("json :", json);
    return instance.post<TokenResponse>("login", json);
}


export const LogOut = () => {
    return instance.post<GeneralResponse>("logout");
}


export const Auth = () => {
    return instance.post<TokenResponse>("auth");
}


