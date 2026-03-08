# Paper và đề tài gợi ý

## 1. Rubric để lọc đề tài

Đề tài hợp học phần này nên đạt đủ các điều kiện sau:

- dùng dữ liệu `molecular biology`;
- có `dataset` public;
- có `paper` nền rõ;
- `pipeline` chạy được trên máy cá nhân hoặc môi trường phổ biến;
- có chỗ để mở rộng sau khi chạy lại;
- scope đủ nhỏ để có thể báo cáo và giải thích từng bước.

Nếu một đề tài vi phạm quá nhiều điều kiện trên, nên loại sớm.

## 2. Hướng 1 - Virus genome phylogenetics

### Bài toán

Dùng `complete genome` hoặc một đoạn gene đại diện của một nhóm virus public để:

- căn hàng `sequence`;
- xây `phylogenetic tree`;
- đối chiếu với metadata như host, country, release date;
- rút ra một nhận xét sinh học vừa mức.

### Vì sao hợp môn

- dùng trực tiếp `sequence alignment`;
- dùng `database search` và `metadata`;
- dùng `phylogenetic analysis`;
- gắn với tính chất `dữ liệu lớn` ở mức độ hợp lý;
- dễ viết phần mở rộng bằng cách thay đổi taxon, số mẫu, hoặc tiêu chí lọc.

### Paper nền / nguồn cốt lõi

