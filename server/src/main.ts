import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter';
import { AtGuard } from './common/guards';
import { NotFoundInterceptor } from './common/interceptors';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { createProxyMiddleware } from 'http-proxy-middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Coaching platform')
    .setDescription('The coaching API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  const reflector = new Reflector();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalGuards(new AtGuard(reflector));
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://backend-ten-lime.vercel.app',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/',
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
