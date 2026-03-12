import { request } from '@playwright/test';
import { logStep, logInfo, logError } from './logger';
import { ENV } from '../config/env.config';

export async function validateEnvironmentHealth() {
  logStep('Starting environment health check via API...');
  
  const requestContext = await request.newContext();
  try {
    const response = await requestContext.get(ENV.BASE_URL);
    
    if (response.ok()) {
      logInfo(`Environment health check passed! Status: ${response.status()}`);
    } else {
      logError(`Environment health check failed! Status: ${response.status()}`);
      throw new Error(`Environment at ${ENV.BASE_URL} is not responding correctly. Status: ${response.status()}`);
    }
  } catch (error) {
    logError('Environment health check failed due to exception', error);
    throw error;
  } finally {
    await requestContext.dispose();
  }
}
