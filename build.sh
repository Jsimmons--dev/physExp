#!/bin/bash
browserify public/js/controller.js -o public/js/built-controller.js -t babelify --presets es2015
