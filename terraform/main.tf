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
      value  = "postgres://${local.NAME}:${local.NAME}@${aws_db_instance.postgres.address}"
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

// an aws postgress database using RDS
/*resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "13.3"
  instance_class       = "db.t2.micro"
  name                 = local.NAME
  username             = local.NAME
  password             = local.NAME
  parameter_group_name = "default.postgres13"
  skip_final_snapshot  = true
  publicly_accessible  = true
}*/


/* --- DATA SOURCES --- */
data "upstash_redis_database_data" "redis_data" {
  database_id = resource.upstash_redis_database.redis.database_id
}
