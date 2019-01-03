const grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.gruntPostcss = {

    defaults: (test) => {
        const actual = {
            css: grunt.file.read('tmp/defaults.css'),
        };

        const expected = {
            css: grunt.file.read('test/expected/defaults.css'),
        };

        test.strictEqual(actual.css, expected.css);
        test.ok(!grunt.file.exists('tmp/defaults.css.map'));
        test.done();
    },

    defaultsFn: (test) => {
        const actual = {
            css: grunt.file.read('tmp/defaultsFn.css'),
        };

        const expected = {
            css: grunt.file.read('test/expected/defaults.css'),
        };

        test.strictEqual(actual.css, expected.css);
        test.ok(!grunt.file.exists('tmp/defaultsFn.css.map'));
        test.done();
    },

    mapInline: (test) => {
        const actual = {
            css: grunt.file.read('tmp/mapInline.css'),
        };

        const expected = {
            css: grunt.file.read('test/expected/mapInline.css'),
        };

        test.strictEqual(actual.css, expected.css);
        test.ok(!grunt.file.exists('tmp/mapInline.css.map'));
        test.done();
    },

    mapSeparate: (test) => {
        const actual = {
            css: grunt.file.read('tmp/mapSeparate.css'),
            map: grunt.file.read('tmp/mapSeparate.css.map'),
        };

        const expected = {
            css: grunt.file.read('test/expected/mapSeparate.css'),
            map: grunt.file.read('test/expected/mapSeparate.css.map'),
        };

        test.strictEqual(actual.css, expected.css);
        test.strictEqual(actual.map, expected.map);
        test.done();
    },

    mapAnnotationPath: (test) => {
        const actual = {
            css: grunt.file.read('tmp/mapAnnotationPath.css'),
            map: grunt.file.read('tmp/maps/mapAnnotationPath.css.map'),
        };

        const expected = {
            css: grunt.file.read('test/expected/mapAnnotationPath.css'),
            map: grunt.file.read('test/expected/maps/mapAnnotationPath.css.map'),
        };

        test.strictEqual(actual.css, expected.css);
        test.strictEqual(actual.map, expected.map);
        test.ok(!grunt.file.exists('tmp/mapAnnotationPath.css.map'));
        test.done();
    },

    diff: (test) => {
        const actual = {
            css: grunt.file.read('tmp/diff.css'),
            map: grunt.file.read('tmp/diff.css.diff'),
        };

        const expected = {
            css: grunt.file.read('test/expected/diff.css'),
            map: grunt.file.read('test/expected/diff.css.diff'),
        };

        test.strictEqual(actual.css, expected.css);
        test.strictEqual(actual.map, expected.map);
        test.done();
    },

    syntax: (test) => {
        const actual = {
            scss: grunt.file.read('tmp/syntax.scss'),
        };

        const expected = {
            scss: grunt.file.read('test/expected/syntax.scss'),
        };

        test.strictEqual(actual.scss, expected.scss);
        test.done();
    },

    writeDest: (test) => {
        test.ok(grunt.file.exists('tmp/doWriteDest.scss'));
        test.ok(!grunt.file.exists('tmp/noWriteDest.scss'));
        test.done();
    },

    sequential: (test) => {
        test.ok(grunt.file.exists('tmp/sequential.css'));
        const actual = grunt.file.read('tmp/sequential.css');
        const expected = grunt.file.read('test/fixtures/a.css');
        test.strictEqual(actual, expected);
        test.done();
    },
};
