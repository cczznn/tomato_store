// api/upload.ts
import { axios } from '../utils/request'
import { IMAGE_MODULE } from './_prefix'

/**
 * 上传图片API（通用）
 * @param file 图片文件
 * @param module 上传的模块名，如 store/product/user
 */
export function uploadImage(file: File, module: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('module', module);

    return axios.post(IMAGE_MODULE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
}
