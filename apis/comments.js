import qs from 'qs';
import instance from './instance';

export const getComments = async (params = {}, pageParam) => {
    const query = qs.stringify(params);
    const data = await instance.get(`comments?${query}&pagination[page]=${pageParam}`);
    return {data, pageParam};
}

export const comment = async (body) => {
    return instance.post('comments', body);
}