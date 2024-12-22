-- CreateTable
CREATE TABLE "menus" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "parentId" UUID,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "menus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
