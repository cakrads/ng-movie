import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HlmCarouselComponent } from './hlm-carousel.component';
// Component imported above

@Component({
  template: `
    <hlm-carousel class="test-class" orientation="vertical" [options]="{ loop: true }"></hlm-carousel>
  `,
  standalone: true,
  imports: [HlmCarouselComponent],
})
class TestHostComponent {}

describe('HlmCarouselComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostEl: DebugElement;
  let comp: HlmCarouselComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    hostEl = fixture.debugElement.query(By.directive(HlmCarouselComponent));
    comp = hostEl.componentInstance;
  });

  it('should apply computed class including default and user class', () => {
    const classes = hostEl.nativeElement.className;
    expect(classes).toContain('relative');
    expect(classes).toContain('test-class');
  });

  it('emblaOptions should include axis y for vertical orientation and merge options', () => {
    const options = (comp as any).emblaOptions();
    expect(options.axis).toBe('y');
    expect(options.loop).toBe(true);
  });

  it('onEmblaEvent without emblaApi should not update scroll signals', () => {
    // initial signals are false
    expect(comp.canScrollPrev()).toBe(false);
    expect(comp.canScrollNext()).toBe(false);
    // call with no emblaApi
    comp['emblaCarousel'] = undefined;
    comp['onEmblaEvent']('select');
    expect(comp.canScrollPrev()).toBe(false);
    expect(comp.canScrollNext()).toBe(false);
  });

  it('onEmblaEvent should update canScroll signals based on emblaApi', () => {
    const mockApi = { canScrollPrev: () => true, canScrollNext: () => false };
    comp['emblaCarousel'] = { emblaApi: mockApi } as any;
    comp['onEmblaEvent']('init');
    expect(comp.canScrollPrev()).toBe(true);
    expect(comp.canScrollNext()).toBe(false);
  });

  it('scrollPrev and scrollNext methods call directive scroll methods', () => {
    const mockDir = { scrollPrev: jest.fn(), scrollNext: jest.fn() };
    comp['emblaCarousel'] = mockDir as any;
    comp.scrollPrev();
    expect(mockDir.scrollPrev).toHaveBeenCalled();
    comp.scrollNext();
    expect(mockDir.scrollNext).toHaveBeenCalled();
  });

  it('onKeydown ArrowLeft and ArrowRight call scroll methods and prevent default', () => {
    const mockDir = { scrollPrev: jest.fn(), scrollNext: jest.fn() };
    comp['emblaCarousel'] = mockDir as any;
    const evtLeft: any = { key: 'ArrowLeft', preventDefault: jest.fn() };
    comp['onKeydown'](evtLeft as KeyboardEvent);
    expect(evtLeft.preventDefault).toHaveBeenCalled();
    expect(mockDir.scrollPrev).toHaveBeenCalled();

    const evtRight: any = { key: 'ArrowRight', preventDefault: jest.fn() };
    comp['onKeydown'](evtRight as KeyboardEvent);
    expect(evtRight.preventDefault).toHaveBeenCalled();
    expect(mockDir.scrollNext).toHaveBeenCalled();
  });
});

