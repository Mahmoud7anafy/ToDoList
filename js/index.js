//!  Html Elements 

let addBtn=document.querySelector('#newTask');
let modal=document.querySelector("#modal");
let statusInput=document.querySelector('#status');
let categoryInput=document.querySelector('#category');
let titleInput=document.querySelector('#title');
let descriptionInput=document.querySelector('#description')
let addTaskBtn=document.querySelector('#addBtn');
let updateBtn=document.querySelector('#updateBtn');
let root=document.querySelector(':root');
let mode=document.querySelector('#mode');
let gridBtn=document.querySelector('#gridBtn');
let barsBtn=document.querySelector('#barsBtn');
let sec=document.querySelectorAll('section');
let tasksContainer = document.querySelectorAll(".tasks");

let nextUpCount=document.querySelector('#nextUpCount')
let inProgressCount=document.querySelector('#inProgressCount')
let doneCount =document.querySelector('#doneCount')
let containers=
{
    nextUp :document.querySelector('#nextUp'),
    inProgress :document.querySelector('#inProgress'),
    done :document.querySelector('#done')
}


//! App Variables 
let tasksArry=JSON.parse(localStorage.getItem('tasks')) || []
let updatedIndex=0;

let titleRegex=/^[a-z]{3,}$/;
let descRegex=/^[a-z]{20,100}$/;
for(var i=0;i<tasksArry.length;i++)
{
    DisplayTask(i)
}

resetCounter()





// * Functions 

function ShowModal()
{
    modal.classList.replace('d-none','d-flex')
    document.body.style.overflow='hidden'
    scroll(0,0)
}

function hideModal()
{
    modal.classList.replace('d-flex','d-none')
    document.body.style.overflow='visible'
    ClearForm();
}

function addTask()
{

    if(validation(titleRegex,titleInput) &&validation(descRegex,descriptionInput))
    {
        var task=
        {
            staus:statusInput.value,
            category:categoryInput.value,
            title:titleInput.value,
            description:descriptionInput.value
        }
        tasksArry.push(task);
        localStorage.setItem('tasks' ,JSON.stringify(tasksArry))
        DisplayTask(tasksArry.length-1)
        
        counter(containers[tasksArry[tasksArry.length-1].staus].id)
        ClearForm()
        hideModal()
    }
   
}
function counter(containerStatus)
{
    switch(containerStatus)
    {
        case 'nextUp':
            nextUpCount.innerHTML++;
        break;

        case 'inProgress':
            inProgressCount.innerHTML++;
            break;
        case 'done' :
            doneCount.innerHTML++;
            break;
    }
}


function resetCounter()
{
    let nextUpCounter=0
    let inProgressCounter=0;
    let doneCounter=0
      for(var i=0;i<tasksArry.length;i++)
      {

        tasksArry[i].staus=='nextUp'?nextUpCounter+=1:tasksArry[i].staus=='inProgress'?inProgressCounter+=1:doneCounter+=1
        
      }
      nextUpCount.innerHTML=nextUpCounter;
      inProgressCount.innerHTML=inProgressCounter
      doneCount.innerHTML=doneCounter 
}



function DisplayTask(index)
{
 let taskHtml=`<div class="task">
 <h3 class="text-capitalize">${tasksArry[index].title}</h3>
 <p class="description text-capitalize">task ${tasksArry[index].description}</p>
 <h4 class="category ${tasksArry[index].category} text-capitalize">${tasksArry[index].category}</h4>
 <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
   <li><i class="bi bi-pencil-square"  onclick="getTaskInfo(${index})"></i></li>
   <li><i class="bi bi-trash-fill" onclick="deleteTask(${index})" ></i></li>
   <li><i class="bi bi-palette-fill" onclick="changeColor(event)"></i></li>
 </ul>
</div>`
  
  containers[tasksArry[index].staus].querySelector(".tasks").innerHTML +=taskHtml 
}




function ClearForm()
{
    statusInput.value='nextUp';
    categoryInput.value='education';
    titleInput.value='';
    descriptionInput.value='';
}


