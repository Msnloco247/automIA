export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com',
  USERNAME: process.env.SAUCE_USERNAME || '',
  PASSWORD: process.env.SAUCE_PASSWORD || '',
  LOCKED_OUT_USER: process.env.LOCKED_OUT_USER || '',
};

if (!ENV.USERNAME || !ENV.PASSWORD) {
  console.warn('⚠️ WARNING: SAUCE_USERNAME or SAUCE_PASSWORD is not set in .env file');
}
