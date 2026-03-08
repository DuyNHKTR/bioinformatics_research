# Nội dung theo buổi

File này map lịch học trong ảnh sang những gì cần nắm, những gì cần học thêm, và những gì có giá trị trực tiếp cho bài báo cáo.

## Ghi chú quan trọng rút ra từ ảnh lớp học

Phần ghi chú ở đầu slide cho thấy cách làm bài của học phần:

- nên tìm chủ đề gần với bioinformatics;
- nên ưu tiên dữ liệu `molecular biology`;
- tránh hướng lệch đề tài như EEG;
- nên chọn `paper` cơ bản thay vì đề tài quá nặng như `AlphaFold`;
- lấy `paper` làm trung tâm, rồi mở rộng bằng các bài liên quan;
- phải `chạy lại paper`, không chỉ tóm tắt.

Đây là "rubric ngầm" của môn học. Nếu đề tài không chạy lại được, khả năng cao là đề tài đó không hợp môn.

## Buổi 1 - Tổng quan môn và cơ sở molecular biology

Theo ảnh lớp học:

- `GV: Đặng Cao Cường`
- `Chương 1: Cơ bản về tin sinh học và dữ liệu lớn`
- `Chương 2: Cơ bản về sinh học phân tử`

Cần nắm:

- Bioinformatics giải quyết bài toán gì.
- Tại sao `sequence`, `genome`, `protein`, `annotation`, `metadata` là trung tâm của bài toán.
- DNA, RNA, protein liên hệ với nhau thế nào.
- `Gene`, `coding region`, `transcript`, `protein sequence` khác nhau ra sao.
- Tại sao cần `database` chính thống và dữ liệu `public`.

Cần làm được sau buổi này:

- nói được đề tài mình quan tâm thuộc nhóm bài toán nào;
- xác định được loại dữ liệu chính sẽ dùng;
- loại bỏ sớm các đề tài không đúng scope.

`Tool`/nguồn nên biết ngay:

- `NCBI`
- `UniProt`
- `Ensembl`
- `Biopython`

## Buổi 2 - Pairwise alignment và tìm kiếm trên database

Theo ảnh lớp học:

- `GV: Hoàng Thị Điệp`
- `Chương 3: Đồng hàng hai trình tự và tìm kiếm trình tự sinh học trên các cơ sở dữ liệu`
- `Chương 4: Đồng hàng đa trình tự`

Cần nắm:

- `pairwise alignment` dùng để làm gì;
- khác nhau giữa `local alignment` và `global alignment`;
- `homology` không đồng nghĩa với `similarity`;
- `E-value`, `score`, `identity`, `coverage` được đọc như thế nào;
- tại sao `multiple sequence alignment` là bước đầu vào cho nhiều bài toán sau.

Cần làm được sau buổi này:

- dùng `BLAST` để tìm `homolog`;
- đọc được bảng kết quả `BLAST`;
- chọn một nhóm `sequence` hợp lệ để đưa vào `multiple sequence alignment`.

`Tool`/nguồn nên biết:

- `BLAST`
- `Biopython SeqIO`
- `NCBI Bookshelf BLAST Help`

## Buổi 3 - Genome analysis

Theo ảnh lớp học:

- `GV: Hoàng Thị Điệp`
- `Chương 9: Phân tích hệ gen`

Cần nắm:

- `genome` và `genome assembly` là gì;
- `annotation` là gì và tại sao phải tách `sequence` với `annotation`;
- dữ liệu `genome` có thể lấy ở đâu;
- khi nào nên dùng `RefSeq`, khi nào nên dùng `GenBank`, khi nào nên dùng `Ensembl`.

Cần làm được sau buổi này:

- tải về một bộ `genome` public;
- đọc được file `FASTA`, `GFF`, `GenBank`;
- biết cách liên kết gene/protein/annotation/metadata.

`Tool`/nguồn nên biết:

- `NCBI Datasets`
- `Ensembl`
- `Biopython`

## Buổi 4 - Phylogenetic analysis và substitution matrix

Theo ảnh lớp học:

- `GV: Đặng Cao Cường`
- `Chương 5: Phân tích cây phát sinh loài`
- `Chương 6: Ước lượng ma trận thay thế axit amin từ dữ liệu lớn`

Cần nắm:

- tại sao `multiple sequence alignment` là đầu vào của `phylogenetic inference`;
- `guide tree`, `likelihood`, `bootstrap support`, `model` có ý nghĩa gì;
- `substitution matrix` ảnh hưởng tới `alignment` và diễn giải kết quả ra sao;
- `tree` dùng để trả lời câu hỏi nào và không dùng để trả lời câu hỏi nào.

