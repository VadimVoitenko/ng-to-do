import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoState } from '../store/todo/todo.reducer';
import { todoFeatureSelector } from '../store/todo/todo.selectors';
import { filter } from 'rxjs';
import { TodoLoadStateAction } from '../store/todo/todo.actions';

export const TODO_LOCAL_STORAGE_KEY = 'todo';

@Injectable({
  providedIn: 'root',
})
export class TodoSyncStorageService {
  private isInit = false;

  constructor(private store$: Store<TodoState>) {}

  init() {
    if (this.isInit) {
      return;
    }
    this.isInit = true;
    this.loadFromStorage();

    this.store$
      .pipe(
        select(todoFeatureSelector),
        filter((state) => !!state)
      )
      .subscribe((state) => {
        localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(state));
      });

    window.addEventListener('storage', () => {
      this.loadFromStorage();
    });
  }

  private loadFromStorage() {
    const storageState = localStorage.getItem(TODO_LOCAL_STORAGE_KEY);
    if (storageState) {
      this.store$.dispatch(
        new TodoLoadStateAction({
          state: JSON.parse(storageState),
        })
      );
    }
  }
}
