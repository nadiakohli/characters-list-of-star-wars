import { useState, useTransition } from 'react';

// Components
import SearchResults from 'components/SearchResults';

// Styles
import { Wrapper, H2, Input } from 'components/SearchResults/styled';

const FilterTransition = ({ data }) => {
  const [search, setSearch] = useState('');
  const [pending, startTransition] = useTransition();

  const handleChangeSearch = (e) => {
    startTransition(() => {
      console.count('search FilterTransition')
      setSearch(e.target.value);
    });
  };

  return (
    <Wrapper>
      <H2>FilterTransition</H2>
      <Input type='text' value={search} onChange={handleChangeSearch} />
      {pending 
        ? <div>Pending....</div>
        : <SearchResults search={search} data={data} />
      }
    </Wrapper>
  );
};

export default FilterTransition;
