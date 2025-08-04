import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HlmDialogCloseDirective } from './lib/hlm-dialog-close.directive';
import { HlmDialogOverlayDirective } from './lib/hlm-dialog-overlay.directive';
import { HlmDialogContentComponent } from './lib/hlm-dialog-content.component';
import { HlmDialogHeaderComponent } from './lib/hlm-dialog-header.component';
import { HlmDialogFooterComponent } from './lib/hlm-dialog-footer.component';
import { HlmDialogDescriptionDirective } from './lib/hlm-dialog-description.directive';
import { HlmDialogTitleDirective } from './lib/hlm-dialog-title.directive';
import { HlmDialogComponent } from './lib/hlm-dialog.component';

@Component({
  template: `
xdescribe('ui-dialog-helm directives and components', () => {
describe.skip('ui-dialog-helm directives and components', () => {
    <button hlmDialogClose class="custom-close"></button>
    <hlm-dialog>
      <hlm-dialog-header class="custom-hdr"></hlm-dialog-header>
      <div hlmDialogDescription class="custom-desc"></div>
      <hlm-dialog-content class="custom-cont"></hlm-dialog-content>
      <hlm-dialog-footer class="custom-ftr"></hlm-dialog-footer>
      <div hlmDialogTitle class="custom-title"></div>
    </hlm-dialog>
  `,
  standalone: true,
  imports: [
    HlmDialogOverlayDirective,
    HlmDialogCloseDirective,
    HlmDialogComponent,
    HlmDialogHeaderComponent,
    HlmDialogContentComponent,
    HlmDialogFooterComponent,
    HlmDialogDescriptionDirective,
    HlmDialogTitleDirective,
  ],
}) class TestHostComponent {}

xdescribe('ui-dialog-helm directives and components', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render all dialog components and directives', () => {
    const overlay = fixture.debugElement.query(By.directive(HlmDialogOverlayDirective));
    const close = fixture.debugElement.query(By.directive(HlmDialogCloseDirective));
    const dlg = fixture.debugElement.query(By.directive(HlmDialogComponent));
    const hdr = fixture.debugElement.query(By.directive(HlmDialogHeaderComponent));
    const cont = fixture.debugElement.query(By.directive(HlmDialogContentComponent));
    const ftr = fixture.debugElement.query(By.directive(HlmDialogFooterComponent));
    const desc = fixture.debugElement.query(By.directive(HlmDialogDescriptionDirective));
    const title = fixture.debugElement.query(By.directive(HlmDialogTitleDirective));
    expect(overlay).toBeTruthy();
    expect(close).toBeTruthy();
    expect(dlg).toBeTruthy();
    expect(hdr).toBeTruthy();
    expect(cont).toBeTruthy();
    expect(ftr).toBeTruthy();
    expect(desc).toBeTruthy();
    expect(title).toBeTruthy();
  });
});
