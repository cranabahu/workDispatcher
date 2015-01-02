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
    var desc = "Task "+this.params.taskId+" Accepted.";
    Meteor.call('notify',desc,'fa-thumb-tack');
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
    var desc = "Task "+this.params.taskId+" Completed.";
    Meteor.call('notify',desc,'fa-check');
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
    var desc = "Task "+this.params.taskId+" updated by emp.";
    Meteor.call('notify',desc,'fa-pencil-square-o');
}, {where: 'server'});

Router.route('/api/insert/pic',function(){
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(JSON.stringify(
        PictureList.insert(this.request.body)
    ));
    var desc = "Pictures added "+this.request.body.taskId;
    Meteor.call('notify',desc,'fa-camera');
}, {where: 'server'});