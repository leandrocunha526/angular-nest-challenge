import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    manufacturer: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    informationAccess: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    commandList: string;
}
