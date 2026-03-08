# Bản đồ khái niệm và công cụ

## 1. Pipeline tối thiểu của môn

Trong học phần này, một `pipeline` đẹp và vừa sức thường có dạng:

`câu hỏi sinh học -> tìm dataset -> lọc dữ liệu -> biểu diễn dữ liệu -> chọn tool/method -> chạy -> đánh giá -> diễn giải sinh học -> viết báo cáo`

Nếu thiếu bất kỳ mắt xích nào, bài dễ bị "học thuật mà không chạy được" hoặc "có kết quả nhưng không giải thích được".

## 2. Bản đồ khái niệm

| Khái niệm | Hiểu tối thiểu |
| --- | --- |
| `sequence` | Chuỗi ký tự DNA/RNA/protein; đây là đơn vị dữ liệu cơ bản nhất của môn. |
| `homology` | Quan hệ tiến hóa chung; không được đồng nhất máy móc với `similarity`. |
| `alignment` | Cách đặt các `sequence` cạnh nhau để so sánh vị trí tương ứng. |
| `multiple sequence alignment` | Đầu vào cho nhiều bài toán như `tree`, `motif`, `conserved region`. |
| `annotation` | Lớp thông tin bổ sung trên `sequence`: gene, CDS, exon, protein, function, metadata. |
| `genome` | Toàn bộ vật liệu di truyền của một sinh vật/virus; có thể đi kèm `assembly` và `annotation`. |
| `phylogenetic tree` | Cấu trúc biểu diễn quan hệ tiến hóa suy ra từ dữ liệu. |
| `substitution matrix` | Cách lượng hóa khả năng thay thế ký tự, đặc biệt với `protein alignment`. |
| `gene prediction` | Bài toán tìm vùng có khả năng mã hóa gene trên `genome` hoặc `contig`. |
| `metadata` | Thông tin bối cảnh như species, host, country, date, assembly level. |
| `benchmark` | Cách so sánh method/tool bằng tập dữ liệu và metric rõ ràng. |
| `reproducibility` | Khả năng chạy lại `pipeline` và thu được kết quả có thể kiểm tra. |

## 3. Nguồn dữ liệu và công cụ cốt lõi

