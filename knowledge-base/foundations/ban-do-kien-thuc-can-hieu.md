# Bản đồ kiến thức cần hiểu trước khi lao vào topic mới

File này không phải danh sách `paper`. Nó là sơ đồ tư duy để khi gặp một topic mới, bạn biết mình đang thiếu phần nào và phải đọc phần nào trước.

## 1. Sáu lớp kiến thức cần có

Khi đọc một topic bioinformatics mới, gần như lúc nào cũng phải map nó vào 6 lớp sau:

1. `Biology`: bài toán sinh học thật sự là gì.
2. `Data`: dữ liệu là `sequence`, `expression`, `structure`, `spatial`, hay `metadata`.
3. `Task`: đang làm `classification`, `regression`, `generation`, `retrieval`, hay `representation learning`.
4. `Model`: là `alignment-based`, `probabilistic`, `graph-based`, `transformer`, `CNN`, `GNN`, hay `foundation model`.
5. `Evaluation`: dùng `AUROC`, `AUPRC`, `F1`, `Pearson`, `Spearman`, `perplexity`, hay metric sinh học đặc thù.
6. `Implementation`: code có mở không, train được không, cần GPU mức nào, có notebook/demo không.

Nếu thiếu một trong 6 lớp này thì rất dễ bị rơi vào trạng thái:

- hiểu tên topic nhưng không hiểu bài toán;
- hiểu `paper` nhưng không biết code chạy gì;
- có code nhưng không biết output nói lên điều gì.

## 2. Các modality dữ liệu bạn phải nhận diện ngay

### DNA / genome sequence

Đây là trục dữ liệu của các topic như `DNABERT-2`, `HyenaDNA`, `Nucleotide Transformer`, `Enformer`, `SpliceAI`.

Điều bắt buộc phải hiểu:

- `k-mer` hoặc tokenizer đang biểu diễn `sequence` ra sao;
- input là đoạn ngắn, đoạn dài, hay vùng điều hòa;
- output là nhãn nhị phân, điểm số liên tục, hay embedding;
- có chia theo chromosome/species hay không.

### Protein sequence / structure

Đây là trục dữ liệu của `ESM-2`, `ESMFold`, `DeepFRI`, các hướng protein `foundation model`.

Điều bắt buộc phải hiểu:

- input là amino acid sequence hay thêm thông tin `structure`;
- model dùng để `embedding`, `structure prediction`, hay `function prediction`;
- benchmark là function, contact, fold, hay mutation effect.

### Single-cell transcriptomics

Đây là trục dữ liệu của `scGPT`, `Geneformer`.

Điều bắt buộc phải hiểu:

- đầu vào có phải ma trận gene-expression hay không;
- gene được mã hóa như token hay feature;
- có xử lý `batch effect`, `cell type imbalance`, `donor split` không;
- downstream task là `cell type annotation`, `integration`, `perturbation`, hay `trajectory`.

### Spatial transcriptomics

Đây là trục dữ liệu của `STAGATE` và các topic không gian khác.

Điều bắt buộc phải hiểu:

- ngoài gene-expression còn có tọa độ không gian;
- graph được tạo từ khoảng cách hay ảnh mô học;
- task là `clustering`, `domain detection`, hay `imputation`.

## 3. Cách đọc một topic mới trong 15 phút đầu

Khi mở một `paper` mới, hãy cố trả lời nhanh 7 câu:

1. Dữ liệu gì?
2. Task gì?
3. Model gì?
4. Có `source code` không?
5. Có `pretrained weights` không?
6. Có benchmark công khai không?
7. Nếu muốn tái lập trong 1-2 tuần thì phần nào là khả thi nhất?

Nếu sau 15 phút mà vẫn chưa trả lời được 7 câu này, đừng đọc sâu phần `method` vội. Quay lại repo, README, figure đầu tiên, và phần `abstract`.

## 4. Từ kiến thức của môn hiện tại sang topic mới như thế nào

Những gì đã có trong các file `01-06` không hề lỗi thời. Chúng là nền để hiểu topic mới:

- `sequence alignment` giúp hiểu input/output và tính giống nhau của dữ liệu.
- `genome analysis` giúp hiểu dataset, annotation, coordinate, region.
- `phylogenetic analysis` giúp hiểu quan hệ giữa mẫu và rủi ro `data leakage`.
- `gene prediction` giúp hiểu task-level labeling và evaluation.
- `machine learning applications` là cầu nối trực tiếp sang `foundation model`.

Vì vậy, đừng nghĩ `foundation model` là một thế giới tách biệt. Nó chỉ là tầng `modeling` mới đặt lên trên cùng các kiểu dữ liệu cũ.

## 5. Kiến thức nào cần học trước, kiến thức nào để sau

### Cần học trước

- dữ liệu đang ở dạng nào;
- task cụ thể là gì;
- metric đánh giá là gì;
- code base vào ở đâu và ra ở đâu;
- model có cần `pretrained weights` không.

### Có thể để sau

- chi tiết tối ưu hóa mọi hyperparameter;
- toàn bộ lý thuyết transformer/mamba/GNN ở mức sâu nhất;
- tất cả benchmark phụ nếu mục tiêu là chọn topic để làm trước.

## 6. Công thức chọn topic không bị “ảo”

Một topic đáng theo ở giai đoạn này nên thỏa cả 4 điều:

- `paper` có tác động hoặc đủ mới;
- `implementation` mở và đọc được;
- dữ liệu công khai hoặc có benchmark rõ;
- có thể tách một phiên bản `mini-project` để học thử.

Nếu chỉ có 1-2 điều trong số đó, topic vẫn hay nhưng chưa chắc hợp để theo ngay.

## 7. Thứ tự đọc đề xuất

Thứ tự hợp lý nhất lúc này là:

1. File này
2. [08-khai-niem-ve-du-lieu-task-va-benchmark.md](./08-khai-niem-ve-du-lieu-task-va-benchmark.md)
3. [09-khai-niem-ve-foundation-model-va-implementation.md](./09-khai-niem-ve-foundation-model-va-implementation.md)
4. [10-danh-sach-topic-paper-va-implementation.md](./10-danh-sach-topic-paper-va-implementation.md)
5. [11-xep-hang-topic-va-top-2.md](./11-xep-hang-topic-va-top-2.md)

## 8. Nguồn gợi ý đọc nhanh

- [DNABERT-2 paper](https://arxiv.org/abs/2306.15006)
- [scGPT repo](https://github.com/bowang-lab/scGPT)
- [Geneformer repo](https://github.com/jkobject/geneformer)
- [ESM repo](https://github.com/facebookresearch/esm)
