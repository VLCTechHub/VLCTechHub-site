.RECIPEPREFIX +=	
IMAGE_NAME = vlctechhub/site
CONTAINER_NAME = vlctechhub-site
LOCAL_PORT = 80

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# Docker Tasks
build: ## Build the container. 
	docker build -t $(IMAGE_NAME) .

run: ## Run container. 
	docker run --name="$(CONTAINER_NAME)" -p $(LOCAL_PORT):80 $(IMAGE_NAME)

daemon: ## Run container in background. 
	docker run -d --name="$(CONTAINER_NAME)" -p $(LOCAL_PORT):80 $(IMAGE_NAME)

stop: ## Stop and rm container.
	docker stop $(CONTAINER_NAME) && docker rm $(CONTAINER_NAME)
