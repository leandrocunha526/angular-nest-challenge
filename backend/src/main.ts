import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    //Config Service
    const configService: ConfigService = app.get(ConfigService);
    //Set port with environment variable
    const port: number = configService.get<number>('PORT');

    const config = new DocumentBuilder()
        .setTitle('Welcome to NestJS API')
        .setDescription('The NestJS API description')
        .setVersion('1.0')
        // Assuming your routes are grouped in different modules,
        // you can add tags based on these modules
        .addTag('Devices', 'Endpoints related to devices')
        .addTag('Users', 'Endpoints related to users')
        .addTag('Auth', 'Endpoints related to authentication')
        .addServer(`http://localhost:${port}/api`) //Set server with environment variable
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.enableCors({ origin: true, credentials: true });
    app.setGlobalPrefix('api');
    await app.listen(port, () => {
        console.log(
            'Running server at',
            configService.get<string>('BASE_URL') + ':' + port, //Set base URL with environment variable
        );
    });
}

bootstrap();
