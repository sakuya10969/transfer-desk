import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../lib/generated/prisma/client";
import { Position, TransferType } from "../lib/generated/prisma/enums";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

async function main() {
  // Clubs
  const clubNames = [
    "Arsenal", "Chelsea", "Liverpool", "Manchester City", "Manchester United",
    "Real Madrid", "Barcelona", "Atletico Madrid",
    "Bayern Munich", "Dortmund",
    "PSG", "Inter", "Milan", "Juventus",
  ];

  await prisma.club.createMany({
    data: clubNames.map((name) => ({
      name,
      country: "N/A",
      league: "N/A",
      foundedYear: randInt(1880, 2005),
      stadium: `${name} Stadium`,
    })),
    skipDuplicates: true,
  });

  const clubs = await prisma.club.findMany({ select: { id: true, name: true } });

  // Players
  const positions: Position[] = [
    "GK", "CB", "LB", "RB", "DM", "CM", "AM", "LM", "RM", "LWG", "RWG", "CF", "ST",
  ];

  const playerCount = 300;
  const playersData = Array.from({ length: playerCount }).map((_, i) => {
    const club = Math.random() < 0.9 ? pick(clubs) : null;
    return {
      name: `Player ${i + 1}`,
      position: Math.random() < 0.95 ? pick(positions) : null,
      nationality: "N/A",
      birthDate: new Date(randInt(1985, 2006), randInt(0, 11), randInt(1, 28)),
      currentClubId: club?.id ?? null,
    };
  });

  // 量が多いのでchunk + transaction
  const chunkSize = 200;
  for (let i = 0; i < playersData.length; i += chunkSize) {
    const chunk = playersData.slice(i, i + chunkSize);
    await prisma.$transaction(chunk.map((data) => prisma.player.create({ data })));
  }

  const players = await prisma.player.findMany({ select: { id: true, currentClubId: true } });

  // Contracts
  const contractCreates = players
    .filter((p) => p.currentClubId)
    .slice(0, 220)
    .map((p) => {
      const start = new Date(randInt(2020, 2025), randInt(0, 11), randInt(1, 28));
      const end =
        Math.random() < 0.8
          ? new Date(start.getFullYear() + randInt(1, 5), start.getMonth(), start.getDate())
          : null;

      return prisma.contract.create({
        data: {
          playerId: p.id,
          clubId: p.currentClubId!,
          startDate: start,
          endDate: end,
          salary: randInt(10_000, 300_000),
          clause: Math.random() < 0.3 ? randInt(1_000_000, 200_000_000) : null,
        },
      });
    });

  for (let i = 0; i < contractCreates.length; i += 200) {
    await prisma.$transaction(contractCreates.slice(i, i + 200));
  }

  // Stats
  const seasons = ["2021/22", "2022/23", "2023/24", "2024/25"];
  const statsCreates = players
    .filter((p) => p.currentClubId)
    .slice(0, 250)
    .flatMap((p) =>
      seasons.slice(0, randInt(1, seasons.length)).map((season) =>
        prisma.stat.create({
          data: {
            season,
            playerId: p.id,
            clubId: p.currentClubId!,
            matches: randInt(0, 38),
            goals: randInt(0, 25),
            assists: randInt(0, 18),
          },
        })
      )
    );

  for (let i = 0; i < statsCreates.length; i += 300) {
    await prisma.$transaction(statsCreates.slice(i, i + 300));
  }

  // Transfers
  const transfersToCreate = 400;
  const transferCreates = Array.from({ length: transfersToCreate }).map(() => {
    const player = pick(players);
    const toClub = pick(clubs);
    const fromClub = Math.random() < 0.7 ? pick(clubs) : null;

    const year = randInt(2018, 2026);
    const month = randInt(1, 12);

    const type: TransferType = pick([
      "PERMANENT",
      "LOAN",
      "FREE",
      "RETURN_FROM_LOAN",
      "END_OF_CONTRACT",
    ]);

    const isLoan = type === "LOAN";

    return prisma.transfer.create({
      data: {
        playerId: player.id,
        fromClubId: fromClub?.id ?? null,
        toClubId: toClub.id,
        transferYear: year,
        transferMonth: month,
        type,
        fee:
          type === "PERMANENT"
            ? randInt(1_000_000, 200_000_000)
            : type === "FREE"
              ? 0
              : null,
        loanEndYear: isLoan ? year + 1 : null,
        loanEndMonth: isLoan ? month : null,
      },
    });
  });

  for (let i = 0; i < transferCreates.length; i += 200) {
    await prisma.$transaction(transferCreates.slice(i, i + 200));
  }

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
