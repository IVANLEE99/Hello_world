var fs = require ('fs');
var path = require ('path');
var args = process.argv.splice(2);
var command = args.shift();
var taskDescription = args.join(' ');
var file = path.join(process.cwd(), '/.tasks');
// console.log('argss=====' + process.argv);
// console.log('argss0=====' + process.argv[0]);
// console.log('argss1=====' + process.argv[1]);
// console.log('argss2=====' + process.argv[2]);
// console.log('args=====' + args);
// console.log('command=====' + command);
// console.log('taskDescription=====' + taskDescription);
// console.log('file=====' + file);
switch(command){
	case 'list':
	listTasks(file);
	break;

	case 'add' :
	addTask(file, taskDescription);
	break;

	default:
	console.log('Usage: ' + process.argv[0]
		+ ' list|add [taskDescription]');
}