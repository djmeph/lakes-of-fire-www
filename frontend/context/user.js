import { useState, createContext } from 'react';
export const UserContext = createContext(null);
import { linstance } from '../lib/api';

const UserProvider = ({ children }) => {
  const [dummy, setDummy] = useState();
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [loggedIn, setLoggingIn] = useState();

  //...

  async function dummyfunction() {
    return "dummy function invoked";
  }

  async function doRegister(values) {
    var ret = ['niente'];
    try {
      const resp = await linstance.post('/api/auth/register', values);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  async function checkLogin() {
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

  async function doLogin(values) {
    try {
      const resp = await linstance.post('/api/auth/login', values);
      return resp.data;
    } catch (error) {
      return ['alert', error.response.data.message];
    }
  }

  const useract = {
    dummy: dummy,
    setDummy: setDummy,
    dummyfunction: dummyfunction,
    doRegister: doRegister,
    user: user,
    setUser: setUser,
    email: email,
    setEmail: setEmail,
    id: id,
    setId: setId,
    checkLogin: checkLogin,
    doLogin: doLogin,
    setLoggingIn: setLoggingIn,
  };

  return (
    <UserContext.Provider value={useract}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
