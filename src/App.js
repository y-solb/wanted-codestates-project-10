import React, { useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';

const Background = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.skyBlue};
`;

const ContentContainer = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeaderBox = styled.div`
  margin: 80px 0px 20px 0px;
`;

const HeaderText = styled.p`
  font-size: 2.125rem;
  font-weight: 700;
  line-height: 1.6;
  text-align: center;
`;

function App() {
  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      const value = JSON.parse(localStorage.getItem(key));
      if (Date.now() > value.expireTime) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  return (
    <Background>
      <ContentContainer>
        <HeaderBox>
          <HeaderText>
            국내 모든 임상시험 검색하고
            <br />
            온라인으로 참여하기
          </HeaderText>
        </HeaderBox>
        <SearchBar />
      </ContentContainer>
    </Background>
  );
}

export default App;
