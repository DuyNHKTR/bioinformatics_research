# `MAFFT + IQ-TREE 2`: phát triển và ứng dụng

## Mục tiêu của file này

Sau khi chạy xong một bản `replication` tối thiểu, câu hỏi tiếp theo không phải là “còn lệnh nào nữa”, mà là:

- mở rộng cái gì cho vừa sức;
- diễn giải kết quả thế nào cho ra chất lượng báo cáo;
- topic này đi vào ứng dụng thực tế ra sao.

## Ba hướng phát triển vừa sức nhất

## Hướng 1 - Giữ tool, đổi chiến lược chọn mẫu

Đây là hướng mở rộng an toàn nhất.

Giữ nguyên:

- `NCBI Virus`
- `MAFFT`
- `IQ-TREE 2`

Chỉ thay đổi:

- quy mô mẫu;
- phân bố theo `country`;
- khoảng thời gian;
- tiêu chí giữ hoặc bỏ outlier.

Giá trị của hướng này:

- dễ chứng minh bạn thật sự hiểu dữ liệu;
- không làm workflow bị vỡ;
- rất hợp tinh thần “lấy bài báo + mở rộng một bước nhỏ”.

## Hướng 2 - Từ `whole genome` sang một gene đại diện

Ví dụ chuyển từ toàn bộ genome sang một vùng gene có ý nghĩa hơn cho câu hỏi của bạn. Hướng này hợp khi:

- `whole genome` cho cây khó đọc;
- muốn bám sát một tín hiệu sinh học cụ thể hơn;
- muốn so sánh “cây theo genome” và “cây theo gene”.

Điểm cần cẩn thận:

- phải giải thích vì sao chọn gene đó;
- không được ngầm coi cây gene là thay thế hoàn toàn cây genome.

## Hướng 3 - So sánh độ ổn định khi loại bỏ sequence chất lượng kém

Đây là hướng mở rộng rất thuyết phục vì nó chạm vào một câu hỏi kỹ thuật quan trọng:

- cây thay đổi bao nhiêu khi loại bỏ outlier, sequence quá nhiều `N`, hoặc metadata không rõ ràng.

Hướng này làm nổi bật năng lực:

- kiểm soát chất lượng dữ liệu;
- hiểu rằng `phylogeny` phụ thuộc mạnh vào input.

## Hướng nào nên ưu tiên

Nếu cần một mở rộng nhỏ, sạch, ít rủi ro, nên ưu tiên:

1. đổi chiến lược chọn mẫu
2. loại bỏ outlier và so sánh lại
3. chuyển sang gene đại diện

Thứ tự này giữ cho project vẫn nằm trong biên “paper cơ bản + chạy lại được”.

## Ứng dụng thực tế của workflow này

## `Molecular epidemiology`

Đây là ứng dụng trực diện nhất:

- theo dõi mối quan hệ giữa isolate;
- xem cụm sequence theo địa lý và thời gian;
- hỗ trợ phân tích bùng phát hoặc theo dõi biến thể.

## `Surveillance pipeline`

Trong thực tế, nhiều pipeline giám sát dịch tễ phân tử đều có lõi tương tự:

- tải dữ liệu mới;
- cập nhật `alignment`;
- dựng hoặc cập nhật cây;
- gắn metadata để quan sát xu hướng.

Project của bạn không cần đạt quy mô production, nhưng hiểu lõi này là đủ để thấy giá trị thực tế.

## `Database interpretation`

Topic này cũng rèn một kỹ năng rất đúng môn:

- không chỉ tải sequence từ `database`;
- mà còn biết sequence đó dùng được để trả lời câu hỏi sinh học gì.

## Cách biến kết quả thành báo cáo tốt

## Câu chuyện báo cáo nên có

Một bài tốt thường đi theo mạch:

1. câu hỏi sinh học
2. nguồn dữ liệu
3. workflow `MAFFT -> IQ-TREE 2`
4. kết quả chính
5. diễn giải bằng metadata
6. giới hạn
7. mở rộng nhỏ

Nếu thiếu bước 5 và 6, bài rất dễ biến thành một bản “chạy tool ra cây”.

## Khung báo cáo 5 phần đủ dùng

Nếu cần một cấu trúc gọn nhưng chắc, có thể dùng đúng 5 phần:

1. `Bài toán và dữ liệu`
2. `Workflow MAFFT -> IQ-TREE 2`
3. `Kết quả alignment và tree`
4. `Diễn giải bằng metadata`
5. `Giới hạn và hướng mở rộng`

Khung này đủ ngắn để làm slide, nhưng cũng đủ rõ để mở thành báo cáo viết.

## Hình nên có trong slide hoặc báo cáo

