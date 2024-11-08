import { ListItem, ListItemText } from '@mui/material';

import { AddressTagAndUri } from '../types';
import { StyledList } from './delivery-address-form.styles';

type Suggestion = {
  uri: string;
  title: {
    text: string;
  };
  tags: string[];
};

type Props = {
  suggestions: Suggestion[];
  onClick: (addressTagAndUri: AddressTagAndUri) => void;
};

export function SuggestionsContainer(props: Props) {
  return (
    <StyledList dense>
      {props.suggestions?.map((suggestion) => (
        <ListItem
          key={suggestion.uri}
          onClick={() =>
            props.onClick({
              address: suggestion.title.text,
              tag: suggestion.tags[0],
              uri: suggestion.uri,
            })
          }
        >
          <ListItemText primary={suggestion.title.text} />
        </ListItem>
      ))}
    </StyledList>
  );
}
