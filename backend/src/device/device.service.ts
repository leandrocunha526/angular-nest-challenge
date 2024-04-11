import { UserEntity } from 'src/user/entities/user.entity';
import { DeviceEntity } from './entities/device.entity';
import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(DeviceEntity)
        private readonly deviceRepository: Repository<DeviceEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createDevice(userId: any, createDeviceDto: CreateDeviceDto) {
        let device = new DeviceEntity();
        device.manufacturer = createDeviceDto.manufacturer;
        device.description = createDeviceDto.description;
        device.informationAccess = createDeviceDto.informationAccess;
        device.commandList = createDeviceDto.commandList;
        device = await this.deviceRepository.save(device);

        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['devices'],
        });
        user.devices.push(device);
        await this.userRepository.save(user);
        return device;
    }

    async getAllDevices(userId: any) {
        const devices = await this.deviceRepository.find({
            where: { user: userId },
        });
        return devices;
    }

    async findDeviceById(userId: any, deviceId: string) {
        const device = await this.deviceRepository.findOne({
            where: { id: deviceId, user: userId },
        });
        if (device) {
            return device;
        }
        return null;
    }

    async deleteDevice(userId: any, deviceId: string) {
        const device = await this.deviceRepository.findOne({
            where: { id: deviceId, user: userId },
        });
        if (!device) {
            return null;
        }
        const deleteResult = await this.deviceRepository.remove(device);
        return deleteResult;
    }

    async updateDevice(
        userId: any,
        deviceId: string,
        updateDeviceDto: UpdateDeviceDto,
    ) {
        const device = await this.deviceRepository.findOne({
            where: { id: deviceId, user: userId },
        });

        if (!device) {
            throw new NotFoundException(
                'Device not found or not owned by the user',
            );
        }

        device.manufacturer = updateDeviceDto.manufacturer;
        device.description = updateDeviceDto.description;
        device.informationAccess = updateDeviceDto.informationAccess;
        device.commandList = updateDeviceDto.commandList;

        try {
            return await this.deviceRepository.save(device);
        } catch (error) {
            throw new InternalServerErrorException('Error updating device');
        }
    }

    async searchDevices(userId: any, query: string) {
        try {
            console.log(
                `Searching devices for user ${userId} by ${query}`,
            );

            const devices = await this.deviceRepository.find({
                where: [
                    {
                        user: { id: userId }, // Filtrando explicitamente pelo ID do usuário
                        manufacturer: ILike(`%${query}%`),
                    },
                    {
                        user: { id: userId },
                        description: ILike(`%${query}%`),
                    },
                    {
                        user: { id: userId },
                        informationAccess: ILike(`%${query}%`),
                    },
                    {
                        user: { id: userId },
                        commandList: ILike(`%${query}%`),
                    },
                ],
            });
            return devices;
        } catch (error) {
            console.error(`Error searching devices: ${error.message}`);
            throw error;
        }
    }
}
