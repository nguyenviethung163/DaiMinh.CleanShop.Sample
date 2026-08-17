# Docker Development Workflow

## Start database only

```bash
docker compose up -d db
```

Use this when running Web with `dotnet run` on the host.

## Start the composed application

```bash
docker compose up --build
```

Inspect:

```bash
docker compose ps
docker compose logs -f
```

## Stop

```bash
docker compose down
```

Remove disposable volumes only when you intentionally want to destroy local DB state:

```bash
docker compose down -v
```

## Image build

The root `Dockerfile` builds/publishes the Web entry point and includes referenced projects through the solution build context.

## Production warning

Development compose configuration is not production orchestration. Before production use, review:

- non-development SQL credentials/external database;
- secret injection;
- TLS termination;
- data protection keys;
- health/readiness checks;
- resource limits;
- logging/metrics;
- migration execution policy;
- container user/security settings.
