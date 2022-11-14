import { UserDto } from 'databaseProviders';
import { FromReqOptions } from 'services';

declare global {
    namespace Express {
        export interface Request extends {}
    }
}
