const store = [

]

const app = document.querySelector('#app')

const createTodo = () => {
    if (inputElemText.value.length > 0) { 
        const FilteredTodos = store.filter(todo => todo.title === inputElemText.value)
        if (FilteredTodos.length === 0){
            store.push({
                title: inputElemText.value,
                isDone: false
            })
        }
    }
    const todoList = BuildElement('div', [createList(store)],'showTodo')
    const mainWrapper = BuildElement('div', [createTodoWrapper,todoList])
    app.appendChild(mainWrapper)
}

const BuildElement = (element, children=[], className, style) => {
    const newElement = document.createElement(element)
    if (className) newElement.classList.add(className)
    if (style) newElement.style = style
    if (children.length > 0) children.forEach(child => newElement.appendChild(child))
    return newElement
}

const createInput = (type='text', value='',className, style) => {
    const input = document.createElement('input')
    if (className) input.classList.add(className)
    if (style) input.style = style
    input.type = type
    input.value = type === 'submit' && !value ? type : value
    return input
}

const createList = (list=[]) => {
    const ul = document.createElement('ul')
    list.forEach(el => {
        const li = document.createElement('li')
        li.innerText = el.title
        ul.appendChild(li)
    })
    return ul
}

const inputElemText = createInput()
const inputElemSubmit = createInput('submit','Add Todo')
inputElemSubmit.addEventListener('click', createTodo)

const createTodoWrapper = BuildElement('div', [inputElemText, inputElemSubmit],'createTodo')
const todoList = BuildElement('div', [createList(store)],'showTodo')

const mainWrapper = BuildElement('div', [createTodoWrapper,todoList])

app.appendChild(mainWrapper)

console.log(app)