- sơ đồ workflow 1 trang
- bảng tiêu chí chọn mẫu
- ảnh cây cuối cùng
- bảng hoặc note ngắn giải thích 2-3 cụm chính
- một slide riêng cho limitation

## Bảng nên có trong báo cáo viết

- bảng accession hoặc mô tả batch dữ liệu đã chọn
- bảng tóm tắt output files và ý nghĩa của từng file
- bảng diễn giải 2-3 cụm chính trên cây bằng metadata
- bảng limitation và ảnh hưởng có thể có lên kết quả

## Những câu nên tự trả lời trước khi thuyết trình

- vì sao chọn `SARS-CoV-2` mà không chọn virus khác;
- vì sao chọn `50-80` mẫu thay vì vài trăm;
- vì sao `alignment quality` quan trọng;
- `bootstrap support` có ý nghĩa gì và không có ý nghĩa gì;
- mở rộng bạn làm thêm trả lời câu hỏi nào.

## Những giới hạn phải nói thẳng

- cây này phụ thuộc rất mạnh vào cách lấy mẫu;
- `MSA` là bước suy luận, không phải ground truth;
- tree của bạn thường là `unrooted tree` nếu không có thao tác root riêng;
- metadata công khai có thể thiếu, bẩn, hoặc không cân bằng.

## Mức kết luận nên giữ ở đâu

Một bài pilot kiểu này nên kết luận ở mức:

- quan sát được pattern nào trên cây;
- pattern đó có khớp với metadata ở mức nào;
- dữ liệu hiện tại cho phép và không cho phép kết luận điều gì.

Không nên kết luận quá mức theo kiểu:

- “các mẫu này chắc chắn có cùng nguồn gốc dịch tễ”
- “support cao là đủ chứng minh cơ chế sinh học”
- “cluster trên cây luôn tương đương với phân nhóm dịch tễ thực tế”

## Khi nào không nên chọn hướng mở rộng lớn hơn

Không nên nhảy sang:

- `phylodynamics` quá sâu;
- project cập nhật cây real-time;
- mô hình tiến hóa quá nặng;
- tích hợp thêm quá nhiều tool ngoài syllabus.

Lý do rất đơn giản: nó làm bạn rời khỏi mục tiêu của môn là chọn một `paper` cơ bản và chạy lại/mở rộng vừa sức.

## Liên hệ với các phần khác của môn

Topic này giúp nối nhiều phần của syllabus:

- `database`: lấy dữ liệu từ `NCBI`
- `alignment`: `MAFFT`
- `phylogenetic tree`: `IQ-TREE 2`
- `substitution model`: `ModelFinder`
- `large data thinking`: biết giới hạn project bằng sampling hợp lý

Đó là lý do nó vừa đẹp về mặt báo cáo, vừa đẹp về mặt học tập.

## Kết luận ngắn

Giá trị lớn nhất của topic này không chỉ là dựng được một cây, mà là học được một cách nghĩ chuẩn trong bioinformatics:

- dữ liệu phải được chọn có chủ đích;
- `alignment` phải được coi trọng;
- cây phải được đọc cùng metadata;
- phần mở rộng phải trả lời một câu hỏi thật, không chỉ thêm lệnh.

## Điểm dừng hợp lý trước khi chuyển topic

Chỉ nên chuyển sang topic kế tiếp khi topic này đã đạt đủ các điều kiện sau:

- đã đọc xong `paper` nền và hiểu vai trò của `MAFFT`, `IQ-TREE 2`, `ModelFinder`, `UFBoot2`;
- đã có thể giải thích vì sao chọn `SARS-CoV-2 complete genomes` làm pilot;
- đã nắm được workflow tối thiểu trong file `13`;
- đã chốt được ít nhất một hướng mở rộng nhỏ thật sự hợp lý;
- đã hình dung được cấu trúc báo cáo hoặc slide.

Nếu chưa đạt các điểm trên mà đã nhảy sang topic mới, rất dễ rơi vào tình trạng biết nhiều hướng nhưng không có hướng nào đủ sâu để dùng thật.

## Nguồn chính

- `MAFFT` official: [mafft.cbrc.jp](https://mafft.cbrc.jp/alignment/software/index.html)
- `IQ-TREE 2` paper: [PubMed](https://pubmed.ncbi.nlm.nih.gov/32011700/)
- `ModelFinder` paper: [PubMed](https://pubmed.ncbi.nlm.nih.gov/28481363/)
- `UFBoot2` paper: [PubMed](https://pubmed.ncbi.nlm.nih.gov/29077904/)
- `NCBI Virus` metadata docs: [NCBI Datasets](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-metadata/)
- `NCBI Virus` download docs: [NCBI Datasets](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/how-tos/virus/virus-download/)
