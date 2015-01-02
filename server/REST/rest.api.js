/**
 * Created by cranabahu on 12/26/14.
 */

Router.route('/api/findEmp/:empName', function(){
    console.log('login credential received');
    console.log(this.params.empName);
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(JSON.stringify(
        EmployeeList.findOne({name:this.params.empName})
    ));
}, {where: 'server'});

Router.route('/api/accept/:taskId',function(){
    console.log(this.params.taskId);
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(JSON.stringify(
        TaskDispatchList.update(
            {taskId:parseInt(this.params.taskId)},
            {$set:{status:'Accepted'}}
        ),
        TaskList.update(
            {taskId:parseInt(this.params.taskId)},
            {$set:{status:'Accepted'}}
        )
    ));
}, {where: 'server'});

Router.route('/api/complete/:taskId',function(){
    console.log(this.params.taskId);
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(JSON.stringify(
        TaskDispatchList.update(
            {taskId:parseInt(this.params.taskId)},
            {$set:{status:'Completed'}}
        ),
        TaskList.update(
            {taskId:parseInt(this.params.taskId)},
            {$set:{status:'Completed'}}
        )
    ));
}, {where: 'server'});

Router.route('/api/update/task/:taskId',function(){
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(JSON.stringify(
        TaskDispatchList.update(
            {taskId:parseInt(this.params.taskId)},
            {$set:this.request.body}
        )
    ));
}, {where: 'server'});

Router.route('/api/insert/pic',function(){
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(JSON.stringify(
        PictureList.insert(this.request.body)
    ));
}, {where: 'server'});