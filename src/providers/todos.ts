import { Injectable } from '@angular/core';
import { Database } from '@ionic/cloud-angular';
import {Auth, User} from '@ionic/cloud-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class Todos {

    // Todos interaction
    private todosQueryTemplate: any;
    public subscribeTodo: any;
    public subscribeTodos: any;
    public todoDB: any;

    // Todo data    
    public todo: {assigned?: any, status: string,  priority: string, todo_id?: string, id: string, name: string, description: string, comments: Array<any>, dueDate?: string}  
    public todos: Array<any>;
    public comments: Array<any>;    

    // Lists watch/unsub
    public sharedSub: any;    

    constructor(private db: Database, private auth: Auth, private user: User) {
        this.db = db;
        this.auth = auth;
        this.user = user;
        this.todos = [];

        this.todoDB = this.db.collection('todos');

        this.todosQueryTemplate = this.db.model( (listID, completed) => {
            return {
                todos: this.todoDB.findAll({listID: listID, completed: completed})                
            }
        });  
    }

    createTodo(todo) {
        this.todoDB.store(todo);
    }

    todoDetails(todo) {
        console.log('called');
        this.todo = todo;
        if (!this.todo.comments) {
            this.todo.comments = [];
        }
        this.subscribeTodo = this.todoDB.find(todo.id).watch()
                             .subscribe( (todo) => {
                                 if (!todo.comments) {
                                    todo.comments = [];
                                 }
                                 this.todo = todo;
                             });
    }

    deleteTodoProp(todo) {
        this.todoDB.replace(todo);
    }

    getTodos(listID, completed) {
        this.subscribeTodos = this.todosQueryTemplate(listID, completed).watch().subscribe( (queryResults) => {
            this.todos = queryResults.todos;
            console.log(this.todos);
        })
    }

    updateTodo() {
        this.todoDB.update(this.todo);
    }

    todoUnsub() {
        this.subscribeTodo.unsubscribe();
    }

    todosUnsub() {
        this.subscribeTodos.unsubscribe();
    }
}