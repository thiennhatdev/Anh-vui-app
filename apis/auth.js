import instance from './instance';

export const loginGoogle = async (accessToken) => {
    return instance.get(`auth/google/callback?access_token=${accessToken}`);
}