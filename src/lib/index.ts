import { s3 } from '$lib/server/aws';
import AWS from 'aws-sdk';
import { env } from '$env/dynamic/private';

export const processFilesInBatches = async (files: File[], batchSize = 10): Promise<string[]> => {
	const errors: string[] = [];
	for (let i = 0; i < files.length; i += batchSize) {
		const batch = files.slice(i, i + batchSize);

		await Promise.all(batch.map(async (file) => {
			try {
				await uploadFile(file); // Assuming `uploadFile` is an async function
			} catch (error) {
				console.error(`Error uploading file ${file.name}:`, error);
				errors.push(file.name);
			}
		}));

		console.log(`Processed batch ${Math.floor(i / batchSize) + 1}`);
	}

	return errors;
};

export const uploadFile = async (file: File) => {
	const params: AWS.S3.PutObjectRequest = {
		Bucket: env.AWS_BUCKET_NAME,
		Key: file.name,
		Body: new Uint8Array(await file.arrayBuffer()),
	};

	try {
		const data = await s3.upload(params).promise();
		console.log(`File uploaded successfully: ${data.Key}`);
	} catch (err) {
		console.error('Error uploading file:', err);
		throw err;
	}
};

export const getLatestUploadedFiles = async () => {
	const params: AWS.S3.ListObjectsV2Request = {
		Bucket: env.AWS_BUCKET_NAME,
		MaxKeys: 5,
	};

	try {
		const data = await s3.listObjectsV2(params).promise();
		return data.Contents;
	} catch (err) {
		console.error('Error fetching files:', err);
		throw err;
	}
};
