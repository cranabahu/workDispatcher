/**
 * Created by cranabahu on 11/30/14.
 */
Template.viewTask.helpers({
   'newTask':function(){
       return TaskList.find({ assignee : ''});
   }
});