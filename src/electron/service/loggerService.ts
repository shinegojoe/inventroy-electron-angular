
const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;



export class LoggerService {
    private static instance: LoggerService;

    logger
    constructor() {
        this.logger = this.loggerInit();
    }


   
    public static getInstance(): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }

    loggerInit() {
        const date = new Date();

        const fileNameErr = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + "err.log";
        const fileNameInfo = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + "info.log";

        // const customFormat = printf((payload: any) => {
        //     // { level, message, timestamp }
        //     return `${timestamp} ${payload.level}: ${payload.message}`;
        //   });

          const customFormat = printf(({ level, message, timestamp }: any) => {
            return `${timestamp} ${level}: ${message}`;
          });

        const logger = winston.createLogger({
            level: 'info',
            // format: winston.format.json(),
            format: combine(timestamp(), customFormat),

            // defaultMeta: { service: 'user-service' },
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: `log/${fileNameErr}`, level: 'error' }),
                new winston.transports.File({ filename: `log/${fileNameInfo}`, level: 'info' }),

            ],
          });
        return logger;
    }

    // getLogger() {
    //     return this.logger;
    // }
    private objToStr(obj: any): string {
        if(typeof obj === "string") {
            return obj;
        } else {
            const res = JSON.stringify(obj);
            return res;
        }
    }

    info(msg: any) {
        const res = this.objToStr(msg);
        this.logger.info(res);
    }

    error(msg: any) {
        const res = this.objToStr(msg);
        this.logger.error(res);
    }

}
