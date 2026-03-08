# `MAFFT + IQ-TREE 2`: replication roadmap

## Mục tiêu của bản `replication`

Chạy một workflow tối thiểu nhưng hoàn chỉnh:

1. lấy `virus genomes` public;
2. tạo `multiple sequence alignment` bằng `MAFFT`;
3. dựng `maximum-likelihood tree` bằng `IQ-TREE 2`;
4. đọc output đúng cách;
5. nối kết quả với metadata để giải thích sinh học ở mức cơ bản.

## Default scope đã chốt

- đối tượng: `SARS-CoV-2 complete genomes`
- nguồn: `NCBI Virus`
- số lượng mục tiêu: `50-80` sequence
- `host = human`
- dùng `whole genome` cho vòng đầu
- không cố tối ưu cho data cực lớn

Lý do chọn scope này:

- đủ nhỏ để chạy trên máy cá nhân;
- đủ lớn để cây có ý nghĩa;
- có tài liệu chính thức cho metadata, download, và package structure từ `NCBI`.

## Tiêu chí thành công

- tải được metadata và FASTA public hợp lệ;
- tạo được `alignment` bằng `MAFFT`;
- chạy xong `IQ-TREE 2` với `model selection` và `bootstrap`;
- đọc được ít nhất 3 loại output: `.iqtree`, `.treefile`, `.log`;
- mô tả được ít nhất 2 cụm trên cây bằng metadata.

## Môi trường tối thiểu

- `MAFFT` version `7.487+`
- `IQ-TREE 2`
- `datasets` và `dataformat` từ `NCBI Datasets CLI`
- công cụ giải nén zip
- một tree viewer như `FigTree` hoặc `iTOL` cho bước trực quan hóa

Ghi chú quan trọng:

