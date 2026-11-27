import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";
import "./common/health.tsp";
import "./common/conventions.tsp";
import "./admin-stores.tsp";
import "./admin-accounts.tsp";
import "./admin-product-moderation.tsp";
import "./admin-categories.tsp";
import "./admin-homepage.tsp";
import "./admin-cases.tsp";
import "./admin-reports.tsp";
using TypeSpec.Http;
using TypeSpec.OpenAPI;

@service(#{ title: "Furniture admin API" })
@info(#{ version: "0.0.0" })
namespace Furniture.Admin;

@route("/api/v1/admin/stores")
@useAuth(BearerAuth)
interface Stores extends AdminStores.Stores {}

@route("/api/v1/admin/accounts")
@useAuth(BearerAuth)
interface Accounts extends AdminAccounts.Accounts {}

@route("/api/v1/admin/product-moderation")
@useAuth(BearerAuth)
interface ProductModeration extends AdminModeration.ProductModeration {}

@route("/api/v1/admin/catalog/categories")
@useAuth(BearerAuth)
interface Categories extends AdminCategories.Categories {}

@route("/api/v1/admin/homepage")
@useAuth(BearerAuth)
interface Homepage extends AdminHomepage.Homepage {}

@route("/api/v1/admin/cases")
@useAuth(BearerAuth)
interface Cases extends AdminCases.Cases {}

@route("/api/v1/admin/reports")
@useAuth(BearerAuth)
interface Reports extends AdminReports.Reports {}

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
