export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      { path: '/admin/home', name: '首页', component: './Welcome' },
      { path: '/admin/laboratory', name: '实验室概况', component: './laboratory/index' },
      { path: '/admin/team', name: '科研队伍', component: './team/index' },
      { path: '/admin/research', name: '科学研究', component: './research/index' },
      { path: '/admin/talent', name: '人才培养', component: './talent/index' },
      { path: '/admin/news', name: '新闻动态', component: './news/index' },
      { path: '/admin/cooperate', name: '合作交流', component: './cooperate/index' },
      { path: '/admin/contact', name: '联系我们', component: './contact/index' },
      { path: '/admin/edit', name: '编辑文档', component: './editDoc/index' },
      { component: './404' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
