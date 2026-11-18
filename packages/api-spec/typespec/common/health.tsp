import "@typespec/http";
using TypeSpec.Http;
namespace Furniture.Common;

model HealthStatus {
  status: "ok" | "degraded" | "down";
  @minValue(0) uptime: float64;
  timestamp: utcDateTime;
}

@route("/api/v1/health")
@get
op getHealth(): HealthStatus;
