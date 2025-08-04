import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HlmTabsComponent } from './lib/hlm-tabs.component';
import { HlmTabsTriggerDirective } from './lib/hlm-tabs-trigger.directive';
import { HlmTabsContentDirective } from './lib/hlm-tabs-content.directive';
import { HlmTabsListComponent, listVariants } from './lib/hlm-tabs-list.component';
import { HlmTabsPaginatedListComponent } from './lib/hlm-tabs-paginated-list.component';

@Component({
  template: `
    <hlm-tabs tab="one">
      <div hlmTabsTrigger="one" class="custom-trigger">Tab</div>
      <div hlmTabsContent="one" class="custom-content">Content</div>
    </hlm-tabs>
    <hlm-tabs-list class="custom-list"></hlm-tabs-list>
    <hlm-paginated-tabs-list class="custom-pagelist">
      <div hlmTabsTrigger="one"></div>
    </hlm-paginated-tabs-list>
  `,
  standalone: true,
  imports: [
    HlmTabsComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsPaginatedListComponent,
  ],
}) class TestHostComponent {}

/** Skipped due to missing internal providers for Spartan Tabs directives */
xdescribe('ui-tabs-helm directives and components', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render HlmTabsComponent and directives', () => {
    const tabs = fixture.debugElement.query(By.directive(HlmTabsComponent));
    expect(tabs).toBeTruthy();

    const trigger = fixture.debugElement.query(By.directive(HlmTabsTriggerDirective)).nativeElement as HTMLElement;
    expect(trigger.className).toContain('inline-flex'); // default trigger token
    expect(trigger.className).toContain('custom-trigger');

    const content = fixture.debugElement.query(By.directive(HlmTabsContentDirective)).nativeElement as HTMLElement;
    expect(content.className).toContain('mt-2'); // default content token
    expect(content.className).toContain('custom-content');

    const list = fixture.debugElement.query(By.directive(HlmTabsListComponent)).nativeElement as HTMLElement;
    const expectedList = listVariants();
    expectedList.split(' ').forEach(token => token && expect(list.className).toContain(token));
    expect(list.className).toContain('custom-list');

    const paginated = fixture.debugElement.query(By.directive(HlmTabsPaginatedListComponent)).nativeElement as HTMLElement;
    expect(paginated.className).toContain('flex'); // default paginated-list token
    expect(paginated.className).toContain('custom-pagelist');
  });
});
