# Gengram: implementation và replication

## Official assets hiện có

- Paper page: [https://huggingface.co/papers/2601.22203](https://huggingface.co/papers/2601.22203)
- Model card: [https://huggingface.co/ZhejiangLab/Gengram](https://huggingface.co/ZhejiangLab/Gengram)
- Official code base trong hệ `Genos`: [https://github.com/BGI-HangzhouAI/Genos](https://github.com/BGI-HangzhouAI/Genos)
- Hugging Face org hiện hoạt động mạnh cho hệ này: [https://huggingface.co/BGI-HangzhouAI](https://huggingface.co/BGI-HangzhouAI)

## Ghi chú quan trọng về provenance

Các nguồn chính thức hiện cho thấy asset của `Gengram` đang xuất hiện ở cả `ZhejiangLab` và `BGI-HangzhouAI`. Diễn giải hợp lý nhất là:

- paper/model card gốc được công bố dưới một namespace;
- hệ benchmark, code, và hoạt động triển khai tiếp tục được cập nhật trong hệ `BGI-HangzhouAI/Genos`.

Đây là suy luận từ official sources hiện có, không phải một statement nguyên văn duy nhất từ tác giả.

## Thực tế nên hiểu thế nào về “replication”

Với `Gengram`, cần tách rất rõ ba việc khác nhau:

| Việc | Thực chất là gì | Mức khó |
| --- | --- | --- |
| Đọc và phân tích paper | hiểu kiến trúc, benchmark, claim | Trung bình |
| Tải checkpoint/model card và xem khả năng inference | kiểm tra asset public và môi trường | Trung bình đến cao |
| Tái tạo benchmark hoặc huấn luyện lại | cố đi lại gần toàn bộ story của paper | Rất cao |

`Gengram` không nên bị trình bày như một topic “clone repo rồi chạy vài lệnh là xong”. Với dữ liệu hiện có, đó là cách kỳ vọng không thực tế.

## Lộ trình replication thực dụng nhất

Nếu vẫn muốn đi theo topic này, lộ trình nên là:

1. Đọc paper và model card trước.
2. Xác nhận những benchmark hoặc dataset nào trong hệ `BGI-HangzhouAI` là public.
3. Chọn đúng một benchmark nhỏ để làm pilot.
4. Dùng code trong `Genos` để kiểm tra đường chạy tối thiểu.
5. Chỉ sau khi pilot ổn mới nghĩ tới so sánh rộng hay mở rộng multi-task.

## Vì sao không nên bắt đầu bằng full reproduction

- model lớn hơn đáng kể so với `DNABERT-2`;
- hệ code có vẻ được thiết kế như một platform rộng hơn, không chỉ một script paper đơn;
- benchmark genomics liên quan có thể nhiều hơn một task;
- chi phí hiểu hệ thống trước khi chạy thường lớn.

## Loại output nên kỳ vọng ở bước đầu

Ở bước đầu, output hợp lý nhất không phải là “reproduce toàn bộ paper”, mà là:

- xác nhận asset nào thật sự public;
- xác nhận đường inference hoặc evaluation tối thiểu;
- xác nhận benchmark nào có thể chạm tới bằng tài nguyên hiện có;
- ghi rõ phần nào là đã chạy được, phần nào mới chỉ dừng ở research.

## Khi nào nên xem topic này là khả thi

`Gengram` trở thành topic khả thi khi đồng thời thỏa các điều kiện sau:

- có checkpoint public và tài liệu đủ để load;
- có ít nhất một benchmark public rõ ràng;
- có đường code trong `Genos` đủ rõ để map từ model sang evaluation;
- có thể giải thích task sinh học chứ không chỉ chạy model cho có.

Nếu thiếu một trong các điều kiện trên, topic này nên được giữ ở mức `research dossier` hơn là `pilot execution`.
