import * as process from 'node:process';

export class EnvHelper {
    static readonly nameApp: string = String(process.env.NAME_APP);
    static readonly baseUrl: string = String(process.env.BASE_URL);
    static readonly login: string = String(process.env.LOGIN);
    static readonly password: string = String(process.env.PASSWORD);

    static readonly testTimeout: number = Number(process.env.TEST_TIMEOUT);
    static readonly actionTimeout: number = Number(process.env.ACTION_TIMEOUT);
    static readonly navigationTimeout: number = Number(process.env.NAVIGATION_TIMEOUT);
    static readonly expectTimeout: number = Number(process.env.EXPECT_TIMEOUT);
}
