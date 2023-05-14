import styled from 'styled-components';
import { Autocomplete } from '@react-google-maps/api';

export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SearchInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    margin-right: 10px;
`;

export const StyledAutocomplete = styled(Autocomplete)`
    width: 100%;
`;