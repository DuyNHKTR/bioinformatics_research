# INT 7021 - Bộ tài liệu research

Bộ workspace này tổng hợp research cho học phần `INT 7021 - Tin sinh học cho dữ liệu lớn / Bioinformatics for Big Data`, viết bằng tiếng Việt và giữ nguyên các `technical terms`, tên `tool`, tên `database`, tên `paper`.

## Cách tổ chức tài liệu

Workspace hiện có hai nhánh tài liệu chính:

- `knowledge-base/`: nhánh chính cho toàn bộ tài liệu course, nền tảng, chọn topic, và hai topic cổ điển.
- `hf-topics/`: nhánh mở rộng cho các topic lấy từ hệ `Hugging Face Papers / model cards / repo`.

## Cây thư mục chính

```text
knowledge-base/
  README.md
  course/
  foundations/
  topic-selection/
  topics/

hf-topics/
  README.md
  dnabert-2/
  gengram/

envs/
  README.md
  dnabert2.environment.yml
  gengram.environment.yml
```

## Đường đọc khuyến nghị

1. Bắt đầu từ `knowledge-base/README.md`.
2. Nếu cần bám course trước, đọc `knowledge-base/course/`.
3. Nếu cần nắm nền tảng trước khi đọc topic, đọc `knowledge-base/foundations/`.
4. Nếu cần hiểu logic chọn đề tài, đọc `knowledge-base/topic-selection/`.
5. Nếu đi theo topic truyền thống, đọc `knowledge-base/topics/mafft-iqtree-2/` hoặc `knowledge-base/topics/prodigal/`.
6. Nếu đi theo hướng topic mới từ hệ `Hugging Face`, đọc `hf-topics/README.md`.
7. Nếu cần dựng môi trường chạy repo, đọc `envs/README.md`.

## Ghi chú

- Ảnh gốc của lớp học được giữ tại `9d313fa9-97ac-48bd-9600-451faa6b4e20.png`.
- Các file trong `docx/` được sinh từ `scripts/md-to-docx.ts` bằng `bun run build:docx`.
- Một số source code hoặc binary thử nghiệm có thể xuất hiện trong `vendor/`; đó là phần phụ trợ cho các bước sau, không phải trung tâm của bộ research.
- `envs/` chứa `flexible environment specs`, không phải lock file cứng theo đúng một máy.
