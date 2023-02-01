# Recipe app

## How to run the app

Open a terminal and run the following command to spin up the API and React UI

```
make install docker
```

_Navigate to http://localhost:3000 to view the UI_

## How to run the tests

Run the following command in a separate terminal (You must have your UI and API running)

```
make test
```

## Features

 - Database: PostgreSQL
 - API: Node.js + TypeScript + GraphQL
 - UI: React Remix + Tailwind

## Areas of improvement

- Codebase:
  - Linting
  - Formatting
  - API Integration tests
  - API E2E tests
  - Git hooks
- API:
  - Monitoring (tracing and metrics)
  - Application-cache
  - Auth (mercurius-auth)
  - Extra validation on top of the GraphQL defaults (mercurius-validation)
- UI:
  - Select box support for enums
  - Define more components to improve extensibility
  - Get React remix working in production and make fully compatible with Cypress
  - Clean up some styling etc

## Future work

- Infrastructure:
  - Terraform (remote-exec)
  - GCP Cloud Run behind a Global (envoy-based) L7 LB
  - GCP Certificate Manager
  - GCP CLoud SQL (PostgreSQL)
  - GCP Memorystore (Redis)
- CI:
  - Would go with GitHub actions and make use of composite actions and reusable workflows
- CD:
  - Terraform (local-exec) deploy of GCP Cloud Run in GHA
  - Make use of GitHub actions environments
