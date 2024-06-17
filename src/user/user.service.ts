import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async resetProblemsFlag(): Promise<number> {
    const usersWithProblems = await this.prisma.user.findMany({
      where: { problems: true },
    });

    await this.prisma.user.updateMany({
      where: { problems: true },
      data: { problems: false },
    });

    return usersWithProblems.length;
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async randomizeProblems(): Promise<void> {
    const users = await this.prisma.user.findMany();
    const updates = users.map(user => ({
      where: { id: user.id },
      data: { problems: Math.random() < 0.5 },
    }));

    for (const update of updates) {
      await this.prisma.user.update(update);
    }
  }
}
