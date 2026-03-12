import fs from 'fs';
import path from 'path';
import { validateEnvironmentHealth } from './api-validator';

async function globalSetup() {
    const logDir = 'logs';
    // Clean logs
    if (fs.existsSync(logDir)) {
        const files = fs.readdirSync(logDir);
        for (const file of files) {
            try {
                fs.unlinkSync(path.join(logDir, file));
            } catch (err) {
                // Ignore
            }
        }
    } else {
        fs.mkdirSync(logDir);
    }

    // API Health Check
    await validateEnvironmentHealth();
}

export default globalSetup;
