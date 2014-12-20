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
        var empList = EmployeeList.find();
        var taskAssigneeList = TaskDispatchList.find();
        if (taskAssigneeList.count() > 0) {
           return empList = EmployeeList.find({empNo: {$nin: taskAssigneeList.empNo}});
        }
        distanceMatrix.calculateDistances();
        return empList;
    }
});