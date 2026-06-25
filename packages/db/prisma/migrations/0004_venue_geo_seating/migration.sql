-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "mapsUrl" TEXT,
ADD COLUMN     "placeId" TEXT,
ADD COLUMN     "seatingMap" JSONB,
ADD COLUMN     "venueLat" DOUBLE PRECISION,
ADD COLUMN     "venueLng" DOUBLE PRECISION;

