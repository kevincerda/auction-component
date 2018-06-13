module.export = (grunt) => {

  grunt.loadNpmTasks("grunt-aws");

  grunt.initConfig({
    aws: grunt.file.readJSON("aws-credentials.json"),
    s3: {
      options: {
        accessKeyId: "<%= aws.accessKeyId %>",
        secretAccessKey: "<%= aws.secretAccessKey %>",
        bucket: "auction-component"
      },
      build: {
        cwd: "build/",
        src: "**"
      }
    }
  });
  
  grunt.registerTask("default", ["s3"]);
};
