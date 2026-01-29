import * as process from 'node:process';

export class EnvHelper {
    static readonly nameApp: string = String(process.env.NAME_APP);
    static readonly baseUrl: string = String(process.env.BASE_URL);
    static readonly login: string = String(process.env.LOGIN);
    static readonly password: string = String(process.env.PASSWORD);
}

