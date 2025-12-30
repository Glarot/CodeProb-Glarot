/**
 * Jest setup file for CodeProb tests
 */

// Mock fetch for testing
global.fetch = jest.fn();

// Mock DOM methods that might not be available in jsdom
Object.defineProperty(window, 'location', {
  value: {
    pathname: '/',
    href: 'http://localhost/',
    reload: jest.fn()
  },
  writable: true
});

// Setup console to show test output
global.console = {
  ...console,
  // Suppress console.log in tests unless needed
  log: jest.fn(),
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  fetch.mockClear();
});