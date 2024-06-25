export default async function verifyIsValidImage(file: any) {
  const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'webp'];
  const array_of_allowed_file_types = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
  ];

  // Allowed file size in mb
  const allowed_file_size = 2;

  const file_extension = await file.originalname.split('.').pop();
  const mimetype = await file.mimetype;

  // Check if the uploaded file is allowed

  if (
    !array_of_allowed_files.includes(file_extension) ||
    !array_of_allowed_file_types.includes(mimetype)
  ) {
    console.log('archivo no permitido');

    return false;
  }

  if (file.size / (1024 * 1024) > allowed_file_size) {
    console.log('archivo muy grande');

    return false;
  }

  return file;
}
