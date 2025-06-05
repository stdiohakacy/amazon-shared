import { DynamicModule, Global, Module } from '@nestjs/common';
import { I18nModule, HeaderResolver, I18nJsonLoader } from 'nestjs-i18n';
import { MessageService } from './services/message.service';

export interface MessageModuleOptions {
  languagePath: string; // path.join(__dirname, '../languages')
  availableLanguages: string[]; // ['en', 'id']
  fallbackLanguage?: string; // Default if don't have any lang header
}

@Global()
@Module({})
export class CornalMessageModule {
  static forRoot(options: MessageModuleOptions): DynamicModule {
    const { languagePath, availableLanguages, fallbackLanguage } = options;

    return {
      module: CornalMessageModule,
      providers: [MessageService],
      exports: [MessageService],
      imports: [
        I18nModule.forRoot({
          fallbackLanguage: fallbackLanguage ?? availableLanguages[0] ?? 'en',
          loaderOptions: {
            path: languagePath,
            watch: true,
          },
          loader: I18nJsonLoader,
          resolvers: [new HeaderResolver(['x-custom-lang'])],
          fallbacks: availableLanguages.reduce(
            (acc, lang) => ({ ...acc, [`${lang}-*`]: lang }),
            {},
          ),
        }),
      ],
    };
  }
}
