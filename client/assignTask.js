/**
 * Created by cranabahu on 12/14/14.
 */

Template.assignTask.helpers({
    'task': function () {
        var taskObjId = Session.get('taskObjId');
        return TaskList.find({_id : taskObjId});
    }
});

Template.assignee.helpers({
    'availableEmp': function (){
        return EmployeeList.find();
    }
});