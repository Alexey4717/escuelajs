import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { FilesBox } from './FilesBox';

describe('FilesBox', () => {
  it('renders file input and label', () => {
    render(<FilesBox label="Аватар" data-testid="avatar-file-input" />);

    expect(screen.getByLabelText('Аватар')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-file-input')).toHaveAttribute(
      'type',
      'file',
    );
  });

  it('shows validation error for pdf file', async () => {
    const user = userEvent.setup({ applyAccept: false });
    render(<FilesBox label="Аватар" data-testid="avatar-file-input" />);

    const input = screen.getByTestId('avatar-file-input');
    const pdf = new File(['pdf'], 'file.pdf', { type: 'application/pdf' });

    await user.upload(input, pdf);

    expect(
      await screen.findByText('file.pdf: PDF-файлы не поддерживаются'),
    ).toBeInTheDocument();
  });
});
