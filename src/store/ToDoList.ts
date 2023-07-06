import {makeAutoObservable} from "mobx";
import {IToDo} from "../types/types";

class ToDoList {
    private _todos: IToDo[] = []

    constructor() {
        makeAutoObservable(this)
    }

    get todos() {
        return this._todos
    }

    addToDoItem(item: IToDo) {
        this._todos.unshift(item)
        this._todos = this._todos.sort((a,b) => {
            if (a.completed === b.completed) {
                if (a.date === b.date) {
                    return 0
                }
                if (new Date(a.date) > new Date(b.date)) {
                    return 1
                } else {
                    return -1
                }
            }
            if (b.completed) {
                return -1
            } else {
                return 1
            }
        })
        this.export()
    }

    removeToDoItem(item: IToDo) {
        this._todos = this.todos.filter(todo => todo.id !== item.id)
        this.export()
    }

    completeToDoItem(item: IToDo) {
        item.completed = !item.completed
        this._todos = this._todos.sort((a,b) => {
            if (a.completed === b.completed) {
                if (new Date(a.date) > new Date(b.date)) {
                    return 1
                } else {
                    return -1
                }
            }
            if (b.completed) {
                return -1
            } else {
                return 1
            }
        })
        this.export()
    }

    updateToDoItem(i: number ,item: IToDo) {
        this._todos[i] = item
        this.export()
    }

    removeLast() {
        this.todos.pop()
        this.export()
    }

    removeFirst() {
        this.todos.shift()
        this.export()
    }

    clearToDos() {
        this._todos = []
        this.export()
    }

    import() {
        const data = localStorage.getItem('todos')
        if (data) {
            this._todos = JSON.parse(data)
        }
    }

    export() {
        localStorage.setItem('todos', JSON.stringify(this._todos))
    }

}

export default new ToDoList()