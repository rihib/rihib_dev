// Type system metadata and version information

export const TypeSystemInfo = {
  version: '1.0.0',
  features: [
    'Comprehensive type definitions',
    'Runtime type guards',
    'Enhanced error types',
    'Type-safe API client',
    'Component prop interfaces',
    'Translation type safety',
    'Theme system types',
    'Utility type collections',
    'Development helpers',
    'State machine utilities',
    'Event emitter types',
    'Discriminated union helpers',
  ],
  created: '2024',
  lastUpdated: new Date().toISOString(),
} as const;

// Type system debugging utilities
export const getTypeSystemDiagnostics = () => ({
  ...TypeSystemInfo,
  runtime: {
    nodeVersion: typeof process !== 'undefined' ? process.version : 'browser',
    environment: typeof window !== 'undefined' ? 'browser' : 'node',
    timestamp: new Date().toISOString(),
  },
});

// Type system feature flags
export const TypeSystemFeatures = {
  strictNullChecks: true,
  exactOptionalPropertyTypes: true,
  noImplicitReturns: true,
  noImplicitAny: true,
  discriminatedUnions: true,
  conditionalTypes: true,
  mappedTypes: true,
  templateLiteralTypes: true,
} as const;
