# Canvas API를 이용한 브라우저 기반 게임 프로젝트


<aside>
💡 본격적인 웹 사이트 개발 프로젝트 전, 브라우저 기반 게임 프로젝트를 진행했습니다. 별도의 라이브러리나 툴을 사용하지 않고 Canvas API, Vanilla js 만을 사용하여 게임을 개발하였습니다.

</aside>
<br>
<br>

## 주요 화면

<br>

<p align="center">
    <img align="center" src="https://user-images.githubusercontent.com/102606939/216812356-3d739065-8601-4f71-9afa-6218e36a35be.png" width="400"/>
</p>

<br>

<p align="center">
    <img align="center" src="https://user-images.githubusercontent.com/102606939/216812363-7bfe7572-2c5f-4c84-adcd-898e32e89ec0.png" width="700"/>
</p>

<br>

<p align="center">
    <img src="https://user-images.githubusercontent.com/102606939/216812371-9dfd2822-d6d4-4087-acb2-43db88e3a172.png" width="700"/>
</p>

## 기획의도 

- 아래의 모바일게임 “***Brick Breaker Quest”*** 의 기능을 최대한 구현하는 것을 목표로 하였습니다.

<p align="center">
    <img align="center" src="https://user-images.githubusercontent.com/102606939/216812389-b88ebcd4-4069-47da-8206-b1d4145bbeb7.png" width="500"/>
</p>

<br>

- 게임 구현 시 다음의 요구사항을 반드시 포함하고자 했습니다.
    - 턴제로 하여 1 턴당 한 번에 여러개의 공이 연달아 발사되도록 한다. 발사된 공은 다시 발사된 위치로 돌아오도록 한다.
    - 턴이 끝나면 스테이지의 모든 벽돌이 한 줄씩 아래로 이동한다. 이때 벽돌이 더 있는 경우 가장 윗줄에 벽돌이 추가된다.
    - 하나의 벽돌이라도 가장 밑으로 내려오면 사용자는 패배한다.
    - 벽돌은 제 각기의 체력이 있도록 하여, 공이 부딪히면 1씩 체력이 감소하도록 한다.
    - 게임 플레이가 늘어지지 않도록 발사된 공을 일시에 회수할 수 있는 기능을 구현한다.
    - 공을 발사하는 위치는 무작위로 변경된다 (이동한다).
    - 한 번에 여러개의 벽돌을 타격할 수 있는 아이템 기능을 구현한다.
    - 삼각형 벽돌 4 가지 종류를 구현하고, 빗변에 맞는 상황의 충돌로직을 구현한다.
    - 아이템 벽돌 (레이저, 폭탄, 공 갯수 추가) 를 구현한다.

<br>

## 차별점 
- 다양한 시각적 이펙트를 구현하였습니다.
    - 메인화면의 제목이 음악의 비트에 맞춰 동적으로 변하는 모습을 구현하였습니다.
    - 기본적으로 게임의 배경은 우주에서 별이 움직이는 모습을 하고 있습니다. 게임 스테이지 선택화면으로 진입할 때 빨라지고, 게임 플레이 화면에 진입하면 서서히 느려지다가 멈추도록 구현하였습니다.
    - 공과 벽돌, 스테이지 벽면과 충돌 시 시각적인 이펙트가 발생하도록 구현하였습니다.

<br>

- 게임 스테이지 제작을 용이하게 하기 위해 Drag&Drop 형식으로 쉽게 게임 스테이지를 개발할 수 있는 브라우저 기반 UI를 개발하였습니다. 해당 UI를 사용해서 10 개 이상의 스테이지를 손 쉽게 제작할 수 있었습니다.
    - 게임 스테이지를 제작하여 최종 저장하면, 다양한 정보를 담고 있는 json 파일이 .txt파일로 생성됩니다. 이 파일의 내용을 .js파일로 바꾼 뒤 import하여 게임 구동 시 사용하였습니다.
    - 단순히 벽돌의 색상과 체력, 종류를 변경하는 것을 넘어서, 공의 색상과 크기까지 변경할 수 있도록 구현하였습니다.
    - 공의 색상에 맞춰 스테이지 벽면과 충돌 시 발생하는 이펙트의 색상이 달라지도록 구현했습니다. 또한 벽돌의 색상에 맞춰 공과 충돌 시 이펙트, 그리고 파괴 시 발생하는 이펙트의 색상 또한 달라지게 적용하였습니다.

<p align="center">
    <img width="700" alt="image" src="https://user-images.githubusercontent.com/102606939/216813133-4e8ee3fa-16bc-4dcc-8b29-c09bbaaaf7c5.png">
</p>




## 참고자료
- 메인화면의 제목이 음악의 비트에 맞춰 동적으로 변하는 모습 구현   
    ⇒ [https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API)

- Canvas API 기반 벽돌깨기 게임 만들기 (MDN)
    ⇒  https://developer.mozilla.org/ko/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript

## 문서화

[https://www.notion.so/91e546811ea746398a6e55d3f051bceb](https://www.notion.so/91e546811ea746398a6e55d3f051bceb)
