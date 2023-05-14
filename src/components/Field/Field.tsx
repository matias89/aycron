import { StyledField } from './Field.styles';

type TypeField = {
    label?: string;
    name: string;
    type: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    [x: string]: any;
};
const Field = ({ label, name, type, value, onChange, error, ...props }: TypeField) => {
    return (
        <StyledField>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                {...props}
            />
            {error && <p>{error}</p>}
        </StyledField>
    );
};

export default Field;