/*
Copyright 2013 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global fluid, jqUnit, expect, jQuery*/

// JSLint options 
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

(function ($) {
    fluid.registerNamespace("fluid.tests");

    fluid.tests.testStyleEnactor = function (that, container, expectedDefaultFlag, expectedCssClass) {
        var elements = that.getElements();
        
        jqUnit.assertEquals("Default value: " + expectedDefaultFlag, expectedDefaultFlag, that.model.value);
        jqUnit.assertEquals("Default css class: " + expectedCssClass, expectedCssClass, that.options.cssClass);
        jqUnit.assertEquals("Default - css class is not applied", undefined, elements.attr("class"));
        
        that.applier.requestChange("value", true);
        jqUnit.assertEquals("True value - Css class has been applied", expectedCssClass, elements.attr("class"));

        that.applier.requestChange("value", false);
        jqUnit.assertEquals("False value - Css class has been removed", "", elements.attr("class"));
    }; 

    /*******************************************************************************
     * Unit tests for fluid.uiOptions.styleElementsEnactor
     *******************************************************************************/

    fluid.defaults("fluid.tests.styleElementsEnactor", {
        gradeNames: ["fluid.test.testEnvironment", "autoInit"],
        expectedCssClass: "fl-style-test",
        expectedDefaultFlag: false,
        container: ".flc-styleElementsEnactor",
        components: {
            styleElements: {
                type: "fluid.uiOptions.actionAnts.styleElementsEnactor",
                options: {
                    cssClass: "fl-style-test",
                    invokers: {
                        getElements: {
                            funcName: "fluid.tests.getElements",
                            args: ".flc-styleElementsEnactor"
                        }
                    }
                }
            },
            styleElementsEnactorTester: {
                type: "fluid.tests.styleElementsEnactorTester"
            }
        }
    });

    fluid.tests.getElements = function (container) {
        return $(container).children();
    };
    
    fluid.defaults("fluid.tests.styleElementsEnactorTester", {
        gradeNames: ["fluid.test.testCaseHolder", "autoInit"],
        modules: [{
            name: "Test style element component",
            tests: [{
                expect: 5,
                name: "Apply and reset the style",
                type: "test",
                func: "fluid.tests.testStyleEnactor",
                args: ["{styleElements}", "{fluid.tests.styleElementsEnactor}.options.container", "{fluid.tests.styleElementsEnactor}.options.expectedDefaultFlag", "{fluid.tests.styleElementsEnactor}.options.expectedCssClass"]
            }]
        }]
    });

    /*******************************************************************************
     * Unit tests for fluid.uiOptions.actionAnts.emphasizeLinksEnactor
     *******************************************************************************/

    fluid.defaults("fluid.tests.emphasizeLinksEnactor", {
        gradeNames: ["fluid.test.testEnvironment", "autoInit"],
        container: ".flc-emphasizeLinksEnactor",
        expectedEmphasizeLinksClass: "fl-emphasizeLinks-test",
        expectedDefaultFlag: false,
        components: {
            emphasizeLinks: {
                type: "fluid.uiOptions.actionAnts.emphasizeLinksEnactor",
                options: {
                    container: ".flc-emphasizeLinksEnactor",
                    cssClass: "fl-emphasizeLinks-test"
                }
            },
            emphasizeLinksEnactorTester: {
                type: "fluid.tests.emphasizeLinksEnactorTester"
            }
        }
    });

    fluid.defaults("fluid.tests.emphasizeLinksEnactorTester", {
        gradeNames: ["fluid.test.testCaseHolder", "autoInit"],
        modules: [{
            name: "Test emphasize links enactor",
            tests: [{
                expect: 5,
                name: "Apply and reset emphasized links",
                type: "test",
                func: "fluid.tests.testStyleEnactor",
                args: ["{emphasizeLinks}", "{fluid.tests.emphasizeLinksEnactor}.options.container", "{fluid.tests.emphasizeLinksEnactor}.options.expectedDefaultFlag", "{fluid.tests.emphasizeLinksEnactor}.options.expectedEmphasizeLinksClass"]
            }]
        }]
    });

    /*******************************************************************************
     * Unit tests for fluid.uiOptions.actionAnts.inputsLargerEnactor
     *******************************************************************************/

    fluid.defaults("fluid.tests.inputsLargerEnactor", {
        gradeNames: ["fluid.test.testEnvironment", "autoInit"],
        container: ".flc-inputsLargerEnactor",
        expectedDefaultFlag: false,
        expectedInputsLargerClass: "fl-text-larger",
        components: {
            inputsLarger: {
                type: "fluid.uiOptions.actionAnts.inputsLargerEnactor",
                options: {
                    container: ".flc-inputsLargerEnactor"
                }
            },
            inputsLargerEnactorTester: {
                type: "fluid.tests.inputsLargerEnactorTester"
            }
        }
    });

    fluid.defaults("fluid.tests.inputsLargerEnactorTester", {
        gradeNames: ["fluid.test.testCaseHolder", "autoInit"],
        modules: [{
            name: "Test inputs larger enactor",
            tests: [{
                expect: 5,
                name: "Apply and reset larger inputs",
                type: "test",
                func: "fluid.tests.testStyleEnactor",
                args: ["{inputsLarger}", "{fluid.tests.inputsLargerEnactor}.options.container", "{fluid.tests.inputsLargerEnactor}.options.expectedDefaultFlag", "{fluid.tests.inputsLargerEnactor}.options.expectedInputsLargerClass"]
            }]
        }]
    });

    /*******************************************************************************
     * Unit tests for fluid.uiOptions.actionAnts.inputsLargerEnactor
     *******************************************************************************/

    fluid.defaults("fluid.tests.classSwapperEnactor", {
        gradeNames: ["fluid.test.testEnvironment", "autoInit"],
        container: ".flc-classSwapperEnactor",
        expectedClass: "fl-test",
        components: {
            classSwapper: {
                type: "fluid.uiOptions.actionAnts.classSwapperEnactor",
                options: {
                    container: ".flc-classSwapperEnactor",
                    classes: {
                        "default": "",
                        "test": "fl-test"
                    }
                }
            },
            classSwapperEnactorTester: {
                type: "fluid.tests.classSwapperEnactorTester"
            }
        }
    });

    fluid.tests.testClassSwapper = function (that, container, expectedClass) {
        var defaultStyle = $(container).attr("class");
        
        jqUnit.assertEquals("The style class is not applied by default", defaultStyle, $(container).attr("class"));
        
        that.applier.requestChange("className", "test");
        jqUnit.assertEquals("The style class has been applied", defaultStyle + " " + expectedClass, $(container).attr("class"));

        that.applier.requestChange("className", "");
        jqUnit.assertEquals("The style class has been removed", defaultStyle, $(container).attr("class"));
    }; 

    fluid.defaults("fluid.tests.classSwapperEnactorTester", {
        gradeNames: ["fluid.test.testCaseHolder", "autoInit"],
        modules: [{
            name: "Test class swapper enactor",
            tests: [{
                expect: 3,
                name: "Swap css class",
                type: "test",
                func: "fluid.tests.testClassSwapper",
                args: ["{classSwapper}", "{fluid.tests.classSwapperEnactor}.options.container", "{fluid.tests.classSwapperEnactor}.options.expectedClass"]
            }]
        }]
    });

    /*******************************************************************************
     * Unit tests for getPx2EmFactor & getTextSizeInEm
     *******************************************************************************/

    var fontSizeMap = {
        "xx-small": "9px",
        "x-small":  "11px",
        "small":    "13px",
        "medium":   "15px",
        "large":    "18px",
        "x-large":  "23px",
        "xx-large": "30px"
    };
    
    fluid.defaults("fluid.tests.getSize", {
        gradeNames: ["fluid.test.testEnvironment", "autoInit"],
        container: ".flc-getSize",
        fontSizeMap: fontSizeMap,
        expectedTestSize: 8,
        expectedSizeAtUndetected: 1,
        components: {
            getSizeTester: {
                type: "fluid.tests.getSizeTester"
            }
        }
    });

    fluid.tests.testGetSize = function (container, fontSizeMap, expectedTestSize, expectedSizeAtUndetected) {
        var container = $(container);
        
        var px2emFactor = fluid.uiOptions.actionAnts.getPx2EmFactor(container, fontSizeMap);
        jqUnit.assertEquals("Check that the factor is pulled from the container correctly", expectedTestSize, px2emFactor);

        var container = $("html");
        var fontSizeInEm = fluid.uiOptions.actionAnts.getTextSizeInEm(container, fontSizeMap);

        jqUnit.assertEquals("Unable to detect the text size in em for the DOM root element <html>. Always return 1em.", expectedSizeAtUndetected, fontSizeInEm);
    }; 

    fluid.defaults("fluid.tests.getSizeTester", {
        gradeNames: ["fluid.test.testCaseHolder", "autoInit"],
        modules: [{
            name: "Test getPx2EmFactor & getTextSizeInEm",
            tests: [{
                expect: 2,
                name: "Get text size in em",
                type: "test",
                func: "fluid.tests.testGetSize",
                args: ["{fluid.tests.getSize}.options.container", "{fluid.tests.getSize}.options.fontSizeMap", "{fluid.tests.getSize}.options.expectedTestSize", "{fluid.tests.getSize}.options.expectedSizeAtUndetected"]
            }]
        }]
    });

    /*******************************************************************************
     * Unit tests for fluid.uiOptions.actionAnts.textSizerEnactor
     *******************************************************************************/

    fluid.defaults("fluid.tests.textSizerEnactor", {
        gradeNames: ["fluid.test.testEnvironment", "autoInit"],
        container: ".flc-textSizerEnactor",
        components: {
            textSizer: {
                type: "fluid.uiOptions.actionAnts.textSizerEnactor",
                options: {
                    container: ".flc-textSizerEnactor",
                    fontSizeMap: fontSizeMap
                }
            },
            textSizerEnactorTester: {
                type: "fluid.tests.textSizerEnactorTester"
            }
        }
    });

    fluid.tests.testTextSizer = function (that, container) {
        var container = $(container);
        
        var px2emFactor = fluid.uiOptions.actionAnts.getPx2EmFactor(container, that.options.fontSizeMap);
        var expectedInitialSize = Math.round(8 / px2emFactor * 10000) / 10000;
        
        jqUnit.assertEquals("Check that the size is pulled from the container correctly", expectedInitialSize, that.initialSize);
        that.applier.requestChange("textSizeInTimes", 2);
        jqUnit.assertEquals("The size should be doubled", "16px", container.css("fontSize"));
    }; 

    fluid.defaults("fluid.tests.textSizerEnactorTester", {
        gradeNames: ["fluid.test.testCaseHolder", "autoInit"],
        modules: [{
            name: "Test text sizer enactor",
            tests: [{
                expect: 2,
                name: "Apply text size in times",
                type: "test",
                func: "fluid.tests.testTextSizer",
                args: ["{textSizer}", "{fluid.tests.textSizerEnactor}.options.container"]
            }]
        }]
    });

    /*******************************************************************************
     * Unit tests for getLineHeight & numerizeLineHeight
     *******************************************************************************/

    fluid.defaults("fluid.tests.getLineHeight", {
        gradeNames: ["fluid.test.testEnvironment", "autoInit"],
        container: ".flc-lineSpacerEnactor",
        fontSizeMap: fontSizeMap,
        expectedTestSize: 8,
        expectedSizeAtUndetected: 1,
        components: {
            getLineHeightTester: {
                type: "fluid.tests.getLineHeightTester"
            }
        }
    });

    fluid.tests.testGetLineHeight = function () {
        // Mimic IE with its DOM lineHeight structure
        var container = [{currentStyle: {lineHeight: "10"}}];
        var lineHeight = fluid.uiOptions.actionAnts.lineSpacerEnactor.getLineHeight(container);
        jqUnit.assertEquals("getLineHeight with IE simulation", "10", lineHeight);

        var container = [{currentStyle: {lineHeight: "14pt"}}];
        var lineHeight = fluid.uiOptions.actionAnts.lineSpacerEnactor.getLineHeight(container);
        jqUnit.assertEquals("getLineHeight with IE simulation", "14pt", lineHeight);

        container = $(".flc-lineSpacerEnactor");
        lineHeight = fluid.uiOptions.actionAnts.lineSpacerEnactor.getLineHeight(container);
        jqUnit.assertEquals("getLineHeight without IE simulation", "12px", lineHeight);
    }; 

    var testNumerizeLineHeight = function (lineHeight, expected) {
        var container = $(".flc-lineSpacerEnactor");
        var fontSize = fluid.uiOptions.actionAnts.getTextSizeInPx(container, fontSizeMap);
        
        var numerizedLineHeight = fluid.uiOptions.actionAnts.lineSpacerEnactor.numerizeLineHeight(lineHeight, Math.round(fontSize));

        jqUnit.assertEquals("line-height value '" + lineHeight + "' has been converted correctly", expected, numerizedLineHeight);
    };
    
    fluid.tests.testNumerizeLineHeight = function () {
        var undefinedLineHeight;
        testNumerizeLineHeight(undefinedLineHeight, 0);
        testNumerizeLineHeight("normal", 1.2);
        testNumerizeLineHeight("6px", 1);
        testNumerizeLineHeight("1.5", 1.5);
    };
    
    fluid.defaults("fluid.tests.getLineHeightTester", {
        gradeNames: ["fluid.test.testCaseHolder", "autoInit"],
        modules: [{
            name: "Test getLineHeight",
            tests: [{
                expect: 3,
                name: "Get line height",
                type: "test",
                func: "fluid.tests.testGetLineHeight"
            }]
        }, {
            name: "Test getLineHeight",
            tests: [{
                expect: 4,
                name: "Get numerized line height",
                type: "test",
                func: "fluid.tests.testNumerizeLineHeight"
            }]
        }]
    });

    /*******************************************************************************
     * Unit tests for fluid.uiOptions.actionAnts.lineSpacerEnactor
     *******************************************************************************/

    fluid.defaults("fluid.tests.lineSpacerEnactor", {
        gradeNames: ["fluid.test.testEnvironment", "autoInit"],
        container: ".flc-lineSpacerEnactor",
        components: {
            lineSpacer: {
                type: "fluid.uiOptions.actionAnts.lineSpacerEnactor",
                options: {
                    container: ".flc-lineSpacerEnactor",
                    fontSizeMap: fontSizeMap
                }
            },
            lineSpacerEnactorTester: {
                type: "fluid.tests.lineSpacerEnactorTester"
            }
        }
    });

    // This is necessary to work around IE differences in handling line-height unitless factors
    var convertLineHeightFactor = function (lineHeight, fontSize) {
        // Continuing the work-around of jQuery + IE bug - http://bugs.jquery.com/ticket/2671
        if (lineHeight.match(/[0-9]$/)) {
            return Math.round(lineHeight * parseFloat(fontSize)) + "px";
        } else {
            return lineHeight;
        }
    };

    fluid.tests.testLineSpacerEnactor = function (that, container) {
        var container = $(container);
        
        jqUnit.assertEquals("Check that the size is pulled from the container correctly", 2, Math.round(that.initialSize));
        jqUnit.assertEquals("Check the line spacing size in pixels", "12px", convertLineHeightFactor(container.css("lineHeight"), container.css("fontSize")));
        that.applier.requestChange("lineSpaceInTimes", 2);
        jqUnit.assertEquals("The size should be doubled", "24px", convertLineHeightFactor(container.css("lineHeight"), container.css("fontSize")));
    }; 

    fluid.defaults("fluid.tests.lineSpacerEnactorTester", {
        gradeNames: ["fluid.test.testCaseHolder", "autoInit"],
        modules: [{
            name: "Test line spacer enactor",
            tests: [{
                expect: 3,
                name: "Apply line spacing in times",
                type: "test",
                func: "fluid.tests.testLineSpacerEnactor",
                args: ["{lineSpacer}", "{fluid.tests.lineSpacerEnactor}.options.container"]
            }]
        }]
    });

    $(document).ready(function () {
        fluid.test.runTests([
            "fluid.tests.styleElementsEnactor",
            "fluid.tests.emphasizeLinksEnactor",
            "fluid.tests.inputsLargerEnactor",
            "fluid.tests.classSwapperEnactor",
            "fluid.tests.getSize",
            "fluid.tests.textSizerEnactor",
            "fluid.tests.getLineHeight",
            "fluid.tests.lineSpacerEnactor"
        ]);
    });

})(jQuery);
