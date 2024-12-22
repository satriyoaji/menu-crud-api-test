import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllMenus() {
    return this.prisma.menu.findMany({
      include: { children: true },
    });
  }

  async getMenuById(id: string) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: { children: true },
    });
  }

  async addMenu(data: Prisma.MenuCreateInput) {
    return this.prisma.menu.create({ data });
  }

  async updateMenu(id: string, data: Prisma.MenuUpdateInput) {
    return this.prisma.menu.update({ where: { id }, data });
  }

  async deleteMenu(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }

  async saveMenus(menus: Prisma.MenuCreateInput[]) {
    return this.prisma.$transaction(
      menus.map((menu) => this.prisma.menu.create({ data: menu })),
    );
  }
}
