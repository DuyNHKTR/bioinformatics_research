# Knowledge base cho INT 7021

## Vai trò của nhánh này

`knowledge-base/` là nhánh tài liệu chính của workspace. Mục tiêu của nhánh này là thay cách đọc theo số file bằng cách đọc theo nhóm nội dung:

- `course`: hiểu học phần đang dạy gì
- `foundations`: hiểu các khái niệm và công cụ nền
- `topic-selection`: hiểu cách chọn đề tài, chọn `paper`, và logic ranking
- `topics`: đi sâu vào từng topic đã chốt

## Cấu trúc hiện tại

```text
knowledge-base/
  course/
    tong-quan-hoc-phan.md
    noi-dung-theo-buoi.md
    nguon-tham-khao.md
  foundations/
    ban-do-khai-niem-va-cong-cu.md
    ban-do-kien-thuc-can-hieu.md
    du-lieu-task-va-benchmark.md
    foundation-model-va-implementation.md
  topic-selection/
    paper-va-de-tai-goi-y.md
    ke-hoach-doc-paper-va-lam-bao-cao.md
    danh-sach-topic-paper-va-implementation.md
    xep-hang-topic-va-top-2.md
  topics/
    mafft-iqtree-2/
      tong-quan.md
      replication-roadmap.md
      phat-trien-va-ung-dung.md
    prodigal/
      tong-quan.md
      replication-roadmap.md
      phat-trien-va-ung-dung.md
```

## Cách đọc nhanh theo mục tiêu

### Nếu muốn bám course

1. `course/tong-quan-hoc-phan.md`
2. `course/noi-dung-theo-buoi.md`
3. `foundations/ban-do-khai-niem-va-cong-cu.md`

### Nếu muốn chọn topic

1. `foundations/du-lieu-task-va-benchmark.md`
2. `topic-selection/paper-va-de-tai-goi-y.md`
3. `topic-selection/danh-sach-topic-paper-va-implementation.md`
4. `topic-selection/xep-hang-topic-va-top-2.md`

### Nếu muốn đi thẳng vào topic cổ điển

- `topics/mafft-iqtree-2/`: phù hợp nếu ưu tiên `alignment + phylogenetic tree`.
- `topics/prodigal/`: phù hợp nếu ưu tiên `gene prediction` ít rủi ro hơn.

## Quan hệ với `hf-topics/`

`knowledge-base/` là nhánh chính cho course và hai topic bám rubric ảnh hơn. `hf-topics/` là nhánh mở rộng cho các topic mới hơn như `DNABERT-2` và `Gengram`, dùng khi muốn đọc theo hướng `foundation model` hiện đại hơn.
