import { s3Client, endpoint } from 'src/lib/s3-client';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
export default async function uploadMultipleImages(files: any[]) {
  if (!files.length) return [];

  try {
    const response = await Promise.all(
      files.map(async (file: any) => {
        const fileExtension = await file.originalname.split('.').pop();
        const bucketParams: PutObjectCommandInput = {
          Bucket: 'servify',
          Key: `${uuidv4()}.${fileExtension}`,
          Body: file.buffer,
          ACL: 'public-read',
        };
        await s3Client.send(new PutObjectCommand(bucketParams));

        const imageUrl = `${endpoint}/${bucketParams.Bucket}/${bucketParams.Key}`;

        return imageUrl;
      }),
    );

    return response;
  } catch (error) {
    console.error('Error al cargar imágenes:', error);
    throw new Error('Error al cargar imágenes');
  }
}
