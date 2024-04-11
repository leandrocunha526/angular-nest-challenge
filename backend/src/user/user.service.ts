import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async validate(username: string, password: string) {
        const user = await this.userRepository.findOne({
            where: { username },
        });
        if (user) {
            const matchPassport = await argon2.verify(user.password, password);
            if (matchPassport) {
                return user;
            }
        } else {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
    }

    async create(createUserDto: CreateUserDto) {
        const { username, password } = createUserDto;
        const existedUser = await this.userRepository.findOne({
            where: { username: username },
        });

        if (existedUser) {
            throw new HttpException(
                'User already existed',
                HttpStatus.BAD_REQUEST,
            );
        }
        let newUser = new UserEntity();
        newUser.username = username;
        newUser.password = password;
        newUser.devices = [];
        try {
            newUser = await this.userRepository.save(newUser);
            const result = {
                userId: newUser.id,
                username: newUser.username,
            };
            return result;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id: number) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        return {
            id: user.id,
            username: user.username,
        };
    }

    async update(id: number, updateUserDto: UpdateUserDTO) {
<<<<<<< HEAD
        const { username, password } = updateUserDto;

        const userToUpdate = await this.userRepository.findOne({
            where: { id },
        });
        if (!userToUpdate) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // Check if the username is already taken
        const existingUser = await this.userRepository.findOne({
            where: {
                username: username,
            },
        });
        if (existingUser && existingUser.id !== userToUpdate.id) {
            throw new HttpException(
                'User already exists',
                HttpStatus.BAD_REQUEST,
            );
        }

        // Check if the password is provided and different from the existing one
        if (password && password !== userToUpdate.password) {
            userToUpdate.password = await argon2.hash(password);
        }

        userToUpdate.username = username;

        try {
            await this.userRepository.save(userToUpdate);
            return {
                id: userToUpdate.id,
                username: userToUpdate.username,
            };
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
=======
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const { username, password } = updateUserDto;

        const hashedPassword = await argon2.hash(password);

        user.username = username;
        user.password = hashedPassword;

        try {
            await this.userRepository.save(user);
            return {
                id: user.id,
                username: user.username,
            };
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
>>>>>>> bd3c9b7592534ccac0defad11a06fb3a8c0e640f
        }
    }
}
