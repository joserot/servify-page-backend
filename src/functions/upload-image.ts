import { s3Client, endpoint } from 'src/lib/s3-client';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import verifyIsValidImage from './verify-is-valid-image';

import { v4 as uuidv4 } from 'uuid';

export default async function uploadImage(file: any) {
  const existingFile = file[0] ? file[0] : file;

  // Verify if the file is valid
  const validFile = await verifyIsValidImage(existingFile);

  if (!validFile) {
    return null;
  }

  const fileExtension = await existingFile.originalname.split('.').pop();

  const body = await existingFile.buffer;

  const bucketParams: PutObjectCommandInput = {
    Bucket: 'servify',
    Key: `${uuidv4()}.${fileExtension}`,
    Body: body,
    ACL: 'public-read',
  };

  await s3Client.send(new PutObjectCommand(bucketParams));

  const imageUrl = `${endpoint}/${bucketParams.Bucket}/${bucketParams.Key}`;

  return imageUrl;
}
