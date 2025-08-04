import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { HlmIconDirective } from './hlm-icon.directive';

@Component({
  selector: 'hlm-mock',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmIconDirective, NgIcon],
  providers: [provideIcons({ lucideCheck })],
  template: `<ng-icon hlm class="test" name="lucideCheck" [size]="size" color="red" strokeWidth="2"></ng-icon>`,
})
class HlmMockComponent {
  @Input() public size = 'base';
}

describe('HlmIconDirective', () => {
  let fixture: ComponentFixture<HlmMockComponent>;
  let component: HlmMockComponent;
  let iconEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HlmMockComponent] })
      // switch mock to default CD so host bindings update on detectChanges
      .overrideComponent(HlmMockComponent, { set: { changeDetection: ChangeDetectionStrategy.Default } })
      .compileComponents();
    fixture = TestBed.createComponent(HlmMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    iconEl = fixture.debugElement.query(By.css('ng-icon')).nativeElement;
  });

  it('should apply xs size', () => {
    component.size = 'xs';
    fixture.detectChanges();
    expect(iconEl.style.getPropertyValue('--ng-icon__size')).toBe('12px');
  });

  it('should apply sm size', () => {
  component.size = 'sm';
  fixture.detectChanges();
  expect(iconEl.style.getPropertyValue('--ng-icon__size')).toBe('16px');
  });

  it('should apply base size by default', () => {
  expect(iconEl.style.getPropertyValue('--ng-icon__size')).toBe('24px');
  });

  it('should apply lg size', () => {
  component.size = 'lg';
  fixture.detectChanges();
  expect(iconEl.style.getPropertyValue('--ng-icon__size')).toBe('32px');
  });

  it('should apply xl size', () => {
  component.size = 'xl';
  fixture.detectChanges();
  expect(iconEl.style.getPropertyValue('--ng-icon__size')).toBe('48px');
  });

  it('should apply custom size when not predefined', () => {
  component.size = '2rem';
  fixture.detectChanges();
  expect(iconEl.style.getPropertyValue('--ng-icon__size')).toBe('2rem');
  });
});
