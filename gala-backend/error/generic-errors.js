export const clientErrorTypes = {
	credential: 'credential',
	experience: 'experience',
	generic: 'generic',
};

export const serverErrorTypes = {
	mongodb: 'mongodb',
	paypal: 'paypal',
	sendbird: 'sendbird',
	sendgrid: 'sendgrid',
	generic: 'generic',
};

export class ClientError extends Error {
	constructor() {
		super();

		this.name = this.constructor.name;
		this.classification = 'client';
		this.type = 'generic';
		this.message = `Client error.`;
		this.statusCode = 400;
	}
}

export class ServerError extends Error {
	constructor(type, errObj = {}) {
		super();

		this.name = this.constructor.name;
		this.classification = 'server';
		this.type = type;
		this.message = `Something went wrong on our end, please try again later as we look into this.`;
		this.statusCode = 500;
		this.errObj = errObj;
	}
}
