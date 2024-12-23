// src/menus/menu.dto.ts
import { IsNotEmpty, IsOptional, IsUUID, IsInt } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  depth: number;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}

export class UpdateMenuDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsInt()
  depth?: number;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}
