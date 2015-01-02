navRoutes = [
  new NavRoute('dashboard','fa-dashboard')
  new NavRoute('task','fa-wrench',)
  new NavRoute('newTask','', {parentName: 'task', label: 'New Task'})
  new NavRoute('viewTask','',{parentName: 'task', label: 'View Task'})
  new NavRoute('viewNewTask','',{parentName: 'viewTask', label: 'New'})
  new NavRoute('viewDispatchedTask','',{parentName: 'viewTask', label: 'Dispatched'})
  new NavRoute('viewAcceptedTask','',{parentName: 'viewTask', label: 'Accepted'})
  new NavRoute('dispatchTask','',{parentName: 'task', label: 'Dispatch Task'})
  #new NavRoute('assignTask','',{parentName: 'task', label: 'Assign Task'})
  new NavRoute('employee', 'fa-edit')
  new NavRoute('registerEmp', '', {parentName: 'employee', label: 'New Employee'})
  new NavRoute('viewEmp', '', {parentName: 'employee', label: 'View Employee'})
  #new NavRoute('sign-up-ref', '', {redirect: 'sign-up', parentName: 'pages', layoutTemplate: 'loginLayout', label: 'Sign Up'})
  #new NavRoute('sign-up', '', {isMainNav: false, template: 'signUp', layoutTemplate: 'loginLayout'})
  #new NavRoute('', '', {isMainNav: false, redirect: 'dashboard'})
  #new NavRoute('index', '', {isMainNav: false, redirect: 'dashboard'})
]

navRouteList = new NavRouteList(navRoutes)

Session.set('navRoots', navRouteList.rootNavRoutes)

#Router.route('/', ()-> this.render('dashboard'));
Router.route('/', ()-> this.render('dashboard'));
Router.route('/task/assignTask',()->this.render('assignTask'));
Router.route('/task/EditTask',()->this.render('EditTask'));
Router.route('/employee/EditEmp',()->this.render('editEmp'));
Router.route('/task/viewDetailTask',()->this.render('viewDetailTask'));
Router.route('/task/viewDetailTask/photo',()->this.render('photo'));
