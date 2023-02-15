require('dotenv').config();

import api from './api';
import { getConfig } from './config';
import { MongooseService } from './services/mongooseService';
import UserService from './services/userService';

const PORT = getConfig().PORT || 8080;

MongooseService.connect()

api.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
