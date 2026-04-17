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
        throw new Error('File is too large');
      }
      throw new Error(`File upload failed (${error.status})`);
    }

    if (error instanceof DOMException && error.name === 'TimeoutError') {
      throw new Error('File upload timeout');
    }

    throw new Error('Network error during file upload');
  }

  if (!response.location) {
    throw new Error('File uploaded but URL is missing');
  }

  return response;
}
