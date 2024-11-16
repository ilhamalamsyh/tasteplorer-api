import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@module/user/user.module';
import { AuthModule } from '@module/auth/auth.module';
import { ArticleModule } from '@module/article/article.module';
import { BannerModule } from '@module/banner/banner.module';
import { RecipeModule } from '@module/recipe/recipe.module';
import { LoggerService } from '@common/logging/logger.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@common/logging/logger.interceptor';
import { UploadFileModule } from '@module/upload-file/upload-file.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({ req }) => ({ req }),
      autoSchemaFile: join(process.cwd(), '/schema.gql'),
      sortSchema: true,
      playground: true,
      // installSubscriptionHandlers: true,
      // buildSchemaOptions: {
      //   directives: [
      //     new GraphQLDirective({
      //       name: 'upper',
      //       locations: [DirectiveLocation.FIELD_DEFINITION],
      //     }),
      //   ],
      // },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    BannerModule,
    ArticleModule,
    RecipeModule,
    UploadFileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
