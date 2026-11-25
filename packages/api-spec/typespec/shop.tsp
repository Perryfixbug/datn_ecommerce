import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";
import "./common/health.tsp";
import "./common/conventions.tsp";
using TypeSpec.Http;
using TypeSpec.OpenAPI;

@service(#{ title: "Furniture shop API" })
@info(#{ version: "0.0.0" })
namespace Furniture.Shop;

@tag("health")
op getHealth is Common.getHealth;

@route("/api/v1/common/conventions")
@get
op getCommonConventions(): {
  tokens: Common.TokenPair;
  permission: Common.Permission;
  list: Common.ListResponse<string>;
  error: Common.ErrorResponse;
};
@route("/api/v1/auth/login")
@post
op login(@body body: Common.LoginRequest): Common.LoginResponse;

@route("/api/v1/auth/refresh")
@post
op refresh(@body body: Common.RefreshRequest): Common.LoginResponse;

@route("/api/v1/auth/logout")
@post
op logout(@body body: Common.LogoutRequest): {
  success: boolean;
};

@route("/api/v1/auth/me")
@get
op me(): Common.AuthUser;