# 휴먼스케이프

## 프로젝트 소개

- 검색어 추천이 있는 검색창 만들기
- 기간: 22.03.21~22.03.25

## 배포 링크

[🚀 배포 링크](https://humanscape-ysb.netlify.app/)

## 기술 스택

- JavaScript
- React
- Redux
- Redux-saga
- Axios
- Styled-compoents

## 실행 방법

```
git clone https://github.com/y-solb/wanted-codestates-project-10.git

cd wanted-codestates-project-10

yarn install

yarn start

// .env에 url 추가
REACT_APP_SEARCH_API=검색어추천url~/search-conditions까지 입력
REACT_APP_MOVE_UR=검색된페이지url~/studies?condition까지 입력

```

## 구현 방법

### API 호출 최적화

![api](https://user-images.githubusercontent.com/59462108/160132674-f197fa38-32fe-467f-9dac-38e6555ccaa8.gif)

- 비동기 api 호출은 redux-saga를 이용했습니다.
- 글자 입력 시마다 호출을 막기 위해 debounce를 구현했습니다. `delay`를 `500ms`로 주고 `takeLatest`를 이용해 가장 마지막 입력만 실행하도록 했습니다.
- 글자를 입력했다가 모두 지우는 경우에는 검색어 조회를 하지 않고 추천 검색창을 닫도록 했습니다.
- 입력된 글자가 있는 경우에는 즉 `action.keyword.length > 0`이라면 검색어 조회를 합니다.
- api 호출에 성공할 경우 받아온 데이터를 7개만 잘라 업데이트해 줬습니다. 실패한 경우에는 error 메세지를 받도록 했습니다.
- url은 .env 파일에 넣었습니다.

### 호출별로 로컬 캐싱 구현

![localStorage](https://user-images.githubusercontent.com/59462108/160132715-0bcd4f09-241c-4606-8f5f-928ca931b470.gif)

- 검색어 조회 시 localStorage에 일치하는 keyword가 있다면 api 호출을 하지 않고 localStorage에 저장된 데이터를 이용했습니다. 일치하는 keyword가 없다면 api 호출을 합니다. 그 후에는 keyword를 key에 받아온 데이터와 만료 시간을 value에 넣어 localStorage에 추가해 줬습니다.
- 만료시간은 `Date.now()+TIME`으로 넣어줬습니다. TIME은 `(60 * 1000)ms` (1분)입니다. `Date.now()`와 비교하여 만료시간이 지났다면 삭제해 줬습니다.

```jsx
function checkExpireTime() {
  Object.keys(localStorage).forEach((key) => {
    const value = JSON.parse(localStorage.getItem(key));
    if (Date.now() > value.expireTime) {
      localStorage.removeItem(key);
    }
  });
}
```

### 키보드만으로도 추천 검색어들로 이동이 가능

![keyboard](https://user-images.githubusercontent.com/59462108/160132747-02e4cf6b-5171-40c8-b63d-69cad2a77c33.gif)


- 위, 아래 방향 키로 추천 검색어 리스트 focus 이동이 가능합니다. 최상단에서 위쪽 방향 키를 누르면 하단으로 이동합니다. 반대로 최하단에서 아래쪽 방향 키를 누르면 최상단으로 이동합니다.
- 추천 검색어 리스트에서 Enter 키를 누르면 해당 검색어가 input 창에 나타납니다.
- esc 키가 눌리면 추천 검색어 리스트가 닫힙니다.
- tab 키를 누르면 페이지 전체 focus 이동이 가능합니다.

### 검색 상태

<img width="480" alt="스크린샷 2022-03-25 오후 10 31 56" src="https://user-images.githubusercontent.com/59462108/160132978-f196db1f-11cf-4147-a3c1-aa2cbb404986.png">

<img width="480" alt="스크린샷 2022-03-25 오후 10 31 33" src="https://user-images.githubusercontent.com/59462108/160132963-9410361f-44d6-4556-bcbb-d32ac346ccc7.png">

<img width="480" alt="스크린샷 2022-03-25 오후 10 31 06" src="https://user-images.githubusercontent.com/59462108/160132950-81742cf1-772c-4951-b933-100e4b8e3ace.png">

<img width="480" alt="스크린샷 2022-03-25 오후 10 33 26" src="https://user-images.githubusercontent.com/59462108/160132991-281ae80f-bb43-41eb-9ab1-6065f299c6d5.png">

- 검색 중(isLoading이 true)인 경우 ‘검색 중..’
- 추천 검색어가 없을 경우 ‘검색어 없음'
- 추천 검색어가 있는 경우 ‘추천 검색어’
- 에러 발생한 경우 'API 요청에 문제가 생겼습니다.'가 나타납니다.

### 반응형

![반응형](https://user-images.githubusercontent.com/59462108/160133019-5f419d4f-7ea0-4ec8-b344-e12c75492441.gif)

- 반응형으로 제작했습니다.

### 검색된 페이지로 이동

![search](https://user-images.githubusercontent.com/59462108/160133046-21637a19-f37f-47bb-8241-d8ec232dc23d.gif)

- 검색창(input)에서 Enter 키가 눌리면 해당 keyword가 검색된 페이지로 이동합니다.
- 검색 버튼이 클릭되면 해당 keyword가 검색된 페이지로 이동합니다.

### 검색창 외 영역 클릭 시 검색창 리스트가 닫힘

![outside](https://user-images.githubusercontent.com/59462108/160133111-26f9bf0e-ee56-4b75-a448-325daa2cebf3.gif)

- `useEffect`로 클릭을 감지합니다. `e.target`이 `searchBarRef.current`에 포함되어 있지 않았다면 외부 클릭으로 감지하고 검색창이 닫힙니다.

### 추천 검색어 클릭 시 검색창에 반영

![click](https://user-images.githubusercontent.com/59462108/160133088-60641e82-ab0a-4571-8f98-97b207a23ce3.gif)

- 검색어 리스트에서 hover 시 배경색이 회색으로 나타나고 클릭 시 검색창에 추천 검색어가 반영됩니다. 

## 어려웠던 점

### redux-saga

- redux-saga를 처음 사용해 봐서 초반에 어려움이 있었으나 조금씩 이해하니 saga의 편리함을 느낄 수 있었습니다. effects를 이용하여 debounce를 간단하게 구현할 수 있었습니다.

### 추천 검색어들을 tab키로 이동이 가능하고 위, 아래 방향 키로도 이동이 가능하게 구현

- 초반에는 위, 아래 방향 키로 이동 시 `index` 값을 더하거나 빼주고 현재 `index` 값과 같다면 `props`를 넘겨줘 배경 색상을 변경해 줬습니다. 위, 아래 방향 키만 작동했을 때는 `index`에 맞게 잘 작동했습니다. 하지만 tab키로 이동하다가 위, 아래 방향 키로 이동 시 현재 focus 위치부터 이동하는 것이 아닌 저장된 마지막 `index` 값부터 움직이는 걸 확인했습니다.
- 이에 대한 해결 방법으로 onKeyDown이 발생할 경우 `index` 값을 같이 넘겨주었습니다. 위, 아래 방향 키가 눌릴 경우 `index` 값을 받아서 `focus`에 업데이트해 줍니다. `focus`와 현재 `index` 값이 같다면 `isFocus`가 `true`가 되어 `itemRef`에 focus를 줍니다.

```jsx
useEffect(() => {
    if (!isFocus) {
      return;
    }
    itemRef.current.focus();
  }, [isFocus]);
```
