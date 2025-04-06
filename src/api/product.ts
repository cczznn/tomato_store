//product.ts
import {axios} from "../utils/request.ts";
import {PRODUCT_MODULE} from "./_prefix.ts";

export interface Product{
    name: string,
    price: number,
    storeId: number,
    description: string,
}

export const productCreate = (product: Product) => {
    return axios.post(`${PRODUCT_MODULE}/create`, product,
        {headers: {'Content-Type': 'application/json'}})
        .then(res => {
            return res;
        })
}

export const productListGet = (storeId : number) => {
    return axios.get(`${PRODUCT_MODULE}/productList`,{params : {storeId : storeId},
    headers : {'Content-Type': 'application/json'}})
        .then(res => {
            return res;
        })
}

export const createEmptyProduct = (storeId: number): Product => ({
    storeId,
    name: '',
    price: 0,
    description: ''
});