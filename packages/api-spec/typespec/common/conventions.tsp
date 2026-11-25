import "@typespec/http";

using TypeSpec.Http;

namespace Common;

model TokenPair {
  accessToken: string;
  refreshToken: string;
}

model Permission {
  name: string;
}

model ListResponse<T> {
  nextCursor: string | null;
  total: int64;
  items: T[];
}

model ErrorDetail {
  field?: string;
  code: string;
  message: string;
}

model ErrorBody {
  code: string;
  message: string;
  details?: ErrorDetail[];
  correlationId?: string;
}

model ErrorResponse {
  error: ErrorBody;
}

@doc("ID truyền qua HTTP là chuỗi thập phân và được backend kiểm tra, chuyển sang bigint.")
scalar ApiId extends string;

@doc("Số tiền nguyên theo đơn vị đồng Việt Nam, không dùng số thực trong JSON.")
scalar VndAmount extends string;

@doc("Ngày thuần theo múi giờ nghiệp vụ Việt Nam.")
scalar VietnamDate extends string;

@doc("Thời điểm ISO 8601 có offset; hiển thị theo Asia/Ho_Chi_Minh.")
scalar VietnamDateTime extends utcDateTime;

model AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

model LoginRequest {
  email: string;
  password: string;
}

model RefreshRequest {
  refreshToken: string;
}

model LogoutRequest {
  refreshToken?: string;
}

model LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}