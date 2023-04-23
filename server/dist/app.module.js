"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const config_1 = require("@nestjs/config");
const mentor_module_1 = require("./mentors/mentor.module");
const ability_module_1 = require("./ability/ability.module");
const mentorship_module_1 = require("./mentorship/mentorship.module");
const upload_module_1 = require("./upload/upload.module");
const platform_express_1 = require("@nestjs/platform-express");
const account_module_1 = require("./account/account.module");
const mail_module_1 = require("./mail/mail.module");
const gateway_module_1 = require("./gateway/gateway.module");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            platform_express_1.MulterModule.register({
                dest: './files',
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 10,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'client'),
                exclude: ['/api*'],
            }),
            prisma_module_1.PrismaModule,
            mail_module_1.MailModule,
            mentor_module_1.MentorModule,
            ability_module_1.AbilityModule,
            mentorship_module_1.MentorshipModule,
            upload_module_1.UploadModule,
            account_module_1.AccountModule,
            gateway_module_1.ChatModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map