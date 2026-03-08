# Hugging Face topics: execution status

## Mục tiêu của file này

File này ghi lại chính xác những gì đã được chạy thật trong workspace cho hai topic:

- `DNABERT-2`
- `Gengram`

Nó không thay thế dossier research. Vai trò của nó là nhật ký kỹ thuật: đã làm gì, chạy tới đâu, kết quả gì, và đang bị chặn ở đâu.

## Cô lập môi trường

Đã tạo hai môi trường `conda` riêng trong workspace:

- `C:\Users\PC\Workspaces\KimAnh\test_gpt_5.4_research\.conda-envs\dnabert2`
- `C:\Users\PC\Workspaces\KimAnh\test_gpt_5.4_research\.conda-envs\gengram`

Lý do dùng `--prefix` thay vì env toàn cục:

- tránh đụng môi trường có sẵn trên máy;
- dễ xóa hoặc dựng lại;
- giữ đúng tinh thần cô lập cho từng repo.

Ngoài hai env local đã chạy thật, workspace hiện cũng có thêm bộ `flexible environment specs` trong `envs/` để người khác dựng lại môi trường mà không bị khóa cứng vào đúng máy này.

## Repo đã clone

Hai repo chính thức đã được clone vào `vendor/` để chạy thử:

- `vendor/DNABERT_2`
- `vendor/Gengram`

Thư mục `vendor/` đang bị ignore trong `.gitignore`, nên hai repo clone này không bị đẩy lên GitHub của workspace này.

## `DNABERT-2`: những gì đã chạy

### 1. Cài môi trường

Đã cài dependencies chính từ `requirements.txt` của repo, rồi chỉnh `numpy` xuống `<2` để tránh cảnh báo ABI giữa `torch 1.13.1` và `numpy 2.x`.

### 2. Smoke inference với checkpoint public

Đã chạy script:

- `scripts/smoke_dnabert2.py`

Kết quả:

- model public `zhihan1996/DNABERT-2-117M` tải được;
- tokenizer và `AutoModel` load được;
- inference chạy được;
- embedding mean/max được tính thành công.

File kết quả:

- `dnabert2_smoke_result.json`

### 3. Run repo thật với `train.py`

Đã chạy:

- `vendor/DNABERT_2/finetune/train.py`

Thiết lập:

- dùng `sample_data` của repo;
- chạy `CPU-only`;
- đặt `max_steps=2` để smoke test end-to-end;
- mục tiêu là xác nhận pipeline `tokenizer -> model -> trainer -> eval metrics` hoạt động.

Kết quả:

- train chạy xong;
- eval chạy xong;
- pipeline repo thật hoạt động.

Metric chính của smoke run:

- `eval_accuracy = 0.6`
- `eval_f1 = 0.5833`
- `train_loss ≈ 0.6928`

### 4. Kết luận cho `DNABERT-2`

`DNABERT-2` đã vượt qua mức research và đã được chạy thật theo cả hai lớp:

- load checkpoint public;
- chạy `train.py` của repo trên dữ liệu mẫu.

Topic này hiện là topic đã sẵn sàng nhất để đi tiếp sang pilot lớn hơn.

## `Gengram`: những gì đã chạy

### 1. Cài môi trường

Đã cài một môi trường riêng và cài package theo hướng tối thiểu:

- `torch`
- `numpy`
- `transformers`
- `sentencepiece`
- cài editable package từ repo `vendor/Gengram`

Trong quá trình smoke test, đã phải bổ sung thêm `six`.

### 2. Smoke import của repo

Đã chạy script:

- `scripts/smoke_gengram_import.py`

Kết quả:

- import được `megatron.core`;
- import được `gpt_builders.py`;
- import được `model_provider.py`;
- repo root path và package path map đúng.

File kết quả:

- `vendor/Gengram/gengram_import_smoke_result.json`

### 3. Kiểm tra entrypoint thật của repo

Đã chạy:

- `vendor/Gengram/pretrain_gpt.py --help`

Ý nghĩa của bước này:

- xác nhận entrypoint chính của repo lên được;
- parser arguments hoạt động;
- stack code của repo không chết ngay ở import-time.

### 4. Những gì chưa chạy với `Gengram`

Chưa chạy:

- tải checkpoint `Gengram-10B`;
- inference thật với weight public;
- benchmark evaluation thật;
- training hoặc reproduction.

Lý do:

- model card công khai cho thấy artifact rất lớn;
- bản `torch` đã cần khoảng `70 GB`;
- bản `torch_dist` còn lớn hơn;
- repo là stack `Megatron` nặng, không phù hợp để lao ngay vào full run nếu chưa chốt rõ mục tiêu.

### 5. Kết luận cho `Gengram`

`Gengram` đã được chạy tới mức repo smoke có ý nghĩa:

- import core thành công;
- entrypoint chính chạy được ở chế độ `--help`.

Nhưng topic này chưa đạt mức “model đã chạy thật”. Đó là khác biệt quan trọng so với `DNABERT-2`.

## Blocker và ghi chú kỹ thuật

### `conda`

- `conda env list` trong sandbox lỗi do plugin CUDA;
- workaround đã dùng: `CONDA_NO_PLUGINS=true`;
- `conda create` ngoài sandbox phải ép `--solver classic` vì máy đang có cấu hình `libmamba` không nhận.

### `DNABERT-2`

- ban đầu env dùng `numpy 2.x`, tạo cảnh báo ABI với `torch 1.13.1`;
- đã sửa bằng cách pin `numpy<2`.

### `Gengram`

- repo fallback được khi thiếu `Transformer Engine` và `Apex`;
- điều này đủ cho smoke import, nhưng không có nghĩa là đã sẵn sàng cho full performance run.

## Trạng thái tổng kết

| Topic | Research dossier | Repo smoke | Model/checkpoint run | Đánh giá hiện tại |
| --- | --- | --- | --- | --- |
| `DNABERT-2` | Xong | Xong | Xong ở mức smoke + `train.py` mẫu | Sẵn sàng đi tiếp |
| `Gengram` | Xong | Xong | Chưa | Cần bước execution nặng hơn nếu muốn đi tiếp |

## Bước tiếp theo hợp lý

Nếu tiếp tục từ trạng thái hiện tại:

1. Ưu tiên `DNABERT-2` cho pilot mở rộng trên GPU.
2. Chỉ nên đẩy `Gengram` sang bước tải model khi đã chấp nhận chi phí dung lượng và dependency lớn hơn nhiều.
