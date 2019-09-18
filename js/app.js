                                                                   
var taskInput = document.getElementById("new-task");                      
var addButton = document.getElementsByTagName("button")[0];               
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); 
var completedTasksHolder = document.getElementById("completed-tasks");    

var createNewTaskElement = function(taskString) {       
  var listItem = document.createElement("li");     
  var checkBox = document.createElement("input");     
  var label = document.createElement("label");         
  var editInput = document.createElement("input");     
  var editButton = document.createElement("button");   
  var deleteButton = document.createElement("button");  

  checkBox.type = "checkbox";        
  editInput.type = "text";           
  editButton.innerText = "Edit";      
  editButton.className = "edit";      
  deleteButton.innerText = "Delete";  
  deleteButton.className = "delete";  
  label.innerText = taskString;       

  listItem.appendChild(checkBox);      
  listItem.appendChild(label);        
  listItem.appendChild(editInput);   
  listItem.appendChild(editButton);   
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function() {                           
  var listItemName = taskInput.value || "New Item";  
  var listItem = createNewTaskElement(listItemName); 
  incompleteTasksHolder.appendChild(listItem);        
  bindTaskEvents(listItem, taskCompleted);         
  taskInput.value = "";                               
};

var editTask = function() {                                     
  var listItem = this.parentNode;                              
  var editInput = listItem.querySelector("input[type=text");    
  var label = listItem.querySelector("label");                 
  var button = listItem.getElementsByTagName("button")[0];     

  var containsClass = listItem.classList.contains("editMode");  
  if(containsClass) {                                           
      label.innerText = editInput.value;                        
      button.innerText = "Edit";                                
  } else {                                                    
     editInput.value = label.innerText;                         
     button.innerText = "Save";                                e
  }
    listItem.classList.toggle("editMode");                    
};

var deleteTask = function() {      
  var listItem = this.parentNode;  
  var ul = listItem.parentNode;    
  ul.removeChild(listItem);        
};

var taskCompleted = function() {    
  var listItem = this.parentNode;             
  completedTasksHolder.appendChild(listItem); 
  bindTaskEvents(listItem, taskIncomplete);    
};

var taskIncomplete = function() {               
  var listItem = this.parentNode;           
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);     
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {   
  var checkBox = taskListItem.querySelector("input[type=checkbox]");  
  var editButton = taskListItem.querySelector("button.edit");        
  var deleteButton = taskListItem.querySelector("button.delete"); 
  editButton.onclick = editTask;                                
  deleteButton.onclick = deleteTask;                                
  checkBox.onchange = checkBoxEventHandler;                          
};

var ajaxRequest = function() {
  console.log("AJAX request");
};

addButton.addEventListener("click", addTask);      // Adds event listener for the click handler to the addTask function
addButton.addEventListener("click", ajaxRequest);  // Adds an event listener for AJAX

for(var i = 0; i < incompleteTasksHolder.children.length; i++) {     // Cycle over incompleteTasksHolder ul list items
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);  // Bind events to list item's children (taskCompleted)
}

for(var i = 0; i < completedTasksHolder.children.length; i++) {      // Cycle over completedTasksHolder ul list items
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);   // Bind events to list item's children (taskIncomplete)
}