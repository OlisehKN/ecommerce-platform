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

![Screenshot (378)](https://github.com/user-attachments/assets/a34c53ae-cd72-48ac-b1be-ab42f3920cb8)

### <ins>**Task 3: Version Control:**</ins>

  - Add and commit your initial project structure to the Git repository.

![Screenshot (379)](https://github.com/user-attachments/assets/610132d5-2afd-4d13-a965-dd512e596545)

### <ins>**Task 4: Dockerize Microservices:**</ins>

  - For each microservice, create a **Dockerfile** specifying a base image (e.g., Python/Flask or Node.js/Express).

      - <ins>product-service</ins>

            # Use official Node.js LTS image
            FROM node:18
            
            # Set working directory inside container
            WORKDIR /app
            
            # Copy package files and install dependencies
            COPY package*.json ./
            RUN npm install
            
            # Copy the rest of the application
            COPY . .
            
            # Expose port the app runs on
            EXPOSE 3000
            
            # Command to run the application
            CMD ["node", "server.js"]

![Screenshot (380)](https://github.com/user-attachments/assets/c3738468-b900-4c14-8ddc-af1238dc558d)

  - <ins>cart-service</ins>

            # Use official Node.js LTS version
            FROM node:23-slim
            
            # Set working directory inside container
            WORKDIR /app
            
            # Copy package files and install dependencies
            COPY package*.json ./
            RUN npm install
            
            # Copy rest of the app code
            COPY . .
            
            # Expose port
            EXPOSE 3000
            
            # Run the application
            CMD ["node", "index.js"]

![Screenshot (383)](https://github.com/user-attachments/assets/5c7e1c4e-25bc-42de-9da7-9d6f1a665876)

   - <ins>order-service</ins>

            # Use Node.js LTS as base image
            FROM node:23-slim
            
            # Set working directory
            WORKDIR /app
            
            # Copy and install dependencies
            COPY package*.json ./
            RUN npm install
            
            # Copy source code
            COPY . .
            
            # Expose the port the app will run on
            EXPOSE 4000
            
            # Run the app
            CMD ["node", "index.js"]

  ![Screenshot (386)](https://github.com/user-attachments/assets/1efdbe5c-b693-4283-9b49-66a51e4fd6ad)

  - Implement basic functionalities for each service:

      - **product-service**: API to list and view products.

          - **Server.js**

                const express = require('express');
                const app = express();
                const port = 3000;
                
                // Sample in-memory product data
                const products = [
                  { id: 1, name: 'Laptop', price: 999 },
                  { id: 2, name: 'Smartphone', price: 699 },
                  { id: 3, name: 'Headphones', price: 199 }
                ];
                
                // List all products
                app.get('/products', (req, res) => {
                  res.json(products);
                });
                
                // View a single product by ID
                app.get('/products/:id', (req, res) => {
                  const productId = parseInt(req.params.id);
                  const product = products.find(p => p.id === productId);
                  
                  if (product) {
                    res.json(product);
                  } else {
                    res.status(404).json({ message: 'Product not found' });
                  }
                });
                
                app.listen(port, () => {
                  console.log(`Product service running at http://localhost:${port}`);
                });

       ![Screenshot (382)](https://github.com/user-attachments/assets/b2f2fc08-6023-41de-aff3-9b376d318d71)

       - **package.json**
  
              {
                  "name": "product-service",
                  "version": "1.0.0",
                  "main": "server.js",
                  "scripts": {
                    "start": "node server.js"
                  },
                  "dependencies": {
                    "express": "^4.18.2"
                  }
                }

    ![Screenshot (381)](https://github.com/user-attachments/assets/bbf077e7-e0b0-4669-b9b2-f552ea281c15)

      - **cart-service**: API to add/remove items to/from a cart.

        - **Index.js**

              const express = require('express');
              const app = express();
              const port = 3000;
              
              app.use(express.json());
              
              let cart = [];
              
              // Add item to cart
              app.post('/cart', (req, res) => {
                const item = req.body;
                if (!item || !item.id || !item.name) {
                  return res.status(400).json({ error: 'Item must have id and name' });
                }
                cart.push(item);
                res.status(201).json({ message: 'Item added to cart', cart });
              });
              
              // Remove item from cart by ID
              app.delete('/cart/:id', (req, res) => {
                const { id } = req.params;
                const initialLength = cart.length;
                cart = cart.filter(item => item.id !== id);
              
                if (cart.length === initialLength) {
                  return res.status(404).json({ error: 'Item not found' });
                }
              
                res.json({ message: 'Item removed from cart', cart });
              });
              
              // Get current cart
              app.get('/cart', (req, res) => {
                res.json(cart);
              });
              
              app.listen(port, () => {
                console.log(`Cart service running at http://localhost:${port}`);
              });

        ![Screenshot (385)](https://github.com/user-attachments/assets/bff61244-747b-4db4-8f57-d9de0967803e)

        - **package.json**

              {
                  "name": "cart-service",
                  "version": "1.0.0",
                  "description": "Microservice to manage shopping cart",
                  "main": "index.js",
                  "scripts": {
                    "start": "node index.js"
                  },
                  "dependencies": {
                    "express": "^4.18.2"
                  }
                }

      ![Screenshot (384)](https://github.com/user-attachments/assets/67739182-1283-43e4-b9ea-777608704b12)

      - **order-service**: API to create and view orders.

        - **Index.js**

              const express = require('express');
              const { v4: uuidv4 } = require('uuid');
              
              const app = express();
              const port = 4000;
              
              app.use(express.json());
              
              let orders = [];
              
              // Create a new order
              app.post('/orders', (req, res) => {
                const { items } = req.body;
                if (!Array.isArray(items)) {
                  return res.status(400).json({ error: 'Items must be an array' });
                }
              
                const newOrder = {
                  id: uuidv4(),
                  items,
                  createdAt: new Date().toISOString()
                };
              
                orders.push(newOrder);
                res.status(201).json(newOrder);
              });
              
              // Get all orders
              app.get('/orders', (req, res) => {
                res.json(orders);
              });
              
              // Get an order by ID
              app.get('/orders/:id', (req, res) => {
                const order = orders.find(o => o.id === req.params.id);
                if (!order) {
                  return res.status(404).json({ error: 'Order not found' });
                }
                res.json(order);
              });
              
              app.listen(port, () => {
                console.log(`Order service running at http://localhost:${port}`);
              });
   
        ![Screenshot (388)](https://github.com/user-attachments/assets/b8d9511a-4ac4-495c-b302-0fde6240dab2)

        - **package.json** 

              {
                  "name": "order-service",
                  "version": "1.0.0",
                  "description": "Microservice to create and view orders",
                  "main": "index.js",
                  "scripts": {
                    "start": "node index.js"
                  },
                  "dependencies": {
                    "express": "^4.18.2",
                    "uuid": "^9.0.0"
                  }
                }

![Screenshot (387)](https://github.com/user-attachments/assets/ba86e66a-67d1-4c6b-93cf-5b17c233c3b6)

### <ins>**Task 5: Push to Docker Hub:**</ins>

  - Log in to Docker Hub and create a repository for each microservice.

    ![Screenshot (389)](https://github.com/user-attachments/assets/19a0d709-79e7-44cb-ae86-176d8d7b891e)

    - **product-service**

    ![Screenshot (390)](https://github.com/user-attachments/assets/eaad1959-be37-4193-87d1-7b12b159b6f2)
    ![Screenshot (391)](https://github.com/user-attachments/assets/ff243901-c0b0-49b9-955e-9b6aa55f1592)

    - **cart-service**
    
    ![Screenshot (392)](https://github.com/user-attachments/assets/71dcc4c6-2e8a-41d3-9d36-bb3ad9525ca5)
    ![Screenshot (393)](https://github.com/user-attachments/assets/ecf41bf3-7820-4d6a-a5e2-5c5b943c8099)

    - **order-service**

![Screenshot (394)](https://github.com/user-attachments/assets/01aa1d55-816d-421d-9581-2b747f5946c3)

  - Build Docker images and push them to Docker Hub.

### <ins>**Task 6: Set up ArgoCD with Kubernetes:**</ins>

  - Install ArgoCD in a Kubernetes cluster.

    - 

  - Connect your Git repository to ArgoCD.

### <ins>**Task 7: Kubernetes Deployment:**</ins>

  - Create Kubernetes deployment YAML files for each microservice.

  - Define the ArgoCD application YAMLs to manage these deployments.

### <ins>**Task 8: Create Kubernetes Services:**</ins>

  - Create Kubernetes service Yaml files for each microservice, specifying the type as **ClusterIP**.

  - Use ArgoCD to apply the services to your cluster.
