import { } from '@angular/core/testing';
import { PaginationComponent } from './component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;

  beforeEach(() => {
    component = new PaginationComponent();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('visiblePages generates correct range', () => {
    component.totalPages = 5;
    component.currentPage = 3;
    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5]);
  });

  it('navigate emits pageChange event', () => {
    let emitted: number | undefined;
    component.pageChange.subscribe((page) => (emitted = page));
    component.currentPage = 2;
    component.totalPages = 5;
    component.navigate(4);
    expect(emitted).toBe(4);
  });
});
