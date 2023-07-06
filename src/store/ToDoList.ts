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
        this.todos.unshift(item)
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
    }

    removeToDoItem(item: IToDo) {
        this._todos = this.todos.filter(todo => todo.id !== item.id)
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
    }

    updateToDoItem(i: number ,item: IToDo) {
        this._todos[i] = item
    }

    removeLast() {
        return this.todos.pop()
    }

    removeFirst() {
        return this.todos.shift()
    }

    clearToDos() {
        this._todos = []
    }

}

export default new ToDoList()