Cần làm được sau buổi này:

- chạy một `alignment` có thể dùng cho cây;
- dùng `IQ-TREE 2` hoặc một `tool` tương đương để tạo cây;
- đọc được `support value` và nhận biết những nhánh không ổn định.

`Tool`/nguồn nên biết:

- `MAFFT`
- `IQ-TREE 2`
- `UFBoot2`

## Buổi 5 - Machine learning applications

Theo ảnh lớp học:

- `GV: Đặng Cao Cường`
- `Chương 7: Ứng dụng machine learning giải quyết một số bài toán tin sinh học với dữ liệu lớn`

Cần nắm:

- bài toán nào trong bioinformatics hợp với `machine learning`;
- khác nhau giữa `feature-based pipeline` và `end-to-end model`;
- cần cảnh giác với `data leakage`, `class imbalance`, `benchmark` không công bằng;
- vì sao nhiều bài `deep learning` dù hợp thời sự nhưng không hợp để làm môn học.

Cần làm được sau buổi này:

- nhìn một `paper machine learning` và rút ra được `input`, `label`, `split`, `metric`;
- biết đề tài nào là vừa sức cho một bài báo cáo môn học;
- tránh bị hấp dẫn bởi đề tài quá nặng chỉ vì nó "hot".

Hướng vừa sức nhất cho học phần:

- dùng `machine learning` ở mức `application` rõ ràng, dữ liệu `public`, `pipeline` ngắn, có baseline;
- tránh đề tài cần quá nhiều `GPU`, data cleaning quá lớn, hoặc phải tái lập hệ thống rất phức tạp.

## Buổi 6 - Gene prediction và mạng sinh học

Theo ảnh lớp học:

- `GV: Hoàng Thị Điệp`
- `Chương 8: Dự đoán gen / Các mạng sinh học phức tạp`

Cần nắm:

- `gene prediction` là bài toán gì;
- sự khác nhau giữa bài toán `prokaryotic gene prediction` và `eukaryotic gene prediction`;
- khi nào một bài toán mạng sinh học là thực dụng cho môn học, khi nào nó quá rộng;
- vai trò của `training data`, `annotation`, `extrinsic evidence`.

Cần làm được sau buổi này:

- đánh giá được độ khả thi của một đề tài `gene prediction`;
- biết dùng `Prodigal` cho bài toán prokaryote và `AUGUSTUS` cho eukaryote ở mức khái niệm;
- nếu chọn hướng mạng sinh học, phải đóng phạm vi rất sớm.

## Các buổi sau - Chấm báo cáo

Theo ảnh lớp học:

- `14-Apr`: GV chấm báo cáo
- `21-Apr`: GV chấm báo cáo
- `28-Apr`: GV chấm báo cáo

Điều này cho thấy môn học hướng sản phẩm. Tính tương tác cao nhất không nằm ở việc nhớ định nghĩa, mà nằm ở:

- đề tài có rõ hay không;
- `paper` có đúng scope hay không;
- `pipeline` có chạy được hay không;
- bạn có mở rộng được gì từ kết quả gốc hay không.

## Nên ưu tiên học gì để phục vụ báo cáo

Nếu thời gian có hạn, nên ưu tiên theo thứ tự này:

1. `sequence alignment`
2. `database search`
3. `genome analysis`
4. `phylogenetic tree`
5. `gene prediction`
6. `machine learning applications`

Lý do:

- đây là trục dễ nhất để đi từ `dữ liệu thô` -> `phân tích` -> `báo cáo`;
- những chủ đề này có `tool`, `dataset`, `paper` cơ bản rõ ràng;
- rất hợp với yêu cầu "chọn bài cơ bản và chạy lại".

## Giải thích ngắn gọn cho từng cụm chương

- `Chương 1-2`: để hiểu dữ liệu và bài toán.
- `Chương 3-4`: để tìm và căn hàng `sequence`.
- `Chương 5-6`: để suy luận quan hệ tiến hóa và đọc ý nghĩa thay thế.
- `Chương 7`: để mở rộng sang `predictive modeling`.
- `Chương 8-9`: để đi vào `gene finding` và `genome-scale analysis`.

Sau file này, nên đọc [03-ban-do-khai-niem-va-cong-cu.md](./03-ban-do-khai-niem-va-cong-cu.md).
