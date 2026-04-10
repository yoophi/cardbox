# 개발 로그

## 2026-04-10 — pnpm monorepo + Tailwind CSS + shadcn/ui 설정

커밋: `773a57b` feat: set up pnpm monorepo with Tailwind CSS and shadcn/ui

### 트러블슈팅

#### 1. shadcn CLI가 `packages/ui`에서 프레임워크를 감지하지 못함

`packages/ui`는 라이브러리 패키지이므로 `shadcn init`이 프레임워크를 찾지 못해 실패했다.

```
We could not detect a supported framework at .../packages/ui.
```

**해결**: `apps/cardbox`에서 `shadcn init`을 실행한 뒤, 생성된 컴포넌트와 유틸리티를 `packages/ui`로 수동 이동. `packages/ui/components.json`은 직접 작성.

#### 2. shadcn CLI가 `tsconfig.json`에서 import alias를 찾지 못함

`tsconfig.app.json`에만 `paths`를 설정했더니 shadcn CLI가 인식하지 못했다.

```
No import alias found in your tsconfig.json file.
```

**해결**: 루트 `tsconfig.json`에도 `compilerOptions.baseUrl`과 `paths`를 추가.

#### 3. TypeScript 6.x에서 `baseUrl` deprecated 에러

```
Option 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0.
```

**해결**: `tsconfig.app.json`과 `packages/ui/tsconfig.json`에 `"ignoreDeprecations": "6.0"` 추가.

#### 4. `tsc -b`가 `packages/ui`의 `@/lib/utils` 경로를 해석하지 못함

`tsc -b`는 프로젝트 참조 기반으로 동작하는데, `packages/ui`의 `@/` alias를 앱 빌드 시 해석하지 못했다.

```
Cannot find module '@/lib/utils' or its corresponding type declarations.
```

**시도한 방법**:
- `packages/ui/tsconfig.json`에 `composite: true` + `declaration: true` 설정
- `apps/cardbox/tsconfig.app.json`에 `references`로 `packages/ui` 추가

**최종 해결**: `packages/ui` 내부 컴포넌트에서 `@/lib/utils` 대신 상대경로(`../../lib/utils`) 사용. `fix-imports.sh` 스크립트로 `shadcn add` 후 자동 변환하도록 구성.

#### 5. Vite 빌드 시 `@/lib/utils` 해석 실패

tsc를 통과해도 Vite(rolldown)가 `packages/ui` 내부의 `@/lib/utils`를 해석하지 못했다. Vite의 `@/` alias는 `apps/cardbox/src/`만 가리키기 때문.

```
[UNLOADABLE_DEPENDENCY] Error: Could not load src/lib/utils
```

**해결**: 위 4번과 동일하게 상대경로로 전환하여 해결.

#### 6. Tailwind v4 `@source` 상대경로 오류

CSS 파일(`apps/cardbox/src/index.css`)에서 `@source "../../packages/ui/src"`로 설정했으나, CSS 파일 기준 상대경로가 맞지 않아 Tailwind가 `packages/ui`의 클래스를 스캔하지 못했다.

**원인**: `src/index.css`에서 프로젝트 루트까지는 3단계(`src/` → `cardbox/` → `apps/` → 루트)인데 2단계로 잘못 작성.

**최종 해결**: 상대경로 대신 패키지 CSS import 방식으로 전환.

- `packages/ui/src/styles/globals.css`에 `@source "../../src"` 선언
- `packages/ui/package.json`에 `"./globals.css"` export 추가
- 앱 CSS에서 `@import "@cardbox/ui/globals.css"` 사용

이 방식이 상대경로보다 의도가 명확하고 디렉토리 구조 변경에도 강건하다.
