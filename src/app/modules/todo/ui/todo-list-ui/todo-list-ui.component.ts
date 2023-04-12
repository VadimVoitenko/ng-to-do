import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../model/todo';

@Component({
  selector: 'app-todo-list-ui',
  templateUrl: './todo-list-ui.component.html',
  styleUrls: ['./todo-list-ui.component.scss'],
})
export class TodoListUiComponent {
  editIds: number[] = [];

  @Input()
  todoList: Todo[] = [];

  @Output()
  toggle = new EventEmitter<number>();

  @Output()
  edit = new EventEmitter<{ id: number; name: string }>();

  @Output()
  delete = new EventEmitter<number>();
  constructor() {}

  onEditMode(id: number) {
    this.editIds.push(id);
  }

  onToggle(id: number) {
    this.toggle.emit(id);
  }

  onEdit(name: string, id: number) {
    this.editIds = this.editIds.filter((item) => item !== id);
    this.edit.emit({ id, name });
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
