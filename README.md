# site-os

Chrome 확장으로 **여러 개의 나만의 사이트를 저장**하고, **공유 코드**로 다른 확장 사용자와 공유할 수 있는 프로젝트입니다.  
현재 버전은 **V3**입니다  
## 기능
- 사이트 이름 + 본문 저장
- 여러 사이트를 목록으로 관리
- 공유 코드(Base64) 생성 및 복사
- 공유 코드 붙여넣기로 가져오기
- `viewer.html`로 공유 링크 미리보기

## 설치 방법 (개발자 모드)
1. Chrome에서 `chrome://extensions` 열기
2. 우측 상단 **개발자 모드** 활성화
3. **압축해제된 확장 프로그램 로드** 클릭
4. 이 저장소 폴더(`/workspace/site-os`) 선택

## 사용 방법
1. 확장 아이콘 클릭
2. "새 사이트 만들기"에서 이름/내용 입력 후 저장
3. 목록에서 **공유코드** 버튼 클릭
4. 상대방도 같은 확장을 설치한 뒤, "공유 코드로 가져오기"에 붙여넣기
5. **미리보기** 버튼으로 렌더링 화면 확인

## Wiki
GitHub Wiki로 옮겨서 사용할 수 있는 문서 초안을 `wiki/` 폴더에 추가했습니다.
- 시작 페이지: `wiki/Home.md`
- 설치 가이드: `wiki/설치 가이드.md`
- 사용자 가이드: `wiki/사용자 가이드.md`
- 공유 코드 동작 원리: `wiki/공유 코드 동작 원리.md`
- 문제 해결: `wiki/문제 해결 (FAQ).md`


## 다운로드
- 배포 파일 경로: `download/site os.zip`
- 링크: [site os.zip](download/site%20os.zip)

## 파일 구조
- `manifest.json`: Chrome Extension Manifest v3 설정
- `popup.html`, `popup.css`, `popup.js`: 메인 UI와 로직
- `viewer.html`, `viewer.js`: 공유된 사이트 뷰어
- `wiki/*`: GitHub Wiki용 문서 모음
---

이 문서는 ChatGPT와 Codex가 만들었습니다.
