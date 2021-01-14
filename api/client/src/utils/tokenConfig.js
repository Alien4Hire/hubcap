export const tokenConfig = (getState: Function) => {
    // Get token from localstorage
    const token = localStorage.getItem('access_token');//getState().Auth.token//localStorage.getItem('token');
    // Headers
    const config: IConfigHeaders = {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'GET',
      credentials: 'include',
    };
  
    // If token, add to headers
    if (token) {
      config.headers['access_token'] = token;
    }
  
    return config;
  };