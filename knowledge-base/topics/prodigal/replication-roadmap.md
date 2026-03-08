# `Prodigal`: replication roadmap

## Mục tiêu của bản `replication`

Chạy `Prodigal` trên 3 `bacterial genomes` public, rồi trả lời 3 câu hỏi:

1. mỗi genome được gọi ra bao nhiêu `protein-coding genes`;
2. output có khớp logic với annotation tham chiếu không;
3. giữa các species có khác biệt nào đáng nói ở mức quan sát được.

## Default dataset đã chốt

Ba genome mặc định:

- `Escherichia coli str. K-12 substr. MG1655` - BioProject `PRJNA57779`
- `Bacillus subtilis subsp. subtilis str. 168` - BioProject `PRJNA57675`
- `Pseudomonas aeruginosa PAO1` - BioProject `PRJNA57945`

Lý do chốt theo `BioProject`:

- `NCBI Datasets` hỗ trợ `datasets download genome accession` bằng cả Assembly hoặc `BioProject accession` [NCBI genome CLI reference](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/reference-docs/command-line/datasets/download/genome/).
- `BioProject` ổn định hơn cho phần kể chuyện trong báo cáo.

## Tiêu chí thành công

- tải được genome package cho cả 3 species
- xác định được file `*_genomic.fna`
- chạy `Prodigal` thành công trên cả 3 genome
- xuất được protein FASTA cho cả 3
- đếm được số gene dự đoán
- có ít nhất một bảng so sánh ngắn giữa 3 species

## Môi trường tối thiểu

- `Prodigal`
- `datasets` từ `NCBI Datasets CLI`
- công cụ giải nén zip
- PowerShell hoặc shell bất kỳ để đếm FASTA header và tìm file đầu vào

