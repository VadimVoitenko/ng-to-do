import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import {
  TodoCreateAction,
  TodoDeleteAction,
  TodoEditAction,
  TodoToggleAction,
} from '../../store/todo/todo.actions';
import { todoListSelector } from '../../store/todo/todo.selectors';
import { Observable } from 'rxjs';
import { TodoSyncStorageService } from '../../service/todo-sync-storage.service';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.scss'],
})
export class TodoWidgetComponent implements OnInit {
  todoList$: Observable<any> = this.store$.pipe(select(todoListSelector));

  constructor(
    private store$: Store<TodoState>,
    private todoSyncStorage: TodoSyncStorageService
  ) {}

  ngOnInit() {
    this.todoSyncStorage.init();
  }

  onCreate(name: string) {
    this.store$.dispatch(new TodoCreateAction({ name }));
  }

  onDelete(id: number) {
    this.store$.dispatch(new TodoDeleteAction({ id }));
  }

  onToggle(id: number) {
    this.store$.dispatch(new TodoToggleAction({ id }));
  }

  onEdit({ id, name }: { id: number; name: string }) {
    this.store$.dispatch(new TodoEditAction({ id, name }));
  }
}
