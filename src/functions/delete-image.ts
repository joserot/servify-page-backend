import { s3Client } from 'src/lib/s3-client';

export default async function deleteImage(imageUrl: string) {
  const id = imageUrl.split('/').pop().split('.').shift();
  const fileExtension = imageUrl.split('/').pop().split('.').pop();

  await s3Client.deleteObject({
    Bucket: 'servify',
    Key: `${id}.${fileExtension}`,
  });

  return imageUrl;
}
