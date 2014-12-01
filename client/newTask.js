/**
 * Created by cranabahu on 11/30/14.
 */

Meteor.subscribe('theTask');

Template.newTask.helpers({
    'taskInfo':function(){
        var info_ = Session.get('taskInfo');
        return info_;
    }
});

Template.newTask.events({
    'submit #page-wrapper':function(event){
        event.preventDefault();
        var customerVar = event.target.customer.value;
        var custAddrVar = event.target.custAddr.value;
        var custContactVar = event.target.custContact.value;
        var repairPartVar = event.target.repairPart.value;
        var serverityVar = event.target.serverity.value;
        var taskDuedateVar = event.target.taskDuedate.value;
        var taskDescVar = event.target.taskDesc.value;
        Meteor.call('newTask',customerVar,custAddrVar,custContactVar,repairPartVar,serverityVar,taskDuedateVar,taskDescVar,function(error,result){
            if (error){
                console.log(error.result);
            }
            else{
                Session.set('taskInfo',result);
                event.target.customer.value = null;
                event.target.custAddr.value = null;
                event.target.custContact.value = null;
                event.target.repairPart.value = null;
                event.target.serverity.value = null;
                event.target.taskDuedate.value = null;
                event.target.taskDesc.value = null;
            }
        });
    }
});