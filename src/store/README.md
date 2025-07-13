# VSCode Custom Snippet Zustand Store Template

Zustand + devtools 스토어 템플릿 예시입니다.

```json
{
  // Place your snippets for javascript here. Each snippet is defined under a snippet name and has a prefix, body and 
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
  // same ids are connected.
  // Example:
  // "Print to console": {
  //   "prefix": "log",
  //   "body": [
  //     "console.log('$1');",
  //     "$2"
  //   ],
  //   "description": "Log output to console"
  // }
  "store template": {
	"prefix": "store-template",
	"body": [
	  "import { create } from 'zustand';",
	  "import { devtools } from 'zustand/middleware';",
	  "import { ${1:Item}_API_URL } from '../interface/api';",
	  "export const use${1:Item}Store = create(",
	  "  devtools((set, get) => ({",
	  "    ${1:Item}: [],",
	  "    isLoading: false, // API 호출 등 비동기 작업의 로딩 상태",
	  "    isError: false,   // 에러 발생 여부 (API 실패 등)",
	  "    errorMsg: '',",
	  "    /**",
	  "     * 비동기 데이터 목록을 불러오는 함수",
	  "     * API 호출 및 에러/로딩 상태 관리",
		"     * @returns {Promise<void>}\n     */",
		"    fetchList: async () => {",
		"      set({ isLoading: true, isError: false, errorMsg: '' });",
		"      try {",
		"         const response = await fetch(${1:Item}_API_URL);",
		"         if (!response.ok) throw new Error('Network response was not ok');",
		"         const data = await response.json();",
		"         set({ ${1:Item}: data, isLoading: false });",
		"      } catch (err) {",
		"        set({ isError: true, errorMsg: err.message, isLoading: false });",
		"      }",
		"    },",
		"    /**",
		"     * ID로 항목을 찾는 함수",
		"     * @param {string|number} id - 항목의 ID",
		"     * @returns {object|undefined} - 해당 ID의 항목 또는 undefined\n     */",
		"    get${1:Item}ById: (id) => get().${1:Item}.find((item) => String(item.id) === String(id)),",
		"    /**",
		"     * 항목 추가 함수",
		"     * @param {object} item - 추가할 항목\n     */",
		"    add${1:Item}: (item) => set((state) => ({ ${1:Item}: [...state.${1:Item}, item] })),",
		"    /**",
		"     * 항목 삭제 함수",
		"     * @param {string|number} id - 삭제할 항목의 ID\n     */",
		"    delete${1:Item}: (id) => set((state) => ({ ${1:Item}: state.${1:Item}.filter((v) => v.id !== id) })),",
		"    /**",
		"     * 항목 수정 함수",
		"     * @param {string|number} id - 수정할 항목의 ID",
		"     * @param {object} newItem - 수정할 데이터\n     */",
		"    update${1:Item}: (id, newItem) => set((state) => ({ ${1:Item}: state.${1:Item}.map((v) => v.id === id ? newItem : v) })),",
		"    /**",
		"     * 전체 목록 초기화 함수",
		"     * @returns {void}\n     */",
		"    clear: () => set({ ${1:Item}: [] }),",
		"  }), { name: '${1:Item}Store' })",
		");",
	  ],
	"description": "Zustand + devtools 기본 스토어 템플릿 (Item 이름 사용자 지정)"
  }
}
```