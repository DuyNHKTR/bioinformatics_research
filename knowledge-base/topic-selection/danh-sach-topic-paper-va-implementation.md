# Danh sách 10 topic theo đúng tiêu chí từ ảnh

File này đã được làm lại theo đúng tinh thần từ ảnh lớp học:

- chỉ chọn topic thuộc `molecular biology data`;
- ưu tiên `paper` cơ bản, dễ đọc hơn là bài quá nặng;
- phải có `implementation` hoặc `source code` công khai;
- phải có dữ liệu `public` hoặc nguồn dữ liệu chính thống;
- phải đủ nhỏ để `chạy lại` và có thể mở rộng thêm một bước nhỏ.

Nói ngắn gọn: đây không phải danh sách “hot nhất”, mà là danh sách “đúng môn nhất và làm được thật”.

## Cách đọc file này

Mỗi topic gồm:

- bài toán;
- vì sao hợp tiêu chí ảnh;
- `paper` nền;
- `implementation` / `source code`;
- dữ liệu gợi ý;
- gợi ý mở rộng nhỏ.

## 1. Phylogenetics của virus genome với `MAFFT` + `IQ-TREE 2`

### Bài toán

Lấy một nhóm `virus genomes` public, thực hiện `multiple sequence alignment`, xây `phylogenetic tree`, rồi diễn giải theo metadata như host, country, release date.

### Vì sao hợp tiêu chí ảnh

- đúng dữ liệu `molecular biology`;
- rất sát nội dung môn: `alignment` + `tree` + `database`;
- `paper` và `tool` đều kinh điển, không quá nặng;
- có thể chạy lại trên máy cá nhân nếu giới hạn số mẫu hợp lý.

### Paper nền

