import Logout from '../../components/Logout';
import Link from 'next/link';
import { useEffect, useContext } from 'react';

import { UserContext } from '../../context/user';
import GoogleLogin from '../../components/GoogleLogin';
import FacebookLogin from '../../components/FacebookLogin';

import { useRouter } from 'next/router';

export default function Home() {
  const { user, email, id, checkLogin } = useContext(UserContext);
  const { query } = useRouter();
  const error = query.msg;
  useEffect(() => {
    async function fetchData() {
      const res = await checkLogin();
      if (res.status === 200) {
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Welcome</h1>
      {error && <div>{error}</div>}
      {user && (
        <>
          <div>
            <p>
              {id} - {user} {email}
              <br />
            </p>
          </div>
          <Logout />
        </>
      )}
      {!user && (
        <>
          <Link href="/user/login" passHref>
            <button className="btn btn-primary">Login</button>
          </Link>
          <Link href="/user/register" passHref>
            <button className="btn btn-primary">Register</button>
          </Link>
          <div className='col'>
            <GoogleLogin />
          </div>
          <div className='col'>
            <FacebookLogin />
          </div>
        </>
      )}
    </div>
  );
}
