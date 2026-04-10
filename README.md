# Cardbox

인덱스 카드(index card) 방식으로 지식을 관리하는 Zettelkasten 도구.

## 개요

Cardbox는 니클라스 루만(Niklas Luhmann)의 제텔카스텐(Zettelkasten) 방법론에 기반한 개인 지식 관리 도구입니다. 각각의 생각과 아이디어를 독립적인 카드(Zettel)로 작성하고, 카드 간의 연결을 통해 지식 네트워크를 구축할 수 있습니다.

## 핵심 개념

- **카드 (Zettel)**: 하나의 아이디어나 개념을 담는 최소 단위
- **고유 ID**: 각 카드에 부여되는 고유 식별자
- **링크**: 카드 간의 참조를 통해 지식을 연결
- **태그**: 카드를 주제별로 분류

## 주요 기능

- 카드 생성, 조회, 수정, 삭제
- 카드 간 양방향 링크
- 태그 기반 분류 및 검색
- 전문 검색 (full-text search)
- 지식 그래프 시각화

## 프로젝트 구조

```
cardbox/
├── apps/
│   └── cardbox/          # @cardbox/app — Vite + React + TypeScript
├── packages/
│   └── ui/               # @cardbox/ui — 공유 UI 컴포넌트 (shadcn/ui)
├── pnpm-workspace.yaml
└── package.json
```

## 기술 스택

- **Monorepo**: pnpm workspace
- **Frontend**: React 19, TypeScript, Vite
- **스타일링**: Tailwind CSS v4
- **UI 컴포넌트**: shadcn/ui (radix-nova 프리셋)

## 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build
```

## shadcn/ui 컴포넌트 관리

shadcn/ui 컴포넌트는 `packages/ui`에서 관리하며, 모든 앱에서 공유합니다.

### 컴포넌트 추가

```bash
# packages/ui 디렉토리에서 실행
cd packages/ui
pnpm ui:add
```

또는 컴포넌트를 직접 지정:

```bash
cd packages/ui
pnpm dlx shadcn@latest add card dialog input
./fix-imports.sh
```

> `fix-imports.sh`는 shadcn이 생성하는 `@/lib/utils` 경로를 상대경로로 변환합니다.
> `pnpm ui:add` 스크립트를 사용하면 이 과정이 자동으로 처리됩니다.

### 앱에서 사용

```tsx
import { Button } from "@cardbox/ui/components/ui/button"
import { Card } from "@cardbox/ui/components/ui/card"
import { cn } from "@cardbox/ui/lib/utils"
```

### 테마 커스터마이징

테마 CSS 변수는 `apps/cardbox/src/index.css`에서 수정합니다:

```css
:root {
    --primary: oklch(0.205 0 0);
    --background: oklch(1 0 0);
    /* ... */
}
```

### Tailwind 소스 감지

`@cardbox/ui`의 Tailwind 클래스가 정상 감지되려면 앱의 CSS에 다음 import가 필요합니다:

```css
@import "@cardbox/ui/globals.css";
```

이 파일은 `packages/ui/src` 디렉토리를 Tailwind 소스 경로로 등록합니다.

## 라이선스

MIT
