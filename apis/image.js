import axios from 'axios';
import qs from 'qs';
import { HOST } from "@env";

export const getImages = async (params = {}, pageParam) => {
    const query = qs.stringify(params);
    const data = await axios.get(`${HOST}api/images?${query}&pagination[page]=${pageParam}`);
    
    return {data, pageParam};
}