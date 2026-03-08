# `Prodigal`: phát triển và ứng dụng

## Mục tiêu của file này

Sau khi đã có một bản chạy lại ổn định, phần quan trọng tiếp theo là:

- mở rộng thế nào cho đúng sức;
- biến output thành câu chuyện báo cáo;
- chỉ ra giá trị thực tế của `gene prediction`.

## Ba hướng phát triển vừa sức nhất

## Hướng 1 - So sánh giữa các species có đặc điểm khác nhau

Đây là hướng mở rộng đẹp nhất cho `Prodigal`.

Bạn giữ nguyên tool, chỉ mở rộng câu hỏi:

- cùng một workflow, các species khác nhau cho ra profile prediction khác nhau thế nào;
- số gene dự đoán có khác biệt lớn không;
- liệu sự khác biệt có đi cùng khác biệt về genome size hoặc đặc điểm bộ gene hay không.

Điểm mạnh:

- rất dễ kể chuyện trong báo cáo;
- không cần đổi tool;
- ít rủi ro compute.

## Hướng 2 - Mô phỏng dữ liệu bị fragment

README của `Prodigal` nói tool xử lý được draft genomes và metagenomes. Vì vậy một mở rộng rất hợp lý là:

- lấy genome hoàn chỉnh;
- cắt thành contig ngắn hơn;
- chạy lại `Prodigal`;
- so sánh sự thay đổi của gene calls.

Hướng này giúp bạn trả lời câu hỏi thực dụng:

- dữ liệu xấu hơn thì output thay đổi ra sao.

## Hướng 3 - So sánh mode thường và mode `meta`

