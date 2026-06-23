-- Make Ticket -> TicketType cascade so deleting an event (and its ticket types)
-- removes tickets deterministically instead of hitting a RESTRICT race.
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_ticketTypeId_fkey";

ALTER TABLE "Ticket"
  ADD CONSTRAINT "Ticket_ticketTypeId_fkey"
  FOREIGN KEY ("ticketTypeId") REFERENCES "TicketType"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
