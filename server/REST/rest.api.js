/**
 * Created by cranabahu on 12/26/14.
 */

Router.route('/api/findEmp/:empName', function(){
    console.log('login credential received');
    console.log(this.params.empName);
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(JSON.stringify(
        EmployeeList.findOne({name:this.params.empName})
    ));
}, {where: 'server'});