- `MAFFT`: [Katoh et al., 2002](https://pubmed.ncbi.nlm.nih.gov/12136088/)
- `IQ-TREE 2`: [Minh et al., 2020](https://pubmed.ncbi.nlm.nih.gov/32011700/)
- `UFBoot2`: [Hoang et al., 2018](https://pubmed.ncbi.nlm.nih.gov/29077904/)
- `NCBI Virus`: [help](https://www.ncbi.nlm.nih.gov/labs/virus/vssi/docs/help/)

### Pipeline đề xuất

1. Chọn một taxon virus có data public và số lượng vừa sức.
2. Tải `genome` và metadata từ `NCBI Virus`.
3. Lọc các mẫu quá ngắn, không hoàn chỉnh, hoặc trùng lặp quá rõ.
4. Căn hàng bằng `MAFFT`.
5. Dùng `IQ-TREE 2` để suy ra cây và `UFBoot2` để lấy support.
6. Ghép metadata để diễn giải cây.
7. Viết phần `limitations`: sai lệch lấy mẫu, chất lượng `sequence`, số mẫu.

### Độ khó

`Trung bình`, rất hợp cho báo cáo môn học.

### Hướng mở rộng

- so sánh hai taxon gần nhau;
- so sánh `complete genome` với một gene đại diện;
- kiểm tra ảnh hưởng của tiêu chí lọc dữ liệu;
- thêm phần tóm tắt metadata theo thời gian/khu vực.

### Rủi ro

- lấy quá nhiều mẫu ngay từ đầu;
- alignment chất lượng thấp nhưng vẫn ép dùng cho `tree`;
- diễn giải quá đà từ cây.

## 3. Hướng 2 - Prokaryotic gene prediction với Prodigal

### Bài toán

Dùng `Prodigal` trên một hoặc vài `bacterial genomes` public để dự đoán gene, sau đó so sánh với annotation tham chiếu.

### Vì sao hợp môn

- bám sát `gene prediction` và `genome analysis`;
- dữ liệu public, dễ tải về;
- `tool` nhẹ, chạy nhanh, scope gọn;
- phù hợp nếu muốn một đề tài dễ chạy lại rõ ràng thay vì đề tài quá rộng.

### Paper nền / nguồn cốt lõi

- `Prodigal`: [Hyatt et al., 2010](https://pubmed.ncbi.nlm.nih.gov/20211023/)
- `MetaProdigal`: [Hyatt et al., 2012](https://pubmed.ncbi.nlm.nih.gov/22796954/)
- `NCBI Datasets`: [docs](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/genomes/download-genome/)

### Pipeline đề xuất

1. Chọn 1-3 `bacterial genomes` có annotation sẵn.
2. Tải bộ dữ liệu từ `NCBI Datasets`.
3. Chạy `Prodigal`.
4. Trích xuất số lượng gene, độ dài gene, phân bố gene.
5. Đối chiếu tổng quan với annotation tham chiếu.
6. Nếu muốn mở rộng, thêm `MetaProdigal` trên `contig` cắt ngắn.

### Độ khó

`Dễ -> Trung bình`, rất dễ khởi động.

### Hướng mở rộng

- so sánh giữa species;
- so sánh `complete genome` và `fragmented contig`;
- kiểm tra gene prediction trên bộ dữ liệu có GC content khác nhau.

### Rủi ro

- đánh giá quá đơn giản bằng cách chỉ đếm số gene;
- chọn eukaryote rồi lại dùng `Prodigal`.

## 4. Hướng 3 - Eukaryotic gene prediction với AUGUSTUS / WebAUGUSTUS

### Bài toán

Dùng `AUGUSTUS` hoặc `WebAUGUSTUS` để dự đoán gene trên một đoạn `eukaryotic genome`, để hiểu vai trò của `training` và `extrinsic evidence`.

### Vì sao hợp môn

- dùng trực tiếp `gene prediction`;
- bước vào bài toán `annotation`;
- cho thấy khác biệt giữa `ab initio` và evidence-guided prediction.

### Paper nền / nguồn cốt lõi

- `AUGUSTUS official`: [official site](https://bioinf.uni-greifswald.de/augustus/)
- `WebAUGUSTUS`: [Stanke et al., 2013](https://academic.oup.com/nar/article/41/W1/W123/1103810)
- `WebAUGUSTUS service`: [web server](https://bioinf.uni-greifswald.de/webaugustus)

### Pipeline đề xuất

1. Chọn một species đã có tham chiếu từ `Ensembl`.
2. Chọn một đoạn `genome` nhỏ hoặc một chromosome segment.
3. Chạy `AUGUSTUS` với bộ tham số có sẵn, hoặc dùng `WebAUGUSTUS`.
4. So sánh tổng quan với annotation tham chiếu.
5. Viết rõ phần `assumption` và giới hạn.

### Độ khó

`Trung bình -> Khó`, vì bài toán eukaryote nhiều biến số hơn.

### Hướng mở rộng

- thêm `RNA-Seq hints` nếu có dữ liệu;
- so sánh kết quả khi dùng species model khác nhau;
- so sánh prediction với annotation chính thống.

### Rủi ro

- scope quá rộng;
- chọn bộ dữ liệu quá lớn;
- không kiểm soát chất lượng `training/evidence`.

## 5. Hướng 4 - Protein subcellular localization với DeepLoc 2.0

### Bài toán

Dùng `protein sequence` và `DeepLoc 2.0` để dự đoán `subcellular localization`, sau đó đối chiếu với annotation từ `UniProt`.

### Vì sao hợp môn

- là hướng `machine learning application` vừa sức;
- input là `protein sequence`, dễ mô tả và dễ đọc;
- có `paper` rõ, có web service, dễ minh họa bài toán prediction.

### Paper nền / nguồn cốt lõi

- `DeepLoc 2.0`: [Thumuluri et al., 2022](https://pubmed.ncbi.nlm.nih.gov/35489069/)
- `UniProt 2025`: [UniProt Consortium, 2025](https://pubmed.ncbi.nlm.nih.gov/39552041/)

### Pipeline đề xuất

1. Chọn một tập `reviewed proteins` từ `UniProt`.
2. Lấy `sequence` và annotation có liên quan.
3. Chạy dự đoán bằng `DeepLoc 2.0`.
4. Đối chiếu với annotation có sẵn.
5. Phân tích trường hợp đúng/sai và hạn chế.

### Độ khó

`Trung bình`.

### Hướng mở rộng

- thử trên nhiều species;
- tách membrane/non-membrane;
- so sánh nhóm protein đã biết và chưa rõ annotation.

### Rủi ro

- để bài thành một bài demo web service, thiếu phần phân tích;
- chọn dữ liệu mà annotation gốc không đủ tốt để đối chiếu.

## 6. Khuyến nghị mặc định

Nếu phải chốt ngay một hướng để làm, nên chọn:

`Hướng 1 - Virus genome phylogenetics`

Lý do:

- phù hợp nhất với trục kiến thức của môn;
- có `dataset` public để lấy nhanh;
- `pipeline` rõ và đẹp;
- có thể mở rộng vừa sức;
- dễ trình bày trên slide và dễ bảo vệ logic.

## 7. Cấu hình đề tài mặc định để bắt đầu ngay

Để tránh tiếp tục trì hoãn vì scope quá rộng, cấu hình mặc định nên là:

- taxon khởi động: `Zika virus`
- quy mô pilot: `30-50 complete genomes`
- quy mô báo cáo đầy đủ: `50-150 complete genomes`
- dữ liệu bổ sung: metadata cơ bản (`accession`, `host`, `country`, `release date`)
- `pipeline`: `NCBI Virus -> MAFFT -> IQ-TREE 2 + UFBoot2 -> diễn giải với metadata`

Tại sao chọn cấu hình này:

- `complete genome` của Zika ngắn hơn nhiều bộ genome eukaryote, dễ chạy;
- số lượng mẫu có thể kiểm soát được;
- có đủ không gian để mở rộng nhưng vẫn trong tay.

## 8. Khi nào nên bỏ hướng mặc định

Chỉ nên bỏ hướng `virus phylogenetics` nếu bạn có một trong ba lý do rõ ràng sau:

- muốn đi đậm vào `gene prediction`;
- muốn bài toán `machine learning` là trung tâm;
- đã có sẵn dữ liệu và kinh nghiệm ở hướng khác.

Nếu không, cứu cánh thực dụng nhất vẫn là hướng `alignment -> tree -> metadata`.

Sau file này, nên đọc [05-ke-hoach-doc-paper-va-lam-bao-cao.md](./05-ke-hoach-doc-paper-va-lam-bao-cao.md).
