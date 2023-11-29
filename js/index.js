// UTILS 
const getElement = (element, parentElement = document) =>
  parentElement.querySelector(element);

//  VARIABLES
const API = "https://todos-server-acsu.onrender.com/todos/"
const elList = getElement(".todo__list");
const elTemplate = getElement(".template").content;
const elForm = getElement(".add-todo");
const elAddInput = getElement(".add-todo__input");
let randomId =  Math.floor(Math.random() * 1000000)


// ! RENDERING THE TODO LIST 
function renderTodo(data) {
	elList.innerHTML = null;
	const fragment = document.createDocumentFragment();
  
	data.forEach((item) => {
	  const template = elTemplate.cloneNode(true);
	  getElement(".todo__item", template).id = item.id;
	  getElement('.todo__item',template).setAttribute('data-id', item.id)
	  getElement(".todo__text", template).textContent = item.todo_body;
	  getElement(".todo__checkbox", template).checked = item.is_done;
	  getElement(".todo__checkbox", template).setAttribute('data-id' , item.id )
  
	  fragment.append(template);
	});
	elList.append(fragment);
  }


// ! ASYNCHRONOUS FUNCTIONs

async function getRequest() {
	const response = await fetch(API)
	const data = await response.json()
	if(!response.ok) console.error('there is a bug in getting response!');
	else if( data.length < 0) emptyFn() 
	else renderTodo(data)
}
getRequest()

// ! create todo

async function postRequest(id,todo_body,isDone) {
	const response = await fetch(API,{
		method:'POST',
		headers: {
			"content-type": "application/json",
		  },
		body: JSON.stringify({
			id:id,
			todo_body: todo_body,
			is_done: isDone,
		})
	})
	const data = await response.json()
	if(!response.ok) console.error('there is a bug in getting response!');
	getRequest()
}

// ! delete todo

async function deleteRequest(id) {
	const response = await fetch(`${API}${id}`,{
		method: 'DELETE',
		headers: {
			"content-type": "application/json",
		  },
	})
	getRequest()
}

// ! edit todo

async function editRequest(id,isDone) {
	const response = await fetch(`${API}${id}`, {
		method:'PATCH',
		headers:{
			'Content-Type':'application/json'
		},
		body: JSON.stringify({
			is_done: isDone
		})
	})
	const data = await response.json()
	console.log(data);
	getRequest()
}

 // if there is no todos  have left , this function will be used 
function emptyFn() {
  elList.innerHTML =
    '<p style="text-align: center; font-size: 20px; font-weight: bold; color: darkcyan;">add some todo tasks </p>';
}



// ! adding new todo 
elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (elAddInput.value !== "") {
	postRequest(randomId,elAddInput.value.trim(),false)
    } 
  else alert("write tasks correctly!");
  e.target.reset()
});


// !edit event 
elList.addEventListener('click' , (e) => {
	if (e.target.matches('.todo__checkbox')) {
		const currentCheckbox = e.target.checked		
		const currentListId = e.target.closest('.todo__item').dataset.id
		if (currentCheckbox == true) {
			editRequest(currentListId,currentCheckbox)
		}else{
			editRequest(currentListId,false)
		}
	}
})

// ! deleting event 
elList.addEventListener('click' , (e) => {
	if (e.target.matches('.todo__btn')) {
		const currentId = e.target.closest('.todo__item').dataset.id
		deleteRequest(currentId)
	}
})

