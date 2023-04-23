"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const filter_1 = require("./common/filter");
const guards_1 = require("./common/guards");
const interceptors_1 = require("./common/interceptors");
const swagger_1 = require("@nestjs/swagger");
const http_proxy_middleware_1 = require("http-proxy-middleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Coaching platform')
        .setDescription('The coaching API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1', app, document);
    const reflector = new core_1.Reflector();
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.useGlobalFilters(new filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new interceptors_1.NotFoundInterceptor());
    app.useGlobalGuards(new guards_1.AtGuard(reflector));
    app.use('/api', (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: 'https://backend-ten-lime.vercel.app',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            '^/api/': '/',
        },
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map