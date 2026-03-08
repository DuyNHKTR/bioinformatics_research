# `MAFFT + IQ-TREE 2`: tổng quan

## Tóm tắt rất ngắn

Đây là một topic cực sát môn `INT 7021` vì nó nối thẳng ba trục quan trọng của học phần: `database`, `multiple sequence alignment`, và `phylogenetic tree`. Bài toán đủ cơ bản để đọc và giải thích, nhưng vẫn đủ mạnh để làm một bài báo cáo có hình ảnh trực quan, có mở rộng nhỏ, và có giá trị thực tế.

## Cách dùng bộ tài liệu topic 1

Ba file của topic này nên được dùng như một gói thống nhất:

1. đọc file này để hiểu bài toán, khái niệm, và logic của topic;
2. đọc `13-mafft-iqtree-replication-roadmap.md` để biết phải chạy gì, đọc output nào, và dừng ở đâu;
3. đọc `14-mafft-iqtree-phat-trien-va-ung-dung.md` để biết mở rộng nào hợp lý và cách kể câu chuyện báo cáo.

Điểm dừng hợp lý của vòng 1 là:

- hiểu đủ `paper` nền;
- có workflow rõ;
- biết output nào phải đọc;
- biết một hướng mở rộng nhỏ;
- chưa cần chuyển sang topic 2.

## Bài toán trung tâm

Từ một tập `virus genomes` public, ta:

1. lấy dữ liệu từ `NCBI Virus`;
2. tạo `multiple sequence alignment` bằng `MAFFT`;
3. dựng `maximum-likelihood tree` bằng `IQ-TREE 2`;
4. diễn giải cây bằng metadata như `host`, `country`, `release date`, hoặc `lineage`.

Nếu làm ở quy mô vừa phải, đây là một bài rất đúng tinh thần “lấy `paper` nền, chạy lại, rồi mở rộng một bước nhỏ”.

## Vì sao topic này bám môn nhất

- Đúng dữ liệu `molecular biology`: chuỗi nucleotide của virus.
- Đúng chương học: `sequence alignment`, `search/database`, `phylogenetic analysis`.
- Có `paper` nền rõ, có `tool` kinh điển, không phụ thuộc `foundation model`.
- Có kết quả đầu ra dễ trình bày: `alignment`, `tree`, support value, metadata overlay.
- Dễ thiết kế một mở rộng nhỏ mà vẫn hợp lý về sinh học.

## Vai trò của từng thành phần

## `MAFFT` dùng để làm gì

