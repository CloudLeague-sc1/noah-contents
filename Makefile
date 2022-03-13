NPM := npm
NODE := node

SAMPLE_DIR := ./sample
SAMPLE_FILES := $(shell find $(SAMPLE_DIR)/*.xml)
SAMPLE_DIST_DIR := ./generated/sample
SAMPLE_DIST_FILES :=$(SAMPLE_FILES:$(SAMPLE_DIR)/%.xml=$(SAMPLE_DIST_DIR)/%.json)

DOC_DIR := ./articles
DOC_FILES := $(shell find $(DOC_DIR)/*.xml)
DOC_DIST_DIR = ./generated/articles
DOC_DIST_FILES :=$(DOC_FILES:$(DOC_DIR)/%.xml=$(DOC_DIST_DIR)/%.json)

TOOLKIT_DIR=./content_toolkit/dist


.PHONY: install
install:
	cd $(TOOLKIT_DIR) && $(NPM) install && $(NPM) run build

.PHONY: test-sample
test-sample:
	$(NODE) $(TOOLKIT_DIR)/validate.js $(SAMPLE_FILES)

.PHONY: test-article
test-test-article:
	$(NODE) $(TOOLKIT_DIR)/validate.js $(DOC_FILES)

.PHONY: test
test:
	$(NODE) $(TOOLKIT_DIR)/validate.js $(SAMPLE_FILES) $(DOC_FILES)

generate-sample: $(SAMPLE_FILES)
	$(MAKE) $(SAMPLE_DIST_FILES)

$(SAMPLE_DIST_DIR)/%.json:	$(SAMPLE_DIR)/%.xml
	mkdir -p $(SAMPLE_DIST_DIR)
	$(NODE) $(TOOLKIT_DIR)/generate.js $(SAMPLE_DIST_DIR) $(SAMPLE_DIR)/$*.xml

generate-article: $(DOC_FILES)
	$(MAKE) $(DOC_DIST_FILES)

$(DOC_DIST_DIR)/%.json:	$(DOC_DIR)/%.xml
	mkdir -p $(DOC_DIST_DIR)
	$(NODE) $(TOOLKIT_DIR)/generate.js $(DOC_DIST_DIR) $(DOC_DIR)/$*.xml


generate: $(SAMPLE_DIST_FILES) $(DOC_DIST_FILES)

.PHONY: clean
clean:
	rm -rf $(SAMPLE_DIST_DIR)
	rm -rf $(DOC_DIST_DIR)
