-- AlterTable
ALTER TABLE "quarters" ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "quarters" ADD CONSTRAINT "quarters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
