import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import SearchList from './SearchList';
import {
  closeSearchList,
  getSearch,
  resetSearch,
} from '../modules/filterList/action';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 42px;
  @media screen and (max-width: 1040px) {
    height: 46px;
    box-shadow: 0px 2px 2px rgb(30 32 37 / 10%);
  }
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
  @media screen and (max-width: 1040px) {
    padding: 12px 20px;
  }
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
  @media screen and (max-width: 1040px) {
    padding: 0px 20px;
  }
`;

function SearchBar() {
  const { filteredList, isOpen } = useSelector((state) => state.searchReducer);
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState('');
  const [focus, setFocus] = useState(-1);

  const handleFilter = (e) => {
    const { value } = e.target;
    setKeyword(value);
    dispatch(getSearch(value));
    setFocus(-1);
  };

  const handleInput = (id) => {
    setKeyword(filteredList[id].name);
    dispatch(resetSearch());
    dispatch(closeSearchList());
    setFocus(-1);
  };

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 40 && index < filteredList.length - 1) {
      setFocus(index + 1);
    } else if (e.keyCode === 40 && index === filteredList.length - 1) {
      setFocus(0);
    } else if (e.keyCode === 38 && index > 0) {
      setFocus(index - 1);
    } else if (e.keyCode === 38 && index === 0) {
      setFocus(filteredList.length - 1);
    } else if (e.key === 'Enter') {
      handleInput(index);
    }
  };

  return (
    <>
      <SearchContainer>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            value={keyword}
            onChange={handleFilter}
            onKeyDown={(e) => handleKeyDown(e, focus)}
            placeholder="질환명을 입력해 주세요."
            autoComplete="off"
          />
        </SearchBox>
        <SearchButton>검색</SearchButton>
      </SearchContainer>
      {isOpen && (
        <SearchList
          filteredList={filteredList}
          handleKeyDown={handleKeyDown}
          handleInput={handleInput}
          focus={focus}
        />
      )}
    </>
  );
}

export default SearchBar;
