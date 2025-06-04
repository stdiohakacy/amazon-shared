import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { HelperArrayService } from 'src/modules/helpers/services';
import { RequestAppInterface } from 'src/modules/request/interfaces/request.interface';

@Injectable()
export class AppCustomLanguageMiddleware implements NestMiddleware {
  private readonly availableLanguage: string[];
  constructor(private readonly helperArrayService: HelperArrayService) {
    this.availableLanguage = ['en'];
  }

  async use(
    req: RequestAppInterface,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    let customLang: string = 'en'; //TODO: Will be replaced by config value
    const reqLanguages = req.headers['x-custom-lang'] as string;
    if (reqLanguages) {
      const language: string[] = this.filterLanguage(reqLanguages);

      if (language.length > 0) {
        customLang = reqLanguages;
      }
    }

    req.__language = customLang;
    req.headers['x-custom-lang'] = customLang;

    next();
  }

  private filterLanguage(customLanguage: string): string[] {
    return this.helperArrayService.getIntersection(
      [customLanguage],
      this.availableLanguage,
    );
  }
}
