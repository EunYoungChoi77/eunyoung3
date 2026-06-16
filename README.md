# 최은영 UX/UI 포트폴리오 웹사이트

PDF 포트폴리오를 바탕으로 제작한 반응형 원페이지 웹사이트입니다.

## 구성
- `index.html`: 페이지 구조
- `style.css`: 디자인 및 반응형 스타일
- `script.js`: 프로젝트 팝업, 모바일 메뉴, 스크롤 애니메이션
- `assets/images`: 프로젝트 이미지

## 실행
`index.html`을 브라우저에서 열면 바로 확인할 수 있습니다.

## Vercel 배포
1. 이 폴더 전체를 GitHub 저장소에 업로드합니다.
2. Vercel에서 **Add New → Project**를 선택합니다.
3. GitHub 저장소를 연결하고 별도 설정 없이 **Deploy**를 누릅니다.

## 수정하기
- 자기소개 및 프로젝트 문구: `index.html`
- 프로젝트 상세 문구와 이미지 순서: `script.js`의 `projects` 객체
- 컬러와 크기: `style.css` 상단의 `:root`


## 이미지 파일
프로젝트 이미지는 `assets/images` 폴더에 포함되어 있습니다. 배포할 때 `index.html`, `style.css`, `script.js`와 함께 이 폴더도 반드시 업로드해야 합니다. 파일명과 폴더 구조를 변경하면 이미지 경로가 끊어질 수 있습니다.
