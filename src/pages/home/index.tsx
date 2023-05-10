import { useEffect , useState} from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/hooks';

import { get, remove } from '@/utils/http';

import Button from '@/components/Button/Button';
import Table from '@/components/Table/Table';

const Home = () => {
    const router = useRouter();
    const { user, isLogged, logout, isLoaded } = useUser();
    const [warehouses, setWarehouses] = useState([]);
    const fetchWarehouses = async () => {
        const data = await get('warehouses');
        setWarehouses(data);
    };
    useEffect(() => {
        if (!isLogged && isLoaded) {
            router.push('/users/login');
        }
    }, [isLogged, router, isLoaded]);
    useEffect(() => {
        fetchWarehouses();
    }, []);
    const handleOnLogout = () => {
        logout();
        router.push('/users/login');
    };
    const handleOnAdd = () => {
        router.push('/warehouses/register');
    };
    const handleOnDelete = async (code: string) => {
        if(window.confirm('Realmente deseas borrar este registro?')) {
            await remove(`warehouses/${code}`);
            fetchWarehouses(); // podria remover solo el item para no voolver a llamar al servicio
        }
    };
    const handleOnDownload = (code: string) => {
        alert('TODO: download >>> ' + code);
    };
    return (
        <div>
            <h2>Welcome {user.toUpperCase()}</h2>
            <hr />
            <Button type="button" onClick={handleOnAdd}>Add new warehouse</Button>
            <Button type="button" onClick={handleOnLogout}>Logout</Button>
            <hr />
            {warehouses.length ? (
                <Table
                    data={warehouses}
                    onDelete={handleOnDelete}
                    onDownload={handleOnDownload}
                />
            ) : (
                // eslint-disable-next-line react/no-unescaped-entities
                <p>No se han encontrado registros. Puedes cargar uno nuevo haciendo click en "Add Warehouse".</p>
            )}
        </div>
    );
};

export default Home;