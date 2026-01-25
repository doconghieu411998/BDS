import { Document } from '@tiptap/extension-document';

// Custom document to support columns
export const DocumentColumn = Document.extend({
    content: '(block|columns)+',
});
