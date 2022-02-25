import AWS from 'aws-sdk';

const env = {
	accountID: process.env.AWS_ACCOUNT_ID,
	accessKeyID: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
	s3Bucket: process.env.AWS_S3_BUCKET,
	s3FolderProfilePictures: process.env.AWS_S3_FOLDER_PROFILE_PICTURES,
};

AWS.config.update({
	region: env.region,
	accessKeyId: env.accessKeyID,
	secretAccessKey: env.secretAccessKey,
});

export default env;
