## 💡 Criando uma aplicação simples com Kubernetes
Adicionando o Helm

Nessa branch, com base no exercício 2, adicionar o helm para facilitar:

1. Instalar o helm

    `sudo dnf install helm`

2. Instalar o chart do rabbit:

    (O cluster deve estar criado)
    ```
    helm repo add bitnami https://charts.bitnami.com/bitnami
    helm install rabbitmq bitnami/rabbitmq
    ```
    Assim não é necessário criar um deployment.yaml e um service.yaml para o rabbit

3. Criar um chart para os microserviços:


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

5. Criando o helm:

    `helm create helm`
    adicionar no values.yaml, em image: tag: "latest"

5.1 criando o chart:

    `helm install kube-rabbit helm` 

6. Fazendo um port-forward para a porta do serviço:

   `kubectl port-forward svc/rabbit-service 15672:15672`

agora a fila do rabbit deve estar registrando as mensagens entre as duas apis

### Comandos úteis
- `kubectl get pods`
- `kubectl get svc`
- `kubectl get logs <pod>`
- `helm uninstall <release>`
