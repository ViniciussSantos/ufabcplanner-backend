-- DropForeignKey
ALTER TABLE "quarters" DROP CONSTRAINT "quarters_academy_year_id_fkey";

-- AddForeignKey
ALTER TABLE "quarters" ADD CONSTRAINT "quarters_academy_year_id_fkey" FOREIGN KEY ("academy_year_id") REFERENCES "academic_years"("id") ON DELETE CASCADE ON UPDATE CASCADE;
