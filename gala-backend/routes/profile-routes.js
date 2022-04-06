import bcrypt from 'bcrypt';

import userTemplate from '../models/UserModel.js';

import { ServerError, serverErrorTypes } from '../error/generic-errors.js';
import {
	CredentialError,
	UserExistsError,
	InvalidCredentialError,
} from '../error/credential-errors.js';

const getProfile = async (req, res, next) => {
	req.params.profileid;
};

export default {
	getProfile: getProfile,
};
