import instance from './instance';

export const like = async (body) => {
    return instance.post('likes', body);
}