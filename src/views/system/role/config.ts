export default {
  hidden: false,
  title: '角色管理',
  icon: 'role',
  name: 'role',
  sort: 1
}
export const formulaList = [
  [
    { label: '(' },
    { label: ')' },
    { label: 'and' },
    { label: 'or' },
    { label: 'in' },
    { label: 'not in' },
    { label: 'like' },
    { label: 'not like' }
  ],
  [
    { label: '%' },
    { label: '=' },
    { label: '!=' },
    { label: '<' },
    { label: '>' },
    { label: '<=' },
    { label: '>=' },
    { label: '+' }
  ],
  [
    { label: '-' },
    { label: '*' },
    { label: '/' },
    { label: "'" },
    { label: '||' },
    { label: '.' },
    { label: 'Equals', class: 'Equals' }
  ]
]
