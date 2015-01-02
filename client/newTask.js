/**
 * Created by cranabahu on 11/30/14.
 */

Meteor.subscribe('theTask');

Template.newTask.rendered = function () {
    $('#frmNewTask').parsley({trigger: 'change'});
};

Template.EditTask.rendered = function () {
    $('#frmEditTask').parsley({trigger: 'change'});
};

Template.newTask.helpers({
    'taskInfo':function(){
        return Session.get('taskInfo');
    }
});

Template.newTask.events({
    'submit #page-wrapper':function(event){
        event.preventDefault();
        var customerVar = event.target.customer.value;
        var custFullAddrVar = event.target.custFullAddr.value;
        var custAddrVar = event.target.custAddr.value;
        var custContactVar = event.target.custContact.value;
        var repairPartVar = event.target.repairPart.value;
        var serverityVar = event.target.serverity.value;
        var taskDuedateVar = event.target.taskDuedate.value;
        var taskDescVar = event.target.taskDesc.value;
        var custLat = Session.get("Lat");
        var custLng = Session.get("Lng");
        Session.set("Lat",'');
        Session.set("Lng",'');

        Meteor.call('newTask',customerVar,custFullAddrVar,custAddrVar,custContactVar,repairPartVar,serverityVar,taskDuedateVar,taskDescVar,custLat,custLng,function(error,result){
            if (error){
                console.log(error.result);
            }
            else{
                Session.set('taskInfo',result);
                event.target.customer.value = null;
                event.target.custFullAddr.value = null;
                event.target.custAddr.value = null;
                event.target.custContact.value = null;
                event.target.repairPart.value = null;
                event.target.serverity.value = null;
                event.target.taskDuedate.value = null;
                event.target.taskDesc.value = null;
                gmap.clearMapDiv();
            }
        });
    },

    'click .custContact':function(){
        console.log('onClick for cust Contact');
        if(document.getElementById("addr").value !== "") {
            //gmap.initialize();
            gmap.codeAddress(document.getElementById("addr").value);
        }else{
            Session.set('Lat',"");
            Session.set('Lng',"");
        }
    },
    'click .repairPart': function () {
        Session.set('taskInfo',"");
    }
});

//###################################################################################

Template.EditTask.helpers({
    'task': function () {
        var taskIdVar = Session.get('editTaskId');
        return TaskList.find({taskId:taskIdVar});
    },
    'taskUpdatedInfo': function () {
        return Session.get('taskUpdatedInfo');
    }
});

Template.EditTask.events({
    'submit #page-wrapper':function(event){
        event.preventDefault();
        var taskIdVar   = Session.get('editTaskId');
        var customerVar = event.target.customer.value;
        var custFullAddrVar = event.target.custFullAddr.value;
        var custAddrVar = event.target.custAddr.value;
        var custContactVar = event.target.custContact.value;
        var repairPartVar = event.target.repairPart.value;
        var serverityVar = event.target.serverity.value;
        var taskDuedateVar = event.target.taskDuedate.value;
        var taskDescVar = event.target.taskDesc.value;
        var custLat = Session.get("Lat");
        var custLng = Session.get("Lng");
        Session.set("Lat",'');
        Session.set("Lng",'');

        Meteor.call('editTask',taskIdVar,customerVar,custFullAddrVar,custAddrVar,custContactVar,repairPartVar,serverityVar,taskDuedateVar,taskDescVar,custLat,custLng,function(error,result){
            if (error){
                console.log(error.result);
            }
            else{
                Session.set('taskUpdatedInfo',result);
                gmap.clearMapDiv();
            }
        });
    },

    'click .custContact':function(){
        console.log('onClick for cust Contact');
        if(document.getElementById("addr").value !== "") {
            //gmap.initialize();
            gmap.codeAddress(document.getElementById("addr").value);
        }else{
            Session.set('Lat',"");
            Session.set('Lng',"");
        }
    },
    'click .gMap':function(){
        console.log('onClick for cust Contact');
        if(document.getElementById("addr").value !== "") {
            //gmap.initialize();
            gmap.codeAddress(document.getElementById("addr").value);
        }else{
            Session.set('Lat',"");
            Session.set('Lng',"");
        }
    },
    'click .repairPart': function () {
        Session.set('taskUpdatedInfo',"");
    }
});