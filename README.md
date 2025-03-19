## 💡 Criando uma aplicação simples com Kubernetes

### Objetivo:
-  Criar um cluster Kubernetes com o Kind.
- Deploy de uma aplicação backend com dois microsserviços em Node.js que se comunicam pelo rabbit
- Configurar um Service para expor a aplicação externamente.
- Testar o acesso à aplicação.

### Setup
1. Instalar o docker, kind e kubectl:

`sudo dnf install -y docker kind kubectl`

### Etapas
1. Criando o cluster:

    `kind create cluster --name meu-cluster`

2. Buildar a imagem da api producer e consumer:
    
    ```
    docker build -t producer:latest exercise/api/producer/
    docker build -t consumer:latest exercise/api/consumer/
    ```

3. Adicionar a imagem da api ao cluster:

    ```
    kind load docker-image producer:latest --name meu-cluster
    kind load docker-image consumer:latest --name meu-cluster    
    ```

4. Aplicando recursos no kubernetes:

    ```
    kubectl apply -f rabbitmq/deployment.yaml
    kubectl apply -f rabbitmq/service.yaml
    kubectl apply -f producer-deployment.yaml
    kubectl apply -f consumer-deployment.yaml
    ```

6. Fazendo um port-forward para a porta do serviço:

   `kubectl port-forward svc/rabbit-service 15672:15672`

agora a fila do rabbit deve estar registrando as mensagens entre as duas apis

### Comandos úteis
- `kubectl get pods`
- `kubectl get svc`