| Tên | Dùng khi nào | Ghi chú thực dụng | Link |
| --- | --- | --- | --- |
| `NCBI Datasets` | Tải `genome`, `annotation`, metadata theo taxon hoặc accession | Hợp với bài toán `genome analysis`, `gene prediction`, lấy bộ dữ liệu chuẩn | [docs](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/genomes/download-genome/) |
| `NCBI Virus` | Tìm, lọc, tải `virus genome` và metadata | Rất hợp cho đề tài `phylogenetics` với data public | [help](https://www.ncbi.nlm.nih.gov/labs/virus/vssi/docs/help/) |
| `BLAST` | Tìm `homolog`, tìm sequence gần nhau, trả lời "sequence này giống cái gì" | Công cụ căn bản nhất để bắt đầu nhiều bài toán | [help](https://www.ncbi.nlm.nih.gov/books/NBK1762/) |
| `MAFFT` | `multiple sequence alignment` cho DNA/protein | Official docs gợi ý `L-INS-i` cho tập nhỏ cần độ chính xác cao, `FFT-NS-2` cho tập lớn hơn | [official](https://mafft.cbrc.jp/alignment/software/index.html) |
| `IQ-TREE 2` | Dùng `alignment` để suy ra `phylogenetic tree` | Nhận `alignment` làm input; có `UFBoot2` cho bootstrap nhanh | [tutorial](https://iqtree.github.io/doc/Tutorial) |
| `Biopython` | Xử lý file `FASTA`, `GenBank`, `alignment`, `tree` bằng Python | Rất hợp cho bước làm sạch dữ liệu và tạo `mini-pipeline` | [tutorial](https://biopython.org/docs/latest/Tutorial/) |
| `Prodigal` | `gene prediction` cho prokaryote | Nhẹ, nhanh, hợp đề tài môn học có scope vừa | [paper](https://pubmed.ncbi.nlm.nih.gov/20211023/) |
| `AUGUSTUS` / `WebAUGUSTUS` | `gene prediction` cho eukaryote, có thể kết hợp `extrinsic evidence` | Mạnh hơn nhưng cũng phức tạp hơn; cần scope cẩn thận | [official](https://bioinf.uni-greifswald.de/augustus/) |
| `UniProt` | Tra protein, function, annotation, `reviewed entries` | Rất hợp cho bài toán protein-level và đọc bối cảnh chức năng | [paper 2025](https://pubmed.ncbi.nlm.nih.gov/39552041/) |
| `Ensembl` | Lấy annotation và genome browser cho nhiều species | Tốt cho bài toán eukaryote và annotation reference | [homepage](https://www.ensembl.org/index.html) |
| `DeepLoc 2.0` | Dự đoán `subcellular localization` từ `protein sequence` | Hướng `machine learning` vừa sức nếu muốn làm protein-level application | [paper](https://pubmed.ncbi.nlm.nih.gov/35489069/) |
| `HMMER` | Tìm `remote homolog` và làm việc với `profile HMM` | Phù hợp nhóm protein family/domain, nhưng có thể để sau | [official](https://hmmer.org/) |

## 4. Mỗi công cụ gắn với bài toán nào

### Khi câu hỏi là "sequence này gần với ai"

Nên nghĩ đến:

- `BLAST`
- `UniProt`
- `NCBI`

Output mong đợi:

- danh sách `hit`;
- `identity`, `coverage`, `E-value`;
- gợi ý `functional annotation` ban đầu.

### Khi câu hỏi là "nhóm sequence này căn hàng ra sao"

Nên nghĩ đến:

- `MAFFT`
- `Biopython`

Output mong đợi:

- file `alignment`;
- các vị trí bảo tồn;
- input hợp lệ cho `phylogenetic inference`.

### Khi câu hỏi là "các mẫu quan hệ tiến hóa thế nào"

Nên nghĩ đến:

- `MAFFT`
- `IQ-TREE 2`
- `UFBoot2`
- metadata từ `NCBI Virus` hoặc `NCBI Datasets`

Output mong đợi:

- `treefile`;
- `bootstrap support`;
- diễn giải theo species/host/country/date.

### Khi câu hỏi là "genome này có gene nào"

Nên nghĩ đến:

- `Prodigal` nếu là prokaryote;
- `AUGUSTUS` nếu là eukaryote;
- `NCBI Datasets`, `Ensembl`, `Biopython` để đối chiếu annotation.

Output mong đợi:

- file `GFF`/`prediction`;
- số lượng gene;
- so sánh với annotation tham chiếu.

### Khi câu hỏi là "protein này có thể ở vị trí nào trong tế bào"

Nên nghĩ đến:

- `UniProt`
- `DeepLoc 2.0`

Output mong đợi:

- nhãn `subcellular localization`;
- score/prediction table;
- khả năng đối chiếu với annotation có sẵn.

## 5. Cách chọn công cụ vừa sức

Trong môn này, nên ưu tiên công cụ có các đặc điểm sau:

- có `official docs` rõ;
- có input/output để đọc được;
- có `dataset` public để chạy ngay;
- không đòi hỏi `GPU` mạnh;
- có `paper` gốc để trích dẫn.

Theo tiêu chí đó, nhóm công cụ an toàn nhất là:

- `BLAST`
- `MAFFT`
- `IQ-TREE 2`
- `Biopython`
- `Prodigal`
- `NCBI Datasets` / `NCBI Virus`

## 6. Sai lầm phổ biến khi học môn

- Đồng nhất `similarity` với `homology`.
- Tải quá nhiều dữ liệu ngay từ đầu thay vì chạy pilot trên tập nhỏ.
- Chọn `paper` quá nặng chỉ vì nó nổi tiếng.
- Dùng `machine learning` mà không rõ `label`, `split`, `metric`.
- Dùng `tree` để kết luận quá mức từ một `alignment` chất lượng thấp.
- Viết báo cáo như một bài review thay vì mô tả `pipeline` và kết quả chạy lại.

## 7. Bộ công cụ khởi động để xài ngay

Nếu phải chốt một bộ tối thiểu để bắt đầu bài báo cáo, tối ưu nhất là:

- `NCBI Virus` hoặc `NCBI Datasets` để lấy dữ liệu
- `Biopython` để lọc/chuẩn hóa file
- `MAFFT` để căn hàng
- `IQ-TREE 2` để tạo cây
- `UFBoot2` để support nhanh

Nếu chọn hướng `gene prediction` thì thay bằng:

- `NCBI Datasets`
- `Prodigal`
- `Biopython`

Sau file này, nên đọc [04-paper-va-de-tai-goi-y.md](./04-paper-va-de-tai-goi-y.md).
