import axios from "axios"; 
import { CLOUDINARY_NAME, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_KEY } from "@env";

export const uploadImage = async (formData) => {
    const data = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, 
    formData,
    {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
    );
    return data;
}