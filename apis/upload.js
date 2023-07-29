import { CLOUDINARY_NAME } from "@env";
import axios from "axios";

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