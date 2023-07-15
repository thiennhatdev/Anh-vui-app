import qs from 'qs';
import request from '../utils/request/request';

export const getImages = async (params = {}, pageParam) => {
    const query = qs.stringify(params);
    const data = await request.get(`images?${query}&pagination[page]=${pageParam}`);
    return {data, pageParam};
}