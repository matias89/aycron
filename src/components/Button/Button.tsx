
import { StyledButton } from './Button.styled';

type TypeButton = {
    children: React.ReactNode;
    [x: string]: any;
};
const Button = ({ children, ...props }: TypeButton) => {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
};

export default Button;