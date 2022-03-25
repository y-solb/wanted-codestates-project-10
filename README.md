# 휴먼스케이프

## 프로젝트 소개

- 검색어 추천이 있는 검색창 만들기
- 기간: 22.03.21~22.03.25

## 배포 링크

[🚀 배포 링크](https://logpreesso-9.netlify.app/)

## 기술 스택

- JavaScript
- React
- Redux
- Redux-saga
- Styled-compoents

## 실행 방법

```
git clone https://github.com/y-solb/wanted-codestates-project-10.git

cd wanted-codestates-project-10

yarn install

yarn start

// .env에 url 추가
// REACT_APP_SEARCH_API
// REACT_APP_MOVE_UR

```

## 구현 방법

### API 호출 최적화

- 비동기 api 호출은 redux-saga를 이용했습니다.
- 글자 입력 시마다 호출을 막기 위해 debounce를 구현했습니다. `delay`를 `500ms`로 주고 `takeLatest`를 이용해 가장 마지막 입력만 실행하도록 했습니다.
- 글자를 입력했다가 모두 지우는 경우 즉 `action.keyword.length > 0`이라면 api 호출을 하지 않고 추천 검색창을 닫도록 했습니다.
- localStorage에 일치하는 keyword가 있다면 api 호출을 하지 않고 localStorage에 저장된 데이터를 이용했습니다. 일치하는 keyword가 없다면 api 호출을 합니다. 받아온 데이터와 만료 시간을 value에 keyword를 key에 넣어 localStorage에 추가해 줬습니다.
- 만료시간은 `Date.now()+TIME`으로 넣어줬습니다. TIME은 `10000ms`(10초)입니다. `Date.now()`와 비교하여 만료시간이 지났다면 삭제해 줬습니다.
- api 호출에 성공할 경우 받아온 데이터를 7개만 잘라 업데이트해 줬습니다. 실패한 경우에는 error 메세지를 받도록 했습니다.
- url은 .env 파일에 넣었습니다.

### 키보드만으로도 추천 검색어들로 이동이 가능

- 위, 아래 방향 키로 추천 검색어 리스트 focus 이동이 가능합니다. 최상단에서 위쪽 방향 키를 누르면 하단으로 이동합니다. 반대로 최하단에서 아래쪽 방향 키를 누르면 최상단으로 이동합니다.
- 추천 검색어 리스트에서 Enter 키를 누르면 해당 검색어가 input 창에 나타납니다.
- esc 키가 눌리면 추천 검색어 리스트가 닫힙니다.
- tab 키를 누르면 페이지 전체 focus 이동이 가능합니다.

### 검색 상태

- 검색 중(isLoading이 true)인 경우 ‘검색 중..’, 추천 검색어가 없을 경우 ‘검색어 없음' 그리고 추천 검색어가 있는 경우 ‘추천 검색어’가 나타납니다.

### 반응형

- 반응형으로 제작했습니다.

### 검색 버튼 클릭 시 검색된 페이지로 이동

- 검색 버튼 클릭 시 해당 keyword가 검색된 페이지로 이동합니다.

### 검색창 외 영역 클릭 시 검색창 리스트가 닫힘

- `useEffect`로 클릭을 감지합니다. `e.target`이 `searchBarRef.current`에 포함되어 있지 않았다면 외부 클릭으로 감지하고 검색창이 닫힙니다.

## 어려웠던 점

redux-saga를 처음 사용해 봐서 초반에 어려움이 있었습니다.
