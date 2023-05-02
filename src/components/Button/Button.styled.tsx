import styled from 'styled-components';

export const StyledButton = styled.button`
    background-color: #333;
    border: none;
    border-radius: 0.25rem;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    &:hover {
        background-color: #444;
    }
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;