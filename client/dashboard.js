/**
 * Created by cranabahu on 11/30/14.
 */

Template.dashboard.helpers({
    'noOfFreeEmp': function () {
        var taskAssigneeList = _.pluck(TaskDispatchList.find({status: {$nin: ['Accepted','Dispatched']}}).fetch(),'empNo');

        if (TaskDispatchList.find().count() > 0) {
            var freeEmp = EmployeeList.find({empNo: {$nin: taskAssigneeList}}).count();
            var distinctTaskArray =  _.uniq(taskAssigneeList, false, function(d) {return d.empNo});
            var distinctTaskEmp   =  _.pluck(distinctTaskArray, 'empNo');
            if(distinctTaskEmp[0]){
                console.log('distinctTaskEmp '+distinctTaskEmp);
                return (freeEmp + distinctTaskEmp.length);
            }else{
                return freeEmp
            }
        }else{
             return EmployeeList.find().count();
        }
    },
    'noOfNewTask':function(){
        return TaskList.find({status:'New'}).count();
    },
    'noOfDispatchedTask':function(){
        return TaskList.find({status:'Dispatched'}).count();
    },
    'noOfAcceptedTask':function(){
        return TaskList.find({status:'Accepted'}).count();
    }
});