- `MAFFT`: [Katoh et al., 2002](https://pubmed.ncbi.nlm.nih.gov/12136088/)
- `IQ-TREE 2`: [Minh et al., 2020](https://pubmed.ncbi.nlm.nih.gov/32011700/)
- `UFBoot2`: [Hoang et al., 2018](https://pubmed.ncbi.nlm.nih.gov/29077904/)

### Implementation

- `MAFFT`: [official site](https://mafft.cbrc.jp/alignment/software/index.html)
- `IQ-TREE 2`: [official site](https://iqtree.github.io/)
- `IQ-TREE 2 source code`: [iqtree/iqtree2](https://github.com/iqtree/iqtree2)

### Dữ liệu gợi ý

- `NCBI Virus`: [help](https://www.ncbi.nlm.nih.gov/labs/virus/vssi/docs/help/)
- `NCBI Datasets virus metadata`: [official docs](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-metadata/)

### Gợi ý mở rộng nhỏ

- đổi từ `complete genome` sang một gene đại diện;
- thay đổi tiêu chí lọc mẫu;
- thêm metadata để giải thích cụm trên cây.

## 2. Dự đoán gene cho vi khuẩn với `Prodigal`

### Bài toán

Chạy `Prodigal` trên 1-3 `bacterial genomes` public, so sánh số lượng gene, độ dài gene, và đối chiếu với annotation tham chiếu.

### Vì sao hợp tiêu chí ảnh

- là `paper` cơ bản, rất đúng tinh thần “chạy lại được”;
- dữ liệu public và code mở;
- compute nhẹ;
- bám đúng phần `gene prediction` của môn.

### Paper nền

- [Prodigal: prokaryotic gene recognition and translation initiation site identification](https://pubmed.ncbi.nlm.nih.gov/20211023/)

### Implementation

- `Prodigal source code`: [hyattpd/Prodigal](https://github.com/hyattpd/Prodigal)

### Dữ liệu gợi ý

- `NCBI Datasets genome download`: [official docs](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/genomes/download-genome/)

### Gợi ý mở rộng nhỏ

- so sánh giữa 2 species;
- so sánh genome hoàn chỉnh và contig bị phân mảnh;
- kiểm tra khác biệt theo GC content.

## 3. Tìm gene trong metagenomic contigs với `MetaProdigal`

### Bài toán

Dùng `MetaProdigal` để dự đoán gene trong các `metagenomic contigs` ngắn, sau đó phân tích phân bố gene call.

### Vì sao hợp tiêu chí ảnh

- vẫn thuộc trục `gene prediction`;
- là biến thể mở rộng vừa sức từ `Prodigal`;
- hợp nếu muốn bài có thêm một bước khó hơn nhưng chưa quá nặng.

### Paper nền

- [Gene and translation initiation site prediction in metagenomic sequences](https://pubmed.ncbi.nlm.nih.gov/22796954/)

### Implementation

- dùng cùng `Prodigal source code`: [hyattpd/Prodigal](https://github.com/hyattpd/Prodigal)

### Dữ liệu gợi ý

- contig public từ các bộ dữ liệu metagenome nhỏ;
- hoặc tạo các contig cắt ngắn từ genome chuẩn để làm pilot.

### Gợi ý mở rộng nhỏ

- so sánh mode thường và mode `meta`;
- thay đổi độ dài contig để xem độ ổn định của gene call.

## 4. Dự đoán gene cho eukaryote với `AUGUSTUS`

### Bài toán

Dùng `AUGUSTUS` hoặc `WebAUGUSTUS` để dự đoán gene trên một đoạn `eukaryotic genome` đã có annotation tham chiếu.

### Vì sao hợp tiêu chí ảnh

- đúng bài toán `gene prediction`;
- `paper` và `implementation` rõ;
- có thể làm ở quy mô nhỏ nếu chỉ chọn một chromosome segment.

### Paper nền

- [WebAUGUSTUS--a web service for training AUGUSTUS and predicting genes in eukaryotes](https://pubmed.ncbi.nlm.nih.gov/23700307/)

### Implementation

- `AUGUSTUS official site`: [official](https://bioinf.uni-greifswald.de/augustus/)
- `AUGUSTUS source code`: [Gaius-Augustus/Augustus](https://github.com/Gaius-Augustus/Augustus)

### Dữ liệu gợi ý

- `Ensembl`: [homepage](https://www.ensembl.org/index.html)

### Gợi ý mở rộng nhỏ

- thay đổi species model;
- so sánh với annotation gốc ở một vùng genome nhỏ.

## 5. Tìm homolog và chú giải sơ bộ với `BLAST+`

### Bài toán

Lấy một protein hoặc gene query, dùng `BLAST+` để tìm `homolog`, phân tích `E-value`, `identity`, `coverage`, rồi gợi ý annotation sơ bộ.

### Vì sao hợp tiêu chí ảnh

- cực cơ bản;
- code và docs chính thống;
- rất dễ chạy lại;
- phù hợp nếu cần một đề tài mở đầu hoặc pilot.

### Paper nền

- [BLAST+: architecture and applications](https://pubmed.ncbi.nlm.nih.gov/20003500/)

### Implementation

- `BLAST command line manual`: [NCBI Bookshelf](https://www.ncbi.nlm.nih.gov/books/NBK279690/)
- `BLAST+ docs repo`: [ncbi/blast_plus_docs](https://github.com/ncbi/blast_plus_docs)

### Dữ liệu gợi ý

- `NCBI`, `UniProt`, `RefSeq`

### Gợi ý mở rộng nhỏ

- so sánh `blastn` và `blastp`;
- thay đổi database để xem ảnh hưởng tới annotation.

## 6. Tìm domain và remote homolog với `HMMER3`

### Bài toán

Từ một nhóm protein sequence, dùng `HMMER3` để tìm `remote homolog` hoặc phát hiện domain/protein family.

### Vì sao hợp tiêu chí ảnh

- đúng dữ liệu phân tử;
- rõ ràng hơn nhiều đề tài `deep learning`;
- có giá trị sinh học thật và dễ trình bày.

### Paper nền

- [Accelerated Profile HMM Searches](https://pubmed.ncbi.nlm.nih.gov/22039361/)

### Implementation

- `HMMER official site`: [hmmer.org](https://hmmer.org/)

### Dữ liệu gợi ý

- protein FASTA từ `UniProt`;
- domain/family analysis với cơ sở dữ liệu như `Pfam` qua workflow của `HMMER`.

### Gợi ý mở rộng nhỏ

- so sánh `BLAST` và `HMMER` trên cùng một query;
- kiểm tra các hit “xa” mà `BLAST` bỏ sót.

## 7. Dự đoán RNA secondary structure với `RNAfold`

### Bài toán

Lấy các RNA sequence public, dùng `RNAfold` để dự đoán `minimum free energy structure`, so sánh giữa các sequence hoặc các biến thể.

### Vì sao hợp tiêu chí ảnh

- vẫn là dữ liệu phân tử;
- có code mạnh, docs tốt;
- project nhỏ gọn, dễ chạy, dễ minh họa.

### Paper nền

- [ViennaRNA Package 2.0](https://pubmed.ncbi.nlm.nih.gov/22115189/)

### Implementation

- `ViennaRNA source code`: [ViennaRNA/ViennaRNA](https://github.com/ViennaRNA/ViennaRNA)
- `RNAfold manual`: [official docs](https://viennarna.readthedocs.io/en/latest/man/RNAfold.html)

### Dữ liệu gợi ý

- RNA sequence public từ cơ sở dữ liệu hoặc từ ví dụ nhỏ tự chọn.

### Gợi ý mở rộng nhỏ

- so sánh cấu trúc dự đoán trước và sau mutation;
- so sánh nhiều sequence homolog.

## 8. Dự đoán vị trí dưới tế bào của protein với `DeepLoc 2.0`

### Bài toán

Dùng `protein sequence` để dự đoán `subcellular localization`, rồi đối chiếu với annotation có sẵn.

### Vì sao hợp tiêu chí ảnh

- đúng dữ liệu phân tử;
- có `paper` và code;
- là hướng `machine learning` vừa sức hơn nhiều model quá nặng.

### Paper nền

- [DeepLoc 2.0: multi-label subcellular localization prediction using protein language models](https://pubmed.ncbi.nlm.nih.gov/35489069/)

### Implementation

- `DeepLoc 2.0 code`: [TviNet/DeepLoc-2.0](https://github.com/TviNet/DeepLoc-2.0)

### Dữ liệu gợi ý

- `UniProt` reviewed proteins

### Gợi ý mở rộng nhỏ

- so sánh protein từ 2 species;
- kiểm tra những mẫu mà model dự đoán nhiều nhãn.

## 9. Dự đoán ảnh hưởng splice của biến thể với `SpliceAI`

### Bài toán

Dùng `SpliceAI` để dự đoán ảnh hưởng của biến thể lên `splicing` từ primary sequence.

### Vì sao hợp tiêu chí ảnh

- đúng sinh học phân tử;
- code mở và paper rõ;
- rất có giá trị ứng dụng, nhưng nặng hơn các topic cơ bản ở trên.

### Paper nền

- bài gốc được Illumina trích dẫn trong tài liệu chính thức: [Predicting splicing from primary sequence with deep learning / SpliceAI resources](https://illumina.github.io/IlluminaConnectedAnnotationsDocumentation/data-sources/splice-ai/)

### Implementation

- `SpliceAI source code`: [Illumina/SpliceAI](https://github.com/Illumina/SpliceAI)

### Dữ liệu gợi ý

- VCF nhỏ + reference fasta + annotation chuẩn

### Gợi ý mở rộng nhỏ

- so sánh một nhóm biến thể có và không có hiệu ứng splice mạnh;
- thử các biến thể gần splice site và xa splice site.

## 10. Dự đoán chức năng protein với `DeepFRI`

### Bài toán

Dùng sequence/structure representation để dự đoán `protein function`.

### Vì sao hợp tiêu chí ảnh

- có ý nghĩa sinh học mạnh;
- có code và data split;
- nhưng đã nặng hơn khá nhiều so với các topic phía trên.

### Paper nền

- [Structure-based protein function prediction using graph convolutional networks](https://pubmed.ncbi.nlm.nih.gov/34039967/)

### Implementation

- `DeepFRI source code`: [flatironinstitute/DeepFRI](https://github.com/flatironinstitute/DeepFRI)

### Dữ liệu gợi ý

- protein sequence / structure benchmark từ repo của tác giả

### Gợi ý mở rộng nhỏ

- chạy inference trên tập protein nhỏ;
- phân tích những case đúng/sai theo loại function label.

## Nhìn nhanh theo mức độ “đúng ảnh”

### Rất đúng ảnh

- phylogenetics với `MAFFT` + `IQ-TREE 2`
- `Prodigal`
- `BLAST+`
- `HMMER3`
- `RNAfold`

### Đúng ảnh nhưng nặng hơn một chút

- `MetaProdigal`
- `AUGUSTUS`
- `DeepLoc 2.0`

### Đúng domain nhưng nên để sau nếu mới bắt đầu

- `SpliceAI`
- `DeepFRI`

Tiếp theo nên đọc [11-xep-hang-topic-va-top-2.md](./11-xep-hang-topic-va-top-2.md).
