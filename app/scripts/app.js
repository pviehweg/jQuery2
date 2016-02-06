$(document).ready(function() {

$('#newTaskForm').hide();

var listo = [];

var Task = function(task) {
    this.task = task;
    this.id = 'new';
}

var addTask = function(task) {
    if(task) {
        task = new Task(task);
        listo.push(task);

        $('#newItemInput').val('');
        $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');

    }
    $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
};

$('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
});

//Opens form
  $('#newListItem').on('click', function () {
      $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
  });
  //closes form
  $('#cancel').on('click', function (e) {
      e.preventDefault();
      $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
  });

var advanceTask = function(task) {
  var modified = task.innerText.trim()
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
      } else if (listo[i].id === 'inProgress') {
        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
  }
  task.remove();
};  

$(document).on('click', '#inProgress', function (e) {
  e.preventDefault();
  var task = this;
  task.id = "archived";
  var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
  advanceTask(task);
  $('#archivedList').append(changeIcon);
});

$(document).on('click', '#archived', function (e) {
  e.preventDefault();
  var task = this;
  advanceTask(task);
});

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}


if (Modernizr.localstorage) {
  // window.localStorage is available!
} else {
  // no native support for HTML5 storage :(
  // maybe try dojox.storage or a third-party solution
}

});