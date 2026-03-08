# Flexible env specs

Thư mục này chứa các `environment.yml` theo hướng `flexible`, không phải lock file cứng theo đúng máy đã chạy thử.

Mục tiêu:

- người khác có thể dựng môi trường nhanh;
- vẫn còn quyền chọn `torch` và `CUDA` theo máy của họ;
- tránh phụ thuộc tuyệt đối vào đúng version đã dùng trên máy hiện tại.

## Danh sách file

- `dnabert2.environment.yml`
- `gengram.environment.yml`

## Nguyên tắc dùng

Các file này cố tình:

- giữ `Python` trong khoảng hợp lý;
- pin những package có rủi ro tương thích rõ;
- không pin cứng `torch` theo một build duy nhất;
- không dùng `conda list --explicit`.

Lý do là `torch` phụ thuộc rất mạnh vào:

- `CPU` hay `GPU`
- version `CUDA`
- hệ điều hành

## `DNABERT-2`

### 1. Tạo env

```powershell
conda env create -f envs/dnabert2.environment.yml
conda activate dnabert2
```

### 2. Cài `torch`

Chọn đúng build theo máy.

Ví dụ `CPU-only`:

```powershell
pip install torch==1.13.1
```

Ví dụ `GPU`:

```powershell
pip install torch==1.13.1 --index-url https://download.pytorch.org/whl/cu117
```

Nếu bạn dùng build `torch` khác, cần tự chấp nhận rủi ro khác biệt so với smoke run trong workspace này.

### 3. Chạy smoke test

```powershell
python scripts/smoke_dnabert2.py
```

### 4. Chạy repo `train.py`

```powershell
python vendor/DNABERT_2/finetune/train.py `
  --model_name_or_path zhihan1996/DNABERT-2-117M `
  --data_path vendor/DNABERT_2/sample_data `
  --kmer -1 `
  --run_name dnabert2_smoke `
  --model_max_length 128 `
  --per_device_train_batch_size 2 `
  --per_device_eval_batch_size 2 `
  --gradient_accumulation_steps 1 `
  --learning_rate 3e-5 `
  --num_train_epochs 1 `
  --logging_steps 1 `
  --save_steps 10 `
  --output_dir vendor/DNABERT_2/finetune/output/dnabert2_smoke `
  --evaluation_strategy steps `
  --eval_steps 1 `
  --warmup_steps 0 `
  --overwrite_output_dir True `
  --log_level info `
  --find_unused_parameters False `
  --no_cuda True `
  --max_steps 2
```

## `Gengram`

### 1. Tạo env

```powershell
conda env create -f envs/gengram.environment.yml
conda activate gengram
```

### 2. Cài `torch`

Chọn build phù hợp với máy, ví dụ:

```powershell
pip install torch
```

Hoặc với build `CUDA` cụ thể theo hướng dẫn của PyTorch.

### 3. Cài repo editable

```powershell
pip install -e vendor/Gengram --no-deps
```

### 4. Smoke import

```powershell
Set-Location vendor/Gengram
python ..\..\scripts\smoke_gengram_import.py
```

### 5. Kiểm tra entrypoint

```powershell
python pretrain_gpt.py --help
```

## Ghi chú quan trọng

- Hai file `environment.yml` này là `flexible specs`, không phải `reproducible lock`.
- Nếu cần tái tạo gần như y hệt máy đã chạy thử, phải tạo thêm lock file riêng.
- Với `Gengram`, việc tải checkpoint thật vẫn là bước nặng và không được bao hàm trong env spec này.
