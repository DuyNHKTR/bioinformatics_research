# Khái niệm về dữ liệu, task và benchmark

Đây là file để tránh một lỗi rất hay gặp: thấy model rất mạnh nhưng không nhìn ra nó mạnh trên loại dữ liệu nào, task nào, và benchmark nào.

## 1. Các họ dữ liệu quan trọng

### Genome-scale sequence data

Ví dụ:

- promoter / enhancer sequence
- splice region
- variant neighborhood
- whole-genome fragments

Bạn cần nhìn ngay:

- độ dài context
- mức độ mất cân bằng nhãn
- chia train/valid/test theo chromosome hay ngẫu nhiên
- có nguy cơ trùng lặp motif quá cao không

## 2. Protein-level data

Ví dụ:

- amino acid sequence
- structure-derived representation
- function label
- domain / fold / contact map

Bạn cần nhìn ngay:

- task là `function prediction`, `fold`, `contact`, hay `mutation effect`
- nhãn là đa lớp, đa nhãn, hay hồi quy
- có sử dụng `structure` thật hay chỉ sequence

## 3. Single-cell data

Ví dụ:

- gene-expression matrix theo cell
- cell metadata
- donor / tissue / batch label
- perturbation response

Bạn cần nhìn ngay:

- preprocessing có log-normalization không
- gene vocabulary là cố định hay học động
- split theo cell hay theo donor
- downstream task là annotation, integration, perturbation, hay retrieval

## 4. Spatial transcriptomics data

Ví dụ:

- expression + spatial coordinates
- histology image (nếu có)
- graph giữa spot/cell

Bạn cần nhìn ngay:

- graph được dựng theo khoảng cách, kNN, hay ảnh
- metric là clustering score, biological coherence, hay downstream classification
- có sử dụng image encoder hay không

## 5. Task là gì mới là thứ quyết định cách đọc paper

### Representation learning

Mục tiêu là học embedding dùng lại được cho nhiều task khác.

Dấu hiệu:

- pretrain lớn
- downstream benchmark nhiều
- có nói tới `zero-shot`, `linear probe`, `fine-tuning`

### Classification / annotation

Mục tiêu là gán nhãn cho mẫu.

Metric thường gặp:

- `accuracy`
- `macro-F1`
- `AUROC`
- `AUPRC`

### Regression / signal prediction

Mục tiêu là dự đoán tín hiệu liên tục.

Metric thường gặp:

- `Pearson`
- `Spearman`
- `R^2`
- `MSE`

### Generation / design

Mục tiêu là sinh sequence, structure, hoặc perturbation response.

Metric thường khó hơn và cần rất cẩn thận vì:

- có thể sinh hợp ngữ pháp nhưng không đúng sinh học;
- đánh giá in silico chưa chắc đi kèm giá trị thực nghiệm.

## 6. Benchmark không chỉ là bảng điểm

Khi nhìn benchmark, đừng chỉ xem điểm số cao nhất. Phải xem:

- benchmark có phổ biến không;
- có bị leakage không;
- có so sánh với strong baseline không;
- có open split không;
- code benchmark có public không.

## 7. Những metric bạn nên nhớ

| Kiểu task | Metric nên biết | Cảnh báo |
| --- | --- | --- |
| `classification` | `AUROC`, `AUPRC`, `F1` | Với dữ liệu lệch nhãn, `AUPRC` thường đáng tin hơn `accuracy`. |
| `regression` | `Pearson`, `Spearman`, `MSE` | `Pearson` cao chưa chắc ổn nếu phân phối lệch mạnh. |
| `retrieval` | `Recall@k`, `MRR` | Cần biết candidate set được xây như thế nào. |
| `clustering` | `ARI`, `NMI`, silhouette | Đừng quên kiểm tra ý nghĩa sinh học, không chỉ metric. |
| `language modeling` | `perplexity` | `Perplexity` tốt không tự động đồng nghĩa downstream tốt. |

## 8. Reproducibility checklist khi nhìn implementation

- Có `requirements` hoặc `environment.yml` không?
- Có script train và inference riêng không?
- Có pretrained checkpoint không?
- Có notebook hoặc example nhỏ không?
- Có mô tả format input/output không?
- Có benchmark script không?

Nếu thiếu quá nhiều mục trên, topic đó vẫn có giá trị học thuật nhưng chi phí tái lập sẽ tăng mạnh.

## 9. Cách đọc benchmark một cách thực dụng

Thay vì hỏi “model này có state-of-the-art không?”, hãy hỏi:

- nó thắng ở task nào;
- nó thua ở task nào;
- benchmark có cùng domain với dữ liệu mình định dùng không;
- nếu rút nhỏ bài toán, mình còn giữ được ý tưởng cốt lõi nào.

## 10. Nguồn nên đối chiếu

- [Enformer paper](https://www.nature.com/articles/s41592-021-01252-x)
- [SpliceAI repo](https://github.com/Illumina/SpliceAI)
- [scGPT repo](https://github.com/bowang-lab/scGPT)
- [STAGATE repo](https://github.com/QIFEIDKN/STAGATE)
