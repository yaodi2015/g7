const gulp = require('gulp');
const rsync = require('gulp-rsync');
const prompt = require('gulp-prompt');
 
const def_options = {
	emptyDirectories : true,
	progress: true,
	relative : true,
	recursive: true
}
const src = ['dist/**/*'];


function deploy() {
  var p = gulp.src(src);
  // p = p.pipe(prompt.confirm("确认要将上传到《》环境么"));
  p = p.pipe(rsync({
      hostname: '123.206.20.110',
      root: 'dist',
      destination: '/home/G7/',
      username : "root",
      exclude : ['.DS_Store','.svn' , ".git"]
    }));
  return p;
}





gulp.task('deploy', deploy);
