'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { Document } from '@tiptap/extension-document';
import { DocumentColumn } from './DocumentColumn';
import StarterKit from '@tiptap/starter-kit';
import { RichTextProvider } from 'reactjs-tiptap-editor';
import 'reactjs-tiptap-editor/style.css';
import styles from './RichTextEditor.module.css';
import { FileApiService } from '@/api/fileApiService';

// Extensions
import { Bold, RichTextBold } from 'reactjs-tiptap-editor/bold';
import { Italic, RichTextItalic } from 'reactjs-tiptap-editor/italic';
import { Strike, RichTextStrike } from 'reactjs-tiptap-editor/strike';
import { TextUnderline, RichTextUnderline } from 'reactjs-tiptap-editor/textunderline';
import { Heading, RichTextHeading } from 'reactjs-tiptap-editor/heading';
import { BulletList, RichTextBulletList } from 'reactjs-tiptap-editor/bulletlist';
import { OrderedList, RichTextOrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { TaskList, RichTextTaskList } from 'reactjs-tiptap-editor/tasklist';
import { Link, RichTextLink } from 'reactjs-tiptap-editor/link';
import { Image, RichTextImage } from 'reactjs-tiptap-editor/image';
import { Blockquote, RichTextBlockquote } from 'reactjs-tiptap-editor/blockquote';
import { HorizontalRule, RichTextHorizontalRule } from 'reactjs-tiptap-editor/horizontalrule';
import { Code, RichTextCode } from 'reactjs-tiptap-editor/code';
import { CodeBlock, RichTextCodeBlock } from 'reactjs-tiptap-editor/codeblock';
import { TextAlign, RichTextAlign } from 'reactjs-tiptap-editor/textalign';
import { History, RichTextUndo, RichTextRedo } from 'reactjs-tiptap-editor/history';
import { Clear, RichTextClear } from 'reactjs-tiptap-editor/clear';
import { Color, RichTextColor } from 'reactjs-tiptap-editor/color';
import { Highlight, RichTextHighlight } from 'reactjs-tiptap-editor/highlight';
import { FontFamily, RichTextFontFamily } from 'reactjs-tiptap-editor/fontfamily';
import { FontSize, RichTextFontSize } from 'reactjs-tiptap-editor/fontsize';
import { Table, RichTextTable } from 'reactjs-tiptap-editor/table';
import { Video, RichTextVideo } from 'reactjs-tiptap-editor/video';
import { Indent, RichTextIndent } from 'reactjs-tiptap-editor/indent';
import { LineHeight, RichTextLineHeight } from 'reactjs-tiptap-editor/lineheight';
import { MoreMark, RichTextMoreMark } from 'reactjs-tiptap-editor/moremark';
import { ExportPdf, RichTextExportPdf } from 'reactjs-tiptap-editor/exportpdf';
import { ExportWord, RichTextExportWord } from 'reactjs-tiptap-editor/exportword';
import { ImportWord, RichTextImportWord } from 'reactjs-tiptap-editor/importword';
import { Column, ColumnNode, MultipleColumnNode, RichTextColumn } from 'reactjs-tiptap-editor/column';
import {
    RichTextBubbleColumns,
    RichTextBubbleExcalidraw,
    RichTextBubbleIframe,
    RichTextBubbleImage,
    RichTextBubbleImageGif,
    RichTextBubbleLink,
    RichTextBubbleMermaid,
    RichTextBubbleTable,
    RichTextBubbleText,
    RichTextBubbleVideo,
    RichTextBubbleMenuDragHandle,
    RichTextBubbleCallout,
    RichTextBubbleDrawer,
    RichTextBubbleKatex,
    RichTextBubbleTwitter,
} from 'reactjs-tiptap-editor/bubble';

import {
    SlashCommand,
    SlashCommandList,
} from 'reactjs-tiptap-editor/slashcommand';

import { RichTextSearchAndReplace, SearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace';
import { Emoji, RichTextEmoji } from 'reactjs-tiptap-editor/emoji';
import { CodeView, RichTextCodeView } from 'reactjs-tiptap-editor/codeview';
import { RichTextTextDirection, TextDirection } from 'reactjs-tiptap-editor/textdirection';
import { Iframe, RichTextIframe } from 'reactjs-tiptap-editor/iframe';
import { Callout, RichTextCallout } from 'reactjs-tiptap-editor/callout';
import { Katex, RichTextKatex } from 'reactjs-tiptap-editor/katex';
import { Mermaid, RichTextMermaid } from 'reactjs-tiptap-editor/mermaid';
import { Excalidraw, RichTextExcalidraw } from 'reactjs-tiptap-editor/excalidraw';
import { Drawer, RichTextDrawer } from 'reactjs-tiptap-editor/drawer';
import { RichTextTwitter, Twitter } from 'reactjs-tiptap-editor/twitter';
import { Attachment, RichTextAttachment } from 'reactjs-tiptap-editor/attachment';
import { ImageGif, RichTextImageGif } from 'reactjs-tiptap-editor/imagegif';

// Mock Emojis (Simple fallback)
const EMOJI_LIST = [
    { name: 'smile', text: '😄', emoticons: [':)', ':-)'] },
    { name: 'laughing', text: '😆', emoticons: [':D', ':-D'] },
    // Add more if needed or fetch dynamic
];

function convertBase64ToBlob(base64: string) {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

interface RichTextEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value = '',
    onChange,
    placeholder = 'Nhập nội dung...',
}) => {
    const editor = useEditor({
        extensions: [
            DocumentColumn,
            StarterKit.configure({
                bold: false,
                italic: false,
                strike: false,
                code: false,
                heading: false,
                bulletList: false,
                orderedList: false,
                blockquote: false,
                horizontalRule: false,
                codeBlock: false,
                undoRedo: false, // Use independent history extension
                document: false, // Disable to use custom Document for columns
            }),
            Bold,
            Italic,
            Strike,
            TextUnderline,
            Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
            BulletList,
            OrderedList,
            TaskList,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
            }),
            Image.configure({
                resourceImage: 'upload', // Required property
                upload: async (file: File) => {
                    try {
                        const url = await FileApiService.uploadImage(file);
                        return url; // The extension expects a Promise<string> returning the URL
                    } catch (error) {
                        console.error("Upload failed", error);
                        throw error;
                    }
                },
            }),
            Blockquote,
            HorizontalRule,
            Code,
            CodeBlock,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            History,
            Clear,
            Color,
            Highlight,
            FontFamily,
            FontSize,
            Table.configure({ resizable: true }),
            Video.configure({
                resourceVideo: 'upload',
                upload: async (file: File) => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                },
            }),
            Indent,
            LineHeight,
            Column,
            ColumnNode,
            MultipleColumnNode,
            ExportPdf,
            ImportWord,
            ExportWord,
            MoreMark,
            SlashCommand,
            SearchAndReplace,
            Emoji.configure({
                suggestion: {
                    items: async ({ query }: any) => {
                        const lowerCaseQuery = query?.toLowerCase();
                        return EMOJI_LIST.filter(({ name }) =>
                            name.toLowerCase().includes(lowerCaseQuery),
                        );
                    },
                },
            }),
            CodeView,
            TextDirection,
            Iframe,
            Callout,
            Twitter,
            Katex,
            Excalidraw,
            ImageGif.configure({
                provider: 'giphy',
                API_KEY: process.env.NEXT_PUBLIC_GIPHY_API_KEY as string,
            }),
            Mermaid.configure({
                upload: (file: any) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            const blob = convertBase64ToBlob(reader.result as string);
                            resolve(URL.createObjectURL(blob));
                        }, 300);
                    });
                },
            }),
            Drawer.configure({
                upload: (file: any) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            const blob = convertBase64ToBlob(reader.result as string);
                            resolve(URL.createObjectURL(blob));
                        }, 300);
                    });
                },
            }),
            Attachment.configure({
                upload: (file: any) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            const blob = convertBase64ToBlob(reader.result as string);
                            resolve(URL.createObjectURL(blob));
                        }, 300);
                    });
                },
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange?.(html);
        },
        editorProps: {
            attributes: {
                class: styles.editorContent,
            },
        },
        immediatelyRender: false,
    });

    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            // Only update if content is different to avoid cursor jumps
            if (value === '' || (Math.abs(value.length - editor.getHTML().length) > 10)) {
                editor.commands.setContent(value);
            }
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    return (
        <RichTextProvider editor={editor}>
            <div className={styles.editorWrapper}>
                <div className={styles.toolbar}>
                    <RichTextUndo />
                    <RichTextRedo />
                    <RichTextSearchAndReplace />
                    <RichTextClear />
                    <div className={styles.divider} />

                    <RichTextFontFamily />
                    <RichTextFontSize />
                    <RichTextHeading />

                    <div className={styles.divider} />

                    <RichTextBold />
                    <RichTextItalic />
                    <RichTextUnderline />
                    <RichTextStrike />
                    <RichTextMoreMark />
                    <RichTextEmoji />
                    <RichTextColor />
                    <RichTextHighlight />

                    <div className={styles.divider} />

                    <RichTextBulletList />
                    <RichTextOrderedList />
                    <RichTextAlign />
                    <RichTextIndent />
                    <RichTextLineHeight />
                    <RichTextTaskList />

                    <div className={styles.divider} />

                    <RichTextLink />
                    <RichTextImage />
                    <RichTextVideo />
                    <RichTextImageGif />
                    <RichTextBlockquote />
                    <RichTextHorizontalRule />
                    <RichTextCode />
                    <RichTextCodeBlock />
                    <RichTextColumn />
                    <RichTextTable />
                    <RichTextIframe />

                    <div className={styles.divider} />

                    <RichTextExportPdf />
                    <RichTextImportWord />
                    <RichTextExportWord />
                    <RichTextTextDirection />
                    <RichTextAttachment />
                    <RichTextKatex />
                    <RichTextExcalidraw />
                    <RichTextMermaid />
                    <RichTextDrawer />
                    <RichTextTwitter />
                    <RichTextCodeView />
                    <RichTextCallout />
                </div>

                <EditorContent editor={editor} className={styles.editorContainer} placeholder={placeholder} />

                {/* Bubble Menus */}
                <RichTextBubbleColumns />
                <RichTextBubbleDrawer />
                <RichTextBubbleExcalidraw />
                <RichTextBubbleIframe />
                <RichTextBubbleKatex />
                <RichTextBubbleLink />
                <RichTextBubbleImage />
                <RichTextBubbleVideo />
                <RichTextBubbleImageGif />
                <RichTextBubbleMermaid />
                <RichTextBubbleTable />
                <RichTextBubbleText />
                <RichTextBubbleTwitter />
                <RichTextBubbleCallout />
                <RichTextBubbleMenuDragHandle />

                {/* Command List */}
                <SlashCommandList />
            </div>
        </RichTextProvider>
    );
};

export default RichTextEditor;
