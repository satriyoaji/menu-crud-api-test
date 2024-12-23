import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
  HttpException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { MenusService } from './menus.service';
import { Prisma } from '@prisma/client';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  async getAllMenus(@Res() res: Response) {
    const data = await this.menusService.getAllMenus();
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Success',
      data,
    });
  }

  @Get(':id')
  async getMenuById(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.menusService.getMenuById(id);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Success',
        data,
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  @Post('')
  async addMenu(@Body() data: CreateMenuDto, @Res() res: Response) {
    try {
      const result = await this.menusService.addMenu(data);
      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Success',
        data: result,
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  @Patch(':id')
  async updateMenu(
    @Param('id') id: string,
    @Body() data: UpdateMenuDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.menusService.updateMenu(id, data);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Success',
        data: result,
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.menusService.deleteMenu(id);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Success',
        data: result,
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  @Post('save')
  async saveMenus(
    @Body() menus: Prisma.MenuCreateInput[],
    @Res() res: Response,
  ) {
    try {
      const result = await this.menusService.saveMenus(menus);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Success',
        data: result,
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any) {
    const statusCode =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    return res.status(statusCode).json({
      status: statusCode,
      message: error.response || 'Internal Server Error',
      data: null,
    });
    // return res.status(statusCode).json({
    //   status: statusCode,
    //   message: error.response
    //     ? error.response
    //     : 'internal server error occurred',
    //   data: null,
    // });
  }
}
