import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingStack = signal<string[]>([]);

  // Computed value to check if anything is loading
  isLoading = computed(() => this.loadingStack().length > 0);

  // Get the current loading message
  currentMessage = computed(() => {
    const stack = this.loadingStack();
    return stack.length > 0 ? stack[stack.length - 1] : '';
  });

  // Start loading with an optional message
  start(message: string = 'Loading...') {
    this.loadingStack.update(stack => [...stack, message]);
  }

  // End the most recent loading state
  end() {
    this.loadingStack.update(stack => stack.slice(0, -1));
  }

  // Clear all loading states
  clear() {
    this.loadingStack.set([]);
  }
}
