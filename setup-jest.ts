import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
// Mock window.matchMedia for embla-carousel
Object.defineProperty(window, 'matchMedia', {
  configurable: true,
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
// Mock IntersectionObserver for embla-carousel in tests
(window as any).IntersectionObserver = function _IntersectionObserverMock(callback: any, options?: any) {
  return {
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  };
};
// Also mock IntersectionObserver on global
(global as any).IntersectionObserver = (window as any).IntersectionObserver;
// Mock ResizeObserver for embla-carousel in tests
(window as any).ResizeObserver = function _ResizeObserverMock(callback: any) {
  return {
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  };
};
// Also mock ResizeObserver on global
// Also mock ResizeObserver on global
(global as any).ResizeObserver = (window as any).ResizeObserver;
// Silence console.warn in tests
global.console.warn = () => {};
global.console.info = () => {};
// Polyfill window.scrollTo to prevent JSDOM not implemented error
Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
});
// Initialize Zone.js test environment
setupZoneTestEnv();