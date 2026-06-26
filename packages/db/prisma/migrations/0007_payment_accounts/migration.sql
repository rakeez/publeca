-- DropIndex
DROP INDEX "PaymentConfig_hostId_provider_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "paymentProviders",
ADD COLUMN     "paymentAccountIds" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentAccountId" TEXT;

-- AlterTable
ALTER TABLE "PaymentConfig" ADD COLUMN     "label" TEXT NOT NULL DEFAULT 'Default';

-- CreateIndex
CREATE INDEX "PaymentConfig_hostId_idx" ON "PaymentConfig"("hostId");

