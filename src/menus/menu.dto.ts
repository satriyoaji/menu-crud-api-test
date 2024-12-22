// src/menus/menu.dto.ts

export class CreateMenuDto {
  name: string;
  depth: number;
  parentId?: string;
}

export class UpdateMenuDto {
  name?: string;
  depth?: number;
  parentId?: string;
}
