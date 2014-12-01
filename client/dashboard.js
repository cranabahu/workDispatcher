/**
 * Created by cranabahu on 11/30/14.
 */

Template.dashboard.helpers({
   'noOfTask':function(){
       return TaskList.find().count();
   }
});