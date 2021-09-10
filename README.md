<h1 align="center">✈️ Air-bnb Project ✈️</h1>

<!--  <img width="" height="" src=""/> -->

<h3 align="center">🍀 Main Page </h3>
 
 <div>
<p align="center">
 <img alt="메인페이지" src="https://user-images.githubusercontent.com/54235714/132812511-75c56624-4476-4818-9667-416efc851620.png" width="50%" height="50%"/>
 </p>
 </div>

<!-- 프로젝트 사용 라이브러리 소개하기 -->
 <p align="center">
 Search Filter & Google API & Custom datePicker
 </p>

 <h3 align="center"> Search Bar </h3>
 <img width="100%" height="100%" src="https://user-images.githubusercontent.com/54235714/132812819-6a706b36-c233-47e0-8860-4b0eb10a7538.png"/>
 <p>
 Search bar 기능 : 장소 자동완성 (lat,lng 값 저장), 체크인 & 체크아웃 활용 & 게스트 인원 설정에 따른 검색 결과 filter 적용, debounce hooks를 통한 요청 최소화.
 </p>
<br/>

<h3 align="center">🍀 LOGIN/ LOGOUT Modal</h3>
<div>
 <img src="https://user-images.githubusercontent.com/54235714/132813409-2d58998c-9391-4176-9655-882948c4df20.png"  width="50%" height="50%" />
<img src="https://user-images.githubusercontent.com/54235714/132813330-03ce87dc-c308-4766-b828-e6976846dbef.png"  width="50%" height="50%" />
 </div>
-  Next API & 모달을 사용한 Login & Logout & 회원가입 validation check.

<br/>
<h3 align="center">Check In & Check Out </h3>
<div>
<img width="100%" height="100%" src="https://user-images.githubusercontent.com/54235714/132813732-040ccab2-8fa6-4697-9149-0529e90e07fc.png"/>
<p> - datepicker를 통해 Custom hooks를 만들어 간편하게 사용할 수 있습니다.</p>
</div>
<br/>

<h3 align="center">🍀 Counter hooks </h3>
<div>
<img src="https://user-images.githubusercontent.com/54235714/132814351-7fd7bcab-d273-4f20-abf3-c88049ad306d.png"  width="100%" height="100%"/>
<p>- Counter hooks를 통하여 최솟값과 최댓값을 쉽게 제어할 수 있습니다.</p>
</div>

<br/>
<h3 align="center">🍀 Room List Page </h3>
<div>
 <img src="https://user-images.githubusercontent.com/54235714/132814921-cd674566-cabb-4078-ab7c-371057baea58.png"  width="100%" height="100%" />
<img width="100%" height="100%" src="https://user-images.githubusercontent.com/54235714/132815218-0e52342e-c729-4f2d-ad06-be18b54de741.png"/>

 <p>- 검색 결과를 통하여 좌표를 저장하고 좌표 위치를 기반으로 주변 추천 숙소 OR 좌표를 표시해줍니다. 지도 표시하기 버튼을 클릭하여 화면의 Layout을 동적으로 바꿀 수 있습니다.</p>
 </br>
 </div>

<br/>
<h3 align="center">🍀 Room Detail Page</h3>
<div>
<p>사진이 5장 이상인 경우 </p>
 <img src="https://user-images.githubusercontent.com/54235714/132815658-bfd63299-1da1-4162-b4e4-802c19919da6.png"  width="100%" height="100%" />
 <p>사진이 3 OR 4장인 경우</p>
 <img width="100%" height="100%" src="https://user-images.githubusercontent.com/54235714/132822728-04c1d0d1-e166-4aad-a7e0-ed316e47d60b.png"/>
 
<p>숙소 예약</p>
<img width="100%" height="100%" src="https://user-images.githubusercontent.com/54235714/132816239-e7544b2e-d8c0-4c59-8631-e2d56e01542f.png"/>
<p>- 사진마다 Layout의 비율을 다르게하여 대표 사진와 서브 사진의 구조를 다르게 하였으며 편의시설 및 침구 & 예약 가능 여부를 확인 하고 useRef를 통한 focus 제어 & 일정을 통한 금액을 계산하였습니다. </p>
<br/>
 </div>

<h3 align="center">🍀 숙소 등록하기 (총 11단계)</h3>




<img src="https://user-images.githubusercontent.com/54235714/132825618-fad11697-15a5-499e-997e-1a45da856ac5.gif" alt="단계" width="100%" height="100%" />
<p>gif 파일이 보이지 않을 경우 해당 링크에서 확인해주세요 !</p>
<p>https://hnet.com/video-to-gif/showmymp4/20210909-21-xc15fgKdmBp6LDsj/small.mp4</p>

<div>

<img src="" alt="" width="" height=""/>
<p>
- 총 11단계로 이루어진 숙소 등록하기 페이지입니다.
(각 단계별 과정은 이미지가 너무 많이 첨부되어 gif로 업로드 하였습니다.)
각 단계별로 validation check와 static data & utils 함수를 활용하였으며 google api를 통한 좌표 저장 & AWS S3 이미지 업로드 & Common hooks, components (button, check box, input, radio, selector, textarea)를 만들고 useMemo를 통한 동일한 값에 대한 메모이제이션을 최소화 하였습니다.
지도 페이지에서는 Throttle을 통하여 마커 변경 시 요청을 최소화 하도록 만들었습니다.
</p>
<br/>
</div>

## 프로젝트 소개 👋🏻

- 이번 프로젝트는 TypeScript 활용 하기 위해 제작한 개인 프로젝트입니다.
  Data가 불러오면서 발생하는 Type 문제들과 Data를 저장하면서 발생하는 Type을 사전에 명시하여 오류를 최소화 하였습니다.
  공통으로 사용할 수 있는 컴포넌트와 hooks를 최대한 활용하고, Modal과 Google API를 활용하였습니다.

## 기술 스택 🔨

#### Frontend : React, Next.js, Redux-toolkit, Styled-Components, TypeScript

#### Backend : Next API

#### Git, Figma

## 기능 소개 👨🏻‍💻

- Next API
- AWS S3 Image Upload
- Google API를 통한 좌표 저장 & 동기화 (Debounce), 자동 검색어 추천
- Custom Datepicker를 통한 checkIn & Out validation Check
- Common hooks (modal, button, input, textarea, selector, check box, counter, radio)
- 숙소 등록하기 (11단계)
- 단계별 진행상황 확인 & 이동
- 숙소 관리하기

## 트러블 이슈 🧨

- Google API를 활용하면서 SSR시 발생하는 문제로, window 객체를 활용해야 하는 상황이 있었습니다. 이유는 Server에서는 화면(DOM)이 없기 때문에 window를 참조할 수 없습니다.(=window is undefined)
  해결 : Nextjs의 next/dynamic ssr:false를 활용하여 문제를 해결하였습니다.
  (window를 참조하려면 es6 이상에서 제공하는 dynamic imports를 활용하여 해결하였습니다.)
- svg file import 오류
  해결 : next.config.js 파일에서 설정해주었습니다.
- babel alias 오류
  해결 : tsconfig.json의 path와 babelrc 2개의 파일을 설정.
- Google API request & Auto completed
  해결 : Debounce & Throttle을 활용하였습니다.

## 개선해 나가야 할 점 ⚙️

- 사용자 입장에서 해당 서비스를 얼마나 편리하게 사용할 수 있는지 항상 고민해야합니다.
  ex)클릭수를 한번이라도 줄여 사용성 극대화 등
