import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import SearchList from './SearchList';
import data from '../data.json';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 42px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  flex: 1;
  padding: 20px 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 42px 0px 0px 42px;
`;

const SearchInput = styled.input`
  width: 100%;
  margin-left: 12px;
  font-size: 1.125rem;
  border: none;
  :focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 18px 32px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  border: none;
  border-radius: 0px 42px 42px 0px;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.6;
`;

function SearchBar() {
  const [filteredList, setFilteredList] = useState([]);

  const handleFilter = (e) => {
    const keyword = e.target.value;
    if (keyword) {
      const newFilter = data
        .filter((value) => value.name.includes(keyword))
        .slice(0, 7);
      setFilteredList(newFilter);
    } else {
      setFilteredList([]);
    }
  };

  return (
    <>
      <SearchContainer>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            placeholder="질환명을 입력해 주세요."
            onChange={handleFilter}
          />
        </SearchBox>
        <SearchButton>검색</SearchButton>
      </SearchContainer>
      {filteredList.length > 0 && <SearchList filteredList={filteredList} />}
    </>
  );
}

export default SearchBar;
