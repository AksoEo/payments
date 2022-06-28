# Client Permissions
These permissions must be granted to the payments API client for this application to work properly.

- `pay.payment_intents.read.*`
    - to display information about the payment intent
- `pay.payment_intents.update.*`
    - to allow customers to update their notes
- `pay.payment_intents.submit.*`
    - to let customers mark their payment as submitted
- `pay.payment_intents.cancel.*`
    - to let customers cancel their intent
- `pay.payment_intents.sensitive_data.*`
    - to read the stripe client secret
- `ratelimit.disable`
    - so the payments page doesn't get rate limited
