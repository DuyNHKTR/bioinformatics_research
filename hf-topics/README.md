# Hugging Face topics cho INT 7021

## Vì sao nhánh này dùng cấu trúc thư mục

Các topic lấy từ hệ `Hugging Face Papers`, `model card`, `repo`, `benchmark` thường có nhiều lớp thông tin hơn hẳn một `paper` cổ điển: ngoài bài báo còn có checkpoint, code, dataset card, org page, và đôi khi nhiều namespace cùng tồn tại. Vì vậy, cách chia theo `topic -> phần việc` phù hợp hơn cách đánh số `1 -> x`.

Cấu trúc trong nhánh này cố tình tách thành 5 mảnh cho mỗi topic:

- `tong-quan`: topic là gì, vì sao đáng xem, mức độ phù hợp với course.
- `paper-va-phuong-phap`: đóng góp chính, ý tưởng cốt lõi, điểm mạnh và điểm yếu.
- `implementation-va-replication`: code, checkpoint, benchmark, mức dễ hay khó để chạy lại.
- `ung-dung-va-tiem-nang`: ứng dụng thực tế, giá trị nghiên cứu, và tiềm năng phát triển.
- `nguon`: danh sách nguồn chính thống.

## Hai topic đã chốt

| Topic | Vai trò trong shortlist | Mức độ phù hợp để đi tiếp |
| --- | --- | --- |
| `DNABERT-2` | Phương án cân bằng nhất giữa `popular`, có `paper`, có `repo`, có `model`, và còn đủ thực dụng để làm pilot | Cao |
| `Gengram` | Hướng mới hơn, giàu tiềm năng hơn, phản ánh làn sóng genomic `foundation model` có bộ nhớ dài hạn | Trung bình đến cao, nhưng rủi ro cao hơn |

## Cách đọc khuyến nghị

Nếu mục tiêu là chọn một topic có xác suất biến thành bài làm được cao hơn, hãy đọc theo thứ tự:

1. `dnabert-2/tong-quan.md`
2. `dnabert-2/paper-va-phuong-phap.md`
3. `dnabert-2/implementation-va-replication.md`
4. `dnabert-2/ung-dung-va-tiem-nang.md`

Nếu mục tiêu là đánh giá một hướng mới và có thể có `insane potential`, đọc thêm:

1. `gengram/tong-quan.md`
2. `gengram/paper-va-phuong-phap.md`
3. `gengram/implementation-va-replication.md`
4. `gengram/ung-dung-va-tiem-nang.md`

## Nhận định nhanh

- `DNABERT-2` là topic nên đọc trước và cũng là topic dễ chuyển sang pilot hơn.
- `Gengram` hấp dẫn hơn ở góc độ nghiên cứu mới, nhưng mức không chắc chắn cao hơn vì hệ asset hiện phân tán giữa `paper page`, `model card`, và hệ `Genos`.
- Nếu quay lại rubric từ ảnh theo nghĩa chặt nhất là `paper cơ bản + code mở + chạy lại được`, `DNABERT-2` vẫn an toàn hơn `Gengram`.
- Nếu mục tiêu là đánh giá xu hướng `genomic foundation model` mới trên `Hugging Face`, `Gengram` là case đáng đọc.
