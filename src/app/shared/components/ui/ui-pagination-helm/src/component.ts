import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  HlmPaginationContentDirective,
  HlmPaginationDirective,
  HlmPaginationEllipsisComponent,
  HlmPaginationItemDirective,
  HlmPaginationLinkDirective,
  HlmPaginationNextComponent,
  HlmPaginationPreviousComponent,
} from '@spartan-ng/ui-pagination-helm';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule,
    HlmPaginationDirective,
    HlmPaginationContentDirective,
    HlmPaginationItemDirective,
    HlmPaginationPreviousComponent,
    HlmPaginationNextComponent,
    HlmPaginationLinkDirective,
    HlmPaginationEllipsisComponent,
  ],
  template: `
    <nav hlmPagination>
      <ul hlmPaginationContent>
        <li hlmPaginationItem *ngIf="currentPage > 1">
          <hlm-pagination-previous (click)="navigate(currentPage - 1)" />
        </li>
        <li hlmPaginationItem *ngFor="let page of visiblePages">
          <a hlmPaginationLink 
             [isActive]="page === currentPage" 
             (click)="navigate(page)">
            {{ page }}
          </a>
        </li>
        <li hlmPaginationItem *ngIf="totalPages > visiblePages[visiblePages.length - 1]">
          <hlm-pagination-ellipsis />
        </li>
        <li hlmPaginationItem *ngIf="currentPage < totalPages">
          <hlm-pagination-next (click)="navigate(currentPage + 1)" />
        </li>
      </ul>
    </nav>
  `,
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  get visiblePages(): number[] {
    const pages: number[] = [];
    const range = 2; // Number of pages to show before and after currentPage
    let start = Math.max(1, this.currentPage - range);
    let end = Math.min(this.totalPages, this.currentPage + range);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  navigate(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
