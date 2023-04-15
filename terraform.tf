/*
Sadly, Planetscale cannot be used with Terraform, since there is no official provider for it.
Also, the connection string, that would be supplied to the Vercel environment, is not retrievable from the Planetscale API.
Therefore, the connection string is supplied manually to the Vercel environment.

[TODO] Current plans are to include an S3 bucket for document uploading and SES Service for emailing in the Terraform config with AWS providers.
*/

terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.4"
    }
    upstash = {
      source  = "upstash/upstash"
      version = "1.3.0"
    }
  }
}

/* --- PROVIDERS --- */
provider "vercel" {
  api_token = var.VERCEL_API_TOKEN
}

provider "upstash" {
  email   = var.UPSTASH_EMAIL
  api_key = var.UPSTASH_API_KEY
}


/* --- RESOURCES --- */
resource "vercel_project" "next" {
  name      = "ct3t-next"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "SGeri/ct3t"
  }

  root_directory = "apps/next"
  build_command  = "cd ../.. && npm run build"

  environment = [
    {
      key    = "DATABASE_URL"
      value  = var.PLANETSCALE_DB_URL
      target = ["development", "preview", "production"]
    },
    {
      key    = "UPSTASH_REDIS_REST_URL"
      value  = "https://${data.upstash_redis_database_data.redis_data.endpoint}"
      target = ["development", "preview", "production"]
    },
    {
      key    = "UPSTASH_REDIS_REST_TOKEN"
      value  = data.upstash_redis_database_data.redis_data.rest_token
      target = ["development", "preview", "production"]
    },
    {
      key    = "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
      value  = var.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
      target = ["development", "preview", "production"]
    },
    {
      key    = "CLERK_SECRET_KEY"
      value  = var.CLERK_SECRET_KEY
      target = ["development", "preview", "production"]
    },
  ]
}

resource "upstash_redis_database" "redis" {
  database_name = "ct3t-redis"
  region        = "eu-central-1"
  tls           = "true"
}

/* --- DATA SOURCES --- */
data "upstash_redis_database_data" "redis_data" {
  database_id = resource.upstash_redis_database.redis.database_id
}

/* --- VARIABLES (from env) --- */
variable "VERCEL_API_TOKEN" {}
variable "UPSTASH_EMAIL" {}
variable "UPSTASH_API_KEY" {}
variable "PLANETSCALE_DB_URL" {}
variable "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" {}
variable "CLERK_SECRET_KEY" {}