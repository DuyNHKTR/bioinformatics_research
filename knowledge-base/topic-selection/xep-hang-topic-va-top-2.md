# Xếp hạng lại topic theo đúng tiêu chí từ ảnh và chọn top 2

File này thay toàn bộ ranking cũ. Mục tiêu bây giờ không phải “topic nào hot nhất”, mà là:

- đúng dữ liệu `molecular biology`;
- có `paper` cơ bản;
- có `implementation` mở;
- có thể `chạy lại`;
- có thể mở rộng thêm một bước nhỏ;
- hợp với các chương trong môn INT 7021.

## 1. Tiêu chí chấm điểm

Mỗi topic được chấm `1-5` theo 6 tiêu chí:

- `Co bản`: paper có dễ đọc và đúng tinh thần “bài cơ bản” không
- `Code mở`: có source code / implementation rõ không
- `Data public`: có dữ liệu hoặc nguồn dữ liệu public không
- `Compute vừa`: có chạy được trên máy cá nhân hoặc môi trường phổ biến không
- `Mở rộng nhỏ`: có dễ thêm một bước mở rộng vừa sức không
- `Hợp môn`: có bám sát các chương của INT 7021 không

## 2. Bảng xếp hạng mới

| Topic | Cơ bản | Code mở | Data public | Compute vừa | Mở rộng nhỏ | Hợp môn | Nhận xét |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Phylogenetics với `MAFFT` + `IQ-TREE 2` | 5 | 5 | 5 | 4 | 5 | 5 | Cân bằng đẹp nhất giữa kiến thức môn học, tính tái lập và chỗ để mở rộng. |
| `Prodigal` gene prediction | 5 | 5 | 5 | 5 | 4 | 5 | Gọn, mạnh, rất dễ chạy lại và rất đúng rubric ảnh. |
| `BLAST+` homolog search | 5 | 5 | 5 | 5 | 3 | 5 | Cực cơ bản và rất dễ chạy, nhưng không giàu phần mở rộng bằng top 2. |
| `HMMER3` remote homology/domain search | 4 | 5 | 5 | 4 | 4 | 5 | Rất tốt cho protein family/domain, hơi khó hơn `BLAST+` một chút. |
| `MetaProdigal` metagenomic gene prediction | 4 | 5 | 4 | 5 | 4 | 4 | Hợp nếu muốn mở rộng từ `Prodigal`, nhưng dữ liệu metagenome dễ rối hơn. |
| `AUGUSTUS` eukaryotic gene prediction | 4 | 5 | 4 | 3 | 4 | 5 | Rất đúng môn, nhưng eukaryote làm mọi thứ nặng hơn. |
| `RNAfold` secondary structure | 4 | 5 | 4 | 5 | 3 | 3 | Dễ chạy và đẹp, nhưng bám syllabus kém hơn nhóm trên. |
| `DeepLoc 2.0` localization prediction | 3 | 4 | 4 | 3 | 3 | 3 | Hợp cho một nhánh `machine learning` vừa sức, nhưng không “cơ bản” bằng top trên. |
| `SpliceAI` splice prediction | 3 | 4 | 4 | 3 | 3 | 4 | Rất hay và giá trị cao, nhưng paper/model nặng hơn tinh thần ảnh. |
| `DeepFRI` protein function prediction | 3 | 4 | 4 | 2 | 3 | 3 | Đáng học, nhưng đã bắt đầu vượt khỏi mức “paper cơ bản dễ chạy lại”. |

## 3. Top 2 tốt nhất theo đúng tinh thần ảnh

### Top 1: Phylogenetics với `MAFFT` + `IQ-TREE 2`

Đây là lựa chọn tốt nhất nếu bám sát ảnh một cách nghiêm túc.

**Vì sao đứng số 1**

- đúng `molecular biology data`;
- đúng các chương của môn: `database`, `alignment`, `phylogenetic tree`;
- có dữ liệu public rất mạnh từ `NCBI Virus`;
- có `paper` nền dễ hơn nhiều so với các model quá nặng;
- có thể chạy pilot nhỏ rồi mở rộng dần;
- rất dễ làm phần “lấy bài báo + mở rộng”.

**Bộ nguồn tối thiểu**

- `MAFFT paper`: [PubMed](https://pubmed.ncbi.nlm.nih.gov/12136088/)
- `IQ-TREE 2 paper`: [PubMed](https://pubmed.ncbi.nlm.nih.gov/32011700/)
- `UFBoot2 paper`: [PubMed](https://pubmed.ncbi.nlm.nih.gov/29077904/)
- `IQ-TREE 2 code`: [GitHub](https://github.com/iqtree/iqtree2)
- `NCBI Virus`: [official help](https://www.ncbi.nlm.nih.gov/labs/virus/vssi/docs/help/)

**Cách làm đúng ảnh nhất**

1. chọn một taxon virus vừa sức;
2. tải `complete genome` và metadata;
3. căn hàng bằng `MAFFT`;
4. dựng cây bằng `IQ-TREE 2`;
5. diễn giải với metadata;
6. mở rộng nhỏ bằng cách đổi tiêu chí lọc hoặc đổi gene đại diện.

## 4. Top 2: `Prodigal` gene prediction

Đây là lựa chọn tốt nhất nếu ưu tiên:

- nhanh vào việc;
- dễ chạy lại;
- dễ giải thích;
- ít rủi ro compute.

**Vì sao đứng số 2**

- paper cơ bản, rõ ràng;
- source code mở;
- input/output rất rõ;
- đúng nội dung `gene prediction`;
- thích hợp cho bài báo cáo có structure gọn gàng.

**Bộ nguồn tối thiểu**

- `Prodigal paper`: [PubMed](https://pubmed.ncbi.nlm.nih.gov/20211023/)
- `Prodigal code`: [GitHub](https://github.com/hyattpd/Prodigal)
- `NCBI Datasets`: [official docs](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/genomes/download-genome/)

**Cách làm đúng ảnh nhất**

1. chọn 1-3 bacterial genomes public;
2. tải FASTA + annotation tham chiếu;
3. chạy `Prodigal`;
4. so sánh số gene và phân bố gene;
5. mở rộng nhỏ bằng species khác hoặc contig bị cắt ngắn.

## 5. Nếu phải chốt ngay hôm nay thì chọn cái nào

### Chọn topic 1 nếu:

- muốn bài đẹp, đúng trục môn học nhất;
- muốn có phần kết quả trực quan để trình bày;
- muốn dễ viết phần mở rộng bằng metadata hoặc so sánh cây.

### Chọn topic 2 nếu:

- muốn bài gọn, chắc, ít rủi ro;
- muốn `implementation` cực rõ;
- muốn tăng xác suất “chạy được thật” ngay từ đầu.

## 6. Kết luận ngắn

Nếu bám đúng ảnh, tôi sẽ không chọn lại `scGPT`, `DNABERT-2`, `ESMFold`, hay các topic foundation-model nặng làm top đầu ở giai đoạn này.

Hai topic đúng ảnh nhất và tốt nhất để đi tiếp là:

1. `Phylogenetics với MAFFT + IQ-TREE 2`
2. `Prodigal gene prediction`

## 7. Bước tiếp theo hợp lý

Nếu đi tiếp ngay từ đây, bước đúng nhất sẽ là:

1. chọn 1 trong top 2;
2. tạo file “đọc paper” riêng cho topic đó;
3. tạo file “roadmap chạy lại implementation” riêng cho topic đó.
