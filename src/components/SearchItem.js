import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from '../assets/search.svg';

const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 24px;
  cursor: pointer;
  :focus,
  :hover {
    outline: none;
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
  @media screen and (max-width: 1040px) {
    padding: 6px 24px;
  }
`;

const ItemText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-left: 12px;
`;

function SearchItem({
  filteredItem,
  isFocus,
  handleKeyDown,
  handleInput,
  index,
}) {
  const itemRef = useRef();

  useEffect(() => {
    if (!isFocus) {
      return;
    }
    itemRef.current.focus();
  }, [isFocus]);

  return (
    <Item
      tabIndex="0"
      ref={itemRef}
      onKeyDown={(e) => handleKeyDown(e, index)}
      onClick={() => handleInput(index)}
    >
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
  isFocus: PropTypes.bool.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default SearchItem;
