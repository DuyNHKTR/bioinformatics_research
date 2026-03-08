# Gengram: minimal replication plan

## Mục tiêu của file này

File này không giả vờ biến `Gengram` thành một topic “dễ chạy”. Mục tiêu của nó thực dụng hơn:

- khóa một đường đi nhỏ nhất có thể;
- chọn đúng một benchmark mặc định;
- tách rõ cái gì là `pilot` và cái gì là `full reproduction`.

## Mục tiêu pilot nên chốt

Mục tiêu pilot cho `Gengram` nên là:

`Xác nhận có thể map được model -> repo -> benchmark -> evaluation tối thiểu trên một benchmark classification public.`

Đích đó đủ nhỏ để làm được, nhưng vẫn đủ thật để chứng minh topic không chỉ dừng ở mức đọc paper.

## Benchmark mặc định

Benchmark mặc định nên dùng là `Genomic element classification`.

Lý do chọn benchmark này:

- task rõ ràng và dễ kể trong báo cáo;
- hợp với một pilot classification hơn là một bài toán phức tạp hơn;
- ít nhạy cảm hơn `Human population classification`;
- ít rủi ro diễn giải hơn `Variant hotspot`.

## Asset map nên dùng

- Paper: `Hugging Face Papers`
- Model artifact: `Hugging Face model card`
- Code: `zhejianglab/Gengram`
- Benchmark dataset: `BGI-HangzhouAI`

Nói cách khác, không nên cố tìm mọi thứ ở cùng một chỗ. Với topic này, điều đó không thực tế.

## Thứ tự thực hiện hợp lý

1. Xác nhận lại paper claim và terminology.
2. Đọc model card để biết checkpoint và narrative phát hành.
3. Đọc repo `zhejianglab/Gengram` để xác định entrypoint evaluation.
4. Xác nhận dataset card của `Genomic element classification`.
5. Ghi ra input/output tối thiểu của benchmark.
6. Chỉ sau đó mới thử chạy code.

## Tiêu chí thành công của pilot

Pilot được xem là thành công nếu đạt đủ 4 điều:

- xác định được benchmark mặc định và dữ liệu public;
- xác định được repo chính thức và đường code nên thử;
- xác định được loại output cần đọc;
- ghi rõ phần nào đã chạy, phần nào chưa.

Nếu chưa đạt đủ 4 điều này, không nên gọi đó là replication.

## Những gì không nên hứa hẹn

Ở giai đoạn đầu, không nên hứa các việc sau:

- tái tạo toàn bộ kết quả paper;
- huấn luyện lại model;
- so sánh trên nhiều benchmark cùng lúc;
- kết luận mạnh về biological performance chỉ từ một pilot nhỏ.

## Sau pilot nên làm gì

Nếu pilot chạy được, bước tiếp theo nên là:

1. giữ nguyên model và đổi benchmark;
2. hoặc giữ benchmark và so sánh với một baseline đơn giản hơn;
3. hoặc viết một báo cáo chỉ ra phần nào của `retrieval-augmented` design thực sự đáng giá.

Trong cả ba hướng, không nên mở rộng cả benchmark lẫn hệ code cùng một lúc.
