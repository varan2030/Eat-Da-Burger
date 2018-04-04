$(document).ready(function() {
  displayResult();
  $('[data-toggle="tooltip"]').tooltip();

  $("#openmodalbutton").click(function() {
    var html = $("#name").html();
    var projectTitle = $("#projectTitle").val("");
    var responsible = $("#responsible").val("");
    var status = $("#status").val("");
    var priority = $("#priority").val("");
    var deadline = $("#deadline").val("");
    var description = $("#description").val("");
  });
});

$("#submit1").on("click", function() {
  event.preventDefault();
 
  $(".modal-footer").empty();
  var currentURL = window.location.origin;
 
  var projectTitle = $("#projectTitle").val();
  var responsible = $("#responsible").val();
  var status = "In progress";
  var priority = $("#priority").val();
  var deadline = $("#deadline").val();
  var description = $("#description").val();
  var createdTime = new Date();
  var progress = 0;
  
  console.log("dead" + deadline);
  
  function validateForm(){
  
   var isValid = true;

  $('.form-control').each(function() {
    if ( $(this).val() === '' )
        return isValid = false;
    });

    return isValid;

  }

  if (validateForm() == true){
    $("#myModal").modal("toggle");
  var projectData = {
    title: projectTitle,
    responsible: responsible,
    status: status,
    priority: priority,
    deadline: deadline,
    description: description,
    createdTime: createdTime,
    progress: progress
  };

  $.post(currentURL + "/api/projects", projectData, function(results) {
    console.log(results);
    location.reload();
  });
  displayResult();
  } else {
    $(".modal-footer").append(`
    <div class=" alert alert-danger">
    <strong> Please fill out the form </strong> .
  </div>
    `)
  }
});

function displayResult() {
  $("#tasks-list").empty();


  var currentURL = window.location.origin;
  $.get(currentURL + "/api/projects", function(data) {
    console.log(data);

    if (data.length > 0){
    $("#tasks-list").append(`

        <div class="tasksHeader text-center row">
            <div class="col-2">
          Task Name
            </div>
        <div class="col-2">
            Responsible
        </div>
        <div class="col-3">
           Timeline
        </div>
        <div class="col-2">
          Status
        </div>
        <div class="col-2">
          Deadline
        </div>
        <div class="col-1">
          Priority
        </div>
      </div>
        `);
      }
    for (i = 0; i < data.length; i++) {
      var time = data[i].deadline;
      var start = moment(data[i].createdTime); //todays date
      var end = moment(time); // another date
      var now = moment(new Date());
      console.log("Start " + start);
      console.log("End " + end);
      console.log("Now " + now);

      var duration1 = moment.duration(end.diff(start));
      var duration2 = moment.duration(now.diff(start));
      var deadline = parseInt(duration1.asHours());
      console.log("Duration " + duration1 + duration2);
      // var dayPassed = moment.duration(start.diff(now));

      var progress = parseInt(duration2 / duration1 * 100);
      console.log(progress);
      var status = data[i].status;;
     
      if (deadline < 0 && data[i].status !== "Done"){
        deadline = "past due";
      } else if (deadline > 48){
        deadline = parseInt(duration1.asDays()) + " days"
      } else {
       deadline = deadline +" hours";
      }

      if (progress < 0){
        progress = 0;
      } else if (progress > 100){
        status = "Past due";
        progress = 100;
      };

      var progressClass;

      if(data[i].status == "Done"){
        progress = data[i].progress;
        progressClass = "done-task";
        deadline = "-";
        onclick1 = "value"; 
      } else {
        progressClass = "";
        onclick1 = "onclick";
      };

      $("#tasks-list").append(`

            <div class="task ${progressClass} text-center row" data-toggle="modal" data-target="#myModal1" data-toggle="tooltip" data-placement="bottom" title="Description: ${data[i].description}" ${onclick1}="updateModal(${data[i].id}, ${progress})">
                <div class="col-2">
            ${data[i].title}
                </div>
            <div class="col-2">
            ${data[i].responsible}
            </div>
            <div class="progress col-3">
            
            <div class="progress-bar bg-danger" role="progressbar" style="width: ${progress}%;" aria-valuenow="${progress}%" aria-valuemin="0" aria-valuemax="100">${progress}%</div>
           
            </div>
            <div class="col-2">
            ${status}
            </div>
            <div class="col-2 ">
            ${deadline}
            </div>
            <div class="col-1">
            ${data[i].priority}
            </div>
        </div>
            `);
          
    }
  });
}

function updateModal (id, progress){
    var html = $("#name").html();
    var currentURL = window.location.origin;
    $.get(currentURL + "/api/projects/" + id, function(data) {
        console.log("Deadline " + data.deadline);
        var date = moment(data.deadline).format("YYYY-MM-DDTHH:mm");

    $("#modal1").append(`
    <div class="modal fade" id="myModal1" role="dialog">
    <div class="modal-dialog">

      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Update task: ${data.title}</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <form>
            <div class="form-group text-center">
              <label for="inputAddress">Responsible</label>
              <input type="text" class="form-control" id="responsible" placeholder="Responsible">
            </div>
            <div class="form-group col-md">
              <label for="inputDeadline">Deadline</label>
              <div class="form-group">
                  <input type="datetime-local" class="form-control input" id="deadline" value = "${date}"/>
            </div>
            </div>
          <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputStatus">Status</label>
                <select id="status" class="form-control">
                  <option selected>In progress</option>
                  <option>Done</option>
                  <option>Past due</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="inputPriority">Priority</label>
                <select id="priority" class="form-control">
                  <option selected>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              </div>
           <div class="form-group text-center">
              <label for="comment">Description</label>
              <textarea class="form-control" rows="10" id="description"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
            <button type="" onclick="updateProject(${id}, ${progress})" class="modal-button btn btn-primary">Update</button>
            </div>
            <div class="form-group col-md-6">
            <button type="" onclick="deleteProject(${id})" class="modal-button btn btn-primary">Delete</button>
            </div>
        </div>
          </form>
        <div class="modal-footer">
        </div>
      </div>
      </div>
      </div>
    `);
    var responsible = $("#responsible").val(data.responsible);
    var status = $("#status").val(data.status);
    var priority = $("#priority").val(data.priority);
    var description = $("#description").val(data.description);
   
    });  
};

function updateProject(id, progress){
    event.preventDefault();

    var responsible = $("#responsible").val();
    var status = $("#status").val();
    var priority = $("#priority").val();
    var description = $("#description").val();
    var deadline = $("#deadline").val();

    var dataTask = {
      responsible: responsible,
      status: status,
      priority: priority,
      description: description,
      deadline: deadline,
      progress: progress
    }; 

    var currentURL = window.location.origin;

    $.ajax({
      method: "PUT",
      url: currentURL + "/api/projects/" + id,
      data: dataTask
    })
      .then(function(data) {
        console.log("Update data " + data);
        displayResult();
      });
    
    
    location.reload();
};

function deleteProject(id){
 
  var currentURL = window.location.origin;

  $.ajax({
    method: "DELETE",
    url: currentURL + "/api/projects/" + id,
  })
    .then(function(data) {
      displayResult();
    });
}