# CapStone Project: E-Commerce Platform with Microservices Architecture

## <ins>**Hypothetical Use Case**</ins>

  You are tasked with developing an e-commerce platform using a microservices-based architecture. The platform consists of several microservices:

  - **Product Service**: Manages product information
  
  - **Cart Service**: Handles user shopping carts.
  
  - **Order Service**: Manages order processing.

  The goal is to containerize these microservices using Docker, deploy them to a Kubernetes cluster managed by ArgoCD, and expose them through an API Gateway.

## <ins>**Tasks**</ins>

### <ins>**Task 1: Project Setup:**</ins>

  - Create a new project directory named **ecommerce-platform.**

![Screenshot (374)](https://github.com/user-attachments/assets/7f67f8a6-0eaf-4e9f-8f7e-0002100a2be0)

  - Inside, create subdirectories for each microservice: **product-service**, **cart-service**, **order-service**.

![Screenshot (374)](https://github.com/user-attachments/assets/27636f7b-6a62-4d06-9b05-ba3aa1e15277)
![Screenshot (376)](https://github.com/user-attachments/assets/7a682368-fb50-4a1a-ac10-85e8952484f8)
![Screenshot (377)](https://github.com/user-attachments/assets/4c5a28b8-3ddd-4575-b370-7ad30a050769)

### <ins>**Task 2: Initialize Git Repository:**</ins>

  - Initialize a Git repository in your **ecommerce-platform** directory.

### <ins>**Task 3: Version Control:**</ins>

  - Add and commit your initial project structure to the Git repository.

### <ins>**Task 4: Dockerize Microservices:**</ins>

  - For each microservice, create a **Dockerfile** specifying a base image (e.g., Python/Flask or Node.js/Express).

  - Implement basic functionalities for each service:

      - **product-service**: API to list and view products.
   
      - **cart-service**: API to add/remove items to/from a cart.
   
      - **order-service**: API to create and view orders.
   
### <ins>**Task 5: Push to Docker Hub:**</ins>

  - Log in to Docker Hub and create a repository for each microservice.

  - Build Docker images and push them to Docker Hub.

### <ins>**Task 6: Set up ArgoCD with Kubernetes:**</ins>

  - Install ArgoCD in a Kubernetes cluster.

  - Connect your Git repository to ArgoCD.

### <ins>**Task 7: Kubernetes Deployment:**</ins>

  - Create Kubernetes deployment YAML files for each microservice.

  - Define the ArgoCD application YAMLs to manage these deployments.

### <ins>**Task 8: Create Kubernetes Services:**</ins>

  - Create Kubernetes service Yaml files for each microservice, specifying the type as **ClusterIP**.

  - Use ArgoCD to apply the services to your cluster.
