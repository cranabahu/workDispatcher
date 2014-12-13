/**
 * Created by cranabahu on 11/30/14.
 */
Template.viewTask.helpers({
   'newTask':function(){
       return TaskList.find({ assignee : ''});
   },

   'selectedClass':function(){
       var taskId = this._id;
       var selectedTaskobjId = Session.get('taskObjId');
       if (taskId === selectedTaskobjId) {
           return "selected"
       }
   }
});

Template.viewTask.events({
    'click .newTask': function() {
        var taskObjId = this._id;
       Session.set('taskObjId',taskObjId);
    }
});