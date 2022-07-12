import { useState, useDeferredValue } from 'react';

// Components
import SearchResults from 'components/SearchResults';

// Styles
import { Wrapper, H2, Input } from 'components/SearchResults/styled';

const FilterDeferred = ({ data }) => {
  const [search, setSearch] = useState('');

  const deferredInput = useDeferredValue(search);

  const handleChange = (e) => {
    console.count('search FilterDeferred')
    setSearch(e.target.value);
  };

  return (
    <Wrapper>
      <H2>FilterDeferred</H2>
      <Input type='text' value={search} onChange={handleChange} />
      <SearchResults search={deferredInput} data={data} />
    </Wrapper>
  );
};

export default FilterDeferred;
