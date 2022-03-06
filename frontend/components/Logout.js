import { useContext } from 'react';
import { UserContext } from '../context/user';

function Logout() {
  const { doLogout } = useContext(UserContext);

  return <button onClick={() => doLogout()} className="btn btn-primary">Logout</button>;
}

export default Logout;
