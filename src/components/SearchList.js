import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SearchItem from './SearchItem';

const List = styled.ul`
  margin-top: 8px;
  padding: 16px 0px 16px 0px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
`;

const ListText = styled.p`
  padding: 0px 24px;
  font-size: 0.825rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray};
`;

function SearchList({ filteredList, handleKeyDown, handleInput, focus }) {
  const isLoading = useSelector((state) => state.searchReducer.isLoading);

  const handleMessage = (isLoadingState, filteredListState) => {
    if (isLoadingState) {
      return '검색 중...';
    }
    if (filteredListState.length > 0) {
      return '추천 검색어';
    }
    return '검색어 없음';
  };

  return (
    <List>
      <ListText>{handleMessage(isLoading, filteredList)}</ListText>
      {filteredList &&
        filteredList.map((filteredItem, index) => (
          <SearchItem
            key={filteredItem.id}
            filteredItem={filteredItem}
            handleKeyDown={handleKeyDown}
            handleInput={handleInput}
            isFocus={index === focus}
            index={index}
          />
        ))}
    </List>
  );
}

SearchList.propTypes = {
  filteredList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  focus: PropTypes.number.isRequired,
};

export default SearchList;
