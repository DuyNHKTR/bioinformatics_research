# Gengram: nguồn chính thống

- Paper page trên Hugging Face Papers: [https://huggingface.co/papers/2601.22203](https://huggingface.co/papers/2601.22203)
  - Dùng để chốt tên paper, thời điểm công bố trên hệ `Hugging Face Papers`, và các claim tổng quan.

- Model card trên Hugging Face: [https://huggingface.co/ZhejiangLab/Gengram](https://huggingface.co/ZhejiangLab/Gengram)
  - Dùng để xác nhận checkpoint/model artifact công khai và mô tả tổng quát của model.

- Official GitHub repo: [https://github.com/zhejianglab/Gengram](https://github.com/zhejianglab/Gengram)
  - Dùng để xác nhận repo chính thức hiện tại cho code và đường chạy tối thiểu.

- Hugging Face org `BGI-HangzhouAI`: [https://huggingface.co/BGI-HangzhouAI](https://huggingface.co/BGI-HangzhouAI)
  - Dùng để theo dõi benchmark dataset công khai liên quan đến hệ genomics này.

- Dataset `Genomic element classification`: [https://huggingface.co/datasets/BGI-HangzhouAI/Benchmark_Dataset-Genomic_element_classification](https://huggingface.co/datasets/BGI-HangzhouAI/Benchmark_Dataset-Genomic_element_classification)
  - Dùng làm benchmark mặc định nên ưu tiên cho `minimal replication`.

- Dataset `Human population classification`: [https://huggingface.co/datasets/BGI-HangzhouAI/Benchmark_Dataset-Human_population_classification](https://huggingface.co/datasets/BGI-HangzhouAI/Benchmark_Dataset-Human_population_classification)
  - Dùng làm benchmark mở rộng nếu muốn so sánh thêm một task khác.

- Dataset `Variant hotspot`: [https://huggingface.co/datasets/BGI-HangzhouAI/Benchmark_Dataset-Variant_hotspot](https://huggingface.co/datasets/BGI-HangzhouAI/Benchmark_Dataset-Variant_hotspot)
  - Dùng như hướng mở rộng tiềm năng, nhưng không nên là benchmark đầu tiên.

## Ghi chú nguồn

- Nhận định “repo chính thức ở `ZhejiangLab`, còn benchmark dataset public rõ hơn ở `BGI-HangzhouAI`” là suy luận từ official sources hiện có.
- Nhận định “`Gengram` có tiềm năng rất cao nhưng replication khó hơn `DNABERT-2`” là kết luận phân tích, không phải câu nguyên văn từ paper.
