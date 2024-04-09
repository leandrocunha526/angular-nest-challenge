import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Req,
    Res,
    HttpStatus,
    Put,
    HttpException,
    InternalServerErrorException,
    BadRequestException,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Response } from 'express';
import AuthUser from 'src/common/decorators/auth-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { validate } from 'class-validator';

@ApiTags('Devices')
@Controller('device')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}

    @UseGuards(JwtAuthGuard)
    @Post('register')
    async create(
        @Body() createDeviceDto: CreateDeviceDto,
        @Req() req,
        @Res() res: Response,
    ) {
        const device = await this.deviceService.createDevice(
            req.user.id,
            createDeviceDto,
        );
        if (device) {
            return res.status(HttpStatus.CREATED).json({
                message: 'Device created with successful',
                device: device,
                success: true,
            });
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Error 500: Internal Server Error',
            success: false,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('list')
    async getAllDevices(
        @Req() req,
        @Res() res: Response,
        @AuthUser() user: UserEntity,
    ) {
        const device = await this.deviceService.getAllDevices(user);
        if (device) {
            return res.status(HttpStatus.OK).json({
                device: device,
                success: true,
            });
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Error 500: Internal Server Error',
            success: false,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('list/:id')
    async getOneDevice(
        @Param('id') deviceId: string,
        @Res() res: Response,
        @Req() req,
    ) {
        const device = await this.deviceService.findDeviceById(
            req.user.id,
            deviceId,
        );
        if (device) {
            return res.status(HttpStatus.OK).json({
                device: device,
                success: true,
            });
        }
        throw new HttpException(
            'Error 400 Bad Request: Device not found or your user does not have this device',
            HttpStatus.BAD_REQUEST,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async removeOne(
        @Param('id') deviceId: string,
        @Res() res: Response,
        @Req() req,
    ) {
        const device = await this.deviceService.deleteDevice(
            req.user.id,
            deviceId,
        );
        if (device) {
            return res.status(HttpStatus.OK).json({
                message: 'Delete device successfully',
                device: device,
                success: true,
            });
        }
        throw new HttpException(
            'Error 400 Bad Request: Device not found or your user does not have this device',
            HttpStatus.BAD_REQUEST,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async updateOne(
        @Param('id') deviceId: string,
        @Body() updateDeviceDto: UpdateDeviceDto,
        @Req() req,
    ) {
        const errors = await validate(updateDeviceDto, {
            skipMissingProperties: true,
        });
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        try {
            const device = await this.deviceService.updateDevice(
                req.user.id,
                deviceId,
                updateDeviceDto,
            );

            return {
                message: 'Device updated successfully',
                device,
                success: true,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Error updating device');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/search/:query')
    async searchDevices(@Param('query') query: string, @Req() req, @Res() res) {
        try {
            const devices = await this.deviceService.searchDevices(
                req.user.id,
                query,
            );

            if (devices.length > 0) {
                return res.status(HttpStatus.OK).json({
                    devices,
                    success: true,
                });
            } else {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Error 404: Device not found',
                });
            }
        } catch (error) {
            console.error('Erro ao pesquisar dispositivos:', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error 500: Internal server error',
                success: false,
            });
        }
    }
}
