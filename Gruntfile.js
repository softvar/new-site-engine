module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		// Read package.json
		pkg: grunt.file.readJSON('package.json'),

		//cleaning stuff
		clean: {
			dist: ['dist'],
			deploy: ['deploy/media/css', 'deploy/media/js']
		},

		// Concatenating css files under one
		concat: {
			options: {
				banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
						'<%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
						'<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
						' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
						' LICENSE <%= pkg.license + "\\n" %>' +
						' */\n\n'
			},
			js: {
				src: [
					'content/media/js/libs/jquery.min.js',
					'content/media/js/libs/jquery.scrollUp.min.js',
					'content/media/js/libs/jquery.sidr.min.js',
					'content/media/js/libs/modernizr-1.7.min.js',
					'content/media/js/libs/materialize.min.js',
					'content/media/js/libs/custom-materialize.min.js'
				],
				dest: 'dist/js/<%= pkg.name %>.js'
			},
			'blog-js': {
				src: [
					'content/media/js/libs/firebase.js',
					'content/media/js/libs/kudos.min.js',
					'content/media/js/libs/kudos.firebase.min.js',
					'content/media/js/libs/moment.min.js',
					'content/media/js/libs/countable.js',
				],
				dest: 'dist/js/<%= pkg.name %>.blog.js'
			},
			css: {
				src: [
					'content/media/css/materialize.css',
					'content/media/css/jquery.sidr.dark.css',
					'content/media/css/site.css',
					'content/media/css/custom.css',
					'content/media/css/main.css',
					'content/media/css/kudos.min.css',
					'content/media/css/project.css'
				],
				dest: 'dist/css/<%= pkg.name %>.css'
			}
		},

		uglify: {
			js: {
				src: ['dist/js/<%= pkg.name %>.js'],
				dest: 'dist/js/<%= pkg.name %>.min.js'
			},
			'blog-js': {
				src: ['dist/js/<%= pkg.name %>.blog.js'],
				dest: 'dist/js/<%= pkg.name %>.blog.min.js'
			}
		},
		// Minify css file for production-ready
		cssmin: {
			css: {
				src: ['dist/css/<%= pkg.name %>.css'],
				dest: 'dist/css/<%= pkg.name %>.min.css'
			}
		},
		//copy to deploy
		copy: {
			main: {
				files: [
					// includes files within path and its sub-directories
					{expand: true, cwd: 'dist', src: ['**/*'], dest: 'deploy/media'}
				]
			}
		}

	});

	// Dev Depencencies
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default Task!
	grunt.registerTask('default', ['clean:dist', 'concat', 'uglify', 'cssmin', 'clean:deploy', 'copy', 'clean:dist']);
};
