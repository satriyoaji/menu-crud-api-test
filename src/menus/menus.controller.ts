import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { Prisma } from '@prisma/client';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  async getAllMenus() {
    const data = await this.menusService.getAllMenus();
    return {
      status: 200,
      message: 'Success',
      data,
    };
  }

  @Get(':id')
  async getMenuById(@Param('id') id: string) {
    try {
      const data = await this.menusService.getMenuById(id);
      return {
        status: 200,
        message: 'Success',
        data,
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
        data: null,
      };
    }
  }

  @Post('')
  async addMenu(@Body() data: CreateMenuDto) {
    try {
      const result = await this.menusService.addMenu(data);
      return {
        status: 200,
        message: 'Success',
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
        data: null,
      };
    }
  }

  @Patch(':id')
  async updateMenu(@Param('id') id: string, @Body() data: UpdateMenuDto) {
    try {
      const result = await this.menusService.updateMenu(id, data);
      return {
        status: 200,
        message: 'Success',
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id: string) {
    try {
      const result = await this.menusService.deleteMenu(id);
      return {
        status: 200,
        message: 'Success',
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
        data: null,
      };
    }
  }

  @Post('save')
  async saveMenus(@Body() menus: Prisma.MenuCreateInput[]) {
    try {
      const result = await this.menusService.saveMenus(menus);
      return {
        status: 200,
        message: 'Success',
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
        data: null,
      };
    }
  }
}
