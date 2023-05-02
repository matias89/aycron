import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/hooks';

import Button from '@/components/Button/Button';

const Home = () => {
    const router = useRouter();
    const { user, isLogged, logout } = useUser();
    useEffect(() => {
        if (!isLogged) {
            router.push('/users/login');
        }
    }, [isLogged, router]);
    const handleOnLogout = () => {
        logout();
        router.push('/users/login');
    };
    return (
        <div>
            <h1>Home - {user} | <Button type="button" onClick={handleOnLogout}>Salir</Button></h1>
        </div>
    );
};

export default Home;