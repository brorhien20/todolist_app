const createTodoInputSubmit = document.querySelector('[data-dom=createTodoInputSubmit]')
const createTodoInputBox = document.querySelector('[data-dom=createTodoInputBox]')
const todolist = document.querySelector('[data-dom=todolist]')

const store = {
    todos: {
        '_id1100': { value: 'Wash some stuffs', isDone: false }
    },
    isEditing: null
}

render()

const generateId = () => {
    return '_id'.concat(Math.round(Math.random() * new Date().getTime()))
}

function render() {
    const { todos } = store
    const alreadyAddedtodos = Array
        .from(todolist.children)
        .map(child => child.getAttribute('data-dom-todoId'))


    for (const key of Object.keys(todos)) {
        if (alreadyAddedtodos.includes(key)) continue
        const { value, isDone } = todos[key]
        todolist.innerHTML = `<li class='${isDone ? 'done' : ''}' data-dom-todoID=${key} >
        <span data-dom='todoItem'>${value}</span>
        <button data-dom='deleteTodoItem'>Delete</button>
        <button data-dom='updateTodoItem'>Update</button>
        </li>` + todolist.innerHTML
    }
}

createTodoInputSubmit.addEventListener('click', (event) => {
    event.stopPropagation()
    const { value } = createTodoInputBox;
    const { todos, isEditing } = store
    if (value) {
        if (isEditing === null) {
            todos[generateId()] = { value, isDone: false }
            createTodoInputBox.value = ""
            render()
        } else {
            const { isDone } = todos[isEditing] || false
            todos[isEditing] = { value, isDone }
            document.querySelector(`[data-dom-todoId=${isEditing}]`).remove()
            createTodoInputBox.value = ''
            store.isEditing = null
            render()
        }
    }

})
 

todolist.addEventListener('click', event => {
    event.stopPropagation()
    const parent = event.target.parentElement
    const id = parent.getAttribute('data-dom-todoId')
    const { todos } = store
    if (event.target.getAttribute('data-dom') === 'deleteTodoItem') {
        parent.remove()
        delete todos[id]
    }
    if (event.target.getAttribute('data-dom') === 'updateTodoItem') {
        createTodoInputBox.value = todos[id] ? todos[id].value : parent.children[0].innerText
        store.isEditing = id
    }
    if (event.target.getAttribute('data-dom') === 'todoItem') {
        parent.classList.toggle('done')
        if (todos[id]) todos[id] = {value: todos[id].value, isDone: !todos[id].isDone} 
    }
})
