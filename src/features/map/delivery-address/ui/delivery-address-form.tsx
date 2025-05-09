/* eslint-disable @typescript-eslint/no-shadow */
'use client';

import { Button, Stack, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

import { fetchSuggestions, Suggestion } from '@shared/api';
import { useCoordinatesControl, useDebounce } from '@shared/hooks';

import { AddressTagAndUri } from '../types';
import { Wrapper } from './delivery-address-form.styles';
import { SuggestionsContainer } from './suggestion-container';

export function DeliveryAddressForm() {
  const { locationContent, findCoordinatesByUri, setApartmentAttributes, submitDeliveryAddress } =
    useCoordinatesControl();

  const [address, setAddress] = useState(locationContent.deliveryAddress.address);

  const [inputText, setInputText] = useState('');

  const [suggestion, setSuggestion] = useState<Suggestion[] | null>();

  const [showSuggestion, setShowSuggestion] = useState(false);

  const debouncedAddress = useDebounce(inputText, 1000);

  useEffect(() => {
    setAddress(locationContent.deliveryAddress.address);
    setShowSuggestion(false);
  }, [locationContent]);

  useEffect(() => {
    if (!debouncedAddress) {
      return;
    }

    const fetchSuggestion = async () => {
      const data = await fetchSuggestions(debouncedAddress);
      setSuggestion(data);
    };

    fetchSuggestion();
  }, [debouncedAddress]);

  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setAddress(e.target.value);
    setShowSuggestion(true);
  };

  const handleSuggestionClick = ({ address, tag, uri }: AddressTagAndUri) => {
    if (tag !== 'house') {
      return;
    }

    findCoordinatesByUri(uri, address);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApartmentAttributes(e.target.name, e.target.value);
  };

  return (
    <Wrapper>
      <TextField
        value={address}
        label="Адрес доставки"
        fullWidth
        size="small"
        multiline
        onChange={handleSearchChange}
      />
      {/* //todo: fix it later || [] */}
      {showSuggestion && (
        <SuggestionsContainer suggestions={suggestion || []} onClick={handleSuggestionClick} />
      )}

      <Stack direction="row" gap={2} marginY={2}>
        <TextField
          label="Квартира"
          fullWidth
          size="small"
          name="flat"
          onChange={handleAddressChange}
        />
        <TextField
          label="Подъезд"
          fullWidth
          size="small"
          name="entrance"
          onChange={handleAddressChange}
        />
        <TextField
          label="Этаж"
          fullWidth
          size="small"
          name="floor"
          onChange={handleAddressChange}
        />
      </Stack>

      <Button variant="contained" fullWidth onClick={submitDeliveryAddress}>
        Готово
      </Button>
    </Wrapper>
  );
}
