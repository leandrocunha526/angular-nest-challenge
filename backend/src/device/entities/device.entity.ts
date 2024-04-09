import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('device')
export class DeviceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    manufacturer: string;

    @Column('text')
    description: string;

    @Column('text')
    informationAccess: string;

    @Column('text')
    commandList: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.devices)
    user: UserEntity;
}
