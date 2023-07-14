import qs from 'qs';
import instance from './instance';

export const getImages = async (params = {}, pageParam) => {
    const query = qs.stringify(params);
    const data = await instance.get(`images?${query}&pagination[page]=${pageParam}`);
    return {data, pageParam};
}