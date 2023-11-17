import {ConfigService} from "../../service/config.service";

export function initializer(configService: ConfigService): () => Promise<any> {
  return (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        await configService.init();
        resolve()
      } catch (error) {
        reject(error);
      }
    });
  };
}
