import qs from 'qs';
import request from '../utils/request/request';
import requestAuth from '../utils/request/request-auth';

export const getComments = async (params = {}, pageParam) => {
    const query = qs.stringify(params);
    const data = await request.get(`comments?${query}&pagination[page]=${pageParam}`);
    return {data, pageParam};
}

export const comment = async (body) => {
    return requestAuth.post('comments', body);
}