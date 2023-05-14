import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/hooks';

import Field from '@/components/Field/Field';
import Button from '@/components/Button/Button';

import { warehouseFormInitialState } from '@/utils/constants';
import { post } from '@/utils/http';
import { TForm } from '@/utils/types';

const WarehouseRegisterPage = () => {
    const router = useRouter();
    const { isLogged, isLoaded: isPageLoaded } = useUser();
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

    const getLatLongFromAddress = async () => {
        const { address, state, country, zip } = form;
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address.value},+${state.value},+${country.value},+${zip.value}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            return { lat, lng };
        }
        return null;
    };

    const handleOnRegister = async () => {
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
            const { lat, lng } = await getLatLongFromAddress();
            const uploadedFile = document.getElementById('file') as HTMLInputElement;
            const formData = new FormData();
            formData.append('file', uploadedFile.files[0]);
            formData.append('name', name.value);
            formData.append('code', code.value);
            formData.append('address', address.value);
            formData.append('state', state.value);
            formData.append('country', country.value);
            formData.append('zip', zip.value);
            formData.append('lat', lat.toString());
            formData.append('lng', lng.toString());

            console.log('formData', formData);

            const response = await post('warehouses', formData, 'multipart/form-data');
            if (response.status !== 200) {
                // Error
                alert(response.message);
            } else {
                setForm(warehouseFormInitialState);
                alert('Added successfully. You will be redirected to HOME');
                router.push('/home');
            }
        }
    };

    const handleOnCancel = () => {
        router.push('/home');
    };

    useEffect(() => {
        if (!isLogged && isPageLoaded) {
            router.push('/users/login');
        }
    }, [isLogged, router, isPageLoaded]);

    return (
        <div>
            <h2>Register Warehouse</h2>
            <p>Add a new register</p>
            <hr />
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
            <Field
                type="file"
                label="File"
                name="file"
                value={form.file.value}
                error={form.file.error}
                onChange={handleOnChangeValue}
            />
            <Button type="button" onClick={handleOnRegister}>Register</Button>
            <Button type="button" onClick={handleOnCancel}>Cancel</Button>
        </div>
    );
};

export default WarehouseRegisterPage;