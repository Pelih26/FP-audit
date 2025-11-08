.PHONY: up test report clean

up:
	cd docker && docker-compose -f docker-compose.playwright.yml up -d

test:
	docker exec -it web_playwright bash -c "npx playwright test --reporter=html"

report:
	docker exec -it web_playwright bash -c "npx playwright show-report"

clean:
	cd docker && docker-compose -f docker-compose.playwright.yml down
	rm -rf playwright-report

# Полный цикл
all: up test report