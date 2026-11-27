import "@typespec/http";
import "./common/conventions.tsp";
using TypeSpec.Http;
namespace AdminHomepage;
@pattern("^[1-9][0-9]{0,18}$") scalar ItemId extends string;
@minValue(0) @maxValue(2147483646) scalar Version extends int32;
@minLength(1) @maxLength(200) @pattern("\\S") scalar Title extends string;
@minLength(1) @maxLength(2048) @pattern("^(https://[^/\\s]+/|/(?!/))[^\\s]*$") scalar MediaUrl extends string;
@minLength(1) @maxLength(2048) @pattern("^/(?!/)[^\\s]*$") scalar InternalLink extends string;
model Change { version: Version; }
model MediaInput extends Change {
  title: Title;
  imageUrl: MediaUrl;
  targetUrl: InternalLink;
  enabled: boolean;
  startsAt: utcDateTime | null;
  endsAt: utcDateTime | null;
}
model CategoryInput extends Change {
  title: Title;
  @minItems(1) @maxItems(30) categoryIds: ItemId[];
  enabled: boolean;
  startsAt: utcDateTime | null;
  endsAt: utcDateTime | null;
}
model HomepageItem {
  itemId: ItemId;
  kind: "banner" | "ad" | "category-section";
  title: Title;
  imageUrl: MediaUrl | null;
  targetUrl: InternalLink | null;
  categoryIds: ItemId[];
  enabled: boolean;
  startsAt: utcDateTime | null;
  endsAt: utcDateTime | null;
}
model Content { @maxItems(100) items: HomepageItem[]; }
model Config {
  version: Version;
  draft: Content;
  published: Content | null;
  publishedVersion: Version | null;
  publishedAt: utcDateTime | null;
}
model Preview {
  version: Version;
  at: utcDateTime;
  items: HomepageItem[];
}
model Order extends Change { @maxItems(100) itemIds: ItemId[]; }
model Failure<Code extends int32> { @statusCode statusCode: Code; @body body: Common.ErrorResponse; }
alias Failures = Failure<400> | Failure<401> | Failure<403> | Failure<404> | Failure<409> | Failure<500>;
interface Homepage {
  @get getHomepage(): Config | Failures;
  @get @route("/preview") previewHomepage(@query at?: utcDateTime): Preview | Failures;
  @post @route("/banners") createHomepageBanner(@body body: MediaInput): Config | Failures;
  @patch @route("/banners/{itemId}") updateHomepageBanner(@path itemId: ItemId, @body body: MediaInput): Config | Failures;
  @delete @route("/banners/{itemId}") deleteHomepageBanner(@path itemId: ItemId, @query version: Version): Config | Failures;
  @post @route("/ads") createHomepageAd(@body body: MediaInput): Config | Failures;
  @patch @route("/ads/{itemId}") updateHomepageAd(@path itemId: ItemId, @body body: MediaInput): Config | Failures;
  @delete @route("/ads/{itemId}") deleteHomepageAd(@path itemId: ItemId, @query version: Version): Config | Failures;
  @post @route("/category-sections") createHomepageCategorySection(@body body: CategoryInput): Config | Failures;
  @patch @route("/category-sections/{itemId}") updateHomepageCategorySection(@path itemId: ItemId, @body body: CategoryInput): Config | Failures;
  @delete @route("/category-sections/{itemId}") deleteHomepageCategorySection(@path itemId: ItemId, @query version: Version): Config | Failures;
  @post @route("/order") reorderHomepage(@body body: Order): Config | Failures;
  @post @route("/publish") publishHomepage(@body body: Change): Config | Failures;
}
