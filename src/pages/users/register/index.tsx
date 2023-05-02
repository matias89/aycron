import { useState } from 'react';
import Field from '@/components/Field/Field';
import Button from '@/components/Button/Button';

import { post } from '@/utils/http';

import { TForm } from '@/utils/types';

const Register = () => {
    const [form, setForm] = useState<TForm>({
        name: {
            value: '',
            error: '',
        },
        email: {
            value: '',
            error: '',
        },
        role: {
            value: 'manager',
            error: '',
        },
        password: {
            value: '',
            error: '',
        },
    });
    const handleOnChangeRole = () => {
        setForm({
            ...form,
            role: {
                value: form.role.value === 'manager' ? 'admin' : 'manager',
                error: '',
            },
        });
    };
    const handleOnChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: {
                value: e.target.value,
                error: '',
            },
        });
    };
    const handleOnRegister = () => {
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
            const { name, email, role, password } = form;
            const response = post('users/register', {
                name: name.value,
                email: email.value,
                role: role.value,
                password: password.value,
            });
            console.log('response', response);
        }
    };
    return (
        <div>
            <h1>Register</h1>
            <div>
                <Field
                    label="Name"
                    name="name"
                    type="text"
                    value={form.name.value}
                    error={form.name.error}
                    onChange={handleOnChangeValue}
                />
                <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email.value}
                    error={form.email.error}
                    onChange={handleOnChangeValue}
                />
                <Field
                    label="Role"
                    name="role"
                    type="role"
                    value={form.role.value}
                    onChange={handleOnChangeValue}
                    readOnly
                />
                <Button
                    type="button"
                    onClick={handleOnChangeRole}
                >
                    Change role
                </Button>
                <Field
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password.value}
                    error={form.password.error}
                    onChange={handleOnChangeValue}
                />
                <Button type="button" onClick={handleOnRegister}>Register</Button>
            </div>
        </div>
    );
};

export default Register;