import AWS from 'aws-sdk';
import { env } from '$env/dynamic/private';

export const s3 = new AWS.S3({
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
	},
	region: env.AWS_REGION,
});