import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { FilesBox } from './FilesBox';
import type { FilesBoxItem } from './types';

describe('FilesBox', () => {
  it('renders file input and label', () => {
    render(<FilesBox label="Avatar" data-testid="avatar-file-input" />);

    const fileInput = screen.getByTestId('avatar-file-input');
    expect(fileInput).toHaveAttribute('type', 'file');
    expect(fileInput).toHaveAccessibleName('Avatar');
  });

  it('hides attach control when active file count reaches maxFiles', () => {
    const queued: FilesBoxItem = {
      localId: 'a',
      name: 'pic.png',
      size: 2048,
      mimeType: 'image/png',
      status: 'queued',
    };

    render(
      <FilesBox
        label="Files"
        maxFiles={1}
        value={[queued]}
        onChange={() => {}}
        data-testid="files-input"
      />,
    );

    expect(screen.queryByRole('button', { name: /attach file/i })).toBeNull();
    expect(screen.getByText('Maximum 1 file')).toBeInTheDocument();
  });

  it('shows validation error for pdf file', async () => {
    const user = userEvent.setup({ applyAccept: false });
    render(<FilesBox label="Avatar" data-testid="avatar-file-input" />);

    const input = screen.getByTestId('avatar-file-input');
    const pdf = new File(['pdf'], 'file.pdf', { type: 'application/pdf' });

    await user.upload(input, pdf);

    expect(
      await screen.findByText('file.pdf: PDF files are not supported'),
    ).toBeInTheDocument();
  });
});
