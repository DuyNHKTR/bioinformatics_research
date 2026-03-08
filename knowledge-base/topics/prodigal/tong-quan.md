# `Prodigal`: tổng quan

## Tóm tắt rất ngắn

`Prodigal` là lựa chọn ít rủi ro nhất nếu mục tiêu là một bài `paper + implementation` thật sự chạy được. Bài toán `gene prediction` cho prokaryote rõ ràng, dữ liệu `public` mạnh, compute nhẹ, và output đủ cụ thể để giải thích trong báo cáo mà không cần kéo theo cả một stack quá nặng.

## Cách dùng bộ tài liệu topic 2

Ba file của topic này nên được dùng như một gói thống nhất:

1. đọc file này để hiểu bài toán, khái niệm, và logic của `Prodigal`;
2. đọc `16-prodigal-replication-roadmap.md` để biết phải tải gì, chạy gì, và đối chiếu output với reference annotation ra sao;
3. đọc `17-prodigal-phat-trien-va-ung-dung.md` để biết mở rộng nào đúng sức và cách biến kết quả thành báo cáo.

Điểm dừng hợp lý của vòng này là:

- hiểu rõ `gene prediction` khác `annotation`;
- có workflow chạy lại đủ cụ thể;
- biết output nào là output chính để đọc;
- chốt được ít nhất một hướng mở rộng nhỏ;
- chưa cần kéo thêm các bước downstream như `BLAST` hay `HMMER`.

## Bài toán trung tâm

Cho một `prokaryotic genome`, hãy xác định:

- vị trí các `protein-coding genes`
- `translation initiation site`
- số lượng gene được gọi
- phân bố gene theo từng genome hoặc từng điều kiện dữ liệu

Theo abstract trên PubMed, `Prodigal` tập trung vào ba mục tiêu:

- cải thiện `gene structure prediction`
- cải thiện `translation initiation site recognition`
- giảm `false positives`

