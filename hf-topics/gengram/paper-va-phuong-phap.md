# Gengram: paper và phương pháp

## Paper chính

- `Beyond Conditional Computation: Retrieval-Augmented Genomic Foundation Models with Gengram`
- `Hugging Face Papers`: [https://huggingface.co/papers/2601.22203](https://huggingface.co/papers/2601.22203)

## Đóng góp cốt lõi theo nguồn chính thức

Theo paper page và model card hiện có, `Gengram` nhấn mạnh các điểm sau:

1. Thiết kế một hướng `retrieval-augmented` cho genomic `foundation model`.
2. Thiết kế một cơ chế `Multi-scale Contextual Memory`.
3. Đưa vào một cách truy hồi ngữ cảnh genomics hiệu quả hơn bằng memory chuyên biệt.
4. Cố giảm sự phụ thuộc vào `conditional computation` theo nghĩa thô, bằng cách đưa retrieval/memory vào thiết kế hệ thống.
3. Cải thiện trên nhiều `genomic benchmarks`.
4. Kết hợp yếu tố hiệu quả tính toán với khả năng khái quát hóa.

Paper page còn nêu một claim định lượng khá mạnh: mô hình này đạt mức cải thiện lên đến khoảng `14%` trên một số benchmark. Khi dùng claim đó trong tài liệu hoặc thuyết trình, nên xem nó là claim của nguồn chính thức và không nên suy rộng quá mức sang mọi task khác.

## `Retrieval` và `Multi-scale Contextual Memory` nên hiểu ở mức nào

Ở mức đủ để đọc paper và thuyết trình, có thể hiểu như sau:

- genomics có pattern ở nhiều độ dài khác nhau;
- mô hình thuần `transformer` hoặc token-based chuẩn có thể gặp khó khi ngữ cảnh rất dài;
- `Gengram` cố thêm một lớp bộ nhớ để giữ và truy hồi ngữ cảnh ở nhiều tỉ lệ;
- thay vì chỉ ép mọi thông tin đi qua một chuỗi tính toán cố định, hệ thống tận dụng `retrieval` để lôi đúng ngữ cảnh cần thiết vào quá trình suy luận.

Điểm hấp dẫn của ý tưởng này là nó đi thẳng vào một pain point lớn của genomic modeling: sequence dài và quan hệ phụ thuộc xa.

## Bộ benchmark nên chú ý

Từ các dataset public trong hệ `BGI-HangzhouAI`, có ba benchmark line đáng chú ý:

- `Genomic element classification`
- `Human population classification`
- `Variant hotspot`

Nếu mục tiêu là research và pilot nhỏ, `Genomic element classification` là benchmark mặc định hợp lý nhất vì:

- là bài toán classification rõ ràng;
- dễ kể câu chuyện hơn `variant hotspot`;
- ít rủi ro diễn giải hơn `human population classification`.

## Phương pháp này khác gì với `DNABERT-2`

So sánh ở mức trực giác:

| Trục | `DNABERT-2` | `Gengram` |
| --- | --- | --- |
| Câu chuyện trung tâm | cải tiến `tokenization` và benchmark thực dụng | mở rộng khả năng mô hình hóa ngữ cảnh dài với `memory` |
| Mức độ mới | hiện đại nhưng đã tương đối ổn định hơn | mới hơn, frontier hơn |
| Độ rõ của đường replication | rõ hơn | mờ hơn |
| Độ hấp dẫn nghiên cứu | cao | rất cao |

## Điều cần đọc kỹ trong paper

1. Phần mô tả `memory module`.
2. Cách paper định nghĩa `multi-scale`.
3. Bộ benchmark mà paper dùng.
4. Bảng so sánh với baseline.
5. Phần thảo luận về hiệu quả và giới hạn.

Nếu bỏ qua các phần này, rất dễ hiểu `Gengram` theo kiểu “model mới nên chắc tốt hơn”, trong khi thứ đáng giá nhất nằm ở câu hỏi: memory đó giải quyết pain point nào của genomics và giải quyết có thuyết phục hay không.

## Điểm mạnh

- Ý tưởng rất hợp với bài toán sequence dài trong genomics.
- Có narrative nghiên cứu mạnh và mới.
- Có checkpoint/model card công khai trong hệ `Hugging Face`.
- Có liên hệ với hệ `Genos`, tức là không chỉ là một paper đứng riêng lẻ.

## Điểm yếu và giới hạn

- Đây không phải topic thực dụng nhất để làm bài “chạy lại nhanh”.
- Official assets trải trên nhiều nơi: `paper page`, `model card`, `zhejianglab/Gengram`, và benchmark dataset trong `BGI-HangzhouAI`.
- Đường chạy thực tế có thể vẫn phụ thuộc vào nhiều thành phần hơn một `repo` nhỏ gọn.

## Một suy luận quan trọng

Từ official sources, có thể suy luận rằng `Gengram` đang được đặt như một phần của một hệ sinh thái genomics lớn hơn, không chỉ là một checkpoint đơn lẻ. Điều này tốt cho potential, nhưng lại làm tăng độ phức tạp cho replication và đánh giá độc lập.
