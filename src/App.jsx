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
  loading: true,
  error: false,
  count: 0,
};

const reducer = (state, { type, payload }) => {
  switch(type) {
    case 'loading': {
      return { ...state, loading: payload };
    }
    case 'success': {
      return {
        ...state,
        error: false,
        count: payload.count,
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
      count,
      data,
      error,
      loading,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getPeople = async (next = 'https://swapi.dev/api/people?page=1') => {
    try {
      const response = await fetch(next);
      const jsonResponse = await response.json();
      dispatch({ type: 'success', payload: jsonResponse });
      if (jsonResponse.next) return getPeople(jsonResponse.next);
      dispatch({ type: 'loading', payload: false });
    } catch (err) {
      dispatch({ type: 'error' });
    }
  };

  useEffect(() => {
    dispatch({ type: 'loading', payload: true });
    getPeople();
  }, []);

  return (loading
    ? <StateStyle>Loaded {data.length} of {count}</StateStyle>
    : (
      <div>
        <h1>List of Star Wars characters</h1>
        {error && <StateStyle>An error occured</StateStyle>}
        <Wrap>
          <FilterTransition data={data} />
          <FilterDeferred data={data} />
        </Wrap>
      </div>
    )
  );
};

export default App;
