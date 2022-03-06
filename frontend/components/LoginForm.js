import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/user';

const LoginForm = () => {
  const { handleSubmit, register } = useForm();

  const [alert, setAlert] = useState(['', '']);


  const { setUser, doLogin, loggingIn, setLoggingIn } =
    useContext(UserContext);

  const onSubmit = async (values) => {
    setLoggingIn(true);
    const ret = await doLogin(values);

    if (ret[0] == 'alert') {
      setAlert(ret);
    } else {
      setUser(ret.message.username);
    }
    setLoggingIn(false);
  };
  return (
    <main className="container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="mb-3">
          <label className="form-label">
            Username or Email
          </label>
          <input
            autoComplete="username"
            type="text"
            className="form-control"
            {...register('identifier', {
              required: true,
            })}
          />


          <label className="form-label">
            Password
          </label>
          <input
            autoComplete="current-password"
            type="password"
            {...register('password', {
              required: true,
            })}
            className="form-control"
          />

        </div>
        <div className='mb-3'>


          <button
            type="submit"
            className="btn btn-primary"
            disabled={loggingIn}
          >
            {loggingIn && 'Logging in...'}
            {!loggingIn && 'Login'}
          </button>
        </div>
        {alert[1]}
      </form>
      <div>
        <a href="/user/forgotpassword">Forgot password?</a>
      </div>
    </main>
  );
}

export default LoginForm;
