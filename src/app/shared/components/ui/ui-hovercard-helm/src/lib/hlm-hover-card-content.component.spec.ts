import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { HlmHoverCardContentComponent } from './hlm-hover-card-content.component';
import { By } from '@angular/platform-browser';
import { provideExposesStateProvider, provideExposedSideProvider } from '@spartan-ng/brain/core';

describe('HlmHoverCardContentComponent', () => {
  let fixture: ComponentFixture<HlmHoverCardContentComponent>;
  let component: HlmHoverCardContentComponent;
  let hostEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HlmHoverCardContentComponent]
    })
    // Provide exposed state and side at component host level
    .overrideComponent(HlmHoverCardContentComponent, {
      add: {
        providers: [
          provideExposesStateProvider({ state: signal<'closed' | 'open'>('closed').asReadonly() }),
          provideExposedSideProvider({ side: signal<'bottom' | 'top' | 'left' | 'right'>('bottom').asReadonly() })
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(HlmHoverCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // The component host element is the fixture's nativeElement
    hostEl = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set default data-state attribute to "closed"', () => {
    expect(hostEl.getAttribute('data-state')).toBe('closed');
  });

  it('should set default data-side attribute to "bottom"', () => {
    expect(hostEl.getAttribute('data-side')).toBe('bottom');
  });

  it('should reflect userClass input in class list via host template', async () => {
    // Use a host component to bind the class input
    @Component({
      selector: 'hlm-host',
      standalone: true,
      imports: [HlmHoverCardContentComponent],
      template: `<hlm-hover-card-content [class]="customClass">Content</hlm-hover-card-content>`
    })
    class HostComponent {
      customClass = 'my-custom';
    }

    // Reconfigure TestBed for host component with providers override
    await TestBed.resetTestingModule()
      .configureTestingModule({ imports: [HostComponent] })
      .overrideComponent(HlmHoverCardContentComponent, {
        add: {
          providers: [
            provideExposesStateProvider({ state: signal<'closed' | 'open'>('closed').asReadonly() }),
            provideExposedSideProvider({ side: signal<'bottom' | 'top' | 'left' | 'right'>('bottom').asReadonly() })
          ]
        }
      })
      .compileComponents();

    const hostFixture = TestBed.createComponent(HostComponent);
    hostFixture.detectChanges();
    const contentEl = hostFixture.debugElement.query(By.css('hlm-hover-card-content')).nativeElement as HTMLElement;
    expect(contentEl.classList).toContain('my-custom');
  });
});
