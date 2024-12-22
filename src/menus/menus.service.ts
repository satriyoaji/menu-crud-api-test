import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';
import { uuidv4 } from 'src/utils/uuid';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllMenus() {
    return this.prisma.menu.findMany({
      include: { children: true },
    });
  }

  async getMenuById(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    return this.prisma.menu.findUnique({
      where: { id },
      include: { children: true },
    });
  }

  async addMenu(data: CreateMenuDto) {
    if (!data.name || data.depth === undefined) {
      throw new BadRequestException('Name and depth are required');
    }

    if (data.parentId) {
      const parentMenu = await this.prisma.menu.findUnique({
        where: { id: data.parentId },
      });

      if (!parentMenu) {
        throw new BadRequestException('Parent menu not found');
      }
    }

    return this.prisma.menu.create({
      data: {
        id: uuidv4(),
        ...data,
      },
    });
  }

  async updateMenu(id: string, data: UpdateMenuDto) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    if (data.parentId) {
      const parentMenu = await this.prisma.menu.findUnique({
        where: { id: data.parentId },
      });

      if (!parentMenu) {
        throw new BadRequestException('Parent menu not found');
      }
    }

    return this.prisma.menu.update({ where: { id }, data });
  }

  async deleteMenu(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    return this.prisma.menu.delete({ where: { id } });
  }

  async saveMenus(menus: Prisma.MenuCreateInput[]) {
    if (!menus.length) {
      throw new BadRequestException('Menus data is required');
    }

    return this.prisma.$transaction(
      menus.map((menu) => this.prisma.menu.create({ data: menu })),
    );
  }
}
