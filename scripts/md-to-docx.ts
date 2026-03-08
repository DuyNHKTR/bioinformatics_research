import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  Footer,
  Header,
  HeadingLevel,
  Packer,
  PageNumber,
  Paragraph,
  SectionType,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

const rootDir = path.resolve(import.meta.dir, "..");
const markdownFiles = [
  "README.md",
  "knowledge-base/README.md",
  "knowledge-base/course/tong-quan-hoc-phan.md",
  "knowledge-base/course/noi-dung-theo-buoi.md",
  "knowledge-base/course/nguon-tham-khao.md",
  "knowledge-base/foundations/ban-do-khai-niem-va-cong-cu.md",
  "knowledge-base/foundations/ban-do-kien-thuc-can-hieu.md",
  "knowledge-base/foundations/du-lieu-task-va-benchmark.md",
  "knowledge-base/foundations/foundation-model-va-implementation.md",
  "knowledge-base/topic-selection/paper-va-de-tai-goi-y.md",
  "knowledge-base/topic-selection/ke-hoach-doc-paper-va-lam-bao-cao.md",
  "knowledge-base/topic-selection/danh-sach-topic-paper-va-implementation.md",
  "knowledge-base/topic-selection/xep-hang-topic-va-top-2.md",
  "knowledge-base/topics/mafft-iqtree-2/tong-quan.md",
  "knowledge-base/topics/mafft-iqtree-2/replication-roadmap.md",
  "knowledge-base/topics/mafft-iqtree-2/phat-trien-va-ung-dung.md",
  "knowledge-base/topics/prodigal/tong-quan.md",
  "knowledge-base/topics/prodigal/replication-roadmap.md",
  "knowledge-base/topics/prodigal/phat-trien-va-ung-dung.md",
  "hf-topics/README.md",
  "hf-topics/dnabert-2/tong-quan.md",
  "hf-topics/dnabert-2/paper-va-phuong-phap.md",
  "hf-topics/dnabert-2/implementation-va-replication.md",
  "hf-topics/dnabert-2/ung-dung-va-tiem-nang.md",
  "hf-topics/dnabert-2/nguon.md",
  "hf-topics/gengram/tong-quan.md",
  "hf-topics/gengram/paper-va-phuong-phap.md",
  "hf-topics/gengram/implementation-va-replication.md",
  "hf-topics/gengram/ung-dung-va-tiem-nang.md",
  "hf-topics/gengram/nguon.md",
];
const bundleMarkdownFiles = markdownFiles.filter((fileName) => fileName !== "README.md");

const FONT_BODY = "Times New Roman";
const FONT_CODE = "Consolas";
const COLOR_TEXT = "1F1F1F";
const COLOR_MUTED = "5F6B7A";
const COLOR_ACCENT = "1F4E79";
const COLOR_BORDER = "D9E2F0";
const COLOR_TABLE_HEADER = "EAF2FF";

type InlineNode = TextRun | ExternalHyperlink;
type DocElement = Paragraph | Table;
type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bulletList"; items: string[] }
  | { type: "orderedList"; items: string[] }
  | { type: "codeBlock"; lines: string[] }
  | { type: "table"; header: string[]; rows: string[][] };

type MarkdownDoc = {
  fileName: string;
  title: string;
  blocks: Block[];
};

const headingLevels: Record<number, HeadingLevel> = {
  1: HeadingLevel.HEADING_1,
  2: HeadingLevel.HEADING_2,
  3: HeadingLevel.HEADING_3,
  4: HeadingLevel.HEADING_4,
  5: HeadingLevel.HEADING_5,
  6: HeadingLevel.HEADING_6,
};

async function writeFileWithRetry(targetPath: string, buffer: Buffer, attempts = 5) {
  let lastError: unknown;

  for (let index = 0; index < attempts; index += 1) {
    try {
      await writeFile(targetPath, buffer);
      return;
    } catch (error) {
      lastError = error;
      if (index === attempts - 1) {
        break;
      }
      await Bun.sleep(200);
    }
  }

  throw lastError;
}

function normalizeLine(line: string) {
  return line.replace(/\t/g, "    ").trimEnd();
}

function bodyRun(text: string, options: Record<string, unknown> = {}) {
  return new TextRun({
    text,
    font: FONT_BODY,
    size: 24,
    color: COLOR_TEXT,
    ...options,
  });
}

