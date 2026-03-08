# Gengram: implementation và replication

## Official assets hiện có

- Paper page: [https://huggingface.co/papers/2601.22203](https://huggingface.co/papers/2601.22203)
- Model card: [https://huggingface.co/ZhejiangLab/Gengram](https://huggingface.co/ZhejiangLab/Gengram)
- Official repo: [https://github.com/zhejianglab/Gengram](https://github.com/zhejianglab/Gengram)
- Benchmark dataset public: [https://huggingface.co/BGI-HangzhouAI](https://huggingface.co/BGI-HangzhouAI)

## Ghi chú quan trọng về provenance

Các nguồn chính thức hiện cho thấy asset của `Gengram` đang đi theo một tách lớp khá rõ:

- paper, model card, và repo chính thức nằm ở nhánh `ZhejiangLab`;
- benchmark dataset public cho evaluation lại xuất hiện rõ trong hệ `BGI-HangzhouAI`.

Đây là cách đọc hợp lý từ official sources hiện có. Nó quan trọng vì nếu không tách đúng hai lớp này, rất dễ nhầm `repo chính thức` với `kho benchmark`.

## Thực tế nên hiểu thế nào về “replication”

Với `Gengram`, cần tách rất rõ ba việc khác nhau:

| Việc | Thực chất là gì | Mức khó |
| --- | --- | --- |
| Đọc và phân tích paper | hiểu kiến trúc, benchmark, claim | Trung bình |
| Tải checkpoint/model card và xem khả năng inference | kiểm tra asset public và môi trường | Trung bình đến cao |
| Tái tạo benchmark hoặc huấn luyện lại | cố đi lại gần toàn bộ story của paper | Rất cao |

`Gengram` không nên bị trình bày như một topic “clone repo rồi chạy vài lệnh là xong”. Với dữ liệu hiện có, cách kỳ vọng đúng hơn là:

- có thể đọc paper và asset khá rõ;
- có thể đi tới `minimal replication` nếu chọn benchmark nhỏ đúng cách;
- nhưng chưa nên hứa hẹn `full reproduction`.

## Lộ trình replication thực dụng nhất

Nếu vẫn muốn đi theo topic này, lộ trình nên là:

1. Đọc paper và model card trước.
2. Xác nhận benchmark dataset public trong hệ `BGI-HangzhouAI`.
3. Chọn đúng một benchmark nhỏ để làm pilot.
4. Dùng `zhejianglab/Gengram` để kiểm tra đường chạy tối thiểu.
5. Chỉ sau khi pilot ổn mới nghĩ tới so sánh rộng hay mở rộng multi-task.

## Benchmark mặc định nên chọn

Benchmark mặc định nên chọn là `Genomic element classification`.

Lý do:

- bài toán là `classification`, dễ nói rõ input/output;
- public dataset line đã xuất hiện trên `Hugging Face`;
- ít nhạy cảm hơn `human population classification`;
- dễ làm pilot hơn `variant hotspot`.

Hai benchmark còn lại nên xem là hướng mở rộng:

- `Human population classification`: hấp dẫn nhưng nhạy cảm hơn về diễn giải sinh học.
- `Variant hotspot`: có tiềm năng ứng dụng, nhưng đòi hỏi cẩn trọng hơn về metric và biological interpretation.

## Vì sao không nên bắt đầu bằng full reproduction

- model lớn hơn đáng kể so với `DNABERT-2`;
- hệ code có vẻ được thiết kế như một platform rộng hơn, không chỉ một script paper đơn;
- benchmark genomics liên quan có thể nhiều hơn một task;
- chi phí hiểu hệ thống trước khi chạy thường lớn.

## Loại output nên kỳ vọng ở bước đầu

Ở bước đầu, output hợp lý nhất không phải là “reproduce toàn bộ paper”, mà là:

- xác nhận asset nào thật sự public;
- xác nhận đường inference hoặc evaluation tối thiểu từ repo chính thức;
- xác nhận benchmark nào có thể chạm tới bằng tài nguyên hiện có;
- ghi rõ phần nào là đã chạy được, phần nào mới chỉ dừng ở research.

## Trạng thái hiện tại của topic trong workspace

So với thời điểm đầu, `Gengram` trong workspace này đã có bước tiến rõ:

- tên paper và provenance đã được sửa theo source mới hơn;
- benchmark khả thi đã được khóa lại thay vì để mơ hồ;
- đã có một `minimal replication plan` riêng để chuẩn bị cho bước implementation.

Điểm chưa có vẫn là code chạy thật, log thực nghiệm, và kết quả benchmark.

## Khi nào nên xem topic này là khả thi

`Gengram` trở thành topic khả thi khi đồng thời thỏa các điều kiện sau:

- có checkpoint public và tài liệu đủ để load;
- có ít nhất một benchmark public rõ ràng;
- có đường code trong `Genos` đủ rõ để map từ model sang evaluation;
- có thể giải thích task sinh học chứ không chỉ chạy model cho có.

Nếu thiếu một trong các điều kiện trên, topic này nên được giữ ở mức `research dossier` hơn là `pilot execution`.
