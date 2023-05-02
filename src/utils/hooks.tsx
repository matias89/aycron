import { useState, createContext, useContext, useEffect, use } from 'react';

export const UserContext = createContext({
    user: '',
    isLogged: false,
    login: (user: string) => {},
    logout: () => {},
    isLoaded: false,
});

export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const user = window.sessionStorage.getItem('user');
        const isLogged = window.sessionStorage.getItem('isLogged') === 'true';
        setUser(user || '');
        setIsLogged(isLogged);
        setIsLoaded(true);
    }, []);

    const login = (userName: string) => {
        window.sessionStorage.setItem('user', userName);
        window.sessionStorage.setItem('isLogged', 'true');
        setUser(userName);
        setIsLogged(true);
    };

    const logout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isLogged');
        setUser('');
        setIsLogged(false);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                isLogged,
                login,
                logout,
                isLoaded,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);