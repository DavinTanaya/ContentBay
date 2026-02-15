import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleButton from '../auth/GoogleButton';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
	const auth = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isAuthenticated) {
			navigate('/', { replace: true });
		}
	}, [auth.isAuthenticated, navigate]);

	return (
		<div
			className='bg-amber-100'
			style={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: 20,
			}}
		>
			<h1>Login</h1>
			<GoogleButton />
		</div>
	);
}
