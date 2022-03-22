import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from '../assets/search.svg';

const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 24px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const ItemText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-left: 12px;
`;

function SearchItem({ filteredItem }) {
  return (
    <Item>
      <SearchIcon />
      <ItemText>{filteredItem.name}</ItemText>
    </Item>
  );
}

SearchItem.propTypes = {
  filteredItem: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};

export default SearchItem;
