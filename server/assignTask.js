/**
 * Created by cranabahu on 12/15/14.
 */

Meteor.publish('TaskDispatchList',function(){
    return TaskDispatchList.find();
});

Meteor.methods({
    'newDispatch':function(taskIdVar,partVar,customerVar,custContactVar,empNoVar,empNameVar,dueDateVar,locationVar,custFullAddr, latVar, lonVar,taskDescVar,severityVar,tempNumber){
        var startTimeVar = "";

        var dispatchId = 0;
        if (TaskDispatchList.find().count() !==  0) {
            var maxCursor = TaskDispatchList.findOne({}, {sort: {id: -1}});
            dispatchId = maxCursor.id + 1;
        }

        TaskDispatchList.insert({
            id:dispatchId,
            taskId: taskIdVar,
            repairPart: partVar,
            customer: customerVar,
            contact: custContactVar,
            empNo: empNoVar,
            name: empNameVar,
            startTime: "",
            dueDate: dueDateVar,
            estimatedTime: 0,
            completionTime:0,
            location:locationVar,
            custFullAddr:custFullAddr,
            lat:latVar,
            lng:lonVar,
            status:'Dispatched',
            desc: taskDescVar,
            severity: severityVar
        });

        TaskList.update(
            {taskId:taskIdVar},
            {$set:{status:'Dispatched',assignee:empNoVar}}
        );

        var userTask = {data:
                            {
                                id:dispatchId,
                                taskId: taskIdVar,
                                repairPart: partVar,
                                customer: customerVar,
                                contact: custContactVar,
                                empNo: empNoVar,
                                name: empNameVar,
                                startTime: "",
                                dueDate: dueDateVar,
                                estimatedTime: 0,
                                completionTime:0,
                                location:locationVar,
                                custFullAddr:custFullAddr,
                                lat:latVar,
                                lng:lonVar,
                                status:'Dispatched',
                                desc: taskDescVar,
                                severity: severityVar
                            }
                        };

        HTTP.call("PUT", 'http://localhost:3100/api/newTask', userTask, function(error, result){
            if(result){
                console.log(result.content);
            }
            if(error){
                console.error(error);
            }
        });
        var desc = 'Task '+ empNoVar +' dispatched to'+empNameVar;
        Meteor.call('notify',desc,'fa-paper-plane');
    }
});