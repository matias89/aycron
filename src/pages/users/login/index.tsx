import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/hooks';

import Field from '@/components/Field/Field';
import Button from '@/components/Button/Button';
import { post } from '@/utils/http';
import type { TForm } from '@/utils/types';

const Login = () => {
    const router = useRouter();
    const { login, isLogged } = useUser();

    useEffect(() => {
        if (isLogged) {
            router.push('/home');
        }
    }, [isLogged, router]);

    const [form, setForm] = useState<TForm>({
        email: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: '',
        },
    });
    const handleOnChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: {
                value: e.target.value,
                error: '',
            },
        });
    };
    const handleOnRegister = async () => {
        router.push('/users/register');
    };
    const handleOnLogin = async () => {
        const errors: TForm = {};
        Object.keys(form).forEach((key) => {
            if (form[key].value === '') {
                errors[key] = {
                    value: '',
                    error: `${key} is required`,
                };
            }
        });
        if (Object.keys(errors).length > 0) {
            setForm({
                ...form,
                ...errors,
            });
            return;
        } else {
            const { email, password } = form;
            const response = await post('users/login', {
                email: email.value,
                password: password.value,
            });
            if (response.isLogged) {
                setForm({
                    email: {
                        value: '',
                        error: '',
                    },
                    password: {
                        value: '',
                        error: '',
                    },
                });
                login(response.name);
                router.push('/home');
            } else {
                alert('Login failed');
            }
        }
    };
    return (
        <div>
            <h1>Login</h1>
            <div>
                <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email.value}
                    error={form.email.error}
                    onChange={handleOnChangeValue}
                />
                <Field
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password.value}
                    error={form.password.error}
                    onChange={handleOnChangeValue}
                />
                <Button type="button" onClick={handleOnLogin}>Login</Button>
                <Button type="button" onClick={handleOnRegister}>Register</Button>
            </div>
        </div>
    );
};

export default Login;