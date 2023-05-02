import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/hooks';

import Button from '@/components/Button/Button';

const Home = () => {
    const router = useRouter();
    const { user, isLogged, logout, isLoaded } = useUser();
    useEffect(() => {
        if (!isLogged && isLoaded) {
            router.push('/users/login');
        }
    }, [isLogged, router, isLoaded]);
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