Repo chính thức cho ví dụ riêng cho `-p meta`, nghĩa là mode này có vai trò rõ ràng trong dữ liệu metagenome [GitHub](https://github.com/hyattpd/Prodigal).

Một pilot extension hợp lý là:

- cùng một dữ liệu bị fragment;
- chạy mode mặc định;
- chạy `-p meta`;
- so sánh số prediction và pattern khác biệt.

Đây là mở rộng nhỏ nhưng có giá trị vì nó chạm thẳng vào câu hỏi:

- khi nào nên dùng mode nào.

## Hướng nào nên ưu tiên

Thứ tự hợp lý:

1. so sánh giữa species
2. fragment genome
3. so sánh thường vs `meta`

Lý do:

- hướng 1 dễ trình bày nhất;
- hướng 2 làm rõ ảnh hưởng của chất lượng dữ liệu;
- hướng 3 mạnh về mặt kỹ thuật nhưng cần dữ liệu chuẩn bị tốt hơn.

## Ứng dụng thực tế

## Annotation pipeline

`Prodigal` rất thực dụng trong các pipeline chú giải bộ gene vi khuẩn và archaea. Giá trị của nó nằm ở chỗ:

- nhanh
- nhẹ
- output rõ
- làm bước đầu cho các bước downstream

## Chuẩn bị dữ liệu cho `BLAST`, `HMMER`, function assignment

Sau khi có protein FASTA, một pipeline thường sẽ đi tiếp sang:

- `BLAST+`
- `HMMER`
- mapping sang `UniProt`, `Pfam`, hoặc các database annotation khác

Nói cách khác, `Prodigal` không phải đích cuối. Nó là một khối đầu rất thực tế trong pipeline microbial genomics.

## Làm việc với genome mới hoặc draft genome

Khi có một genome mới, một trong các câu hỏi sớm nhất là:

- bộ gene này có bao nhiêu protein-coding genes;
- output prediction có ổn không;
- bước tiếp theo nên annotation thế nào.

Ở đây `Prodigal` là công cụ rất hợp để bắt đầu.

## Cách biến kết quả thành báo cáo tốt

## Câu chuyện báo cáo nên có

Một bài tốt có thể theo mạch:

1. vì sao `gene prediction` là bước nền trong bioinformatics
2. `Prodigal` giải quyết bài toán gì
3. dữ liệu nào được chọn
4. workflow tải genome và chạy `Prodigal`
5. kết quả giữa 3 species
6. giới hạn và mở rộng

Nếu bài chỉ dừng ở “đã chạy `Prodigal`”, bài sẽ rất mỏng. Giá trị báo cáo nằm ở phần so sánh và diễn giải.

## Khung báo cáo 5 phần đủ dùng

Nếu muốn giữ bài gọn nhưng chắc, có thể dùng đúng 5 phần:

1. `Bài toán gene prediction`
2. `Dữ liệu và workflow Prodigal`
3. `Kết quả trên 3 species`
4. `So sánh với reference annotation`
5. `Giới hạn và hướng mở rộng`

Khung này đủ ngắn cho slide và đủ rõ cho báo cáo viết.

## Bảng nên có

- bảng species và nguồn dữ liệu
- bảng số gene dự đoán
- bảng so sánh sơ bộ với annotation tham chiếu
- bảng ghi chú mở rộng đã thử hoặc dự kiến thử

## Mức kết luận nên giữ ở đâu

Một bài pilot kiểu này nên kết luận ở mức:

- `Prodigal` có chạy ổn định trên các genome đã chọn hay không;
- prediction counts có gần với reference annotation ở mức hợp lý hay không;
- khác biệt giữa các species hoặc giữa các điều kiện dữ liệu có gợi ra hướng mở rộng nào hay không.

Không nên kết luận quá mức theo kiểu:

- “species này chắc chắn có nhiều gene chức năng hơn species kia”
- “chênh lệch prediction count chứng minh tool sai hoặc đúng tuyệt đối”
- “mọi gene được gọi đều là gene thật đã được xác nhận”

## Những câu nên tự trả lời trước khi thuyết trình

- vì sao chọn 3 species này;
- vì sao `Prodigal` là một topic đúng tinh thần ảnh hơn các model nặng;
- `gene prediction` khác `annotation` ở đâu;
- vì sao gene count giữa các species không nên được diễn giải quá đơn giản;
- mở rộng nào là hợp lý nhất nếu có thêm thời gian.

## Những giới hạn phải nói thẳng

- prediction không đồng nghĩa với validation thực nghiệm;
- output phụ thuộc chất lượng genome assembly;
- so sánh số lượng gene giữa species chỉ là một góc nhìn thô;
- mode `meta` không nên dùng bừa cho mọi dữ liệu.

## Khi nào không nên phình project

Không nên nhảy ngay sang:

- full annotation workflow nhiều bước
- comparative genomics quá rộng
- tích hợp thêm quá nhiều database và metrics

Vì lúc đó topic sẽ thôi không còn là “chạy lại một `paper` cơ bản + mở rộng nhỏ”.

## Liên hệ với học phần

Topic này nối tốt với nhiều phần khác:

- `gene prediction`
- `database`
- chuẩn bị dữ liệu cho `homology search`
- tiền xử lý cho các pipeline tin sinh học lớn hơn

Nó không hào nhoáng, nhưng rất chuẩn nền tảng.

## Kết luận ngắn

Giá trị lớn nhất của `Prodigal` là tính thực dụng. Đây là topic rất tốt nếu muốn làm một bài chắc, đúng bản chất, dễ chạy lại, và dễ chuyển tiếp sang các bước downstream như `BLAST`, `HMMER`, hay `functional annotation`.

## Điểm dừng hợp lý trước khi chuyển tiếp

Chỉ nên chuyển topic hoặc nhảy sang downstream analysis khi đã đạt đủ các điều kiện sau:

- hiểu rõ `gene prediction` khác `annotation`;
- đã chạy được workflow cơ bản trên 3 genome;
- đã có bảng so sánh prediction count với reference `CDS`;
- đã chốt được một kết luận ngắn nhưng không overclaim;
- đã chọn được một hướng mở rộng nhỏ thực sự liên quan tới dữ liệu hoặc mode chạy.

## Nguồn chính

- `Prodigal` GitHub README: [github.com/hyattpd/Prodigal](https://github.com/hyattpd/Prodigal)
- `Prodigal` paper: [PubMed](https://pubmed.ncbi.nlm.nih.gov/20211023/)
- `NCBI` genome download how-to: [ncbi.nlm.nih.gov](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/genomes/download-genome/)
- `NCBI` genome CLI reference: [ncbi.nlm.nih.gov](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/reference-docs/command-line/datasets/download/genome/)
