import "@typespec/http";
import "./common/conventions.tsp";
using TypeSpec.Http;
namespace AdminModeration;
@pattern("^[1-9][0-9]{0,18}$")
scalar ProductId extends string;
alias ModerationStatus = "ChoDuyet" | "DaDuyet" | "TuChoi";
model ModerationQuery {
  @query cursor?: ProductId;
  @query @minValue(1) @maxValue(100) limit?: int32 = 20;
  @query @minLength(1) @maxLength(100) @pattern("\\S") search?: string;
  @query storeId?: ProductId;
  @query status?: ModerationStatus = "ChoDuyet";
}
model Approval {
  @doc("Phiên bản kiểm duyệt đã đọc; thay đổi nội dung phải tăng phiên bản này.")
  @minValue(0) @maxValue(2147483646) version: int32;
}
model Rejection extends Approval {
  @minLength(1) @maxLength(500) @pattern("\\S") reason: string;
}
model ProductSummary {
  productId: ProductId;
  code: string | null;
  name: string;
  image: string | null;
  storeId: ProductId;
  storeName: string;
  categoryId: ProductId;
  categoryName: string;
  visibility: "Hien" | "An" | "Khoa";
  moderationStatus: ModerationStatus;
  version: int32;
  createdAt: utcDateTime;
}
model Variant {
  variantId: ProductId;
  name: string;
  attributes: string;
  image: string | null;
  @doc("Giá nguyên đồng VND, biểu diễn chuỗi để bảo toàn Decimal.")
  price: Common.VndAmount;
  stock: int32;
}
model ProductDetail extends ProductSummary {
  description: string | null;
  classification: string | null;
  updatedAt: utcDateTime;
  rejectionReason: string | null;
  reviewedAt: utcDateTime | null;
  variants: Variant[];
}
model ModerationResult {
  productId: ProductId;
  moderationStatus: ModerationStatus;
  version: int32;
  reviewedAt: utcDateTime;
}
model Failure<Code extends int32> {
  @statusCode statusCode: Code;
  @body body: Common.ErrorResponse;
}
alias Failures = Failure<400> | Failure<401> | Failure<403> | Failure<404> | Failure<409> | Failure<500>;
interface ProductModeration {
  @get listProductModeration(...ModerationQuery): Common.ListResponse<ProductSummary> | Failures;
  @get @route("/{productId}") getProductModeration(@path productId: ProductId): ProductDetail | Failures;
  @post @route("/{productId}/approval") approveProductModeration(@path productId: ProductId, @body body: Approval): ModerationResult | Failures;
  @post @route("/{productId}/rejection") rejectProductModeration(@path productId: ProductId, @body body: Rejection): ModerationResult | Failures;
}
