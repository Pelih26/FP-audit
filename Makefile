CONTAINER_NAME_PREFIX := $(shell grep '^CONTAINER_NAME_PREFIX=' $(CURDIR)/.env | cut -d '=' -f2-)

export CONTAINER_NAME_PREFIX

playw-build:
	docker compose -f docker/docker-compose.playwright.yml up -d

playw-test:
	docker exec -it ${CONTAINER_NAME_PREFIX}_playwright bash -c "npx playwright test $(filter-out $@,$(MAKECMDGOALS)) || true && npx allure generate allure-results --clean -o /usr/src/app/FP-audit/allure-report"

playw-allure-run:
	docker exec ${CONTAINER_NAME_PREFIX}_http_server pkill -f http-server || true
	docker exec -it ${CONTAINER_NAME_PREFIX}_http_server sh -c "cd /usr/src/app/FP-audit/allure-report && npx http-server -p 4815 -c-1"

playw-linter:
	docker exec -it ${CONTAINER_NAME_PREFIX}_playwright bash -c "npx eslint './**/*.ts'"
playw-linter-fix:
	docker exec -it ${CONTAINER_NAME_PREFIX}_playwright bash -c "npx eslint \".//*$(filter-уout $@,$(MAKECMDGOALS)).ts\" --fix"

playw-check:
	$(MAKE) playw-test
	$(MAKE) playw-linter