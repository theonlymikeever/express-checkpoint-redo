'use strict';

var tasks = {}; // a place to store tasks by person

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },
  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    return Object.keys(tasks)
  },
  add: function (name, task) {
    // saves a task for a given person
    tasks[name] = tasks[name] || []
    tasks[name].push({
      content: task.content,
      complete: task.complete || false
    })
    //return the person and their list
    let size = tasks[name].length;
    return tasks[name][size - 1];
  },
  list: function (name, status) {
    //if a status is passed in we'll list the tasks
    //that align with the status
    if (tasks[name] && status){
      status = status === 'complete'
      return tasks[name].filter((task) => {
         if (task.complete === status) return task
      })
    }

    if (tasks[name]) {
      return  tasks[name].map((task) => {
        return task
      })
    }
  },
  complete: function(name, index) {
    tasks[name][index].complete = true;
  },
  remove: function(name, index) {
    tasks[name] = tasks[name].filter((task, i) => {
      return i != index;
    })
  }
  // etc.
};
