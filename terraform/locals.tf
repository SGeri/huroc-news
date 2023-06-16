locals {
  REGION    = "eu-central-1"
  SUBDOMAIN = "news"
  DOMAIN    = "huroc.com"
  URL       = "${local.SUBDOMAIN}.${local.DOMAIN}"
  NAME      = "huroc-news"
  DB_NAME   = "hrcnewsdb"
}
