navRoutes = [
  new NavRoute('dashboard','fa-dashboard')
  new NavRoute('task','fa-wrench',)
  new NavRoute('newTask','', {parentName: 'task', label: 'New Task'})
  new NavRoute('viewTask','',{parentName: 'task', label: 'View Task'})
  new NavRoute('dispatchTask','',{parentName: 'task', label: 'Dispatch Task'})
  new NavRoute('assignTask','',{parentName: 'task', label: 'Assign Task'})
  new NavRoute('employee', 'fa-edit')
  new NavRoute('registerEmp', '', {parentName: 'employee', label: 'New Employee'})
  #new NavRoute('charts', 'fa-bar-chart-o')
  #new NavRoute('chart1', '', {parentName: 'charts'})
  #new NavRoute('chart2', 'fa-bar-chart-o', {parentName: 'charts'})
  new NavRoute('tables', 'fa-table')
  new NavRoute('forms', 'fa-edit')
  new NavRoute('ui-elements', 'fa-wrench', {label: "UI Elements"})
  new NavRoute('buttons', '', {parentName: 'ui-elements'})
  new NavRoute('typography', '', {parentName: 'ui-elements'})
  new NavRoute('grid', '', {parentName: 'ui-elements'})
  new NavRoute('notifications', '', {parentName: 'ui-elements'})
  new NavRoute('panels-and-wells', '', {parentName: 'ui-elements', label: 'Panels and Wells'})
  #new NavRoute('pages', 'fa-files-o', {label: "Sample Pages"})
  #new NavRoute('blank', '', {parentName: 'pages', label: "Blank Page"})
  #new NavRoute('sign-up-ref', '', {redirect: 'sign-up', parentName: 'pages', layoutTemplate: 'loginLayout', label: 'Sign Up'})
  #new NavRoute('sign-up', '', {isMainNav: false, template: 'signUp', layoutTemplate: 'loginLayout'})
  #new NavRoute('', '', {isMainNav: false, redirect: 'dashboard'})
  #new NavRoute('index', '', {isMainNav: false, redirect: 'dashboard'})
]

navRouteList = new NavRouteList(navRoutes)

Session.set('navRoots', navRouteList.rootNavRoutes)

Router.route('/', ()-> this.render('dashboard'));