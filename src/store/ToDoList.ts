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
    }

    removeToDoItem(item: IToDo) {
        this._todos = this.todos.filter(todo => todo.id !== item.id)
    }

    completeToDoItem(item: IToDo) {
        item.completed = !item.completed
        this._todos = this._todos.sort((a,b) => {
            if (b.completed) {
                if (!a.completed) {
                    return -1
                } else {
                    return 0
                }
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