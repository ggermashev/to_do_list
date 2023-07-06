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
        this.sort()
        this.export()
    }

    removeToDoItem(item: IToDo) {
        this._todos = this.todos.filter(todo => todo.id !== item.id)
        this.export()
    }

    completeToDoItem(item: IToDo) {
        item.completed = !item.completed
        this.sort()
        this.export()
    }

    updateToDoItem(i: number, data: {title: string, description:string, date: string}) {
        Object.assign(this._todos[i], data)
        this.sort()
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

    sort() {
        this._todos = this._todos.sort((a, b) => {
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
    }

    import() {
        const data = localStorage.getItem('todos')
        if (data) {
            try {
                this._todos = JSON.parse(data)
            } catch (e) {
                this._todos = []
            }
        }
    }

    export() {
        localStorage.setItem('todos', JSON.stringify(this._todos))
    }

}

export default new ToDoList()