import axios from 'axios';
import { CONTACT_API } from '../Apis';

export const sendContactEmail = async (contactData) => {
    try {
        const response = await axios.post(CONTACT_API.sendContactEmail, contactData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error sending contact email');
    }
};
