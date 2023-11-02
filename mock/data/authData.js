export default [
  {
    children: [
      {
        children: [
          {
            children: [],
            elements: [
              { name: 'edit' },
              { name: 'addNew' },
              { name: 'preview' },
              { name: 'tempEdit' }
            ],
            menuType: 3,
            menu: 'warnRuleManagementIndex'
          }
        ],
        elements: [],
        menuType: 5,
        sort: 1,
        menu: 'warnRuleManagementMenu'
      },
      {
        children: [
          {
            children: [],
            elements: [
              { name: 'addNew' },
              { name: 'detail' },
              { name: 'edit' },
              { name: 'send' }

            ],
            menuType: 3,
            menu: 'warnRecord'
          }
        ],
        elements: [],
        menuType: 5,
        sort: 2,
        menu: 'warnRecordMenu'
      },
      {
        children: [
          {
            children: [],
            elements: [],
            menuType: 3,
            menu: 'afterwardTemplate'
          }
        ],
        elements: [],
        menuType: 5,
        sort: 2,
        menu: 'afterwardTemplateMenu'
      },
      {
        children: [
          {
            children: [],
            elements: [],
            menuType: 3,
            menu: 'demo2'
          }
        ],
        elements: [],
        menuType: 5,
        sort: 2,
        menu: 'demo2Menu'
      }
    ],
    elements: [],
    menuType: 5,
    sort: 7,
    menu: 'demo1'
  }
]