[PubMed](https://pubmed.ncbi.nlm.nih.gov/20211023/)

## Vì sao topic này rất đúng tinh thần ảnh

- `paper` cơ bản, đọc được
- `source code` công khai
- không cần compute nặng
- input và output rất rõ
- hợp thẳng với chương `gene prediction`

Nếu cần một topic “chạy được thật trước, tối ưu sau”, thì đây là lựa chọn số 1.

## `Prodigal` là gì

README của repo chính thức giới thiệu `Prodigal` là phần mềm “fast, reliable protein-coding gene prediction for prokaryotic genomes” và cho ví dụ dùng tối thiểu:

- `prodigal -i my.genome.fna -o my.genes -a my.proteins.faa`
- `prodigal -i my.metagenome.fna -o my.genes -a my.proteins.faa -p meta`

[GitHub](https://github.com/hyattpd/Prodigal)

## Những ý chính cần hiểu từ `paper`

## `Prodigal` không làm gì

- không trực tiếp suy ra function của gene
- không thay thế `functional annotation`
- không thay thế curation thủ công

Nó giải quyết bài toán hẹp nhưng rất quan trọng: gọi gene trên genome prokaryote.

## `Prodigal` thật sự làm gì

- tìm candidate coding regions
- đánh giá coding potential
- xử lý vấn đề `translation initiation site`
- giảm các gene gọi sai

PubMed abstract nhấn mạnh đây là một thuật toán hướng tới cả `gene prediction` lẫn `translation initiation site recognition`, chứ không chỉ đếm ORF đơn giản [PubMed](https://pubmed.ncbi.nlm.nih.gov/20211023/).

## Khái niệm bắt buộc phải hiểu

## `ORF` khác gì `gene`

Không phải mọi `open reading frame` đều là gene thật. Một phần giá trị của `Prodigal` là không dừng ở mức “thấy ORF là gọi gene”.

## `Translation initiation site`

Đây là chỗ bắt đầu dịch mã và là một trong các điểm mà `Prodigal` tối ưu mạnh. Nếu hiểu sai phần này, rất dễ nói sai giá trị của tool.

## `Gene prediction` khác `annotation`

- `gene prediction`: xác định vị trí gene có khả năng tồn tại
- `annotation`: gắn function, tên gene, pathway, domain, homolog

Trong báo cáo cần tách hai việc này ra rõ ràng.

## Tại sao `Prodigal` hợp cho báo cáo môn học

- Có một `paper` gốc duy nhất, rõ ràng.
- Có `source code` chính thức trên GitHub.
- Có thể lấy genome công khai bằng `NCBI Datasets`.
- Có thể so sánh giữa nhiều species mà không cần đổi workflow.
- Dễ tạo một phần mở rộng nhỏ như so sánh theo species, GC content, hoặc contig fragmentation.

## Default scope đã chốt

Dossier này mặc định dùng 3 genome đại diện:

- `Escherichia coli str. K-12 substr. MG1655`
- `Bacillus subtilis subsp. subtilis str. 168`
- `Pseudomonas aeruginosa PAO1`

Tiêu chí chọn:

- là genome tham chiếu hoặc strain chuẩn rất phổ biến trong giáo trình và pipeline;
- dễ giải thích;
- đủ khác nhau để so sánh nhưng không quá dị thường.

## Điều tối thiểu cần có sau một bản chạy lại

- file genome FASTA cho từng species
- output `Prodigal` cho từng species
- protein FASTA cho từng species
- số gene được gọi cho từng species
- một nhận xét ngắn về sự khác biệt giữa các genome

## Hướng mở rộng nhỏ hợp lý

- so sánh 2-3 species khác nhau
- so sánh genome hoàn chỉnh với contig bị chia nhỏ
- chạy thêm `-p meta` để thấy khi nào mode metagenome hợp hơn

## Ứng dụng thực tế

- đầu vào cho `annotation pipeline`
- tiền xử lý trước `BLAST`, `HMMER`, hoặc các bước gán function
- gene calling trong `prokaryotic genomes`
- base step cho nhiều pipeline microbial genomics

## Rủi ro và giới hạn

- gene được gọi không đồng nghĩa với gene đã xác thực sinh học
- số gene khác nhau giữa các species không thể diễn giải quá đơn giản
- genome draft hoặc contig ngắn có thể làm bài toán khó hơn nhiều
- output nhanh và gọn nhưng vẫn cần đọc đúng ngữ cảnh

## Vì sao không nên mở rộng quá sớm

`Prodigal` rất dễ làm người học bị kéo sang một pipeline lớn hơn:

- tải genome
- gọi gene
- chạy `BLAST`
- chạy `HMMER`
- gán function
- so sánh pathway

Chuỗi này là hợp lý về mặt kỹ thuật, nhưng không hợp cho vòng đầu nếu mục tiêu là “một `paper` cơ bản, chạy lại được, mở rộng nhỏ”. Dossier này cố tình giữ điểm dừng ở `gene prediction` và so sánh với annotation tham chiếu.

## Kết luận ngắn

`Prodigal` là topic rất mạnh nếu bạn muốn tăng xác suất “chạy được thật” mà vẫn đúng bản chất bioinformatics. Nó không hào nhoáng như các model mới, nhưng lại cực đúng tinh thần của ảnh: `paper` nền, `implementation` rõ, `public data`, compute nhẹ, và có chỗ mở rộng vừa sức.

## Nguồn chính

- `Prodigal` paper: [PubMed](https://pubmed.ncbi.nlm.nih.gov/20211023/)
- `Prodigal` source code: [GitHub](https://github.com/hyattpd/Prodigal)
- `NCBI Datasets` install docs: [ncbi.nlm.nih.gov](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/command-line-tools/download-and-install/)
- `NCBI` genome download how-to: [ncbi.nlm.nih.gov](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/genomes/download-genome/)
