import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';
import { validate as isUUID, v4 as uuidv4 } from 'uuid';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUUID(uuid: string, fieldName: string) {
    if (!isUUID(uuid)) {
      throw new HttpException(
        `${fieldName} must be a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllMenus() {
    return this.prisma.menu.findMany({
      include: { children: true },
    });
  }

  async getMenuById(id: string) {
    if (!id) {
      throw new HttpException('ID is required', HttpStatus.BAD_REQUEST);
    }

    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: { children: true },
    });

    if (!menu) {
      throw new HttpException('Menu not found', HttpStatus.NOT_FOUND);
    }

    return menu;
  }

  async addMenu(data: CreateMenuDto) {
    if (!data.name || data.depth === undefined) {
      throw new HttpException(
        'name and depth are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (data.parentId) {
      await this.validateUUID(data.parentId, 'Parent ID');

      const parentMenu = await this.prisma.menu.findUnique({
        where: { id: data.parentId },
      });

      if (!parentMenu) {
        throw new HttpException(
          'Parent menu not found',
          HttpStatus.BAD_REQUEST,
        );
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
      throw new HttpException('ID is required', HttpStatus.BAD_REQUEST);
    }

    if (data.parentId) {
      await this.validateUUID(data.parentId as string, 'Parent ID');

      const parentMenu = await this.prisma.menu.findUnique({
        where: { id: data.parentId as string },
      });

      if (!parentMenu) {
        throw new HttpException(
          'Parent menu not found',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const menu = await this.prisma.menu.findUnique({ where: { id } });

    if (!menu) {
      throw new HttpException('Menu not found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.menu.update({ where: { id }, data });
  }

  async deleteMenu(id: string) {
    if (!id) {
      throw new HttpException('ID is required', HttpStatus.BAD_REQUEST);
    }
    const menu = await this.prisma.menu.findUnique({ where: { id } });

    if (!menu) {
      throw new HttpException('Menu not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.menu.delete({ where: { id } });
  }

  async saveMenus(menus: Prisma.MenuCreateInput[]) {
    if (!menus.length) {
      throw new HttpException('Menus data is required', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.$transaction(
      menus.map((menu) =>
        this.prisma.menu.create({
          data: {
            id: uuidv4(),
            ...menu,
          },
        }),
      ),
    );
  }
}
