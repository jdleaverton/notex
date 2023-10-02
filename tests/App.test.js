import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/App';
import PDFViewer from '../src/components/PDFViewer';
import CommentSystem from '../src/components/CommentSystem';
import TextHighlighter from '../src/components/TextHighlighter';
import CommentExporter from '../src/components/CommentExporter';

jest.mock('../src/components/PDFViewer');
jest.mock('../src/components/CommentSystem');
jest.mock('../src/components/TextHighlighter');
jest.mock('../src/components/CommentExporter');

describe('App', () => {
  beforeEach(() => {
    PDFViewer.mockClear();
    CommentSystem.mockClear();
    TextHighlighter.mockClear();
    CommentExporter.mockClear();
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(PDFViewer).toHaveBeenCalledTimes(1);
    expect(CommentSystem).toHaveBeenCalledTimes(1);
    expect(TextHighlighter).toHaveBeenCalledTimes(1);
    expect(CommentExporter).toHaveBeenCalledTimes(1);
  });

  it('handles PDF import', async () => {
    const { getByTestId } = render(<App />);
    const file = new File(['pdf content'], 'sample.pdf', { type: 'application/pdf' });
    const input = getByTestId('pdf-input');
    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() => expect(PDFViewer).toHaveBeenCalledWith({ pdf: file }, expect.anything()));
  });

  it('handles comment addition', () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId('comment-input');
    const button = getByTestId('comment-submit');
    fireEvent.change(input, { target: { value: 'Test comment' } });
    fireEvent.click(button);
    expect(CommentSystem).toHaveBeenCalledWith({ comments: [{ id: expect.anything(), text: 'Test comment' }] }, expect.anything());
  });

  it('handles comment editing', () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId('comment-input');
    const addButton = getByTestId('comment-submit');
    fireEvent.change(input, { target: { value: 'Test comment' } });
    fireEvent.click(addButton);
    const editButton = getByTestId('comment-edit');
    fireEvent.click(editButton);
    const promptSpy = jest.spyOn(window, 'prompt').mockReturnValue('Updated comment');
    expect(CommentSystem).toHaveBeenCalledWith({ comments: [{ id: expect.anything(), text: 'Updated comment' }] }, expect.anything());
    promptSpy.mockRestore();
  });

  it('handles comment deletion', () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId('comment-input');
    const addButton = getByTestId('comment-submit');
    fireEvent.change(input, { target: { value: 'Test comment' } });
    fireEvent.click(addButton);
    const deleteButton = getByTestId('comment-delete');
    fireEvent.click(deleteButton);
    expect(CommentSystem).toHaveBeenCalledWith({ comments: [] }, expect.anything());
  });
});
