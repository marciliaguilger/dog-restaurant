//Make sure you are connected to AWS cli
# Specify the provider
provider "aws" {
  region  = "us-east-1"  # Change to your desired region
  profile = "bia"        # Specify the profile
}
# Create a security group
resource "aws_security_group" "balancers_security_group" {
  name        = "balancers-security-group"
  description = "Permitir trafego do api gateway ate o eks"
  vpc_id      = "vpc-0a288c24930e9a742"  # Your VPC ID

  # Inbound rules
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Anywhere-IPv4
  }

  # Outbound rules
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "balancers-security-group"
  }
}
resource "aws_security_group" "cluster_security_group" {
  name        = "cluster-security-group"
  description = "Grupo de seguranca do cluster"
  vpc_id      = "vpc-0a288c24930e9a742"  # Your VPC ID

  # Inbound rules
  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = ["sg-0b804dd8ca3753013"]  # Reference to balancer-security-group
  }

  # Outbound rules
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "cluster-security-group"
  }
}
resource "aws_lb_target_group" "dog_tg" {
  name        = "dog-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = "vpc-0a288c24930e9a742"
  target_type = "ip"

  health_check {
    interval            = 30
    path                = "/"
    protocol            = "HTTP"
    timeout             = 5
    healthy_threshold   = 3
    unhealthy_threshold = 3
  }

  tags = {
    Name = "dog-tg"
  }
}
# Create an Application Load Balancer
resource "aws_lb" "eks_dog_load_balancer" {
  name               = "eks-dog-load-balancer"
  internal           = true
  load_balancer_type = "application"
  security_groups    = ["sg-0b804dd8ca3753013"]
  subnets            = ["subnet-08bf99e4f496868fb", "subnet-0c18fc34912b5cde3"]
  ip_address_type    = "ipv4"

  enable_deletion_protection = false

  tags = {
    Name = "eks-dog-load-balancer"
  }
}

# Create a Listener for the Load Balancer
resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.eks_dog_load_balancer.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.dog_tg.arn
  }
}

# Create an API Gateway HTTP API
resource "aws_apigatewayv2_api" "dog_restaurant_api" {
  name          = "dog-restaurant-api"
  protocol_type = "HTTP"
}

# Create an API Gateway Integration
resource "aws_apigatewayv2_integration" "http_integration" {
  api_id           = aws_apigatewayv2_api.dog_restaurant_api.id
  integration_type = "HTTP_PROXY"
  integration_uri  = aws_lb_listener.http_listener.arn
  integration_method = "ANY"
  connection_type  = "VPC_LINK"
  connection_id    = aws_apigatewayv2_vpc_link.vpc_link.id
  payload_format_version = "1.0"
}

# Create an API Gateway Authorizer
resource "aws_apigatewayv2_authorizer" "authorizer" {
  api_id = aws_apigatewayv2_api.dog_restaurant_api.id
  authorizer_type = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name = "dog-authorizer"
  jwt_configuration {
    audience = ["sce9h2dp1ia781q6to7i4u6np"]
    issuer = "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_Z5ZdvqJFj"
  }
}
# Create an API Gateway Route
resource "aws_apigatewayv2_route" "http_route" {
  api_id    = aws_apigatewayv2_api.dog_restaurant_api.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.http_integration.id}"
  authorizer_id = aws_apigatewayv2_authorizer.authorizer.id
  authorization_type = "JWT"
}

# Create an API Gateway Stage
resource "aws_apigatewayv2_stage" "http_stage" {
  api_id      = aws_apigatewayv2_api.dog_restaurant_api.id
  name        = "default"
  auto_deploy = true
}

# Create a VPC Link
resource "aws_apigatewayv2_vpc_link" "vpc_link" {
  name = "dog-restaurant-vpc-link"
  subnet_ids = ["subnet-08bf99e4f496868fb", "subnet-0c18fc34912b5cde3"]
  security_group_ids = ["sg-0b804dd8ca3753013"]
}