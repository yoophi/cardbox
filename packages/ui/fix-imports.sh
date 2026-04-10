#!/bin/bash
# shadcn add 후 @/ alias를 상대경로로 변환
# Usage: ./fix-imports.sh

find src/components/ui -name '*.tsx' -exec sed -i '' \
  's|from "@/lib/utils"|from "../../lib/utils"|g' {} +

echo "Fixed @/ imports to relative paths."
