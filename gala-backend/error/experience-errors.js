import { clientErrorTypes, ClientError } from './generic-errors.js';

export class ExperienceError extends ClientError {
	constructor() {
		super();

		this.name = this.constructor.name;
		this.type = clientErrorTypes.experience;
		this.message = 'Client experience error.';
	}
}
