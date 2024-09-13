terraform {
    required_providers {
      aws = {
        source = "hashicorp/aws"
        version = "~> 4.0.0"
      }
    }
}

//Make sure you are connected to AWS cli
provider "aws" {
    region = "us-east-1"
}

//Create the ECR Repository
resource "aws_ecr_repository" "dog_restaurant_service" {
  name = "dog-restaurant-service"
}

//Upload your docker image into the ECR Repository
/*
# Authenticate Docker to your ECR registry
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com

# Build your Docker image
docker build -t dog-restaurant-service .

# Tag your Docker image
docker tag dog-restaurant-service:latest <aws_account_id>.dkr.ecr.us-west-2.amazonaws.com/dog-restaurant-service:latest

# Push your Docker image to ECR
docker push <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/dog-restaurant-service:latest
*/

resource "aws_ecs_cluster" "dog_restaurant_cluster" {
  name = "dog-restaurant-cluster"
}