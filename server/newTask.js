/**
 * Created by cranabahu on 11/30/14.
 */

Meteor.publish('theTask',function(){
    return TaskList.find();
});

Meteor.methods({
    'newTask':function(customerVar,custAddrVar,custContactVar,repairPartVar,serverityVar,taskDuedateVar,taskDescVar){
        var userIdvar = Meteor.userId();
        var enteredDateVar = new Date();
        var assigneeVar = "";
        var taskStatus = "New";
        var taskId   = 10001;
        if (TaskList.find().count() !==  0) {
            var maxTaskCursor = TaskList.findOne({}, {sort: {id: -1}});
            taskId = maxTaskCursor.id + 1;
        }

        TaskList.insert({
            id: taskId,
            customer: customerVar,
            custAddr: custAddrVar,
            custContact: custContactVar,
            repairPart: repairPartVar,
            desc    : taskDescVar,
            serverity: serverityVar,
            status : taskStatus,
            assignee: assigneeVar,
            dueDate : taskDuedateVar,
            entryDate: enteredDateVar,
            createdBy: userIdvar
        });

        return "Task "+taskId+" Created.";
    }
});