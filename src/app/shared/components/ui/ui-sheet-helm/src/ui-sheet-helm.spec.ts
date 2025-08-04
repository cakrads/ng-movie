import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HlmSheetCloseDirective } from './lib/hlm-sheet-close.directive';
import { HlmSheetOverlayDirective } from './lib/hlm-sheet-overlay.directive';
import { HlmSheetComponent } from './lib/hlm-sheet.component';

@Component({
  template: `
    <button hlmSheetClose class="custom-close"></button>
    <brn-sheet-overlay hlm></brn-sheet-overlay>
    <hlm-sheet></hlm-sheet>
  `,
  standalone: true,
  imports: [HlmSheetCloseDirective, HlmSheetOverlayDirective, HlmSheetComponent],
}) class TestHostComponent {}

describe('ui-sheet-helm directives and component', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply HlmSheetClose directive and custom class', () => {
    const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLElement;
    expect(btn.className).toContain('custom-close');
    expect(btn.className).toContain('absolute'); // default class fragment
  });

  it('should apply HlmSheetOverlay directive', () => {
    const overlay = fixture.debugElement.query(By.css('brn-sheet-overlay')).nativeElement as HTMLElement;
    expect(overlay).toBeTruthy();
  });

});
