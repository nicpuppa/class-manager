import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'reflect-metadata';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	const options = new DocumentBuilder()
		.setTitle('Class Manager OpenAPI')
		.setDescription('The Class Manager API')
		.setVersion('1.0')
		.addTag('ClassManager')
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('api', app, swaggerDocument);

	await app.listen(3000);

}

bootstrap();
