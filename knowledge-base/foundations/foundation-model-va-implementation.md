# Khái niệm về foundation model và implementation

File này trả lời câu hỏi: khi thấy một `foundation model` trong bioinformatics, thực chất ta đang nhìn cái gì và nên đọc code theo trình tự nào.

## 1. `Foundation model` trong bioinformatics là gì

Nói ngắn gọn, đó là model được pretrain trên dữ liệu sinh học quy mô lớn, sau đó tái sử dụng cho nhiều task downstream.

Điểm quan trọng:

- giá trị của model không chỉ nằm ở điểm số một task;
- giá trị lớn nhất nằm ở embedding, transfer, và khả năng thích nghi;
- nếu code mở và weight mở, tiềm năng thực hành tăng mạnh.

## 2. Ba kiểu output bạn phải phân biệt

### Embedding model

Model trả ra vector biểu diễn.

Dùng cho:

- clustering
- retrieval
- linear probe
- feature extraction

### End-to-end predictor

Model nhận input và trả prediction cuối cùng.

Dùng cho:

- classification
- regression
- annotation

### Generative / structural model

Model sinh sequence, structure, hoặc object sinh học có cấu trúc.

Dùng cho:

- design
- structure prediction
- multimodal generation

Loại này thường hấp dẫn nhất về mặt tiềm năng, nhưng chi phí compute và độ khó tái lập cũng cao nhất.

## 3. Từ pretrain sang downstream

Khi đọc một `foundation model`, cần xác định rõ downstream đang dùng cách nào:

- `zero-shot`
- `linear probe`
- `full fine-tuning`
- `parameter-efficient tuning`
- `feature extraction + shallow model`

Không phân biệt được các mode này thì rất khó so sánh công bằng giữa các topic.

## 4. Những thứ quan trọng hơn kiến trúc

Nhiều người đọc paper mới hay bị hút vào kiến trúc quá sớm. Nhưng trong thực tế, những thứ thường quyết định project thành công lại là:

- cách tổ chức dữ liệu
- split benchmark
- tokenizer / vocabulary
- context length
- checkpoint availability
- inference path có rõ không

## 5. Cách đọc code theo thứ tự đúng

Khi mở một repo mới, nên đi theo thứ tự này:

1. `README`
2. file config / argument
3. data loader
4. model definition
5. train script
6. inference / evaluation script
7. notebook hoặc example

Nếu đọc ngược từ model definition trước, rất dễ mất thời gian vào chi tiết mà chưa hiểu input/output.

## 6. Những câu hỏi implementation phải trả lời được

- input là file gì?
- có cần preprocessing trước không?
- tokenizer nằm ở đâu?
- checkpoint tải ở đâu?
- script inference tối thiểu là gì?
- output trả ra là label, embedding, hay file khác?

Nếu repo không trả lời được 6 câu này trong vòng 20 phút, hãy đánh dấu topic đó là `implementation cost` cao.

## 7. Compute và license quan trọng hơn tưởng tượng

Hai topic có tiềm năng giống nhau nhưng nếu:

- một bên có checkpoint public, notebook nhỏ, GPU vừa phải;
- một bên cần nhiều GPU, pipeline dài, hoặc license mơ hồ;

thì topic đầu thường đáng chọn hơn ở giai đoạn học và thử nghiệm.

## 8. Dấu hiệu của một repo tốt để học

- có ví dụ ngắn
- có pretrained weights
- có issue activity
- có notebook hoặc script inference
- có mô tả benchmark
- có cấu trúc thư mục sạch

## 9. Dấu hiệu của một repo rất mạnh nhưng chưa nên đụng ngay

- README đẹp nhưng không có cách chạy tối thiểu
- phụ thuộc phức tạp
- benchmark quá nặng
- model quá lớn so với máy hiện có
- thiếu dữ liệu public tương ứng

Topic kiểu này vẫn nên ghi chú, nhưng có thể để vào nhóm `wildcard` chứ chưa ưu tiên top đầu.

## 10. Nguồn nên dùng để luyện mắt đọc implementation

- [DNABERT-2 repo](https://github.com/MAGICS-LAB/DNABERT_2)
- [HyenaDNA repo](https://github.com/HazyResearch/hyena-dna)
- [Geneformer repo](https://github.com/jkobject/geneformer)
- [ESM repo](https://github.com/facebookresearch/esm)
- [scGPT repo](https://github.com/bowang-lab/scGPT)
