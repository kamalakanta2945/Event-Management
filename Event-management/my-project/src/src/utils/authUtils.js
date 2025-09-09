export const getToken = () => localStorage.getItem('jwt');

export const setToken = (token) => localStorage.setItem('jwt', token);

export const removeToken = () => localStorage.removeItem('jwt');

export const getUserRole = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null; // no user stored

  try {
    const user = JSON.parse(userStr);
    return user?.role || null;
  } catch (e) {
    console.warn('Invalid user data in localStorage, clearing it', e);
    localStorage.removeItem('user'); // remove invalid data
    return null;
  }
};

export const isAuthenticated = () => !!getToken();
