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