- Trang chính thức `MAFFT` có cảnh báo các version `7.463-7.486` có bug ảnh hưởng cả `FFT-NS-i` và `--auto`, vì vậy nên dùng `7.487` hoặc cao hơn [MAFFT official](https://mafft.cbrc.jp/alignment/software/index.html).
- `NCBI` hiện ghi rõ `datasets` và `dataformat` là hai CLI chính thức, có bản cho Windows và `conda` package [NCBI install docs](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/command-line-tools/download-and-install/).

## Cấu trúc thư mục khuyến nghị

```text
mafft_iqtree/
  01_raw/
  02_meta/
  03_alignment/
  04_tree/
  05_notes/
  06_figures/
```

## Bước 1 - Cài `NCBI Datasets CLI`

Nếu dùng Windows và chưa có `datasets.exe` / `dataformat.exe`, tài liệu chính thức của `NCBI` cho phép tải trực tiếp:

```powershell
curl -o datasets.exe "https://ftp.ncbi.nlm.nih.gov/pub/datasets/command-line/v2/win64/datasets.exe"
curl -o dataformat.exe "https://ftp.ncbi.nlm.nih.gov/pub/datasets/command-line/v2/win64/dataformat.exe"
```

Nếu dùng `conda`:

```powershell
conda create -n ncbi_datasets
conda activate ncbi_datasets
conda install -c conda-forge ncbi-datasets-cli
```

## Bước 2 - Lấy metadata thô

`NCBI` mô tả rõ rằng có thể lấy virus metadata bằng `datasets summary virus genome taxon ...`, rồi pipe sang `dataformat` để tạo bảng [NCBI virus metadata docs](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-metadata/).

```powershell
.\datasets.exe summary virus genome taxon sars-cov-2 --as-json-lines > 02_meta\all_sars2.jsonl
.\datasets.exe summary virus genome taxon sars-cov-2 --as-json-lines | .\dataformat.exe tsv virus-genome --fields accession,release-date > 02_meta\accession_release.tsv
```

Ghi chú quan trọng từ docs `NCBI`:

- với virus genomes, accession nên là `GenBank nucleotide accession`;
- không dùng accession kiểu `GCA` hoặc `GCF` cho workflow virus này.

Điều này áp dụng cho cả `summary` và `download` [NCBI virus metadata docs](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-metadata/), [NCBI virus download docs](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-download/).

Mục tiêu của bước này không phải là có bảng hoàn hảo ngay, mà là:

- biết tập accession đang có;
- biết cấu trúc metadata report;
- tạo cơ sở để chọn một danh sách accession nhỏ, sạch, và cân bằng hơn.

## Bước 3 - Chốt danh sách accession để chạy thật

Không nên align toàn bộ dữ liệu `SARS-CoV-2` vì project sẽ phình rất nhanh. Bản này chốt chiến lược chọn mẫu như sau:

- chỉ giữ `complete genome`;
- chỉ giữ `host = human`;
- chọn `50-80` accession;
- ưu tiên sequence có `release date` rõ;
- tránh dồn quá nhiều sequence từ một cụm thời gian hoặc một location duy nhất.

Đầu ra của bước này là file:

```text
02_meta/selected_accessions.txt
```

Mỗi dòng là một accession.

## Bước 4 - Tải đúng tập accession đã chọn

`NCBI` có hỗ trợ download virus genomes từ một file accession list bằng `--inputfile` [NCBI virus download docs](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-download/).

```powershell
.\datasets.exe download virus genome accession --inputfile 02_meta\selected_accessions.txt --include genome,biosample --filename 01_raw\sars2_selected.zip
Expand-Archive 01_raw\sars2_selected.zip -DestinationPath 01_raw\sars2_selected
```

Theo tài liệu package của `NCBI`, genome package sẽ chứa:

- `ncbi_dataset/data/genomic.fna`
- `ncbi_dataset/data/data_report.jsonl`
- có thể có thêm `biosample_report.jsonl` nếu dùng `--include biosample`

[NCBI virus package docs](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/reference-docs/data-packages/virus-genome/)

Ghi chú thực dụng:

- docs `NCBI` cũng cho biết package virus mặc định đã có genome sequences và metadata;
- nếu muốn thêm file khác như `protein`, `cds`, `biosample` thì dùng `--include`;
- docs cũng ghi rõ có thể filter khi download theo `host`, `geographic location`, `completeness`, `release date`, `update date`, và `Pango lineage` cho `SARS-CoV-2`.

Trong dossier này vẫn giữ cách an toàn hơn là:

1. lấy metadata trước;
2. chốt accession list;
3. download đúng batch đã chọn.

## Bước 5 - Xác nhận file đầu vào

File nucleotide FASTA mặc định cần dùng là:

```text
01_raw/sars2_selected/ncbi_dataset/data/genomic.fna
```

File metadata chính:

```text
01_raw/sars2_selected/ncbi_dataset/data/data_report.jsonl
```

File này là “source of truth” cho phần accession và metadata của batch đang chạy.

Kiểm tra nhanh số sequence đầu vào:

```powershell
(Select-String -Pattern '^>' 01_raw\sars2_selected\ncbi_dataset\data\genomic.fna).Count
```

Con số này phải khớp với số accession trong `02_meta\selected_accessions.txt`.

## Bước 6 - Chạy `MAFFT`

Trang chính thức `MAFFT` ghi cách dùng cơ bản là:

```text
mafft [arguments] input > output
```

Nếu chưa chắc chọn mode nào, workflow pilot dùng `--auto`:

```powershell
mafft --auto 01_raw\sars2_selected\ncbi_dataset\data\genomic.fna > 03_alignment\sars2.aln.fasta
```

Kỳ vọng sau bước này:

- có file `03_alignment\sars2.aln.fasta`
- số sequence trong alignment bằng số accession đã chọn
- sequence names không bị vỡ hoặc trùng bất thường

## Bước 7 - Kiểm tra nhanh `alignment`

Checklist tối thiểu:

- số sequence có đúng như mong đợi không;
- có sequence nào quá ngắn hoặc toàn `N` không;
- tên sequence có bị ký tự lạ, trùng, hoặc bị thay bằng `_` quá nhiều không.

Kiểm tra nhanh số sequence sau alignment:

```powershell
(Select-String -Pattern '^>' 03_alignment\sars2.aln.fasta).Count
```

Tutorial `IQ-TREE` lưu ý rằng tên sequence có ký tự đặc biệt có thể bị thay thế, thậm chí gây trùng tên nếu input bẩn [IQ-TREE tutorial](https://iqtree.github.io/doc/Tutorial).

Docs `IQ-TREE` cũng nêu rõ chỉ một số ký tự là an toàn trong sequence names: chữ và số, `_`, `-`, `.`, `/`, `|`. Các ký tự khác sẽ bị thay bằng `_`, và điều đó có thể tạo ra duplicate names nếu input ban đầu không sạch [IQ-TREE tutorial](https://iqtree.github.io/doc/Tutorial).

## Bước 8 - Chạy `IQ-TREE 2`

Theo tutorial và command reference chính thức:

- `-s` để chỉ định alignment;
- `-m MFP` để chạy `ModelFinder Plus`;
- `-bb 1000` cho `UFBoot`;
- `-alrt 1000` có thể thêm để có một loại support nữa;
- `-nt AUTO` cho phép chọn số core tự động;
- `-pre` để đặt prefix đầu ra [IQ-TREE tutorial](https://iqtree.github.io/doc/Tutorial), [command reference](https://iqtree.github.io/doc/Command-Reference).

Command pilot:

```powershell
iqtree2 -s 03_alignment\sars2.aln.fasta -st DNA -m MFP -alrt 1000 -bb 1000 -nt AUTO -pre 04_tree\sars2
```

Nếu binary trên máy là `iqtree` thay vì `iqtree2`, giữ nguyên phần còn lại và đổi tên executable.

## Bước 9 - Đọc output đúng cách

Tutorial `IQ-TREE` nói rõ các file đầu ra chính:

- `.iqtree`: report chính, phải đọc file này
- `.treefile`: cây ở định dạng `NEWICK`
- `.log`: log chạy
- `.model`: log-likelihood của các model đã test nếu chạy model selection

Tập trung đọc:

- model tốt nhất được chọn là gì;
- `alignment` có bao nhiêu taxa, bao nhiêu site;
- support value của các nhánh chính;
- có cảnh báo gì về input hay không.

Theo tutorial, đây là thứ tự ưu tiên nên đọc:

1. `.iqtree`
2. `.log`
3. `.treefile`

Không nên xem `.treefile` hoặc ảnh cây trước rồi bỏ qua `.iqtree`, vì `.iqtree` mới là nơi ghi model, support, cảnh báo và bối cảnh của kết quả [IQ-TREE tutorial](https://iqtree.github.io/doc/Tutorial).

Nếu chạy kết hợp `-alrt 1000 -bb 1000`, docs `IQ-TREE` cho biết mỗi branch có thể mang nhiều support values, ngăn cách bởi dấu `/`. Thứ tự của các support values này được ghi trong `.iqtree` report file [IQ-TREE command reference](https://iqtree.github.io/doc/Command-Reference).

## Bước 10 - Gắn metadata để giải thích cây

Đây là bước biến một bài kỹ thuật thành một bài báo cáo hợp môn.

Ít nhất cần trả lời:

- cụm lớn nhất trên cây tương ứng với metadata nào;
- có outlier nào tách riêng không;
- các sequence gần nhau có xu hướng cùng `country`, cùng `release window`, hay cùng một pattern metadata nào không.

Nếu cần bảng TSV từ JSON Lines, `NCBI` hỗ trợ `dataformat tsv virus-genome` [NCBI metadata docs](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-metadata/).

## Output tối thiểu nên nộp hoặc lưu

- `03_alignment/sars2.aln.fasta`
- `04_tree/sars2.iqtree`
- `04_tree/sars2.treefile`
- `04_tree/sars2.log`
- `04_tree/sars2.model`
- `02_meta/selected_accessions.txt`
- một bảng note ngắn giải thích 2-3 cụm chính

Một bộ note tối thiểu trong `05_notes/` nên có các cột hoặc ý sau:

- accession
- country
- release date
- cluster hoặc clade quan sát được trên cây
- ghi chú ngắn nếu là outlier hoặc sequence đáng chú ý

## Những lỗi thường gặp

## Lỗi ở bước dữ liệu

- accession list quá lớn làm project nặng không cần thiết;
- sequence không cùng loại hoặc không cùng phạm vi;
- metadata lệch mạnh theo thời gian hoặc location.

## Lỗi ở bước `alignment`

- đầu vào có sequence chất lượng thấp;
- sequence names chứa ký tự gây xung đột;
- dùng `MAFFT` version nằm trong dải bug cũ của `--auto`.

## Lỗi ở bước dựng cây

- không đọc file `.iqtree`, chỉ nhìn ảnh cây;
- thấy support cao là kết luận quá mạnh;
- không phân biệt giữa tín hiệu tiến hóa và sampling bias.

## Mở rộng nhỏ sau khi chạy xong bản đầu

- giữ nguyên workflow nhưng đổi tập accession theo một `country` khác;
- chạy lại với số mẫu ít hơn và nhiều hơn để xem độ ổn định;
- chuyển sang một gene đại diện nếu có lý do sinh học rõ.

## Checklist hoàn thành

- metadata đã tải và có accession list cố định
- batch FASTA đã được chốt
- `MAFFT` chạy thành công
- `IQ-TREE 2` chạy thành công
- đã đọc `.iqtree` chứ không chỉ xem `.treefile`
- đã có ít nhất một cách giải thích cây bằng metadata

## Checklist chuyển sang viết báo cáo

- đã chốt được một câu hỏi sinh học rất ngắn cho pilot
- đã có ảnh cây hoặc tree viewer để minh họa
- đã biết 2-3 cụm nào sẽ được nhắc trong báo cáo
- đã có ít nhất một limitation cụ thể của batch dữ liệu hiện tại
- đã chọn được một hướng mở rộng nhỏ cho vòng sau

## Nguồn chính

- `MAFFT` official: [mafft.cbrc.jp](https://mafft.cbrc.jp/alignment/software/index.html)
- `IQ-TREE` tutorial: [iqtree.github.io/doc/Tutorial](https://iqtree.github.io/doc/Tutorial)
- `IQ-TREE` command reference: [iqtree.github.io/doc/Command-Reference](https://iqtree.github.io/doc/Command-Reference)
- `NCBI Datasets` install docs: [ncbi.nlm.nih.gov](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/command-line-tools/download-and-install/)
- `NCBI` virus metadata docs: [ncbi.nlm.nih.gov](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-metadata/)
- `NCBI` virus download docs: [ncbi.nlm.nih.gov](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-download/)
- `NCBI` virus package docs: [ncbi.nlm.nih.gov](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/reference-docs/data-packages/virus-genome/)
