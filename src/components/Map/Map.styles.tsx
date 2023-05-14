import styled from 'styled-components';

export const StyledItemList = styled.div`
margin-top: 10px;
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            margin-bottom: 10px;
            p {
                margin: 0;
            }
        }
    }
`;

export const StyledCurrentLocation = styled.span`
    color: #FD7567;
    font-weight: bold;
`;

export const StyledNearLocation = styled.span`
    color: #00E64D;
    font-weight: bold;
`;
