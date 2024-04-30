import { S3 } from '@aws-sdk/client-s3';

export const endpoint = process.env.SPACES_ENDPOINT;

export const s3Client = new S3({
  forcePathStyle: true,
  endpoint,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY,
    secretAccessKey: process.env.SPACES_SECRET_KEY,
  },
});
