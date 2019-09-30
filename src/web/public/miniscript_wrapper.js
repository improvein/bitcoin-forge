/* global Module */
em_miniscript_compile = Module.cwrap('miniscript_compile', 'none', [
  'string',
  'number',
  'number',
  'number',
  'number',
  'number',
  'number',
]);
em_miniscript_analyze = Module.cwrap('miniscript_analyze', 'none', [
  'string',
  'number',
  'number',
  'number',
  'number',
]);
