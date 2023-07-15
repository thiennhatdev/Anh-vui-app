import requestAuth from '../utils/request/request-auth';

export const like = async (body) => {
    return requestAuth.post('likes', body);
}

export const dislike = async (id) => {
    return requestAuth.delete(`likes/${id}`);
}