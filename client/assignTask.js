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
        var returnEmp = null;
        var originCoordinateArray = [];

        var taskAssigneeList = _.pluck(TaskDispatchList.find().fetch(),'empNo');
        var newTask = TaskList.find({_id : Session.get('taskObjId')}).fetch();
        var desLat = _.pluck(newTask,'lat')[0];
        var desLng = _.pluck(newTask,'lng')[0];
        var desCoordinateArray = [new google.maps.LatLng(desLat,desLng)];

        if (TaskDispatchList.find().count() > 0) {
            freeEmp = EmployeeList.find({empNo: {$nin: taskAssigneeList}}).fetch();
            console.log(freeEmp);
            var distinctTaskArray =  _.uniq(TaskDispatchList.find().fetch(), false, function(d) {return d.empNo});
            var distinctTaskEmp   =  _.pluck(distinctTaskArray, 'empNo');

            for(j = 0; j < distinctTaskEmp.length; j++){
                var tempEmp = null;
                tempEmp = TaskDispatchList.findOne({empNo: distinctTaskEmp[j], status: 'Completed'},{sort: {id: -1}});
                console.log(tempEmp);
                if (tempEmp != null){
                    freeEmp.push(tempEmp);
                }
            }
        }else{
            freeEmp = EmployeeList.find().fetch();
        }

        for(k = 0; k < freeEmp.length ; k++){
            console.log(freeEmp[k].lat);
            var coordinate = new google.maps.LatLng(freeEmp[k].lat, freeEmp[k].lng);
            originCoordinateArray.push(coordinate);
        }

        distanceMatrix.calculateDistances(desCoordinateArray, originCoordinateArray);

        var distanceArray = Session.get('distanceArray');

        if (distanceArray != ''){
            console.log(distanceArray);
            for(k = 0; k< freeEmp.length; k++){
                freeEmp[k].distance = distanceArray[k];
            }
            return _.sortBy(freeEmp,function(o){return o.distance});
        }

    },

    'selectedAssignee':function(){
        console.log('selected');
        var assigneeId = this._id;
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
        Session.set('selectedAssigneeId',this._id)
    },

    'click .dispatch':function(){
        if (Session.get('selectedAssigneeId') == null){
            Session.set('error','Please select an Assignee');
        }else{
            Session.set('error','');
            var task = TaskList.findOne({_id : Session.get('taskObjId')});
            var assignee = EmployeeList.findOne({_id: Session.get('selectedAssigneeId')});
            console.log(task.taskId);
            console.log(assignee.empNo);
            Meteor.call('newDispatch',task.taskId,assignee.empNo,assignee.name,task.dueDate,task.custAddr, task.lat,task.lng,0);
        }
    }

});