/**
 * Created by cranabahu on 12/14/14.
 */

Meteor.subscribe('TaskDispatchList');

Template.assignTask.helpers({
    'task': function () {
        var taskObjId = Session.get('taskObjId');
        return TaskList.find({_id : taskObjId});
    }
});

Template.assignee.helpers({
    'availableEmp': function (){
        var freeEmp = null;
        var originCoordinateArray = [];

        var taskAssigneeList = _.pluck(TaskDispatchList.find().fetch(),'empNo');
        var newTask = TaskList.find({_id : Session.get('taskObjId')}).fetch();
        var desLat  = _.pluck(newTask,'lat')[0];
        var desLng  = _.pluck(newTask,'lng')[0];
        var desCoordinateArray = [new google.maps.LatLng(desLat,desLng)];

        if (TaskDispatchList.find().count() > 0) {
            freeEmp = EmployeeList.find({empNo: {$nin: taskAssigneeList}}).fetch();
            console.log(freeEmp);
            var distinctTaskArray =  _.uniq(TaskDispatchList.find().fetch(), false, function(d) {return d.empNo});
            var distinctTaskEmp   =  _.pluck(distinctTaskArray, 'empNo');

            for(j = 0; j < distinctTaskEmp.length; j++){
                var empCompletedTask  = null;
                var empAcceptedTask   = null;
                var empDispatchedTask = null;

                empAcceptedTask    = TaskDispatchList.findOne({empNo: distinctTaskEmp[j], status: 'Accepted'},{sort: {id: -1}});
                empDispatchedTask  = TaskDispatchList.findOne({empNo: distinctTaskEmp[j], status: 'Dispatched'},{sort: {id: -1}});
                empCompletedTask   = TaskDispatchList.findOne({empNo: distinctTaskEmp[j], status: 'Completed'},{sort: {id: -1}});

                //console.log('lastCompleted'+tempEmp.taskId);
                //console.log(tempEmp);
                if (empAcceptedTask){
                    freeEmp.push(empAcceptedTask);
                }else if(empCompletedTask){
                    freeEmp.push(empCompletedTask);
                }else if(empDispatchedTask){
                    var emp = EmployeeList.findOne({empNo: distinctTaskEmp[j]});
                    freeEmp.push(emp);
                }
            }
        }else{
            freeEmp = EmployeeList.find().fetch();
        }

        for(k = 0; k < freeEmp.length ; k++){
            var coordinate = new google.maps.LatLng(freeEmp[k].lat, freeEmp[k].lng);
            originCoordinateArray.push(coordinate);
        }

        distanceMatrix.calculateDistances(desCoordinateArray, originCoordinateArray);

        var distanceArray = Session.get('distanceArray');

        if (distanceArray != ''){
            //console.log(distanceArray);
            for(k = 0; k< freeEmp.length; k++){
                var dispatchTaskCount = 0;
                var acceptedTaskCount = 0;
                dispatchTaskCount = TaskDispatchList.find({empNo:freeEmp[k].empNo, status:'Dispatched'}).count();
                acceptedTaskCount = TaskDispatchList.find({empNo:freeEmp[k].empNo, status:'Accepted'}).count();

                freeEmp[k].distance = distanceArray[k];
                freeEmp[k].dispatchTaskCount = dispatchTaskCount;
                freeEmp[k].acceptedTaskCount = acceptedTaskCount;
            }
            return _.sortBy(freeEmp,function(o){return o.distance});
        }
    },

    'selectedAssignee':function(){
        console.log('selected');
        var assigneeId = this.empNo;
        var selectedAssignee = Session.get('selectedAssigneeId');
        if (assigneeId == selectedAssignee) {
            return 'selected'
        }
    },

    'error':function(){
        return Session.get('error');
    }
});

Template.assignee.events({
    'click .selectedRow': function () {
        //console.log(this._id);
        Session.set('selectedAssigneeId',this.empNo)
    },

    'click .dispatch':function(){
        if (Session.get('selectedAssigneeId') == null){
            Session.set('error','Please select an Assignee');
        }else{
            Session.set('error','');
            var task = TaskList.findOne({_id : Session.get('taskObjId')});
            var assignee = EmployeeList.findOne({empNo: Session.get('selectedAssigneeId')});
            console.log(task.taskId);
            console.log(assignee.empNo);
            Meteor.call(
                'newDispatch',
                task.taskId,
                task.repairPart,
                task.customer,
                task.custContact,
                assignee.empNo,
                assignee.name,                
                task.dueDate,
                task.custAddr,
                task.custFullAddr,
                task.lat,
                task.lng,
                task.desc,
                task.serverity,
                0
            );
        }
    }

});