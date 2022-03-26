NPM := npm
NODE := node

DIST_DIR := ./generated

SAMPLE_DIR := ./sample
SAMPLE_FILES := $(shell find $(SAMPLE_DIR)/*.xml)
SAMPLE_DIST_FILES :=$(SAMPLE_FILES:$(SAMPLE_DIR)/%.xml=$(DIST_DIR)/%.sample.json)

DOC_DIR := ./articles
DOC_FILES := $(shell find $(DOC_DIR)/*.xml)
DOC_DIST_FILES :=$(DOC_FILES:$(DOC_DIR)/%.xml=$(DIST_DIR)/%.json)

TOOLKIT_DIR=./content_toolkit
TOOLKIT_DIST_DIR=$(TOOLKIT_DIR)/dist
PREVIEW_DIR = ./preview

# Initialization
.PHONY: init-toolkit
init-toolkit:
	cd $(TOOLKIT_DIR) && $(NPM) install && $(NPM) run build
	

.PHONY: init-preview
init-preview:
	cd $(PREVIEW_DIR) && $(NPM) install

# Test
.PHONY: test-sample
test-sample:
	$(NODE) $(TOOLKIT_DIST_DIR)/validate.js $(SAMPLE_FILES)

.PHONY: test-article
test-test-article:
	$(NODE) $(TOOLKIT_DIST_DIR)/validate.js $(DOC_FILES)

.PHONY: test
test:
	$(NODE) $(TOOLKIT_DIST_DIR)/validate.js $(SAMPLE_FILES) $(DOC_FILES)

# Generate
generate-sample: $(SAMPLE_DIST_FILES)
generate-article:$(DOC_DIST_FILES)
generate: generate-sample generate-article

# Generate Inner (Generate JSON)
$(DIST_DIR)/%.json:	$(DOC_DIR)/%.xml
	mkdir -p $(DIST_DIR)
	$(NODE) $(TOOLKIT_DIST_DIR)/generate.js $(DIST_DIR) $(DOC_DIR)/$*.xml

$(DIST_DIR)/%.sample.json:	$(SAMPLE_DIR)/%.xml
	mkdir -p $(DIST_DIR)
	$(NODE) $(TOOLKIT_DIST_DIR)/generate.js $(DIST_DIR) $(SAMPLE_DIR)/$*.xml --sample

# Utility

.PHONY: clean
clean:
	rm -rf $(DIST_DIR)

.PHONY: cleanAll
cleanAll: clean
	cd $(TOOLKIT_DIR) && $(NPM) run clean:hard
	cd $(PREVIEW_DIR) && $(NPM) run clean:hard

.PHONY: serve
serve: generate
	cd $(PREVIEW_DIR) && $(NPM) run dev
