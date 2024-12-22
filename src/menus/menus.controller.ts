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

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  async getAllMenus() {
    return this.menusService.getAllMenus();
  }

  @Get(':id')
  async getMenuById(@Param('id') id: string) {
    return this.menusService.getMenuById(id);
  }

  @Post()
  async addMenu(@Body() data: Prisma.MenuCreateInput) {
    return this.menusService.addMenu(data);
  }

  @Patch(':id')
  async updateMenu(
    @Param('id') id: string,
    @Body() data: Prisma.MenuUpdateInput,
  ) {
    return this.menusService.updateMenu(id, data);
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id: string) {
    return this.menusService.deleteMenu(id);
  }

  @Post('save')
  async saveMenus(@Body() menus: Prisma.MenuCreateInput[]) {
    return this.menusService.saveMenus(menus);
  }
}
