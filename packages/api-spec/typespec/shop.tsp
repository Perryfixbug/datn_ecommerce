import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";
import "./common/health.tsp";
using TypeSpec.Http;
using TypeSpec.OpenAPI;

@service(#{ title: "Furniture shop API" })
@info(#{ version: "0.0.0" })
namespace Furniture.Shop;

@tag("health")
op getHealth is Furniture.Common.getHealth;
