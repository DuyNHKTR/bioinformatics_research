# Nguồn tham khảo

File này gồm các nguồn dùng để xác thực học phần, giải thích công cụ, và neo `paper` nền. Ưu tiên nguồn chính thống và `primary sources`.

## 1. Nguồn xác thực học phần

- [Khung CTĐT Sau đại học Khoa học máy tính UET có học phần INT 7021](https://www.uet.vnu.edu.vn/chuong-trinh-dao-tao-nganh-khoa-hoc-may-tinh-24/)
  - Dùng để xác thực tên học phần, mã học phần, số tín chỉ, và vị trí trong CTĐT.
- [Danh sách khóa học công khai của Courses UET](https://courses.uet.vnu.edu.vn/course/index.php?browse=courses&categoryid=82&page=1&perpage=20)
  - Dùng để xác thực sự tồn tại của lớp `2324II_INT7021` và giảng viên.
- [Ảnh chụp lớp học trong thư mục](./9d313fa9-97ac-48bd-9600-451faa6b4e20.png)
  - Dùng để xác thực lịch buổi học, giảng viên, và yêu cầu ngầm của bài báo cáo.

## 2. Nguồn chính thống cho dữ liệu và tool

- [BLAST Help - NCBI Bookshelf](https://www.ncbi.nlm.nih.gov/books/NBK1762/)
  - Tài liệu chính thống cho `BLAST`, phù hợp để hiểu khái niệm, cách dùng, và ý nghĩa kết quả.
- [BLAST Command Line Applications User Manual](https://www.ncbi.nlm.nih.gov/books/NBK279690/)
  - Dùng khi cần từ web form sang `command line`.
- [MAFFT official site](https://mafft.cbrc.jp/alignment/software/index.html)
  - Nguồn chính thống cho `multiple sequence alignment`, usage và các mode.
- [IQ-TREE beginner's tutorial](https://iqtree.github.io/doc/Tutorial)
  - Nguồn chính thống hướng dẫn `phylogenetic inference` bằng `IQ-TREE 2`.
- [NCBI Datasets - download genome](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/genomes/download-genome/)
  - Hướng dẫn tải `genome` và annotation theo taxon hoặc accession.
- [NCBI Datasets - virus metadata](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-metadata/)
  - Dùng cho bài toán lấy metadata virus.
- [NCBI Datasets - virus genome package](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/reference-docs/data-packages/virus-genome/)
  - Dùng để hiểu file structure khi tải bộ dữ liệu virus.
- [NCBI Virus help](https://www.ncbi.nlm.nih.gov/labs/virus/vssi/docs/help/)
  - Tài liệu chính thống cho `NCBI Virus`.
- [Biopython Tutorial & Cookbook](https://biopython.org/docs/latest/Tutorial/)
  - Dùng để xử lý `FASTA`, `GenBank`, `alignment`, `tree`, `Entrez`.
- [AUGUSTUS official site](https://bioinf.uni-greifswald.de/augustus/)
  - Trang chính thống của `AUGUSTUS`.
- [WebAUGUSTUS](https://bioinf.uni-greifswald.de/webaugustus)
  - Giao diện web phù hợp khi chưa muốn dùng local setup phức tạp.
- [Ensembl homepage](https://www.ensembl.org/index.html)
  - Nguồn genome, annotation và browser cho nhiều species.
- [Ensembl docs](https://www.ensembl.org/info/)
  - Dùng khi cần data access, docs, và hướng dẫn khai thác.
- [HMMER official site](https://hmmer.org/)
  - Nguồn chính thống cho `profile HMM` và tìm `remote homolog`.

## 3. Paper cốt lõi cho các chủ đề chính

- [Basic local alignment search tool - Altschul et al., 1990](https://pubmed.ncbi.nlm.nih.gov/2231712/)
  - `paper` kinh điển về `BLAST`.
- [MAFFT: a novel method for rapid multiple sequence alignment based on fast Fourier transform - Katoh et al., 2002](https://pubmed.ncbi.nlm.nih.gov/12136088/)
  - `paper` gốc của `MAFFT`.
- [MAFFT version 5: improvement in accuracy of multiple sequence alignment - Katoh et al., 2005](https://pubmed.ncbi.nlm.nih.gov/15661851/)
  - Dùng khi cần lý giải trade-off giữa tốc độ và độ chính xác.
- [IQ-TREE 2: New Models and Efficient Methods for Phylogenetic Inference in the Genomic Era - Minh et al., 2020](https://pubmed.ncbi.nlm.nih.gov/32011700/)
  - `paper` cốt lõi cho `phylogenetic inference`.
- [UFBoot2: Improving the Ultrafast Bootstrap Approximation - Hoang et al., 2018](https://pubmed.ncbi.nlm.nih.gov/29077904/)
  - `paper` cốt lõi cho bootstrap nhanh trong `IQ-TREE`.
- [Prodigal: prokaryotic gene recognition and translation initiation site identification - Hyatt et al., 2010](https://pubmed.ncbi.nlm.nih.gov/20211023/)
  - `paper` cốt lõi cho hướng `prokaryotic gene prediction`.
- [Gene and translation initiation site prediction in metagenomic sequences - Hyatt et al., 2012](https://pubmed.ncbi.nlm.nih.gov/22796954/)
  - `MetaProdigal`, phù hợp khi muốn nối sang `metagenomic fragments`.
- [WebAUGUSTUS - Stanke et al., 2013](https://academic.oup.com/nar/article/41/W1/W123/1103810)
  - `paper` giới thiệu web service cho `AUGUSTUS`.
- [DeepLoc 2.0: multi-label subcellular localization prediction using protein language models - Thumuluri et al., 2022](https://pubmed.ncbi.nlm.nih.gov/35489069/)
  - `paper` cốt lõi cho hướng `machine learning` ở mức protein-level.
- [UniProt: the Universal Protein Knowledgebase in 2025 - UniProt Consortium](https://pubmed.ncbi.nlm.nih.gov/39552041/)
  - Nguồn tổng quan hiện tại về `UniProtKB`.
- [The UniProt website API: facilitating programmatic access to protein knowledge - Ahmad et al., 2025](https://pubmed.ncbi.nlm.nih.gov/40331428/)
  - Dùng khi cần tự động hóa truy cập `UniProt`.

## 4. Nguồn hỗ trợ cho đề tài virus

- [Download a virus genome data package - NCBI Datasets](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-download/)
  - Hướng dẫn tải bộ virus genomes.
- [Get virus genome metadata - NCBI Datasets](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-metadata/)
  - Hướng dẫn metadata theo taxon/accession.
- [Virus Variation Resource - improved response to emergent viral outbreaks](https://pubmed.ncbi.nlm.nih.gov/27899678/)
  - `paper` mô tả resource và workflow virus-level tại NCBI.

## 5. Gợi ý cách trích dẫn trong báo cáo

Nếu cần viết ngắn gọn trong báo cáo, có thể gom nguồn thành 3 nhóm:

- nguồn học phần: UET + ảnh lớp học;
- nguồn `tool/database`: `NCBI`, `MAFFT`, `IQ-TREE`, `Biopython`, `AUGUSTUS`, `Ensembl`;
- nguồn `paper` nền: `BLAST`, `MAFFT`, `IQ-TREE 2`, `UFBoot2`, `Prodigal`, `DeepLoc 2.0`.

## 6. Ghi chú về độ tin cậy

- Ưu tiên cao nhất: `official docs`, `PubMed`, trang chính thống của `tool/database`.
- Ưu tiên thứ hai: bài tổng quan của consortium như `UniProt`.
- Chỉ dùng bài viết blog/news khi cần xác thực bối cảnh tài nguyên, không dùng làm nền cho kết luận học thuật.
