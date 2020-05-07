import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { classnames } from './helpers';
import Grid from '@material-ui/core/Grid';
import './SearchBar.css';

export default function SearchBar(props) {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    props.getPlaceId(results[0].place_id);
    //console.log(results);
    setAddress(value);
    setCoordinates(latLng);
  };

  const handleCloseClick = () => {
    setAddress('');
    setCoordinates({ lat: null, lng: null });
  };

  //console.log('Latidude', coordinates.lat);
  //console.log('Longitude', coordinates.lng);

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={6}>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            searchOptions={{ types: ['(cities)'] }}
            shouldFetchSuggestions={address.length > 2}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div className="search-bar-container">
                <div className="search-input-container">
                  <input
                    required
                    type="text"
                    autoComplete="off"
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'search-input',
                    })}
                  />
                  {address.length > 0 && (
                    <button className="clear-button" onClick={handleCloseClick}>
                      x
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="autocomplete-container">
                    {loading && <div>...loading</div>}
                    {suggestions.map((suggestion) => {
                      //console.log(suggestion);
                      const className = classnames('suggestion-item', {
                        'suggestion-item--active': suggestion.active,
                      });
                      // inline style for demonstration purpose
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                    })}
                    <div className="dropdown-footer">
                      <div>
                        <img
                          alt="Google Logo"
                          src={
                            process.env.PUBLIC_URL +
                            '/images/powered_by_google_default.png'
                          }
                          className="dropdown-footer-image"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </PlacesAutocomplete>
        </Grid>
      </Grid>
    </>
  );
}
