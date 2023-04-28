import styled from 'styled-components';

export const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    header {
        background-color: #333;
        color: #fff;
        padding: 1rem;
    }
    main {
        flex: 1;
        padding: 1rem;
    }
    footer {
        background-color: #333;
        color: #fff;
        padding: 1rem;
    }
`;