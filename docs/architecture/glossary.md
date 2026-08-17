# Architecture Glossary

**Aggregate** — consistency boundary whose state is changed through an Aggregate Root.

**Aggregate Root** — entity that controls access to an aggregate's owned objects and enforces its invariants.

**Application handler** — plain class implementing a use case, e.g. `CreateOrderHandler`.

**Application port** — interface owned by Core that describes an external capability required by business/application code.

**Command** — intent to change system state.

**CQRS** — separation of write and read models/paths. In CleanShop it is lightweight and uses one database.

**Domain event** — immutable business fact raised by the Domain, e.g. `OrderSubmittedDomainEvent`.

**Domain invariant** — rule that must always hold for valid aggregate state.

**DTO** — data shape transferred across an application boundary, especially query/read output.

**Entity** — object with identity and lifecycle.

**Feature-first** — organizing presentation/application code around business capabilities instead of global technical folders.

**Infrastructure** — technical implementations such as database, payment adapter, Identity and email.

**Port/Adapter** — Core defines a port; Infrastructure/Web provides an adapter that implements or invokes it.

**Projection** — selecting database data directly into a DTO/read model rather than reconstructing a rich aggregate.

**Repository** — persistence abstraction for an Aggregate Root on the write/behavior path.

**Result pattern** — explicit success/failure return used for expected application outcomes.

**Specification** — reusable query policy represented as an expression; used selectively in CleanShop.

**Value object** — immutable concept defined by its value rather than identity, e.g. `Money`, `Address`.
