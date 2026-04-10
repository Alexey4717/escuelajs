import { EscuelaRestError, fetchEscuelaRest } from '../fetch-escuela-rest';
import { EscuelaUploadedFileDto } from './types';

const FILE_UPLOAD_TIMEOUT_MS = 20_000;

export async function uploadFile(file: File): Promise<EscuelaUploadedFileDto> {
  const formData = new FormData();
  formData.append('file', file);

  const timeoutSignal =
    typeof AbortSignal !== 'undefined' &&
    typeof AbortSignal.timeout === 'function'
      ? AbortSignal.timeout(FILE_UPLOAD_TIMEOUT_MS)
      : undefined;

  let response: EscuelaUploadedFileDto;
  try {
    response = await fetchEscuelaRest<EscuelaUploadedFileDto>('/files/upload', {
      method: 'POST',
      body: formData,
      signal: timeoutSignal,
    });
  } catch (error) {
    if (error instanceof EscuelaRestError) {
      if (error.status === 413) {
        throw new Error('Файл слишком большой');
      }
      throw new Error(`Ошибка загрузки файла (${error.status})`);
    }

    if (error instanceof DOMException && error.name === 'TimeoutError') {
      throw new Error('Таймаут загрузки файла');
    }

    throw new Error('Сетевая ошибка при загрузке файла');
  }

  if (!response.location) {
    throw new Error('Файл загружен, но URL не получен');
  }

  return response;
}
