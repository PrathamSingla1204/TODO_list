tasks =[];
let tasksList = document.querySelector("#list");
let TaskInput = document.querySelector("#task");



function renderList(){
    tasksList.innerHTML = null;

    for(let i =0;i<tasks.length;i++)
    {
        addTaskToDOM(tasks[i]);

    }
 }


function addToList(task){
    if(task)
    {
        tasks.push(task);
        renderList();
        showNotification("Task Added");
        return;
    }
    showNotification("Cannot Add");
}




function addTaskToDOM(task){
    const li = document.createElement('li');
    li.innerHTML =`
          <label for="${task.id}">${task.title}</label>
          <input type="checkbox"  class = "togglekey" id="${task.id}" ${task.completed ? 'checked' : ''} >
          <button class="deletekey" data-id="${task.id}" ><i class="fa-solid fa-trash"></i>delete</button>
      `;
        tasksList.append(li);
        
}  


function deleteFromList(taskId){
    const newTasks = tasks.filter((task)=>{
        return task.id != taskId
    })

    tasks = newTasks;
    renderList();
    showNotification("Task Deleted Succesfully");

}



function toggleButton(taskId){
    const task = tasks.filter(function(task){
        return task.id == taskId
    });
    if(task.length>0){
        const currentTask = task[0];
        currentTask.completed = !currentTask.completed;
        renderList();
        showNotification("Task Toggled ");
        return;
    }
    showNotification("Can't Toggle");
}



function showNotification(message){
    alert(message);
}

function handClickListner(e){
   let target = e.target;
    if(target.className == 'addkey'){
        if(TaskInput.value == ''){
            alert("Type task to add");
            return;
          }
        let text = TaskInput.value;
         
        let task = {
            title :text,
            id:    Date.now(),
            completed:false,
        };
        TaskInput.value = null;
        addToList(task);
    }
  else if(target.className == 'deletekey'){
     const taskId = target.dataset.id;
     deleteFromList(taskId); 
     return;
  }
  else if(target.className == 'togglekey'){
    const taskId = target.id;
    toggleButton(taskId);
     return;
  }

}
function intializeApp(){
document.addEventListener('click',handClickListner);
}

intializeApp();