function codeRun(text: string) {
  return new TextRun({
    text,
    font: FONT_CODE,
    size: 22,
    color: "2F3A46",
  });
}

function pushPlainText(children: InlineNode[], text: string) {
  if (!text) return;
  children.push(bodyRun(text));
}

function parseInline(text: string): InlineNode[] {
  const children: InlineNode[] = [];
  const regex = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let cursor = 0;

  for (const match of text.matchAll(regex)) {
    const index = match.index ?? 0;
    pushPlainText(children, text.slice(cursor, index));

    if (match[1]) {
      children.push(codeRun(match[1].slice(1, -1)));
    } else if (match[2]) {
      children.push(bodyRun(match[2].slice(2, -2), { bold: true }));
    } else if (match[3]) {
      const label = match[4] ?? "";
      const target = match[5] ?? "";
      if (/^https?:\/\//i.test(target)) {
        children.push(
          new ExternalHyperlink({
            link: target,
            children: [
              new TextRun({
                text: label,
                style: "Hyperlink",
                font: FONT_BODY,
                size: 24,
              }),
            ],
          }),
        );
      } else {
        children.push(bodyRun(label));
      }
    }

    cursor = index + match[0].length;
  }

  pushPlainText(children, text.slice(cursor));
  return children;
}

function isTableLine(line: string) {
  const trimmed = line.trim();
  return trimmed.startsWith("|") && trimmed.endsWith("|");
}

function parseTableRow(line: string) {
  const trimmed = line.trim();
  return trimmed
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(row: string[]) {
  return row.length > 0 && row.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function parseBlocks(content: string): Block[] {
  const lines = content.split(/\r?\n/).map(normalizeLine);
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length && lines[index].trim().startsWith("```")) {
        index += 1;
      }

      blocks.push({
        type: "codeBlock",
        lines: codeLines,
      });
      continue;
    }

    if (isTableLine(line)) {
      const tableLines: string[] = [];
      while (index < lines.length && isTableLine(lines[index])) {
        tableLines.push(lines[index]);
        index += 1;
      }

      const rows = tableLines.map(parseTableRow).filter((row) => row.some((cell) => cell.length > 0));
      if (rows.length > 0) {
        const hasSeparator = rows.length > 1 && isTableSeparator(rows[1]);
        const header = rows[0];
        const bodyRows = hasSeparator ? rows.slice(2) : rows.slice(1);
        blocks.push({ type: "table", header, rows: bodyRows });
      }
      continue;
    }

    if (/^-\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^-\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^-\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "bulletList", items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "orderedList", items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const current = lines[index].trim();
      if (!current) break;
      if (/^(#{1,6})\s+/.test(current)) break;
      if (current.startsWith("```")) break;
      if (/^-\s+/.test(current)) break;
      if (/^\d+\.\s+/.test(current)) break;
      if (isTableLine(current)) break;
      paragraphLines.push(current);
      index += 1;
    }

    blocks.push({
      type: "paragraph",
      text: paragraphLines.join(" "),
    });
  }

  return blocks;
}

function fallbackTitleFromFileName(fileName: string) {
  if (fileName === "README.md") {
    return "Bộ tài liệu research INT 7021";
  }

  return fileName
    .replace(/\.md$/i, "")
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function loadMarkdownDoc(fileName: string): Promise<MarkdownDoc> {
  const fullPath = path.join(rootDir, fileName);
  const content = await readFile(fullPath, "utf8");
  const blocks = parseBlocks(content);

  let title = fallbackTitleFromFileName(fileName);
  if (blocks[0]?.type === "heading" && blocks[0].level === 1) {
    title = blocks[0].text;
    blocks.shift();
  }

  return {
    fileName,
    title,
    blocks,
  };
}

function createDocTitle(title: string, subtitle: string): Paragraph[] {
  return [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        bodyRun(title, {
          bold: true,
          size: 36,
          color: COLOR_ACCENT,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 320 },
      children: [
        bodyRun(subtitle, {
          italics: true,
          size: 22,
          color: COLOR_MUTED,
        }),
      ],
    }),
  ];
}

function renderHeading(level: number, text: string) {
  const heading = headingLevels[Math.min(level, 6)] ?? HeadingLevel.HEADING_2;
  const sizeMap: Record<number, number> = {
    1: 32,
    2: 28,
    3: 26,
    4: 24,
    5: 24,
    6: 24,
  };

  return new Paragraph({
    heading,
    spacing: {
      before: level <= 2 ? 260 : 180,
      after: 120,
    },
    children: [
      bodyRun(text, {
        bold: true,
        size: sizeMap[level] ?? 24,
        color: level <= 2 ? COLOR_ACCENT : COLOR_TEXT,
      }),
    ],
  });
}

function renderParagraph(text: string) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: {
      after: 140,
      line: 360,
    },
    children: parseInline(text),
  });
}

