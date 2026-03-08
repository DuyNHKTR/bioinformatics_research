# Kế hoạch đọc paper và làm báo cáo

File này dùng như checklist thực thi. Mục tiêu là đi từ `paper` đến một báo cáo có `pipeline`, có kết quả, có phần mở rộng.

## 1. Khung làm việc tổng quát

Không nên đọc `paper` theo kiểu "đọc hết rồi mới làm". Cách hiệu quả hơn là:

1. Chốt câu hỏi.
2. Chốt `paper` nền.
3. Chốt `dataset`.
4. Chạy pilot trên tập nhỏ.
5. Mới đọc sâu hơn phần `methods`.
6. Chạy đầy đủ.
7. Viết báo cáo.

Môn này đánh giá cao khả năng `reproduce`, không đánh giá cao việc nhớ thật nhiều `background` nhưng không chạy được.

## 2. Template đọc paper

Mỗi `paper` nên đọc theo 8 câu hỏi cố định:

1. Bài toán sinh học cụ thể là gì?
2. Input là loại dữ liệu nào?
3. `Dataset` ở đâu, quy mô bao nhiêu?
4. `Pipeline` gồm các bước nào?
5. Method/tool chính là gì?
6. Đánh giá bằng metric nào?
7. Kết quả chính là gì?
8. Phần nào của bài có thể chạy lại được với điều kiện hiện có?

Nếu không trả lời được 8 câu này, chưa nên chọn `paper`.

## 3. Lộ trình 10 ngày thực dụng

### Ngày 1 - Chốt hướng và paper nền

- Chọn 1 hướng trong [04-paper-va-de-tai-goi-y.md](./04-paper-va-de-tai-goi-y.md).
- Chốt 1 `paper` nền trung tâm và 2-4 `paper` bổ trợ.
- Viết 5 dòng trả lời câu hỏi: bài toán, dữ liệu, tool, output, lý do đề tài này vừa sức.

### Ngày 2 - Chốt dataset và phạm vi

- Tìm `dataset` public cụ thể.
- Chốt quy mô pilot nhỏ.
- Chốt định dạng file sẽ dùng.
- Ghi rõ tiêu chí lọc dữ liệu.

### Ngày 3 - Vẽ pipeline

- Vẽ `pipeline` bằng 5-8 bước.
- Ở mỗi bước, ghi `input`, `tool`, `output`.
- Nếu có bước nào không biết input/output, quay lại giải quyết ngay.

### Ngày 4 - Chạy pilot

- Chạy trên tập dữ liệu nhỏ.
- Kiểm tra từng file trung gian.
- Kiểm tra xem có đọc được kết quả hay không, không chỉ là có file sinh ra.

### Ngày 5 - Đọc sâu methods

- Đọc lại `methods` của `paper` sau khi đã có pilot.
- Đánh dấu điểm giống và khác giữa `paper` gốc và `pipeline` mình có thể làm.
- Chốt phần nào là "tái lập", phần nào là "thích nghi".

### Ngày 6-7 - Chạy đầy đủ

- Tăng quy mô lên mức đã chốt.
- Lưu lại tham số quan trọng.
- Giữ log, tên file, và cách đặt tên nhất quán.

### Ngày 8 - Làm phần mở rộng

Chỉ chọn một hướng mở rộng, ví dụ:

- thêm vài mẫu nữa;
- đổi tiêu chí lọc dữ liệu;
- đổi taxon/nhóm nhỏ;
- so sánh hai cách setting;
- thêm metadata để diễn giải kết quả.

Không mở rộng quá 1 hướng trong bài môn học nếu thời gian eo hẹp.

### Ngày 9 - Viết báo cáo

Báo cáo tối thiểu nên có:

- `Mục tiêu`
- `Dataset`
- `Pipeline`
- `Kết quả`
- `Nhận xét`
- `Limitations`
- `Hướng mở rộng`

### Ngày 10 - Chuẩn bị slide

