-- CreateTable
CREATE TABLE "revenues" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "recurrence" VARCHAR(50) NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "revenues_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "revenues" ADD CONSTRAINT "revenues_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
