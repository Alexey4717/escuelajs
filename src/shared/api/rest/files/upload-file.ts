import { fetchEscuelaRest } from '../fetch-escuela-rest';
import { EscuelaUploadedFileDto } from './types';

export async function uploadFile(file: File): Promise<EscuelaUploadedFileDto> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetchEscuelaRest<EscuelaUploadedFileDto>(
    '/files/upload',
    {
      method: 'POST',
      body: formData,
    },
  );

  if (!response.location) {
    throw new Error('Файл загружен, но URL не получен');
  }

  return response;
}
