# Adding or Changing Domain Behavior

## 1. Identify the invariant

Describe the rule without framework/database language.

Good: “A paid order may be shipped.”

Bad: “Set Status column to 3 when admin posts form.”

## 2. Choose aggregate owner

The aggregate that must remain consistent owns the method. Do not place a rule in a Service just because multiple properties are involved.

## 3. Encapsulate state

Prefer private setters/backing collections. Expose intention-revealing methods such as:

```text
Reserve
Submit
MarkPaid
Ship
Cancel
```

Avoid generic mutation APIs such as `UpdateStatus(int status)`.

## 4. Test state transitions

Test both allowed and rejected transitions.

For a state machine, cover each meaningful edge and forbidden edge.

## 5. Persistence mapping

After Domain change, verify EF configuration can materialize the object without weakening Domain encapsulation. Add/update migration only after mapping is correct.

## 6. Domain event decision

Raise an event when the transition creates a business fact that another component may reasonably react to. Do not raise events merely to avoid writing normal synchronous code.

## 7. Avoid service leakage

If a rule requires an external fact (payment authorization, current exchange rate), the Application can obtain that fact through a port and invoke a Domain method with the resulting business value. Domain should not call external HTTP services directly.
