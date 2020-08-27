//Selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const dark=document.querySelector('.todo-but');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector('.filter-todo');
const darks=document.querySelector('.fa-sun');
const todobut=document.querySelector('.todo-but');
const todobutt=document.querySelector('.todo-button');
//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click",addTodo);
dark.addEventListener("click",darkmode);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);
//Functions
function darkmode(e){
	event.preventDefault();
	
	if(document.body.style.background==="rgb(44, 44, 46)"){
		document.body.style.background="linear-gradient(-90deg ,rgb(72, 58, 138),rgb(74, 82, 138))";
		todoInput.style.background="white";
		darks.className='far fa-sun';
		todobut.style.color="rgb(176, 92, 32)";
		todobut.style.background="white";
		todobutt.style.color="rgb(176, 92, 32)";
		todobutt.style.background="white";
		todoInput.style.color="black";
		filterOption.style.background="white";
	}
	else{
		document.body.style.background="rgb(44, 44, 46)";
		darks.className='fas fa-moon';
		todobut.style.color="rgb(176, 92, 32)";
		todobut.style.background="rgb(84,84,84)";
		todobutt.style.color="rgb(176, 92, 32)";
		todobutt.style.background="rgb(84,84,84)";
		todoInput.style.background="rgb(84,84,84)";
		todoInput.style.color="white";
		filterOption.style.background="rgb(84,84,84)";
	}
}


function addTodo(event){
    //Prevent form from submitting
	event.preventDefault();
	//Todo Div
	const todoDiv=document.createElement("div");
	todoDiv.classList.add("todo");
	//Create Li
	const newTodo=document.createElement("li");
	newTodo.innerText=todoInput.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	//Add local storage
	saveLocalTodos(todoInput.value);
	//check mark button
	const completedButton = document.createElement("button");
	completedButton.innerHTML='<i class="fas fa-check"></i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);
	//check trash button
	const trashButton = document.createElement("button");
	trashButton.innerHTML='<i class="fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);
	//append to list
	todoList.appendChild(todoDiv);
	//
	todoInput.value="";
}
function deleteCheck(e){
const item=e.target;
//delete todo
if(item.classList[0]==='trash-btn'){
	const todo=item.parentElement;
	todo.classList.add("fall");
	removeLocalTodos(todo);
	todo.addEventListener("transitionend", function(){
		todo.remove();
	});
}
else if(item.classList[0]==='complete-btn'){
    const todo=item.parentElement;
    todo.classList.toggle("completed");
    //completeLocalTodos(todo);
}
}

function filterTodo(e){
	var todos=todoList.childNodes;
	todos.forEach(todo=>{
		if(todo!=todos[0]){
			switch(e.target.value){
			case "all":
			  todo.style.display="flex";
			  break;
			case "completed":
			   if(todo.classList.contains("completed")){
				  todo.style.display="flex";
			    }
			    else{
				  todo.style.display="none";
			    }
			   break;
			case "uncompleted":
			if(!todo.classList.contains("completed")){
                  todo.style.display="flex";
			}
			else{
				todo.style.display="none";
			}
			break;
		}
		}
		
	});
}

function saveLocalTodos(todo){
	let todos;
	if(localStorage.getItem("todos")===null){
		todos=[];
	}
	else{
		todos=JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
	let todos;
	if(localStorage.getItem("todos")===null){
		todos=[];
	}
	else{
		todos=JSON.parse(localStorage.getItem("todos"));
	}

	todos.forEach(function(todo){
		
		const todoDiv=document.createElement("div");
	todoDiv.classList.add("todo");
	//Create Li
	const newTodo=document.createElement("li");
	newTodo.innerText=todo;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	//check mark button
	const completedButton = document.createElement("button");
	completedButton.innerHTML='<i class="fas fa-check"></i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);
	//check trash button
	const trashButton = document.createElement("button");
	trashButton.innerHTML='<i class="fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);
	//append to list
	todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo){
	let todos;
	if(localStorage.getItem("todos")===null){
		todos=[];
	}
	else{
		todos=JSON.parse(localStorage.getItem("todos"));
	}
	const todoIndex=todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex),1);
	localStorage.setItem("todos",JSON.stringify(todos));

}

/*function completeLocalTodos(todo){
    let todos;
	if(localStorage.getItem("todos")===null){
		todos=[];
	}
	else{
		todos=JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos",JSON.stringify(todos));
}*/