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

export const filterOnlineUser = (filteredUser, onlineUsers) => {
    // Create a map of userId to status from the onlineUsers array
    console.log(filteredUser, onlineUsers)
    const statusMap = onlineUsers.reduce((map, { userId, status }) => {
        map[userId] = status;
        return map;
    }, {});

    // Add the status to each user in filteredUser based on userId
    return filteredUser.map(user => ({
        ...user,
        status: statusMap[user.id] || 'Offline' // Default to 'Offline' if no status is found
    }));
};