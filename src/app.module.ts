import { Module } from '@nestjs/common';
import { StatsController } from './controllers';
import { GoogleSheetsService, TelegramService } from './services';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from './helpers';
import { AppConfig } from './types';
import { appOptionsProvider, googleProvider, telegrafProvider } from './providers';
import { TelegrafHandler } from './handlers';

const processVars = ['TELEGRAM_BOT_TOKEN', 'GOOGLE_CREDENTIALS_FILEPATH', 'ACCOUNTING_SPREADSHEET_ID'] satisfies (keyof AppConfig)[];

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config): AppConfig => validateConfig(config, processVars),
    }),
  ],
  controllers: [StatsController],
  providers: [TelegramService, TelegrafHandler, GoogleSheetsService, appOptionsProvider, telegrafProvider, googleProvider],
})
export class AppModule {}
