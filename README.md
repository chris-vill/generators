### Setup
- run `yarn link-all` to link all generators to Yeoman

### Using a generator
- run `yo <generator name>` to create a project
- list of available generators:
```
- React
```

### ToDo
- Extract Sass & FontAwesome to separate generators
- Fix this error:
```
warning Error running install script for optional dependency: "/Users/ChrisVill/Projects/Practice/WebDev/Generators/yo-react/node_modules/fsevents: Command failed.
Exit code: 1
Command: node install.js
Arguments:
Directory: /Users/ChrisVill/Projects/Practice/WebDev/Generators/yo-react/node_modules/fsevents
Output:
events.js:291
      throw er; // Unhandled 'error' event
      ^

Error: spawn node-gyp ENOENT
    at Process.ChildProcess._handle.onexit (internal/child_process.js:268:19)
    at onErrorNT (internal/child_process.js:468:16)
    at processTicksAndRejections (internal/process/task_queues.js:80:21)
Emitted 'error' event on ChildProcess instance at:
    at Process.ChildProcess._handle.onexit (internal/child_process.js:274:12)
    at onErrorNT (internal/child_process.js:468:16)
    at processTicksAndRejections (internal/process/task_queues.js:80:21) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'spawn node-gyp',
  path: 'node-gyp',
  spawnargs: [ 'rebuild' ]
}"
```

### Sources
- https://yeoman.github.io/generator/Generator.html
- https://topic.alibabacloud.com/a/writing-a-custom-yeoman-generator_8_8_31585237.html
