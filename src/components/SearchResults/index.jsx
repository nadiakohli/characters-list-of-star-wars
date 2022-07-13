import { useMemo } from 'react';

// Styles
import { Wrap, UnorderedList, ListItem } from 'components/SearchResults/styled';

const SearchResults = ({ data, search }) => {
  const filterArray = useMemo(() => data
    .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())), [search, data]);
  return (
    <Wrap>
      <UnorderedList>
        {data.length > 0
          ? filterArray.map(({ name, url }) => <ListItem key={url}>{name}</ListItem>)
          : null
        }
      </UnorderedList>
    </Wrap>
  )
};

export default SearchResults;
