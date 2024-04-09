import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDeviceDto {
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

    @IsOptional()
    id?: string;
    @IsOptional()
    createdAt?: string;
    @IsOptional()
    updatedAt?: string;
}
