# `@tsonic/nodejs`

Native Tsonic source-package implementation of Node.js APIs.

Current native slice:

- `path`
- `events`
- `process`

The checked-in selftest suites for that slice match the baseline `nodejs-clr`
runtime tests at both file and fact-count granularity.

This package is authored as a first-party Tsonic source package and is intended to replace the current generated package over time.
