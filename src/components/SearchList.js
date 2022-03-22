import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SearchItem from './SearchItem';

const List = styled.ul`
  margin-top: 8px;
  padding: 24px 0px 16px 0px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
`;

const ListText = styled.p`
  padding: 0px 24px;
  font-size: 0.825rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray};
`;

function SearchList({ filteredList }) {
  return (
    <List>
      <ListText>추천 검색어</ListText>
      {filteredList &&
        filteredList.map((filteredItem) => (
          <SearchItem key={filteredItem.id} filteredItem={filteredItem} />
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
};

export default SearchList;