function generateColor()
{
    let colorChar=[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
    let color="#";
    for(var i=1;i<=6;i++)
    {
        let random=Math.trunc(Math.random() * colorChar.length);
       
         color+=colorChar[random];

    }
    return color +"22";
}
function changeColor(event)
{
    let bgColor=generateColor();
    event.target.parentElement.parentElement.parentElement.style.backgroundColor=`${bgColor}`
    // event.target.closest('.task').style.backgroundColor=`${bgColor}`
}

function deleteTask(index)
{
    emptyContainers();
    tasksArry.splice(index,1);
    localStorage.setItem('tasks' ,JSON.stringify(tasksArry));
    for(var i=0;i<tasksArry.length;i++)
{
    DisplayTask(i)
}
}

function emptyContainers()
{
    for(item in containers)
    {
        containers[item].querySelector('.tasks').innerHTML=''
    }
}


function getTaskInfo(index)
{
 ShowModal();
 statusInput.value=tasksArry[index].staus;
 categoryInput.value=tasksArry[index].category;
 titleInput.value=tasksArry[index].title;
 descriptionInput.value=tasksArry[index].description;

 addTaskBtn.classList.add('d-none');
updateBtn.classList.replace('d-none','d-block')
updatedIndex=index

}


function updateTask()
{

   tasksArry[updatedIndex].staus=statusInput.value;
   tasksArry[updatedIndex].category=categoryInput.value;
   tasksArry[updatedIndex].title=titleInput.value;
   tasksArry[updatedIndex].description=descriptionInput.value;
   localStorage.setItem('tasks' ,JSON.stringify(tasksArry))
   emptyContainers();
   for(var i=0;i<tasksArry.length;i++)
{
    DisplayTask(i)
}
hideModal();
ClearForm();
addTaskBtn.classList.remove('d-none');
updateBtn.classList.replace('d-block','d-none');
}

function changeMode()
{
    if(mode.classList.contains('bi-brightness-high-fill'))
    {
        root.style.setProperty("--main-black","#fff");
        root.style.setProperty("--sec-black","#eee");
        mode.classList.replace('bi-brightness-high-fill','bi-moon-stars-fill')
    }
    else
    {
        root.style.setProperty("--main-black","#0d1117");
        root.style.setProperty("--sec-black","#161b22");
        mode.classList.replace('bi-moon-stars-fill','bi-brightness-high-fill')
    }
 
}


function validation(regex,element)
{
    if(regex.test(element.value))
    {
       element.classList.add('is-valid')
       element.classList.remove('is-invalid')
       element.parentElement.nextElementSibling.classList.add('d-none')
      
        return true;
    }
    else
    {
        element.classList.remove('is-valid')
        element.classList.add('is-invalid')
        element.parentElement.nextElementSibling.classList.remove('d-none')
        return false;
    }
}

function changeView()
{
    gridBtn.classList.remove('active')
    barsBtn.classList.add('active')
    for(var i=0 ;i<sec.length;i++)
    {
        sec[i].classList.remove('col-md-6','col-lg-4')
        sec[i].style.overflow='auto'
    }
   
    for(var j=0;j<=tasksContainer.length;j++)
    {
        tasksContainer[j].setAttribute("data-view","bars");
    }

}



//? Events 
addBtn.addEventListener('click',function()
{

    ShowModal()
})

document.addEventListener('keydown',function(e)
{
   if(e.key=='Escape')
   {
    hideModal()
    addTaskBtn.classList.remove('d-none');
     updateBtn.classList.replace('d-block','d-none');
   }
})

document.addEventListener('click',function(e)
{   
   if(e.target.id=='modal')
   {
    hideModal()
    addTaskBtn.classList.remove('d-none');
     updateBtn.classList.replace('d-block','d-none');
   }
})

addTaskBtn.addEventListener('click',function(){
    
    addTask();
   
    
})
updateBtn.addEventListener('click',function(){
    updateTask()
})
mode.addEventListener('click',changeMode)

titleInput.addEventListener('input',function()
{
    validation(titleRegex,titleInput)
})
descriptionInput.addEventListener('input',function()
{
    validation(descRegex,descriptionInput)
})


barsBtn.addEventListener('click',function(){
    changeView()
})
gridBtn.addEventListener('click',function()
{
    window.location.reload();
})