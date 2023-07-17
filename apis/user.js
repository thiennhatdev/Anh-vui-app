import requestAuth from '../utils/request/request-auth';

export const updateProfile = async (body) => {
    return requestAuth.put('user/me', body);
}
