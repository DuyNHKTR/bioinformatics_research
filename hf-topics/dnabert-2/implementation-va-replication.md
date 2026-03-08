# DNABERT-2: implementation và replication

## Official assets nên bám

- Paper page: [https://huggingface.co/papers/2306.15006](https://huggingface.co/papers/2306.15006)
- Official model: [https://huggingface.co/zhihan1996/DNABERT-2-117M](https://huggingface.co/zhihan1996/DNABERT-2-117M)
- Official repo: [https://github.com/MAGICS-LAB/DNABERT_2](https://github.com/MAGICS-LAB/DNABERT_2)

Repo chính thức cho thấy ít nhất ba tín hiệu tốt:

- có `sample_data`;
- có mô tả format dữ liệu cho `sequence classification` theo cột `sequence,label`;
- có hướng dùng model/checkpoint sẵn thay vì bắt đầu từ số 0.

## Thực tế nên hiểu thế nào về “replication”

Với `DNABERT-2`, có ba mức `replication` khác nhau:

| Mức | Mô tả | Mức khó |
| --- | --- | --- |
| Mức 1 | Dùng checkpoint có sẵn để lấy `embedding` hoặc chạy inference trên dữ liệu nhỏ | Thấp |
| Mức 2 | `Fine-tune` model có sẵn trên một task phân loại sequence nhỏ | Trung bình |
| Mức 3 | `Pretrain` lại hoặc tái tạo toàn bộ benchmark của paper | Cao |

Đối với course hoặc pilot đầu tiên, nên coi `Mức 2` là đích thực tế nhất. `Mức 3` gần như không hợp lý nếu chỉ có tài nguyên hạn chế.

## Lộ trình replication thực dụng nhất

### Phương án nên ưu tiên

1. Clone repo chính thức.
2. Chạy thử pipeline với `sample_data` để hiểu input/output.
3. Dùng checkpoint `DNABERT-2-117M`.
4. Chọn một task classification nhỏ theo đúng format `sequence,label`.
5. So sánh kết quả cơ bản với baseline đơn giản.

### Vì sao lộ trình này hợp lý

- không phải huấn luyện model nền từ đầu;
- vẫn giữ được phần “đã chạy thật code của hệ paper”;
- đủ để quan sát pipeline tokenization -> encoding -> classifier;
- dễ viết báo cáo hơn so với cố tái tạo toàn bộ benchmark.

## Kỳ vọng về compute

Một suy luận hợp lý từ nguồn chính thức là `DNABERT-2-117M` dễ tiếp cận hơn nhiều so với các genomic model hàng tỷ tham số. Điều đó không có nghĩa là mọi thứ đều nhẹ, nhưng ở mức:

- inference hoặc feature extraction trên tập nhỏ: tương đối khả thi;
- `fine-tuning` nhỏ: có thể làm được nếu môi trường đủ ổn;
- `pretraining` lớn: không nên đặt làm mục tiêu ban đầu.

Đây là suy luận từ kích thước model và cách repo/model card được công bố, không phải claim benchmark về phần cứng tối thiểu.

## Rủi ro khi triển khai

- dữ liệu `downstream task` không khớp format repo yêu cầu;
- sequence length và token length không được quản lý cẩn thận;
- nhầm giữa việc “load được model” và việc “tái hiện đúng kết luận của paper”;
- quá sa vào việc tối ưu code mà quên benchmark/question sinh học cần trả lời.

## Dấu hiệu cho thấy replication đi đúng hướng

- có thể tải checkpoint và tokenizer thành công;
- có thể chạy thử một batch dữ liệu sequence;
- có thể tạo đầu ra embedding hoặc prediction;
- có thể giải thích input, output, và metric của task đang dùng;
- có thể nói rõ mình đang làm `inference`, `fine-tuning`, hay cố `full reproduction`.

## Khi nào nên dừng

Với topic này, điểm dừng hợp lý cho một vòng pilot là:

- đã chạy được một task nhỏ với checkpoint có sẵn;
- đã có bảng kết quả nhỏ để so sánh;
- đã hiểu giới hạn của benchmark so với bài toán sinh học thật.

Nếu chưa đạt tới đó, không nên nhảy sang hướng mở rộng quá lớn như multi-species benchmark toàn cục hay tự `pretrain` lại model.
