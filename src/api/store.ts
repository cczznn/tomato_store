// api/store.ts
import { uploadImage } from './upload'
import {axios} from '../utils/request'
import {STORE_MODULE} from "./_prefix.ts";

export interface Store {
    name: string;
    address: string;
    phone: string;
    logo: string;  // logo 图片地址
}

export function uploadStoreLogo(file: File) {
    return uploadImage(file, 'store')
}

export const storeCreate = (store : Store) => {
    return axios.post(`${STORE_MODULE}/create`, store,
        {headers: {'Content-Type': 'application/json'}})
        .then(res => {
            return res;
        })
}

export const storeListGet = () => {
    return axios.get(`${STORE_MODULE}/storeList`,
        {headers: {'Content-Type': 'application/json'}})
        .then(res => {
            return res;
        })
}

export const storeGetById = (id : number) => {
    return axios.get(`${STORE_MODULE}/store`,{params : {id},
        headers : {'Content-Type': 'application/json'}})
        .then(res => {
            return res;
        })
}