README chính thức của repo `Prodigal` cho biết tool này có một binary duy nhất, có bản cho Linux, macOS, Windows, và có thể build từ source bằng `make install`; để xem hết option thì dùng `prodigal -h` [GitHub](https://github.com/hyattpd/Prodigal).

## Cấu trúc thư mục khuyến nghị

```text
prodigal/
  01_raw/
  02_ref/
  03_runs/
  04_tables/
  05_notes/
```

## Bước 1 - Tải genome packages từ `NCBI`

Theo docs chính thức, `datasets download genome accession` có thể tải bằng Assembly hoặc `BioProject accession` và có thể thêm `genome`, `protein`, `gff3`, `cds` bằng `--include` [NCBI genome CLI reference](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/reference-docs/command-line/datasets/download/genome/).

```powershell
.\datasets.exe download genome accession PRJNA57779 --include genome,gff3,protein --filename 01_raw\ecoli.zip
.\datasets.exe download genome accession PRJNA57675 --include genome,gff3,protein --filename 01_raw\bsubtilis.zip
.\datasets.exe download genome accession PRJNA57945 --include genome,gff3,protein --filename 01_raw\pao1.zip
```

Giải nén:

```powershell
Expand-Archive 01_raw\ecoli.zip -DestinationPath 01_raw\ecoli
Expand-Archive 01_raw\bsubtilis.zip -DestinationPath 01_raw\bsubtilis
Expand-Archive 01_raw\pao1.zip -DestinationPath 01_raw\pao1
```

Docs `NCBI` cũng nói rõ:

- genome package mặc định có genome sequences và metadata;
- `--include` cho phép thêm `protein`, `cds`, `gff3`, và các file khác;
- có thể download trực tiếp bằng `BioProject accession`.

[NCBI how-to](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/genomes/download-genome/)

## Bước 2 - Xác định file genome FASTA và file tham chiếu

Tài liệu `NCBI` ghi rõ genome data package mặc định chứa:

- `<assembly_name>_genomic.fna`
- `assembly_data_report.jsonl`
- `dataset_catalog.json`

[NCBI genome CLI reference](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/reference-docs/command-line/datasets/download/genome/)

Để tìm file FASTA:

```powershell
Get-ChildItem 01_raw\ecoli -Recurse *_genomic.fna
Get-ChildItem 01_raw\bsubtilis -Recurse *_genomic.fna
Get-ChildItem 01_raw\pao1 -Recurse *_genomic.fna
```

Để tìm `gff3` tham chiếu:

```powershell
Get-ChildItem 01_raw\ecoli -Recurse *.gff
Get-ChildItem 01_raw\bsubtilis -Recurse *.gff
Get-ChildItem 01_raw\pao1 -Recurse *.gff
```

Sau khi xác nhận path thật, gán vào biến để chạy ổn định hơn:

```powershell
$EcoliGenome = (Get-ChildItem 01_raw\ecoli -Recurse *_genomic.fna | Select-Object -First 1).FullName
$BsubGenome = (Get-ChildItem 01_raw\bsubtilis -Recurse *_genomic.fna | Select-Object -First 1).FullName
$Pao1Genome = (Get-ChildItem 01_raw\pao1 -Recurse *_genomic.fna | Select-Object -First 1).FullName

$EcoliGff = (Get-ChildItem 01_raw\ecoli -Recurse *.gff | Select-Object -First 1).FullName
$BsubGff = (Get-ChildItem 01_raw\bsubtilis -Recurse *.gff | Select-Object -First 1).FullName
$Pao1Gff = (Get-ChildItem 01_raw\pao1 -Recurse *.gff | Select-Object -First 1).FullName
```

Kiểm tra nhanh file đã lấy đúng loại:

```powershell
$EcoliGenome
$BsubGenome
$Pao1Genome
```

Ba biến này phải trỏ tới file `*_genomic.fna`, không phải protein FASTA hay file metadata.

## Bước 3 - Chạy `Prodigal`

README chính thức cho ví dụ tối thiểu:

```text
prodigal -i my.genome.fna -o my.genes -a my.proteins.faa
```

Dùng mẫu đó cho ba genome:

```powershell
prodigal -i $EcoliGenome -o 03_runs\ecoli.genes.out -a 03_runs\ecoli.proteins.faa
prodigal -i $BsubGenome -o 03_runs\bsubtilis.genes.out -a 03_runs\bsubtilis.proteins.faa
prodigal -i $Pao1Genome -o 03_runs\pao1.genes.out -a 03_runs\pao1.proteins.faa
```

Ở vòng đầu, giữ đúng mode mặc định. Không thêm `-p meta` khi đang dùng complete bacterial genome, vì README chính thức cho thấy `-p meta` là mode riêng cho metagenome [GitHub](https://github.com/hyattpd/Prodigal).

## Bước 4 - Đếm số gene dự đoán

Với protein FASTA, mỗi header `>` tương ứng một protein prediction. Đếm nhanh:

```powershell
(Select-String -Pattern '^>' 03_runs\ecoli.proteins.faa).Count
(Select-String -Pattern '^>' 03_runs\bsubtilis.proteins.faa).Count
(Select-String -Pattern '^>' 03_runs\pao1.proteins.faa).Count
```

Lưu kết quả vào bảng tổng hợp:

- species
- số protein predicted
- ghi chú ngắn

Một bảng tối thiểu trong `04_tables/prodigal_summary.tsv` nên có các cột:

- species
- bioproject
- genome_file
- predicted_protein_count
- reference_cds_count
- note

## Bước 5 - So sánh sơ bộ với annotation tham chiếu

Vì package từ `NCBI` có thể kèm `gff3`, có thể đếm số dòng `CDS` trong reference annotation để có một so sánh sơ bộ.

```powershell
(Select-String -Pattern "`tCDS`t" $EcoliGff).Count
(Select-String -Pattern "`tCDS`t" $BsubGff).Count
(Select-String -Pattern "`tCDS`t" $Pao1Gff).Count
```

So sánh ở đây chỉ nên diễn giải ở mức:

- gần hay lệch đáng kể;
- species nào có sự chênh rõ hơn;
- có dấu hiệu do annotation style hay do bản thân genome.

Không nên kết luận quá mức rằng chênh lệch nhỏ là “tool sai”.

Đọc phần này đúng cách:

- `Prodigal` prediction và `reference annotation` đều là output tính toán;
- so sánh ở đây là để hiểu xu hướng và kiểm tra tính hợp lý;
- chưa phải là bước đánh giá benchmark chặt chẽ theo từng gene.

## Bước 6 - Viết nhận xét tối thiểu

Mỗi species nên có 3 dòng note:

- genome nào đã dùng;
- số `Prodigal` predictions;
- so sánh sơ bộ với reference annotation.

Sau đó có một đoạn tổng hợp:

- species nào có nhiều gene gọi hơn;
- có khác biệt lớn nào đáng chú ý;
- bài học chính về `gene prediction`.

## Output tối thiểu nên lưu

- `03_runs/ecoli.genes.out`
- `03_runs/ecoli.proteins.faa`
- `03_runs/bsubtilis.genes.out`
- `03_runs/bsubtilis.proteins.faa`
- `03_runs/pao1.genes.out`
- `03_runs/pao1.proteins.faa`
- `04_tables/prodigal_summary.tsv` hoặc bảng tương đương
- `05_notes/prodigal_readout.md` hoặc note tương đương

## Failure modes thường gặp

## Ở bước dữ liệu

- tải nhầm batch quá lớn do query quá rộng;
- lấy draft assembly hoặc dataset có nhiều isolate;
- nhầm file genome FASTA với protein FASTA.

## Ở bước chạy `Prodigal`

- đưa sai input file;
- không để ý shell không expand wildcard;
- nhầm giữa mode thường và mode `-p meta`.

README chính thức cho thấy `-p meta` là mode riêng cho metagenome, không nên dùng mặc định cho complete bacterial genome nếu chưa có lý do [GitHub](https://github.com/hyattpd/Prodigal).

## Ở bước diễn giải

- equate “protein predicted” với “gene đã xác thực”
- quên rằng annotation reference cũng là kết quả pipeline
- so sánh số lượng gene mà bỏ qua bối cảnh genome size và annotation style

## Mở rộng nhỏ sau khi chạy xong

- chạy thêm một batch contig bị cắt nhỏ
- thử `-p meta` trên dữ liệu đã fragment
- thêm một species thứ tư nếu muốn kiểm tra xu hướng

## Checklist hoàn thành

- 3 genome đã tải xong
- xác định đúng `*_genomic.fna`
- `Prodigal` chạy xong trên cả 3 genome
- đếm được số prediction
- có đối chiếu sơ bộ với reference annotation
- viết được 1 bảng so sánh và 1 đoạn kết luận ngắn

## Checklist chuyển sang viết báo cáo

- đã chốt được 3 species và lý do chọn
- đã có bảng số prediction cho cả 3 species
- đã có đối chiếu sơ bộ với `CDS` trong reference annotation
- đã chọn được một thông điệp chính để trình bày
- đã chọn được một hướng mở rộng nhỏ cho vòng sau

## Nguồn chính

- `Prodigal` GitHub README: [github.com/hyattpd/Prodigal](https://github.com/hyattpd/Prodigal)
- `Prodigal` paper: [PubMed](https://pubmed.ncbi.nlm.nih.gov/20211023/)
- `NCBI` genome download how-to: [ncbi.nlm.nih.gov](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/genomes/download-genome/)
- `NCBI` genome CLI reference: [ncbi.nlm.nih.gov](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/reference-docs/command-line/datasets/download/genome/)
- `E. coli` BioProject `PRJNA57779`: [NCBI](https://www.ncbi.nlm.nih.gov/bioproject/57779)
- `B. subtilis` BioProject `PRJNA57675`: [NCBI](https://www.ncbi.nlm.nih.gov/bioproject/57675)
- `P. aeruginosa` BioProject `PRJNA57945`: [NCBI](https://www.ncbi.nlm.nih.gov/bioproject/57945)
