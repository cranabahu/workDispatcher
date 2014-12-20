/**
 * Created by cranabahu on 12/15/14.
 */

Meteor.publish('TaskDispatchList',function(){
    return TaskDispatchList.find();
});

Meteor.methods({
    'newDispatch':function(taskIdVar,empNoVar,empNameVar,dueDateVar,locationVar, latVar, lonVar){
        var startTimeVar = "";
        TaskDispatchList.insert({
            empNo: empNoVar,
            name: empNameVar,
            taskId: taskIdVar,
            startTime: "",
            dueDate: dueDateVar,
            estimatedTime: 0,
            completionTime:"",
            location:locationVar,
            lat:latVar,
            lon:lonVar
        })
    }
});