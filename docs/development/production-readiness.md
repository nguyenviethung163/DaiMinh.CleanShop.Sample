# Production Readiness Checklist

The baseline is a learning/reference project. Complete this checklist before treating it as production-ready.

## Build and supply chain

- [ ] `dotnet restore`, `build`, `test` pass in CI from a clean checkout.
- [ ] Dependency vulnerability/licensing scanning is configured.
- [ ] Container image is pinned/scanned and produced reproducibly.
- [ ] Production runtime versions follow supported security patches.

## Database

- [ ] Initial and upgrade migrations are committed and tested.
- [ ] Backup/restore procedure has been tested.
- [ ] Connection resiliency/timeouts are reviewed.
- [ ] Migration deployment strategy is explicit.
- [ ] Important indexes/query plans are reviewed under representative load.

## Identity/security

- [ ] Development seed credentials removed/disabled.
- [ ] Strong password/MFA/account policies chosen for the product.
- [ ] Data Protection keys persisted securely.
- [ ] Cookie/security proxy settings reviewed.
- [ ] Authorization tests cover role and ownership boundaries.
- [ ] Secrets come from a secret manager.
- [ ] Security headers/CSP reviewed for the real frontend.

## Payment

- [ ] Replace `FakePaymentGateway` with a production adapter.
- [ ] Idempotency implemented.
- [ ] Timeout/unknown outcome state modeled.
- [ ] Webhook signature verification implemented.
- [ ] Reconciliation/retry process exists.
- [ ] Sensitive payment data scope minimized.

## Reliability

- [ ] Decide whether post-commit domain-event side effects need Outbox durability.
- [ ] Email provider has retries/idempotency/observability.
- [ ] Timeouts/cancellation are configured for external calls.
- [ ] Graceful shutdown and background work semantics reviewed.

## Observability

- [ ] Structured centralized logs.
- [ ] Correlation ID propagated to outbound integrations.
- [ ] Metrics for request latency/error rate/database/payment.
- [ ] Health/readiness endpoints appropriate to platform.
- [ ] Alerting and runbooks for critical failure modes.

## Privacy/compliance

- [ ] Data classification/retention policy defined.
- [ ] PII excluded from unnecessary logs.
- [ ] Admin access audited appropriately.
- [ ] Legal/privacy requirements for the deployment region reviewed.

## Performance

- [ ] Pagination added to unbounded lists.
- [ ] Load test representative traffic.
- [ ] N+1 and slow queries reviewed.
- [ ] Caching only added with explicit consistency/invalidation rules.