function renderBulletList(items: string[]) {
  return items.map(
    (item) =>
      new Paragraph({
        bullet: { level: 0 },
        spacing: {
          after: 80,
          line: 320,
        },
        children: parseInline(item),
      }),
  );
}

function renderOrderedList(items: string[]) {
  return items.map(
    (item, index) =>
      new Paragraph({
        indent: { left: 720, hanging: 360 },
        spacing: {
          after: 80,
          line: 320,
        },
        children: [bodyRun(`${index + 1}. `, { bold: true }), ...parseInline(item)],
      }),
  );
}

function renderCodeBlock(lines: string[]) {
  const safeLines = lines.length > 0 ? lines : [""];

  return safeLines.map(
    (line, index) =>
      new Paragraph({
        indent: {
          left: 480,
          right: 240,
        },
        spacing: {
          before: index === 0 ? 80 : 0,
          after: index === safeLines.length - 1 ? 160 : 20,
          line: 280,
        },
        children: [codeRun(line || " ")],
      }),
  );
}

function createTableCell(text: string, options: { header?: boolean; cellCount: number }) {
  return new TableCell({
    width: {
      size: 100 / Math.max(options.cellCount, 1),
      type: WidthType.PERCENTAGE,
    },
    shading: options.header ? { fill: COLOR_TABLE_HEADER } : undefined,
    margins: {
      top: 100,
      bottom: 100,
      left: 120,
      right: 120,
    },
    children: [
      new Paragraph({
        alignment: options.header ? AlignmentType.CENTER : AlignmentType.LEFT,
        spacing: { after: 0, line: 300 },
        children: options.header
          ? [bodyRun(text, { bold: true })]
          : parseInline(text),
      }),
    ],
  });
}

function renderTable(header: string[], rows: string[][]) {
  const columnCount = header.length;
  const normalizedRows = rows.map((row) =>
    Array.from({ length: columnCount }, (_, index) => row[index] ?? ""),
  );

  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    layout: TableLayoutType.FIXED,
    borders: {
      top: { style: BorderStyle.SINGLE, color: COLOR_BORDER, size: 1 },
      bottom: { style: BorderStyle.SINGLE, color: COLOR_BORDER, size: 1 },
      left: { style: BorderStyle.SINGLE, color: COLOR_BORDER, size: 1 },
      right: { style: BorderStyle.SINGLE, color: COLOR_BORDER, size: 1 },
      insideHorizontal: { style: BorderStyle.SINGLE, color: COLOR_BORDER, size: 1 },
      insideVertical: { style: BorderStyle.SINGLE, color: COLOR_BORDER, size: 1 },
    },
    rows: [
      new TableRow({
        tableHeader: true,
        children: header.map((cell) => createTableCell(cell, { header: true, cellCount: columnCount })),
      }),
      ...normalizedRows.map(
        (row) =>
          new TableRow({
            children: row.map((cell) => createTableCell(cell, { cellCount: columnCount })),
          }),
      ),
    ],
  });
}

function renderBlocks(blocks: Block[]): DocElement[] {
  const children: DocElement[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "heading":
        children.push(renderHeading(block.level, block.text));
        break;
      case "paragraph":
        children.push(renderParagraph(block.text));
        break;
      case "bulletList":
        children.push(...renderBulletList(block.items));
        break;
      case "orderedList":
        children.push(...renderOrderedList(block.items));
        break;
      case "codeBlock":
        children.push(...renderCodeBlock(block.lines));
        break;
      case "table":
        children.push(renderTable(block.header, block.rows));
        children.push(new Paragraph({ text: "" }));
        break;
    }
  }

  return children;
}

