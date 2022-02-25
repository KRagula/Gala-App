import AWS from 'aws-sdk';
import fs from 'fs';
import { fileTypeFromBuffer } from 'file-type';
import multiparty from 'multiparty';

import awsConfig from '../configurations/aws-config.js';
import userTemplate from '../models/UserModel.js';

import { ServerError, serverErrorTypes } from '../error/generic-errors.js';

const s3 = new AWS.S3();

const uploadFileHelper = (buffer, name, type) => {
	const params = {
		Body: buffer,
		Bucket: awsConfig.s3Bucket,
		ContentType: type.mime,
		Key: `${name}.${type.ext}`,
	};

	return s3.upload(params).promise();
};

const uploadFile = async (req, res, next) => {
	const form = new multiparty.Form();
	form.parse(req, async (error, fields, files) => {
		if (error) {
			return res.status(500).send(error);
		}
		try {
			const path = files.file[0].path;
			const buffer = fs.readFileSync(path);
			const type = await fileTypeFromBuffer(buffer);
			const fileName = `${awsConfig.s3FolderProfilePictures}/${Date.now().toString()}`;
			const data = await uploadFileHelper(buffer, fileName, type);
			return res.status(200).send(data);
		} catch (err) {
			return next(new ServerError(serverErrorTypes.awsS3, err));
		}
	});
};

export default {
	uploadFile: uploadFile,
};
