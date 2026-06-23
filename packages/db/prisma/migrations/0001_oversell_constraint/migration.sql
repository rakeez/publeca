-- Hard backstop against overselling. Even if application logic has a bug,
-- the database will reject any write that pushes sales past capacity.
ALTER TABLE "TicketType"
  ADD CONSTRAINT "ticket_type_no_oversell"
  CHECK ("quantitySold" <= "quantityTotal");

ALTER TABLE "TicketType"
  ADD CONSTRAINT "ticket_type_sold_nonneg"
  CHECK ("quantitySold" >= 0);
