import "@typespec/http";
import "./common/conventions.tsp";
using TypeSpec.Http;
namespace AdminCategories;
@pattern("^[1-9][0-9]{0,18}$")
scalar CategoryId extends string;
model CategoryQuery {
  @query cursor?: CategoryId;
  @query @minValue(1) @maxValue(100) limit?: int32 = 20;
  @query parentId?: CategoryId;
  @query @minLength(1) @maxLength(100) @pattern("\\S") search?: string;
}
model CategoryInput {
  @minLength(1) @maxLength(100) @pattern("\\S") name: string;
  parentId: CategoryId | null;
}
@doc("PATCH gửi tên và cha mong muốn; null đưa danh mục về gốc.")
model CategoryUpdate extends CategoryInput {}
model Category {
  categoryId: CategoryId;
  name: string;
  parentId: CategoryId | null;
  createdAt: utcDateTime;
  updatedAt: utcDateTime;
}
model Failure<Code extends int32> {
  @statusCode statusCode: Code;
  @body body: Common.ErrorResponse;
}
alias Failures = Failure<400> | Failure<401> | Failure<403> | Failure<404> | Failure<409> | Failure<500>;
interface Categories {
  @get listAdminCategories(...CategoryQuery): Common.ListResponse<Category> | Failures;
  @post createAdminCategory(@body body: CategoryInput): Category | Failures;
  @patch @route("/{categoryId}") updateAdminCategory(@path categoryId: CategoryId, @body body: CategoryUpdate): Category | Failures;
  @delete @route("/{categoryId}") deleteAdminCategory(@path categoryId: CategoryId): { categoryId: CategoryId; } | Failures;
}
