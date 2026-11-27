import "@typespec/http";
import "./common/conventions.tsp";
using TypeSpec.Http;
namespace AdminStores;
@pattern("^[1-9][0-9]{0,18}$")
scalar StoreId extends string;
alias StoreStatus = "HoatDong" | "TamDong" | "BiKhoa";
alias VerificationStatus = "ChuaNop" | "ChoDuyet" | "DaXacMinh" | "TuChoi";
model StoreQuery {
  @query cursor?: StoreId;
  @query @minValue(1) @maxValue(100) limit?: int32 = 20;
  @query @minLength(1) @maxLength(100) search?: string;
  @query status?: StoreStatus;
  @query verificationStatus?: VerificationStatus;
}
model StoreReason {
  @minLength(1) @maxLength(500) @pattern("\\S") reason: string;
}
model StoreSummary {
  storeId: StoreId;
  code: string | null;
  name: string;
  image: string | null;
  province: string;
  ward: string;
  status: StoreStatus;
  sellerId: StoreId;
  sellerName: string;
  verificationStatus: VerificationStatus;
  createdAt: utcDateTime;
}
model StoreDetail extends StoreSummary {
  description: string | null;
  address: string;
  phone: string;
  openedOn: plainDate;
  updatedAt: utcDateTime;
  verification: {
    taxType: string | null;
    companyName: string | null;
    taxCode: string | null;
    rejectionReason: string | null;
    submittedAt: utcDateTime | null;
    reviewedAt: utcDateTime | null;
  };
}
model StoreMutation {
  storeId: StoreId;
  sellerId: StoreId;
  status: StoreStatus;
  verificationStatus: VerificationStatus;
  updatedAt: utcDateTime;
}
model Failure<Code extends int32> {
  @statusCode statusCode: Code;
  @body body: Common.ErrorResponse;
}
alias Failures = Failure<400> | Failure<401> | Failure<403> | Failure<404> | Failure<409> | Failure<500>;
@route("/api/v1/admin/stores")
@useAuth(BearerAuth)
interface Stores {
  @get listAdminStores(...StoreQuery): Common.ListResponse<StoreSummary> | Failures;
  @get @route("/{storeId}") getAdminStore(@path storeId: StoreId): StoreDetail | Failures;
  @post @route("/{storeId}/approval") approveAdminStore(@path storeId: StoreId): StoreMutation | Failures;
  @post @route("/{storeId}/rejection") rejectAdminStore(@path storeId: StoreId, @body body: StoreReason): StoreMutation | Failures;
  @post @route("/{storeId}/lock") lockAdminStore(@path storeId: StoreId, @body body: StoreReason): StoreMutation | Failures;
  @post @route("/{storeId}/unlock") unlockAdminStore(@path storeId: StoreId): StoreMutation | Failures;
}
