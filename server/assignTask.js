/**
 * Created by cranabahu on 12/15/14.
 */

Meteor.publish('TaskDispatchList',function(){
    return TaskDispatchList.find();
});

Meteor.methods({
    'newDispatch':function(taskIdVar,empNoVar,empNameVar,dueDateVar,locationVar, latVar, lonVar,tempNumber){
        var startTimeVar = "";

        var dispatchId = 0;
        if (TaskDispatchList.find().count() !==  0) {
            var maxCursor = TaskDispatchList.findOne({}, {sort: {id: -1}});
            dispatchId = maxCursor.id + 1;
        }

        TaskDispatchList.insert({
            id:dispatchId,
            taskId: taskIdVar,
            empNo: empNoVar,
            name: empNameVar,
            startTime: "",
            dueDate: dueDateVar,
            estimatedTime: 0,
            completionTime:0,
            location:locationVar,
            lat:latVar,
            lon:lonVar,
            status:'Dispatched'
        });

        TaskList.update(
            {taskId:taskIdVar},
            {$set:{status:'Dispatched'}}
        );
    }
});