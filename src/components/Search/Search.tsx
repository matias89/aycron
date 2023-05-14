import { useState } from 'react';

import Field from '@/components/Field/Field';
import Button from '@/components/Button/Button';

import { SearchWrapper, SearchInput, StyledAutocomplete } from './Search.styles';

const Search = ({ isMapLoaded, callback }) => {
    const [search, setSearch] = useState('');
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const [autocomplete, setAutocomplete] = useState(null);
    const [latLong, setLatLong] = useState(null);
    const handleOnLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };
    const handleOnPlaceChanged = () => {
        setSearch(autocomplete.getPlace().formatted_address);
        setLatLong({
            lat: autocomplete.getPlace().geometry.location.lat(),
            lng: autocomplete.getPlace().geometry.location.lng(),
        });
    };
    const handleOnSearch = () => {
        callback(latLong);
    };
    
    return (
        <SearchWrapper>
            <SearchInput>
                {
                    isMapLoaded ? (
                        <StyledAutocomplete
                            onLoad={handleOnLoad}
                            onPlaceChanged={handleOnPlaceChanged}
                        >
                            <Field
                                placeholder="Write the address to search"
                                name="search"
                                type="text"
                                value={search}
                                onChange={handleOnChange}
                            />
                        </StyledAutocomplete>
                    ) : <p>Error</p>
                }
            </SearchInput>
            <Button onClick={handleOnSearch} disabled={!search}>Search</Button>
        </SearchWrapper>
    );
};

export default Search;
