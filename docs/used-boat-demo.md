# Used boat manager demo

This is a controlled test of the inventory workflow. The unit is fictional and visibly labeled **TEST UNIT / NOT FOR SALE**.

## Demo record

| Field | Value |
| --- | --- |
| DMS and stock ID | `DEMO-USED-BOAT-001` |
| Hull ID (HIN) | `DMO00001A121` |
| Unit | 2021 Demo Marine River 18 TEST UNIT |
| Category / condition | Fishing boat / used |
| Test price | $18,900 |
| Public slug | `2021-demo-marine-river-18-test-unit-demo-used-boat-001` |

A boat uses a HIN, not an RV VIN. The HIN above is synthetic and follows the database's 12-character format check.

## Run it

1. Configure `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and a private `DEMO_SYNC_TOKEN` on the site server. Use a non-production database for the first run.
2. Open `/admin`, enter the token, and select **List Demo Used Boat**. Only this demo stock ID is sent to the sync engine.
3. Check `/boats` and the demo detail page. Confirm that the unit is marked used and displays the demo placeholder, price, and inquiry link.
4. Select **Mark Demo Boat Sold**. The unit changes to `sold`, all seven local channel status rows change to `removed`, and the public inventory paths are invalidated.
5. Confirm that the boat no longer appears on `/boats` and its old detail URL returns 404 after revalidation.

The demo is one-way for a given stock ID. Repeating **List** after **Sold** will not restock it; use a fresh test ID for another run.

## Scope

- The site and channel status rows are real database writes. The route rejects missing/invalid tokens and does not support a write on `GET`.
- External marketplace calls remain unconnected. A `removed` row records local intent; it does not prove the listing was removed from Boats Group or Craigslist.
- The contact form requires working Resend configuration. No buyer inquiry, payment, contract, title transfer, or actual sale is sent by this demo.
- `npx tsx scripts/verify-used-boat-demo.ts` runs the add-to-sold sequence against an in-memory database without touching Supabase.
