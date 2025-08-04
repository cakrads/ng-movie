import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HlmBlockquoteDirective, hlmBlockquote } from './lib/hlm-blockquote.directive';
import { HlmCodeDirective, hlmCode } from './lib/hlm-code.directive';
import { HlmH1Directive, hlmH1 } from './lib/hlm-h1.directive';
import { HlmH2Directive, hlmH2 } from './lib/hlm-h2.directive';
import { HlmH3Directive, hlmH3 } from './lib/hlm-h3.directive';
import { HlmH4Directive, hlmH4 } from './lib/hlm-h4.directive';
import { HlmLargeDirective, hlmLarge } from './lib/hlm-large.directive';
import { HlmLeadDirective, hlmLead } from './lib/hlm-lead.directive';
import { HlmMutedDirective, hlmMuted } from './lib/hlm-muted.directive';
import { HlmPDirective, hlmP } from './lib/hlm-p.directive';
import { HlmSmallDirective, hlmSmall } from './lib/hlm-small.directive';
import { HlmUlDirective, hlmUl } from './lib/hlm-ul.directive';

@Component({
  template: `
    <blockquote hlmBlockquote class="custom1"></blockquote>
    <code hlmCode class="custom2"></code>
    <h1 hlmH1 class="custom3"></h1>
    <h2 hlmH2 class="custom4"></h2>
    <h3 hlmH3 class="custom5"></h3>
    <h4 hlmH4 class="custom6"></h4>
    <p hlmP class="custom7"></p>
    <small hlmSmall class="custom8"></small>
    <ul hlmUl class="custom9"></ul>
    <div hlmLarge class="custom10"></div>
    <div hlmLead class="custom11"></div>
    <div hlmMuted class="custom12"></div>
  `,
  standalone: true,
  imports: [
    HlmBlockquoteDirective,
    HlmCodeDirective,
    HlmH1Directive,
    HlmH2Directive,
    HlmH3Directive,
    HlmH4Directive,
    HlmLargeDirective,
    HlmLeadDirective,
    HlmMutedDirective,
    HlmPDirective,
    HlmSmallDirective,
    HlmUlDirective,
  ],
})
class TestHostComponent {}

describe('HlmTypography directives', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply default and user classes for each directive', () => {
    const cases: Array<{ selector: string; expected: string; custom: string }> = [
      { selector: '[hlmBlockquote]', expected: hlmBlockquote, custom: 'custom1' },
      { selector: '[hlmCode]', expected: hlmCode, custom: 'custom2' },
      { selector: '[hlmH1]', expected: hlmH1, custom: 'custom3' },
      { selector: '[hlmH2]', expected: hlmH2, custom: 'custom4' },
      { selector: '[hlmH3]', expected: hlmH3, custom: 'custom5' },
      { selector: '[hlmH4]', expected: hlmH4, custom: 'custom6' },
      { selector: '[hlmP]', expected: hlmP, custom: 'custom7' },
      { selector: '[hlmSmall]', expected: hlmSmall, custom: 'custom8' },
      { selector: '[hlmUl]', expected: hlmUl, custom: 'custom9' },
      { selector: '[hlmLarge]', expected: hlmLarge, custom: 'custom10' },
      { selector: '[hlmLead]', expected: hlmLead, custom: 'custom11' },
      { selector: '[hlmMuted]', expected: hlmMuted, custom: 'custom12' },
    ];

    cases.forEach(({ selector, expected, custom }) => {
      const el: HTMLElement = fixture.debugElement.query(By.css(selector)).nativeElement;
      const cls = el.className;
      // verify each default class token is present
      expected.split(' ').forEach(token => {
        if (token) expect(cls).toContain(token);
      });
      // verify custom class is present
      expect(cls).toContain(custom);
    });
  });
});
