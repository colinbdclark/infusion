/*
Copyright 2014 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/*jshint node:true*/
/*global JSON*/

"use strict";

var fluid = require("../../src/module/fluid.js");

fluid.loadTestingSupport();

var QUnit = fluid.registerNamespace("QUnit");

// TODO: Cut and pasted from basic-node-tests.js
// This should be replaced with the node-jqUnit driver instead.
QUnit.testDone(function (data) {
    fluid.log("Test concluded - " + data.name + ": " + data.passed + " passed");
});

QUnit.log(function (details) {
    if (details.source) { // "white-box" inspection of qunit.js shows that it sets this field on error
        fluid.log("Message: " + details.message + "\nSource: " + details.source);
        if (details.expected !== undefined) {
            console.log("Expected: ", JSON.stringify(details.expected, null, 4));
            console.log("Actual: ", JSON.stringify(details.actual, null, 4));
        }
    }
});

    QUnit.done(function (data) {
        fluid.log("Infusion framework tests " +
            (data.failed === 0 ? "OK" : "FAILED") +
            " - " + data.passed + "/" + (data.total) + " tests passed.");
    });


fluid.setLogging(true);

var testIncludes = [
    "../../tests/framework-tests/core/js/FluidJSTests.js",
    "../../tests/framework-tests/core/js/FluidDebuggingTests.js",
    "../../tests/framework-tests/core/js/FluidPromisesTests.js",
    "../../tests/framework-tests/core/js/ModelTransformationTests.js",
    "../../tests/framework-tests/core/js/ModelTransformationTests.js",
    "../../tests/framework-tests/core/js/DataBindingTests.js",
    "../../tests/framework-tests/core/js/FluidIoCTests.js"
];

testIncludes.forEach(function (path) {
    fluid.loadInContext(path);
});

QUnit.load();
