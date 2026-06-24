-- CreateEnum
CREATE TYPE "TeamRole" AS ENUM ('MANAGER', 'STAFF');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "reminderSentAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "memberEmail" TEXT NOT NULL,
    "memberId" TEXT,
    "role" "TeamRole" NOT NULL DEFAULT 'STAFF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TeamMember_memberId_idx" ON "TeamMember"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_ownerId_memberEmail_key" ON "TeamMember"("ownerId", "memberEmail");

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Host"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Host"("id") ON DELETE SET NULL ON UPDATE CASCADE;

