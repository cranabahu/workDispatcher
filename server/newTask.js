/**
 * Created by cranabahu on 11/30/14.
 */

Meteor.publish('theTask',function(){
    return TaskList.find();
});

Meteor.methods({
    'newTask':function(customerVar,custFullAddrVar,custAddrVar,custContactVar,repairPartVar,serverityVar,taskDuedateVar,taskDescVar,custLat,custLng){
        var userIdvar = Meteor.userId();
        var enteredDateVar = moment(new Date()).format('YYYY-MM-DD');
        var assigneeVar = "";
        var estimationVar = 0;
        var taskStatus = "New";
        var taskId   = 10001;
        if (TaskList.find().count() >  0) {
            var maxTaskCursor = TaskList.findOne({}, {sort: {taskId: -1}});
            taskId = maxTaskCursor.taskId + 1;
        }
        TaskList.insert({
            taskId: taskId,
            customer: customerVar,
            custFullAddr: custFullAddrVar,
            custAddr: custAddrVar,
            lat: custLat,
            lng: custLng,
            custContact: custContactVar,
            repairPart: repairPartVar,
            desc: taskDescVar,
            serverity: serverityVar,
            status: taskStatus,
            assignee: assigneeVar,
            dueDate: taskDuedateVar,
            estimation: estimationVar,
            entryDate: enteredDateVar,
            createdBy: userIdvar
        });
        var desc = "Task "+taskId+" Created.";
        Meteor.call('notify',desc,'fa-wrench');
        return desc;
    },

    'editTask':function(taskIdvar,customerVar,custFullAddrVar,custAddrVar,custContactVar,repairPartVar,serverityVar,taskDuedateVar,taskDescVar,custLat,custLng){
        var userIdvar = Meteor.userId();
        var enteredDateVar = moment(new Date()).format('YYYY-MM-DD');
        console.log(taskIdvar);
        TaskList.update({taskId:taskIdvar},
            {$set: {
                custFullAddr: custFullAddrVar,
                custAddr: custAddrVar,
                lat: custLat,
                lng: custLng,
                custContact: custContactVar,
                repairPart: repairPartVar,
                desc: taskDescVar,
                serverity: serverityVar,
                dueDate: taskDuedateVar,
                createdBy: userIdvar
            }
        });

        var desc = "Task "+taskIdvar+" Edited.";
        Meteor.call('notify',desc,'fa-wrench');

        return "Task Updated.";
    },

    'deleteTask': function (taskIdVar) {
        //console.log(taskId);
        //var task = TaskList.find({taskId: taskId}).fetch();
        //console.log(taskIdVar);
        TaskList.remove({taskId: taskIdVar});
        var desc = "Task "+taskIdvar+" Deleted.";
        Meteor.call('notify',desc,'fa-trash');
    }
});