function createHeader(title: string) {
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { after: 0 },
        children: [
          bodyRun(title, {
            size: 18,
            color: COLOR_MUTED,
            italics: true,
          }),
        ],
      }),
    ],
  });
}

function createFooter() {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({
            font: FONT_BODY,
            size: 18,
            color: COLOR_MUTED,
            children: ["Trang ", PageNumber.CURRENT],
          }),
        ],
      }),
    ],
  });
}

function createSection(title: string, children: DocElement[], nextPage = false) {
  return {
    properties: {
      type: nextPage ? SectionType.NEXT_PAGE : undefined,
      page: {
        margin: {
          top: 1440,
          right: 1440,
          bottom: 1440,
          left: 1440,
        },
      },
    },
    headers: {
      default: createHeader(title),
    },
    footers: {
      default: createFooter(),
    },
    children,
  };
}

function buildDocument(doc: MarkdownDoc) {
  const subtitle =
    doc.fileName === "README.md"
      ? "Bộ research cho học phần INT 7021 - Tin sinh học cho dữ liệu lớn"
      : "Học phần INT 7021 - Tin sinh học cho dữ liệu lớn";

  return new Document({
    title: doc.title,
    description: `Tài liệu ${doc.title} của học phần INT 7021`,
    creator: "OpenAI Codex",
    sections: [
      createSection(doc.title, [...createDocTitle(doc.title, subtitle), ...renderBlocks(doc.blocks)]),
    ],
  });
}

async function buildDocx(doc: MarkdownDoc, targetPath: string) {
  await mkdir(path.dirname(targetPath), { recursive: true });
  const buffer = await Packer.toBuffer(buildDocument(doc));
  await writeFileWithRetry(targetPath, buffer);
}

function createBundleCover(docs: MarkdownDoc[]): DocElement[] {
  const today = "06/03/2026";

  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
      children: [
        bodyRun("INT 7021", {
          bold: true,
          size: 40,
          color: COLOR_ACCENT,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        bodyRun("Bộ tài liệu research - Tin sinh học cho dữ liệu lớn", {
          bold: true,
          size: 28,
          color: COLOR_TEXT,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 320 },
      children: [
        bodyRun(`Bản DOCX đã được chuẩn hóa font và layout | Cập nhật ${today}`, {
          italics: true,
          size: 22,
          color: COLOR_MUTED,
        }),
      ],
    }),
    renderHeading(2, "Cấu trúc bộ tài liệu"),
    ...renderBulletList(docs.map((doc) => doc.title)),
    renderParagraph(
      "Bản gộp này ưu tiên khả năng đọc như một tài liệu học phần hoàn chỉnh: tiêu đề thống nhất, khoảng cách nhất quán, bảng rõ ràng, và footer số trang.",
    ),
  ];
}

async function buildBundle(outDir: string, docs: MarkdownDoc[]) {
  const sections = [
    createSection("INT 7021 - Bộ tài liệu research", createBundleCover(docs)),
    ...docs.map((doc) =>
      createSection(
        doc.title,
        [...createDocTitle(doc.title, "Học phần INT 7021 - Tin sinh học cho dữ liệu lớn"), ...renderBlocks(doc.blocks)],
        true,
      ),
    ),
  ];

  const bundle = new Document({
    title: "INT 7021 - Bộ tài liệu research",
    description: "Bản gộp DOCX của bộ tài liệu research cho học phần INT 7021",
    creator: "OpenAI Codex",
    sections,
  });

  const buffer = await Packer.toBuffer(bundle);
  await writeFileWithRetry(path.join(outDir, "INT-7021-research-bundle.docx"), buffer);
}

async function main() {
  const outDir = path.join(rootDir, "docx");
  await mkdir(outDir, { recursive: true });

  const docs = await Promise.all(markdownFiles.map((fileName) => loadMarkdownDoc(fileName)));

  for (const doc of docs) {
    const targetName = doc.fileName.replace(/\.md$/i, ".docx");
    const targetPath = path.join(outDir, targetName);
    await buildDocx(doc, targetPath);
  }

  const bundleDocs = docs.filter((doc) => bundleMarkdownFiles.includes(doc.fileName));
  await buildBundle(outDir, bundleDocs);
}

await main();
