build:
	@echo "Start run build dev image"
	docker-compose -f docker-compose.dev.yml build
	
up:
	@echo "Start run dev container"
	docker-compose -f docker-compose.dev.yml up -d

stop:
	@echo "Stop Container dev"
	docker-compose -f docker-compose.dev.yml stop

down:
	@echo "Destroy Container dev"
	docker-compose -f docker-compose.dev.yml down  --remove-orphans
	
build-prod:
	@echo "Start run build prod image"
	docker-compose -f docker-compose.prod.yml build
	
up-prod:
	@echo "Start run prod container"
	docker-compose -f docker-compose.prod.yml up -d

stop-prod:
	@echo "Stop Container prod"
	docker-compose -f docker-compose.prod.yml stop

down-prod:
	@echo "Destroy Container prod"
	docker-compose -f docker-compose.prod.yml down  --remove-orphans


