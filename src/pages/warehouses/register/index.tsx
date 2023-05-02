import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '@/utils/hooks';

import Field from '@/components/Field/Field';
import Button from '@/components/Button/Button';

import { warehouseFormInitialState } from '@/utils/constants';
import { post } from '@/utils/http';
import { TForm } from '@/utils/types';

const WarehouseRegisterPage = () => {
    const router = useRouter();
    const { isLogged, isLoaded } = useUser();
    const [form, setForm] = useState<TForm>(warehouseFormInitialState);

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
        } else {
            const { name, code, address, state, country, zip } = form;
            const response = post('warehouses', {
                name: name.value,
                code: code.value,
                address: address.value,
                state: state.value,
                country: country.value,
                zip: zip.value, 
            });
            console.log('response', response);
        }
    };

    const handleOnCancel = () => {
        router.push('/home');
    };

    useEffect(() => {
        if (!isLogged && isLoaded) {
            router.push('/users/login');
        }
    }, [isLogged, router, isLoaded]);

    return (
        <div>
            <h1>Register Warehouse</h1>
            <Field
                label="Name"
                name="name"
                type="text"
                value={form.name.value}
                error={form.name.error}
                onChange={handleOnChangeValue}
            />
            <Field
                label="Code"
                name="code"
                type="text"
                value={form.code.value}
                error={form.code.error}
                onChange={handleOnChangeValue}
            />
            <Field
                label="Address"
                name="address"
                type="text"
                value={form.address.value}
                error={form.address.error}
                onChange={handleOnChangeValue}
            />
            <Field
                label="State"
                name="state"
                type="text"
                value={form.state.value}
                error={form.state.error}
                onChange={handleOnChangeValue}
            />
            <Field
                label="Country"
                name="country"
                type="text"
                value={form.country.value}
                error={form.country.error}
                onChange={handleOnChangeValue}
            />
            <Field
                label="Zip Code"
                name="zip"
                type="text"
                value={form.zip.value}
                error={form.zip.error}
                onChange={handleOnChangeValue}
            />
            <Button type="button" onClick={handleOnRegister}>Register</Button>
            <Button type="button" onClick={handleOnCancel}>Cancelar</Button>
        </div>
    );
};

export default WarehouseRegisterPage;