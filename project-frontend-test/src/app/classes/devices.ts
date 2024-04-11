import { User } from './user';

export class Devices {
  id!: string;
  manufacturer!: string;
  description!: string;
  informationAccess!: string;
  commandList!: string;
  constructor(
    id?: string,
    manufacturer?: string,
    description?: string,
    informationAccess?: string,
    commandList?: string
  ) {
    this.id = id;
    this.manufacturer = manufacturer;
    this.description = description;
    this.informationAccess = informationAccess;
    this.commandList = commandList;
  }
}
