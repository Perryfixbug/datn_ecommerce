import "@typespec/http";
import "./common/conventions.tsp";
using TypeSpec.Http;
namespace AdminAccounts;
@pattern("^[1-9][0-9]{0,18}$")
scalar AccountId extends string;
alias Role = "NguoiMua" | "NguoiBan" | "NhanVien";
alias Status = "HoatDong" | "BiKhoa";
model AccountQuery {
  @query cursor?: AccountId;
  @query @minValue(1) @maxValue(100) limit?: int32 = 20;
  @query @minLength(1) @maxLength(100) @pattern("\\S") search?: string;
  @query role?: Role;
  @query status?: Status;
}
model AccountReason {
  @minLength(1) @maxLength(500) @pattern("\\S") reason: string;
}
model AccountSummary {
  accountId: AccountId;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: Status;
  createdAt: utcDateTime;
}
model AccountDetail extends AccountSummary {
  updatedAt: utcDateTime;
  lastLoginAt: utcDateTime | null;
}
model AccountMutation {
  accountId: AccountId;
  status: Status;
  updatedAt: utcDateTime;
}
model Failure<Code extends int32> {
  @statusCode statusCode: Code;
  @body body: Common.ErrorResponse;
}
alias Failures = Failure<400> | Failure<401> | Failure<403> | Failure<404> | Failure<409> | Failure<500>;
interface Accounts {
  @get listAdminAccounts(...AccountQuery): Common.ListResponse<AccountSummary> | Failures;
  @get @route("/{accountId}") getAdminAccount(@path accountId: AccountId): AccountDetail | Failures;
  @post @route("/{accountId}/lock") lockAdminAccount(@path accountId: AccountId, @body body: AccountReason): AccountMutation | Failures;
  @post @route("/{accountId}/unlock") unlockAdminAccount(@path accountId: AccountId, @body body: AccountReason): AccountMutation | Failures;
}
