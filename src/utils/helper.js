import {jwtDecode} from 'jwt-decode';
export const decodeJWT = (token) => {    
    try {
        const decodedToken = jwtDecode(token);

        const userId = decodedToken.id;  // Replace with the actual key used to store the resource ID in your JWT
        const userEmail = decodedToken.email;  // Replace with the actual key used to store the resource ID in your JWT
        return {
            userId,
            userEmail
        }
    } catch (error) {
        console.error('Failed to decode JWT token:', error);
    }

}
