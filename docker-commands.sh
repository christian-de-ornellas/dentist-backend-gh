# Listar containers em uso
docker ps

# Listar containers existentes
docker ps -a 

# Ambiente de desenvolvimento
docker-compose up -d

# Desfazer ambiente de desenvolvimento
docker-compose down
# Remover todas as images.
docker rmi $(docker images -a -q)

# Limpar 
docker volume prune
docker image prune