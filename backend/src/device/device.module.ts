import { UserEntity } from 'src/user/entities/user.entity';
import { DeviceEntity } from 'src/device/entities/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([DeviceEntity, UserEntity]),
        forwardRef(() => UserModule),
    ],
    controllers: [DeviceController],
    providers: [DeviceService],
})
export class DeviceModule {}
