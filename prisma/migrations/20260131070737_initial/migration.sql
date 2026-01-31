-- CreateEnum
CREATE TYPE "Position" AS ENUM ('GK', 'CB', 'LB', 'RB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LWG', 'RWG', 'CF', 'ST');

-- CreateEnum
CREATE TYPE "TransferType" AS ENUM ('PERMANENT', 'LOAN', 'FREE', 'RETURN_FROM_LOAN', 'END_OF_CONTRACT');

-- CreateTable
CREATE TABLE "clubs" (
    "id" UUID NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "country" VARCHAR(80),
    "league" VARCHAR(80),
    "founded_year" INTEGER,
    "stadium" VARCHAR(120),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clubs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players" (
    "id" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "position" "Position",
    "nationality" VARCHAR(80),
    "birth_date" TIMESTAMP(3),
    "current_club_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transfers" (
    "id" UUID NOT NULL,
    "player_id" UUID NOT NULL,
    "from_club_id" UUID,
    "to_club_id" UUID NOT NULL,
    "transfer_year" INTEGER NOT NULL,
    "transfer_month" INTEGER NOT NULL,
    "type" "TransferType" NOT NULL DEFAULT 'PERMANENT',
    "fee" INTEGER,
    "loan_end_year" INTEGER,
    "loan_end_month" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transfers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "clubs_name_idx" ON "clubs"("name");

-- CreateIndex
CREATE INDEX "players_name_idx" ON "players"("name");

-- CreateIndex
CREATE INDEX "players_current_club_id_idx" ON "players"("current_club_id");

-- CreateIndex
CREATE INDEX "transfers_player_id_transfer_year_transfer_month_idx" ON "transfers"("player_id", "transfer_year", "transfer_month");

-- CreateIndex
CREATE INDEX "transfers_to_club_id_transfer_year_transfer_month_idx" ON "transfers"("to_club_id", "transfer_year", "transfer_month");

-- CreateIndex
CREATE INDEX "transfers_from_club_id_transfer_year_transfer_month_idx" ON "transfers"("from_club_id", "transfer_year", "transfer_month");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_current_club_id_fkey" FOREIGN KEY ("current_club_id") REFERENCES "clubs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_from_club_id_fkey" FOREIGN KEY ("from_club_id") REFERENCES "clubs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_to_club_id_fkey" FOREIGN KEY ("to_club_id") REFERENCES "clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
