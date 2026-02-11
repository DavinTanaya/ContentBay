import { useAuth } from '../auth/AuthContext';

export default function Home() {
  const auth = useAuth();

  return (
    <div style={{ padding: 40 }}>
      <h1>Home</h1>

      <p>{auth.user?.name}</p>
      <p>{auth.user?.email}</p>

      <button onClick={auth.logout}>Logout</button>
    </div>
  );
}
