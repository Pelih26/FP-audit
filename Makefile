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

all: up test report

# МОЖЕТ ГИТ надо прорверить 
ci-test:
	docker run --rm -v $(PWD):/app pelih26/web_test:0.0.1 npx playwright test