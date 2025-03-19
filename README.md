## 💡 Criando uma aplicação simples com Kubernetes

### Objetivo:
-  Criar um cluster Kubernetes com o Kind.
- Deploy de uma aplicação web simples com Nginx e um container de backend com Node.js.
- Configurar um Service para expor a aplicação externamente.
- Testar o acesso à aplicação.

### Setup
1. Instalar o docker, kind e kubectl:

`sudo dnf install -y docker kind kubectl`

### Etapas
1. Criando o cluster:

    `kind create cluster --name meu-cluster`

2. Buildar a imagem da api:

    `docker build -t exercise/api/`

3. Adicionar a imagem da api ao cluster:

    `kind load docker-image node-api:latest --name meu-cluster`

4. Aplicando recursos no kubernetes:

    ```
    kubectl apply -f deployment.yaml
    kubectl apply -f service.yaml
    ```

6. Fazendo um port-forward para a porta do serviço:

   `kubectl port-forward svc/backend-service 8080:80`

8. Acessando a API

   `curl localhost:8080/`

### Comandos úteis
- `kubectl get pods`
- `kubectl get svc`
- `kind get clusters`
- `kind delete cluster --name <cluster>`

### Extras

## Deployment e Service
| Característica        | **Deployment**                                          | **Service**                                               |
|-----------------------|---------------------------------------------------------|-----------------------------------------------------------|
| **Objetivo**           | Gerenciar o ciclo de vida dos pods (criação, escala, atualização). | Expor os pods e fornecer um ponto de acesso estável.       |
| **Responsabilidade**   | Garantir que os pods corretos e as réplicas estejam em execução. | Direcionar o tráfego de rede para os pods correspondentes. |
| **Exposição Externa**  | Não expõe os pods diretamente ao tráfego externo.      | Pode expor os pods externamente (via NodePort, LoadBalancer, etc.). |
| **Criação de Pods**    | Cria e gerencia pods.                                   | Não cria pods, apenas mapeia os pods existentes.           |
| **Uso**                | Usado para garantir que a aplicação esteja sempre disponível. | Usado para fornecer um ponto de entrada para acessar a aplicação. |
