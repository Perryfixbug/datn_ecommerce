import "@typespec/http";
import "./common/conventions.tsp";
using TypeSpec.Http;
namespace AdminReports;
@doc("ID báo cáo dạng bigint dương PostgreSQL, tối đa 9223372036854775807.")
@pattern("^[1-9][0-9]{0,18}$")
scalar ReportId extends string;
model Resolution {
  outcome: "ViPham" | "KhongViPham";
  @minLength(1) @maxLength(1000) @pattern("\\S") reason: string;
}
model ReportResolution {
  reportId: ReportId;
  status: "DaKetLuan";
  outcome: "ViPham" | "KhongViPham";
  reason: string;
  handlerId: string;
  closedAt: utcDateTime;
}
model Failure<Code extends int32> {
  @statusCode statusCode: Code;
  @body body: Common.ErrorResponse;
}
alias Failures = Failure<400> | Failure<401> | Failure<403> | Failure<404> | Failure<409> | Failure<500>;
interface Reports {
  @doc("Chỉ QuanTriVien/KiemDuyetVien được kết luận báo cáo sản phẩm; không tự ẩn sản phẩm hay khóa tài khoản/cửa hàng. Ghi lịch sử và thông báo nguyên tử; đã kết luận trả 409.")
  @post @route("/{reportId}/resolution") resolveAdminReport(@path reportId: ReportId, @body body: Resolution): ReportResolution | Failures;
}
