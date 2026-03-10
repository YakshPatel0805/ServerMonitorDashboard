// Suppress console warnings globally
export const suppressWarnings = () => {
  const originalWarn = console.warn;
  const originalError = console.error;

  console.warn = (...args) => {
    const message = args[0]?.toString() || '';
    
    // List of warnings to suppress
    const suppressedWarnings = [
      'Warning: ReactDOM.render',
      'Warning: useLayoutEffect',
      'Warning: Each child in a list',
      'Non-serializable values were found',
      'Warning: Failed prop type',
      'Warning: componentWillReceiveProps',
      'Warning: componentWillMount',
      'Warning: componentWillUpdate',
      'Warning: findDOMNode',
      'Warning: Received `true` for a non-boolean attribute',
    ];

    if (suppressedWarnings.some(warning => message.includes(warning))) {
      return;
    }

    originalWarn.call(console, ...args);
  };

  console.error = (...args) => {
    const message = args[0]?.toString() || '';
    
    // List of errors to suppress
    const suppressedErrors = [
      'Warning: ReactDOM.render',
      'Not implemented: HTMLFormElement.prototype.submit',
    ];

    if (suppressedErrors.some(error => message.includes(error))) {
      return;
    }

    originalError.call(console, ...args);
  };
};

// Call this function to enable warning suppression
suppressWarnings();
