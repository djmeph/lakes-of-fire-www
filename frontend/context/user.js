import { useState, createContext } from 'react';
export const UserContext = createContext(null);
import { linstance } from '../lib/api';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [loggingIn, setLoggingIn] = useState();

  const doRegister = async (values) => {
    var ret = ['niente'];
    try {
      const resp = await linstance.post('/api/auth/register', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  const checkLogin = async () => {
    try {
      const resp = await linstance.get('/api/auth/user');
      setUser(resp.data.user);
      setEmail(resp.data.email);
      setId(resp.data.id);
      return resp;
    } catch (error) {
      return error.response;
    }
  }

  const doLogin = async (values) => {
    try {
      const resp = await linstance.post('/api/auth/login', values);
      return resp.data;
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  const doLogout = async () => {
    const resp = await linstance.post('/api/auth/logout', {
      method: 'POST',
    });
    if (resp.data.message == 'success') {
      setUser('');
      setEmail('');
      setId('');
    }
  };

  const doGoogleCallback = async (values) => {
    try {
      const resp = await linstance.post('/api/auth/google/callback', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  const doFacebookCallback = async (values) => {
    try {
      const resp = await linstance.post('/api/auth/facebook/callback', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  const useract = {
    doRegister: doRegister,
    user: user,
    setUser: setUser,
    email: email,
    setEmail: setEmail,
    id: id,
    setLoggingIn: setLoggingIn,
    loggingIn: loggingIn,
    setId: setId,
    checkLogin: checkLogin,
    doLogin: doLogin,
    doLogout: doLogout,
    doGoogleCallback: doGoogleCallback,
    doFacebookCallback: doFacebookCallback
  };

  return (
    <UserContext.Provider value={useract}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
