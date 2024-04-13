import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDTO {
    @IsNotEmpty()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;
}
