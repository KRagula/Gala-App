import { clientErrorTypes, ClientError } from './generic-errors.js';

export class CredentialError extends ClientError {
	constructor() {
		super();

		this.name = this.constructor.name;
		this.type = clientErrorTypes.credential;
		this.message = 'Client credential error.';
	}
}

export class UserExistsError extends CredentialError {
	constructor(email) {
		super();

		this.name = this.constructor.name;
		this.message = `The email ${email} is already in use!`;
		this.statusCode = 409;
	}
}
