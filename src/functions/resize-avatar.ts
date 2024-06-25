import * as sharp from 'sharp';

export default async function resizeAvatar(file: any) {
  const image = await sharp(file.buffer)
    .resize({
      width: 200,
      height: 200,
      fit: 'cover',
    })
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
