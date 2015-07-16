Semantic TA
===========

Semantic UI theme for public facing TechnolgoyAdvice websites.

See [learn semantic](http://learnsemantic.com/) for understanding this project.

**[Demo](http://technologyadvice.github.io/semantic-ta/)**

## Development

`npm start` - Installs dependencies and runs gulp.

`gulp` - Sets up everything needed for development, see the task for details.  
`gulp help` - List gulp commands and help.

## Updating Semantic
This project uses a custom build.  **Do not** use Semantic's build or update.
You will hose this project.

Semantic's file structure and paradigms were preserved.  Updating means you
update the default theme and the definitions.

1. Get the latest Semantic files
1. Overwrite `src/themes/default/*` with the latest
1. Overwrite `src/definitions/*` with the latest
1. Overwrite `src/{semantic.less, theme.less, theme.config}` with the latest
1. Run a build.

Done.
