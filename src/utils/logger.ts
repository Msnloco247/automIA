import winston from 'winston';
import path from 'path';

const logDir = 'logs';

const formatLog = winston.format.printf(({ level, message, timestamp, testName }) => {
  const testInfo = testName ? ` [${testName}]` : '';
  return `${timestamp}${testInfo} [${level.toUpperCase()}]: ${message}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    formatLog
  ),
  transports: [
    new winston.transports.File({ 
      filename: path.join(logDir, 'error.log'), 
      level: 'error',
      options: { flags: 'a' }
    }),
    new winston.transports.File({ 
      filename: path.join(logDir, 'success.log'),
      level: 'info',
      options: { flags: 'a' }
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ],
});

export const logInfo = (message: string, testName?: string) => logger.info(`✅ ${message}`, { testName });
export const logStep = (message: string, testName?: string) => logger.info(`ℹ️ ${message}`, { testName });
export const logError = (message: string, testName?: string, error?: any) => logger.error(`❌ ${message}${error ? `: ${error}` : ''}`, { testName });
export const logWarning = (message: string, testName?: string) => logger.warn(`⚠️ ${message}`, { testName });