`MAFFT` là `multiple sequence alignment program` cho nucleotide hoặc protein sequences. Trang chính thức mô tả đây là một chương trình align nhiều trình tự với nhiều chế độ cân bằng giữa tốc độ và độ chính xác; cách gọi cơ bản là `mafft [arguments] input > output`, và nếu chưa chắc chọn chế độ nào thì có thể dùng `--auto` [MAFFT official](https://mafft.cbrc.jp/alignment/software/index.html).

Về mặt ý tưởng:

- input là các chuỗi thô chưa căn hàng;
- output là một `MSA`;
- chất lượng `MSA` ảnh hưởng trực tiếp tới chất lượng cây sau đó.

Điểm quan trọng nhất khi đọc `paper` hoặc chạy lại là: cây không tốt hơn `alignment` của nó.

## `IQ-TREE 2` dùng để làm gì

`IQ-TREE 2` là phần dựng cây `maximum likelihood`. Tutorial chính thức nói rất rõ: nếu đầu vào là raw sequences thì phải align trước, ví dụ bằng `MAFFT`, rồi mới đưa `alignment` vào `IQ-TREE` [IQ-TREE tutorial](https://iqtree.github.io/doc/Tutorial).

Ở mức thực dụng, `IQ-TREE 2` giải quyết ba việc:

- chọn mô hình thay thế thích hợp;
- tìm cây `ML` tốt nhất;
- gán support cho các nhánh bằng `UFBoot` hoặc các branch test khác.

## `ModelFinder` và `UFBoot2`

Trong workflow này, `ModelFinder` và `UFBoot2` là hai khối rất đáng hiểu:

- `ModelFinder` giúp chọn `substitution model` phù hợp hơn cho dữ liệu [PubMed](https://pubmed.ncbi.nlm.nih.gov/28481363/).
- `UFBoot2` giúp ước lượng branch support nhanh hơn bootstrap cổ điển và được tài liệu `IQ-TREE` dùng như một lựa chọn mặc định thực dụng [IQ-TREE command reference](https://iqtree.github.io/doc/Command-Reference), [PubMed](https://pubmed.ncbi.nlm.nih.gov/29077904/).

## Các `paper` nền nên đọc

## Nhóm `paper` cốt lõi

- `MAFFT` gốc: [Katoh et al., 2002](https://pubmed.ncbi.nlm.nih.gov/12136088/)
- `MAFFT` version 7: [Katoh and Standley, 2013](https://pubmed.ncbi.nlm.nih.gov/23329690/)
- `IQ-TREE 2`: [Minh et al., 2020](https://pubmed.ncbi.nlm.nih.gov/32011700/)
- `ModelFinder`: [Kalyaanamoorthy et al., 2017](https://pubmed.ncbi.nlm.nih.gov/28481363/)
- `UFBoot2`: [Hoang et al., 2018](https://pubmed.ncbi.nlm.nih.gov/29077904/)

## Cách đọc các `paper` này cho đúng mức

- Với `MAFFT`, không cần đào quá sâu vào mọi biến thể thuật toán; chỉ cần hiểu vai trò của `MSA`, các chế độ dùng phổ biến, và vì sao version mới nhấn mạnh tính thực dụng và hạn chế misalignment.
- Với `IQ-TREE 2`, cần hiểu `maximum likelihood`, `model selection`, output files, và branch support.
- Với `ModelFinder` và `UFBoot2`, chỉ cần hiểu chúng là các khối bổ trợ làm workflow hoàn chỉnh hơn.

## Những khái niệm bắt buộc phải hiểu

## Về dữ liệu

- `sequence`
- `homology`
- `site`
- `gap`
- `conserved region`
- `variable region`

## Về `alignment`

- `MSA` không phải là “sự thật tuyệt đối”; nó là một giả thuyết về sự tương ứng giữa các vị trí.
- `alignment` kém sẽ kéo theo `tree` kém.
- Sequence quá khác nhau, quá ngắn, hoặc quá nhiều lỗi có thể làm `alignment` méo.

## Về dựng cây

- `phylogenetic tree` ở đây mặc định là `unrooted tree` nếu không chỉ định khác [IQ-TREE tutorial](https://iqtree.github.io/doc/Tutorial).
- `branch support` cao không có nghĩa là diễn giải sinh học luôn đúng.
- Một cụm trên cây có thể phản ánh sampling bias, quality issue, hoặc metadata bias, không chỉ là tín hiệu tiến hóa thật.

## Về metadata

Metadata là phần làm topic này mạnh lên trong báo cáo. Nếu chỉ có cây mà không có metadata, bài thường dễ biến thành “có hình nhưng ít ý nghĩa”. Metadata giúp trả lời:

- vì sao một cụm sequence lại đi với nhau;
- liệu có hiện tượng theo địa lý, thời gian, host hay không;
- có outlier nào cần giải thích hoặc loại bỏ không.

## Default scope đã chốt cho dossier này

Để tránh trôi thành một project quá lớn, dossier này mặc định dùng:

- `SARS-CoV-2 complete genomes`
- nguồn từ `NCBI Virus`
- quy mô pilot `50-80` sequence
- `host = human`
- ưu tiên sequence có metadata rõ

Chọn `SARS-CoV-2` không phải vì nó “hot”, mà vì:

- dữ liệu public rất mạnh;
- metadata phong phú;
- workflow tải và lọc dữ liệu có tài liệu chính thức từ `NCBI`.

## Kết quả đầu ra tối thiểu cần có

Một bài `replication` tối thiểu nên tạo được:

- một `genomic.fna` hoặc FASTA đã chọn mẫu;
- một file `alignment`;
- một file `.treefile`;
- một file `.iqtree` để đọc model và support;
- một bảng metadata tối thiểu để giải thích các cụm chính trên cây.

## Hướng mở rộng nhỏ hợp lý

- đổi từ `whole genome` sang một gene đại diện;
- thay tiêu chí lọc mẫu theo `country` hoặc `release date`;
- so sánh cây trước và sau khi loại outlier hoặc sequence chất lượng thấp.

## Ứng dụng thực tế

- `molecular epidemiology`
- theo dõi `lineage` và biến thể
- so sánh isolate trong giám sát dịch tễ
- hỗ trợ diễn giải mối quan hệ giữa các trình tự mới tải về từ `database`

## Rủi ro và giới hạn

- Sequence names bẩn hoặc trùng nhau có thể gây lỗi downstream; tutorial `IQ-TREE` có nhắc rằng tên sequence chỉ nên dùng tập ký tự an toàn [IQ-TREE tutorial](https://iqtree.github.io/doc/Tutorial).
- `MAFFT --auto` là lựa chọn thực dụng, nhưng không phải lúc nào cũng là tối ưu.
- `tree` đẹp chưa chắc diễn giải sinh học đúng nếu sampling không cân bằng.
- `SARS-CoV-2` có dữ liệu quá nhiều; nếu không giới hạn từ đầu thì project dễ phình.

## Kết luận ngắn

Nếu mục tiêu là một topic đúng môn, đọc được, chạy được, giải thích được, và có chỗ mở rộng nhỏ, thì `MAFFT + IQ-TREE 2` là lựa chọn số 1. Nó vừa đủ “cơ bản” để hợp tinh thần ảnh, vừa đủ “đẹp” để làm một bài báo cáo có chiều sâu.

## Nguồn chính

- `MAFFT` official: [mafft.cbrc.jp](https://mafft.cbrc.jp/alignment/software/index.html)
- `MAFFT` 2002 paper: [PubMed](https://pubmed.ncbi.nlm.nih.gov/12136088/)
- `MAFFT` version 7 paper: [PubMed](https://pubmed.ncbi.nlm.nih.gov/23329690/)
- `IQ-TREE` tutorial: [iqtree.github.io/doc/Tutorial](https://iqtree.github.io/doc/Tutorial)
- `IQ-TREE` command reference: [iqtree.github.io/doc/Command-Reference](https://iqtree.github.io/doc/Command-Reference)
- `IQ-TREE 2` paper: [PubMed](https://pubmed.ncbi.nlm.nih.gov/32011700/)
- `ModelFinder` paper: [PubMed](https://pubmed.ncbi.nlm.nih.gov/28481363/)
- `UFBoot2` paper: [PubMed](https://pubmed.ncbi.nlm.nih.gov/29077904/)
- `NCBI Virus` metadata docs: [NCBI Datasets](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-metadata/)
- `NCBI Virus` download docs: [NCBI Datasets](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-download/)
