import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';

// Components
import FilterTransition from 'components/FilterTransition';
import FilterDeferred from 'components/FilterDeferred';

// Styles
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StateStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 21px;
  margin: 10px;
`;

const initialState = {
  data: [],
  loading: false,
  error: false,
  count: 0,
  next: 'https://swapi.dev/api/people?page=1',
};

const reducer = (state, { type, payload }) => {
  switch(type) {
    case 'loading': {
      return { ...state, loading: true };
    }
    case 'success': {
      return {
        ...state,
        error: false,
        loading: false,
        count: payload.count,
        next: payload.next,
        data: [...state.data, ...payload.results],
      };
    }
    case 'error': {
      return { ...state, loading: false, error: true };
    }
    default: return state;
  }
};

const App = () => {
  const [
    {
      next,
      count,
      data,
      error,
      loading,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getPeople = async () => {
    dispatch({ type: 'loading' });
    try {
      const response = await fetch(next);
      const jsonResponse = await response.json();
      dispatch({ type: 'success', payload: jsonResponse });
    } catch (err) {
      dispatch({ type: 'error' });
    }
  };

  useEffect(() => {
    if (next) {
      getPeople();
    }
  }, [next]);

  return (loading && next
    ? <StateStyle>Loaded {data.length} of {count}</StateStyle>
    : (
      <div>
        <h1>List of Star Wars characters</h1>
        {error && <StateStyle>An error occured</StateStyle>}
        {!next && (
          <Wrap>
            <FilterTransition data={data} />
            <FilterDeferred data={data} />
          </Wrap>
        )}
      </div>
    )
  );
};

export default App;
