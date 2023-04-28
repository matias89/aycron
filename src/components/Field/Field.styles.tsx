import styled from 'styled-components';

export const StyledField = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    label {
        margin-bottom: 0.5rem;
    }
    input {
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        font-size: 1rem;
        padding: 0.5rem;
    }
    p {
        color: red;
        font-size: 0.75rem;
    }
`;