- 1 slide bài toán
- 1 slide dữ liệu
- 1 slide `pipeline`
- 2-3 slide kết quả
- 1 slide hạn chế
- 1 slide mở rộng / future work

## 4. Mục tiêu tối thiểu cho một báo cáo đạt yêu cầu

Một bài báo cáo đủ yêu cầu nên có:

- 1 `paper` nền rõ ràng;
- 1 bộ `dataset` public;
- 1 `pipeline` có thể giải thích `input -> output`;
- 1 kết quả chạy lại được;
- 1 phần mở rộng nhỏ;
- 1 phần `limitations` trung thực.

Không cần có kết quả "đẹp" theo nghĩa hoành tráng. Cần hơn là:

- logic;
- lặp lại được;
- biết vì sao kết quả như vậy.

## 5. Cấu trúc báo cáo để xài ngay

### 5.1 Mở đầu

- Bài toán sinh học là gì.
- Tại sao bài toán này quan trọng.
- Tại sao chọn hướng này cho học phần INT 7021.

### 5.2 Liên quan đến học phần

- Bài này dùng nội dung nào trong môn: `alignment`, `tree`, `gene prediction`, `machine learning`, ...

### 5.3 Dữ liệu

- Nguồn dữ liệu.
- Tiêu chí lọc.
- Quy mô.
- Định dạng file.

### 5.4 Phương pháp / pipeline

- Các bước xử lý theo đúng thứ tự.
- `Tool` dùng ở mỗi bước.
- Tham số hoặc lựa chọn quan trọng.

### 5.5 Kết quả

- Kết quả chính.
- Bảng/tập tin/figure quan trọng.
- Diễn giải sinh học hoặc kỹ thuật.

### 5.6 Hạn chế

- Giới hạn dữ liệu.
- Giới hạn công cụ.
- Giới hạn thời gian/compute.

### 5.7 Mở rộng

- Một thay đổi nhỏ so với `paper` gốc.
- Vì sao thay đổi đó có ý nghĩa.

## 6. Các câu hỏi giảng viên có thể hỏi

Nên tự trả lời trước các câu sau:

- Tại sao chọn đề tài này mà không chọn đề tài khác?
- `Dataset` này lấy ở đâu? Vì sao tin được?
- Vì sao dùng `tool` này?
- Nếu đổi `tool` hoặc đổi tiêu chí lọc, kết quả có thể thay đổi không?
- Phần nào là chạy lại, phần nào là mở rộng?
- Giới hạn lớn nhất của bài là gì?

## 7. Định nghĩa "mở rộng" hợp lý

Trong bài báo cáo môn học, `mở rộng` không cần quá tham. Một mở rộng hợp lý có thể chỉ là:

- thêm metadata để giải thích kết quả;
- thêm một nhóm mẫu để so sánh;
- đổi tiêu chí lọc dữ liệu;
- so sánh 2 cách setting;
- chuyển từ pilot sang bộ dữ liệu đầy đủ hơn.

Không nên biến "mở rộng" thành một đề tài mới.

## 8. Những dấu hiệu cần dừng lại để thu hẹp scope

- Chưa chốt được `paper` sau 1 ngày.
- `Dataset` quá lớn, tải về chưa xong đã muốn đổi hướng.
- Tool quá phức tạp, không đọc nổi input/output.
- Báo cáo đang nghiêng về review tổng quan hơn là tái lập `pipeline`.

Nếu gặp các dấu hiệu này, nên quay về hướng `virus phylogenetics` hoặc `Prodigal`.

## 9. Checklist trước khi nộp

- Đã nêu rõ `paper` nền.
- Đã nêu rõ nguồn `dataset`.
- Đã nêu rõ `tool`.
- Đã có ít nhất một kết quả chạy lại.
- Đã có ít nhất một nhận xét có cơ sở.
- Đã có phần `limitations`.
- Đã giữ tiếng Việt cho nội dung, chỉ để nguyên `technical terms` cần thiết.

Sau file này, dùng [06-nguon-tham-khao.md](./06-nguon-tham-khao.md) để đối chiếu và trích dẫn.
