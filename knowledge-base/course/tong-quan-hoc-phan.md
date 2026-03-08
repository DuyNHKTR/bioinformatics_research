# Tổng quan học phần INT 7021

## 1. Thông tin xác thực

- Trong khung CTĐT Sau đại học ngành Khoa học máy tính của UET, học phần `INT 7021 - Tin sinh học cho dữ liệu lớn / Bioinformatics for Big Data` có `3` tín chỉ; bảng CTĐT hiển thị `30` giờ tín chỉ lý thuyết, `0` thực hành, `15` giờ tín chỉ tự học quản lý. Ghi chú của CTĐT cũng nêu rằng học viên vẫn cần tự học thêm theo quy định chung. Nguồn: [CTĐT UET](https://www.uet.vnu.edu.vn/chuong-trinh-dao-tao-nganh-khoa-hoc-may-tinh-24/).
- Trên danh sách khóa học công khai của `Courses` UET, khóa học `Tin sinh học cho dữ liệu lớn (2324II_INT7021)` xuất hiện với giảng viên `Đặng Cao Cường` và `Hoàng Thị Điệp`. Nguồn: [Courses UET - danh sách khóa học](https://courses.uet.vnu.edu.vn/course/index.php?browse=courses&categoryid=82&page=1&perpage=20).
- Ảnh chụp lớp học trong thư mục này cho thấy mã lớp `310-12402-A`, lịch `6` buổi nội dung chính và các buổi chấm báo cáo. Nguồn: [ảnh lớp học](./9d313fa9-97ac-48bd-9600-451faa6b4e20.png).

## 2. Môn học này thực sự dạy gì

Nếu rút gọn thành một câu, đây là môn học nối:

`nền tảng molecular biology` + `dữ liệu sequence/genome/protein` + `thuật toán phân tích` + `pipeline` có thể chạy lại + `báo cáo theo paper`.

Ảnh lịch học cho thấy môn này không chỉ là giới thiệu lý thuyết. Cấu trúc của nó rất rõ:

- mở đầu bằng căn bản về bioinformatics và molecular biology;
- đi vào `sequence alignment` và tìm kiếm trên cơ sở dữ liệu sinh học;
- sang `genome analysis`;
- tiếp tục với `phylogenetic analysis` và `substitution matrix`;
- mở rộng sang `machine learning applications`;
- kết thúc bằng `gene prediction` và `biological networks`;
- sau đó sinh viên phải chốt hướng, chọn `paper`, chạy lại, và báo cáo.

Nói cách khác, đây là môn học theo hướng `research-oriented`, không phải môn chỉ để học thuật ngữ.

## 3. Đầu ra học tập thực dụng

Nếu học đúng trọng tâm, sau học phần này người học nên làm được các việc sau:

- Đọc được một `paper` bioinformatics ở mức cơ bản đến trung bình mà không bị mất mạch.
- Biết đặt câu hỏi đúng dạng: bài toán là gì, dữ liệu ở đâu, `pipeline` gồm những bước nào, kết quả được đánh giá bằng gì.
- Biết phân biệt các loại dữ liệu phổ biến: DNA, RNA, protein, `genome assembly`, `annotation`, `metadata`.
- Biết khi nào dùng `BLAST`, khi nào dùng `multiple sequence alignment`, khi nào dùng `phylogenetic tree`, khi nào dùng `gene prediction`, khi nào cần `machine learning`.
- Biết lấy dữ liệu từ các nguồn chính thống như `NCBI`, `UniProt`, `Ensembl`.
- Biết chọn một đề tài vừa sức, có `dataset` public, có `paper` nền rõ ràng, và có khả năng chạy lại trên máy cá nhân hoặc môi trường phổ biến.

## 4. Kiến thức nền cần có

Môn học dễ hơn rất nhiều nếu đã có sẵn các nền tảng sau:

- Python cơ bản để đọc file `FASTA`, `CSV`, `TSV`, `JSON`, `GFF`.
- Xác suất/thống kê cơ bản để đọc `score`, `E-value`, `support value`, `benchmark`, `precision`, `recall`.
- Thao tác `command line` tối thiểu.
- Hiểu ý niệm cơ bản về gene, protein, transcript, `mutation`, `homology`, `evolution`.

Nếu chưa có nền tảng sinh học, vẫn học được, nhưng cần bù thêm thời gian cho:

- cấu trúc DNA/RNA/protein;
- gene và quá trình biểu hiện gene;
- khác biệt giữa `nucleotide sequence` và `protein sequence`;
- ý nghĩa của `annotation` và `reference database`.

## 5. Cách học đúng môn này

Hướng học hiệu quả nhất cho môn này không phải là học thuộc từng định nghĩa, mà là học theo `pipeline`:

1. Bắt đầu từ một câu hỏi sinh học rõ ràng.
2. Xác định dữ liệu phù hợp.
3. Chọn `tool` đúng loại bài toán.
4. Chạy thử trên một tập nhỏ.
5. Kiểm tra kết quả bằng lý do sinh học và lý do kỹ thuật.
6. Mới viết báo cáo.

Ảnh chụp lớp học cũng hàm ý một chuẩn chất lượng rất rõ:

- nên chọn dữ liệu thuộc `molecular biology`;
- tránh đề tài lệch hướng như EEG;
- nên chọn `paper` cơ bản, dễ đọc và chạy lại được;
- lấy một `paper` làm trung tâm, rồi mở rộng bằng các `paper` liên quan.

Đây là một chỉ dẫn rất thực dụng. Trong học phần này, `paper` có giá trị nhất không phải là bài hot nhất, mà là bài có `pipeline` rõ, dữ liệu sẵn, và có thể giải thích được từng bước.

## 6. Môn học này "big data" ở đâu

Từ `dữ liệu lớn` trong tên môn không có nghĩa bắt buộc phải dùng `cluster` lớn ngay từ đầu. Trong bioinformatics, tính chất "lớn" xuất hiện ở:

- số lượng `sequence` rất lớn;
- `database` có cập nhật liên tục;
- `annotation` và `metadata` phức tạp;
- bài toán cần kết hợp nhiều nguồn dữ liệu;
- tính toán có thể tăng nhanh theo số lượng mẫu và độ dài `sequence`.

Vì vậy, trong môn này cần nghĩ theo hai lớp:

- lớp `biology`: bài toán sinh học là gì;
- lớp `computation`: dữ liệu vào, dữ liệu ra, thời gian chạy, bộ nhớ, độ tin cậy, khả năng lặp lại.

## 7. Kỹ năng nên ưu tiên luyện

Nếu phải ưu tiên, nên luyện các kỹ năng sau trước:

- đọc `abstract` và `methods` của `paper`;
- đọc và lọc `dataset`;
- hiểu định dạng file cơ bản;
- dùng một `tool` đến mức có thể giải thích `input -> output`;
- vẽ được một `pipeline` đơn giản bằng sơ đồ hoặc bằng danh sách;
- viết được phần `limitations` thay vì chỉ viết `results`.

## 8. Cách đánh giá thành công của bản thân trong môn này

Bạn có thể xem mình đang đi đúng hướng nếu làm được các việc sau mà không cần học thuộc lòng:

- nhìn vào một bài toán và nói được nên bắt đầu bằng `BLAST`, `alignment`, `tree`, `gene prediction`, hay `machine learning`;
- nhìn vào một `paper` và chỉ ra được `dataset`, `method`, `metric`, `extension`;
- tự làm được một `mini-pipeline` có log, có kết quả, có nhận xét;
- tự giải thích được vì sao đề tài mình chọn là vừa sức.

## 9. Nguồn xác thực nên đọc trước

- [Khung CTĐT UET có học phần INT 7021](https://www.uet.vnu.edu.vn/chuong-trinh-dao-tao-nganh-khoa-hoc-may-tinh-24/)
- [Danh sách khóa học công khai của Courses UET có lớp 2324II_INT7021](https://courses.uet.vnu.edu.vn/course/index.php?browse=courses&categoryid=82&page=1&perpage=20)
- [Ảnh lịch học trong thư mục](./9d313fa9-97ac-48bd-9600-451faa6b4e20.png)

Sau khi đọc file này, nên chuyển tiếp sang [02-noi-dung-theo-buoi.md](./02-noi-dung-theo-buoi.md).
