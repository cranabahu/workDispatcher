/**
 * Created by cranabahu on 11/30/14.
 */
Template.viewNewTask.helpers({
   'task':function(){
       return TaskList.find({ status : 'New'});
   },

   'selectedClass':function(){
       var taskObjId = this.taskId;
       var selectedTaskobjId = Session.get('newTaskObjId');
       if (taskObjId === selectedTaskobjId) {
           return "selected"
       }
   }
});

Template.viewNewTask.events({
    'click .newTask': function() {
        var taskObjId = this.taskId;
        Session.set('newTaskObjId',taskObjId);
        document.getElementById("lblInfo").innerHTML = '';
    },
    'click .editLink': function () {
        var selectedTaskId = Session.get('newTaskObjId');
        if(selectedTaskId){
            Session.set('editTaskId',selectedTaskId);
            Router.go('/task/EditTask');
        }else{
            document.getElementById("lblInfo").innerHTML = 'Please select a task';
        }
    },

    'click .deleteLink': function () {
        var selectedTaskId = Session.get('newTaskObjId');
        if(selectedTaskId){
            Meteor.call('deleteTask',selectedTaskId);
            document.getElementById("lblInfo").innerHTML = 'Task '+selectedTaskId+' deleted.';
        }else{
            document.getElementById("lblInfo").innerHTML = 'Please select a task';
        }
    }
});

//#######################################################################

Template.viewDispatchedTask.helpers({
    'task':function(){
        return TaskDispatchList.find({ status : 'Dispatched'});
    },

    'selectedClass':function(){
        var taskObjId = this.taskId;
        var selectedTaskobjId = Session.get('dispatchedTaskObjId');
        if (taskObjId === selectedTaskobjId) {
            return "selected"
        }
    }
});

Template.viewDispatchedTask.events({
    'click .dispatchedTask': function() {
        var taskObjId = this.taskId;
        Session.set('dispatchedTaskObjId',taskObjId);
    }
});

//#######################################################################

Template.viewAcceptedTask.helpers({
    'task':function(){
        return TaskDispatchList.find({ status : 'Accepted'});
    },

    'selectedClass':function(){
        var taskObjId = this.taskId;
        var selectedTaskobjId = Session.get('acceptedTaskObjId');
        if (taskObjId === selectedTaskobjId) {
            return "selected"
        }
    }
});

Template.viewAcceptedTask.events({
    'click .acceptedTask': function() {
        var taskObjId = this.taskId;
        Session.set('acceptedTaskObjId',taskObjId);
    },

    'click .editLink': function () {
        var acceptedTaskObjId = Session.get('acceptedTaskObjId');
        if(acceptedTaskObjId){
            Session.set('viewTaskId',acceptedTaskObjId);
            Router.go('/task/viewDetailTask');
        }else{
            document.getElementById("lblInfo").innerHTML = 'Please select a task';
        }
    }
});

//###########################################################################
Template.viewDetailTask.helpers({
    'task': function () {
        var taskIdVar = Session.get('viewTaskId');
        return TaskDispatchList.find({taskId: taskIdVar});
    }
});

Template.viewDetailTask.events({
    'click .btn': function (events) {
        events.preventDefault();
        Router.go('/task/viewDetailTask/photo');
    }
});