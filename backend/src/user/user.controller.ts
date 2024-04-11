import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Res,
    UseGuards,
    Request,
    Get,
    Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/auth/local.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import AuthUser from 'src/common/decorators/auth-user.decorator';
import { UserEntity } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const registerResult = await this.userService.create(createUserDto);
        if (registerResult) {
            return res.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                user: registerResult,
                success: true,
            });
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Error 500: Internal Server Error',
            success: false,
            user: {},
        });
    }

    @ApiTags('Auth')
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        const login_token = await this.authService.login(req.user);
        return {
            id: req.user.id,
            message: 'Login successful',
            success: true,
            token: login_token,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async profile(@AuthUser() user: UserEntity) {
        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async update(
        @AuthUser() user: UserEntity,
        @Body() updateUserDto: UpdateUserDTO,
        @Res() res: Response,
    ) {
        try {
            const edit = await this.userService.update(user.id, updateUserDto);
            if (!edit) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Error 400: Bad Request',
                    success: false,
                });
            } else {
                return res.status(HttpStatus.CREATED).json({
                    message: 'The user has been updated successfully',
                    success: true,
                });
            }
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error 500: Internal Server Error',
                success: false,
            });
            console.log(error);
        }
    }
}
