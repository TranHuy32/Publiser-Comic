
import axios from 'axios'
import { createRefresh } from 'react-auth-kit'

const refreshApi = createRefresh({
    interval: 10,
    refreshApiCallback: async (
        {
            authToken,
            authTokenExpireAt,
            refreshToken,
            refreshTokenExpiresAt,
            authUserState
        }) => {
        try {
            const response = await axios.post('http://localhost:3000/publisherauth/refresh', { 'refreshToken': refreshToken }, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            }
            )
            return {
                isSuccess: true,
                newAuthToken: response.data.accessToken,
                newRefreshToken: response.data.refreshToken,
                newAuthTokenExpireIn: 10,
                newRefreshTokenExpiresIn: 60
            }
        }
        catch (error) {
            console.error(error)
            return {
                isSuccess: false
            }
        }
    }
})

export default refreshApi