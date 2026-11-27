import "@typespec/http";
import "./common/conventions.tsp";
using TypeSpec.Http;
namespace AdminCases;
@doc("ID có tiền tố complaint:id, report:id hoặc dispute:orderId:storeId; các thành phần số thuộc bigint dương PostgreSQL.")
@pattern("^(complaint:[1-9][0-9]{0,18}|report:[1-9][0-9]{0,18}|dispute:[1-9][0-9]{0,18}:[1-9][0-9]{0,18})$")
scalar CaseId extends string;
model CaseQuery {
  @query cursor?: CaseId;
  @query @minValue(1) @maxValue(100) limit?: int32 = 20;
  @query kind?: "complaint" | "report" | "dispute";
  @query status?: "ChoXuLy" | "DaXuLy";
}
model CaseSummary {
  caseId: CaseId;
  kind: "complaint" | "report" | "dispute";
  status: "ChoXuLy" | "DaXuLy";
  requesterId: string;
  requesterName: string;
  orderId: string | null;
  storeId: string | null;
  productId: string | null;
  createdAt: utcDateTime;
  closedAt: utcDateTime | null;
}
model CaseHistory {
  historyId: string;
  actorId: string;
  action: string;
  reason: string | null;
  createdAt: utcDateTime;
}
model CaseDetail extends CaseSummary {
  content: string;
  @doc("Bằng chứng lưu trong nguồn dữ liệu, không tự tải hoặc diễn giải URL.")
  evidence: string | null;
  outcome: string | null;
  reason: string | null;
  handlerId: string | null;
  history: CaseHistory[];
}
model Resolution {
  outcome: "ChapNhan" | "TuChoi";
  @minLength(1) @maxLength(1000) @pattern("\\S") reason: string;
}
model Failure<Code extends int32> {
  @statusCode statusCode: Code;
  @body body: Common.ErrorResponse;
}
alias Failures = Failure<400> | Failure<401> | Failure<403> | Failure<404> | Failure<409> | Failure<500>;
interface Cases {
  @get listAdminCases(...CaseQuery): Common.ListResponse<CaseSummary> | Failures;
  @get @route("/{caseId}") getAdminCase(@path caseId: CaseId): CaseDetail | Failures;
  @post @route("/{caseId}/resolution") resolveAdminCase(@path caseId: CaseId, @body body: Resolution): CaseDetail | Failures;
}
