-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "paymentProviders" TEXT[] DEFAULT ARRAY[]::TEXT[];

