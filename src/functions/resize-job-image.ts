import * as sharp from 'sharp';

export default async function resizeJobImage(file: any) {
  const image = await sharp(file.buffer)
    .resize({
      width: 500,
      height: 500,
      fit: 'cover',
    })
    .withMetadata()
    .toBuffer({ resolveWithObject: true });

  return {
    fieldname: 'avatar',
    originalname: file.originalname,
    encoding: file.encoding,
    mimetype: file.mimetype,
    buffer: image.data,
    size: image.info.size,
  };
}
