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
    aws = {
      source  = "hashicorp/aws"
      version = "4.64.0"
    }
  }
}

/* --- PROVIDERS --- */
provider "vercel" {
  api_token = var.VERCEL_API_TOKEN
  team      = var.VERCEL_TEAM_SLUG
}

provider "upstash" {
  email   = var.UPSTASH_EMAIL
  api_key = var.UPSTASH_API_KEY
}

provider "aws" {
  region     = local.REGION
  access_key = var.AWS_ACCESS_KEY
  secret_key = var.AWS_SECRET_KEY
}

/* --- RESOURCES --- */
resource "vercel_project" "next" {
  name      = local.NAME
  framework = "nextjs"

  root_directory = "apps/next"
  build_command  = "cd ../.. && npm run build"

  environment = [
    {
      key    = "DATABASE_URL"
      value  = "postgres://${var.AWS_RDS_USERNAME}:${var.AWS_RDS_PASSWORD}@${aws_db_instance.postgres.address}"
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
    {
      key    = "SERVER_AWS_ACCESS_KEY"
      value  = var.AWS_ACCESS_KEY
      target = ["development", "preview", "production"]
    },
    {
      key    = "SERVER_AWS_SECRET_KEY"
      value  = var.AWS_SECRET_KEY
      target = ["development", "preview", "production"]
    },
  ]
}

resource "vercel_project_domain" "next_domain" {
  project_id = vercel_project.next.id
  domain     = local.URL
}

resource "upstash_redis_database" "redis" {
  database_name = local.NAME
  region        = local.REGION
  tls           = "true"
}

resource "aws_db_instance" "postgres" {
  identifier          = "postgres"
  instance_class      = "db.t3.micro"
  allocated_storage   = 5
  engine              = "postgres"
  engine_version      = "15.2"
  db_name             = local.DB_NAME
  username            = var.AWS_RDS_USERNAME
  password            = var.AWS_RDS_PASSWORD
  publicly_accessible = true
  skip_final_snapshot = true
}

output "database_url" {
  value     = "postgres://${aws_db_instance.postgres.username}:${aws_db_instance.postgres.password}@${aws_db_instance.postgres.endpoint}/${aws_db_instance.postgres.db_name}"
  sensitive = true
}

/* --- DATA SOURCES --- */
data "upstash_redis_database_data" "redis_data" {
  database_id = resource.upstash_redis_database.redis.database_id
}
