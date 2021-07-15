# Skelly
### A project scaffolding CLI based on JSON templates and CLI commands.

Skelly is a scaffolding CLI that creates templates based on file structures created within JSON (see example below).

```
{
  "fileTree": [
    {
      "type": "file",
      "name": "index.html",
      "templatePath": "templates/basic/index.html",
      "path": "./"
    },
    {
      "type": "folder",
      "name": "css",
      "path": "./",
      "children": [
        {
          "type": "file",
          "name": "main.css",
          "path": "./css/"
        }
      ]
    }
  ]
}
```
These JSON templates can link out to predefined file templates. If you want to create a basic, static website, you can create the file structure as well as have a predfined HTML file to load into the newly created index.html. After a template is created, you can create a custom command via the CLI to execute that template in your current working directory.

## Installation

Skelly installation is simple.

`npm i skelly-cli -g`

Global is optional, but is necessary if you want to have access throughout your system.

## Usage

By default skelly only has a few static commands. The rest are created by you!

**Similar to other file creation CLIs, you will want to be in the folder where you want the folders and files to be created.**

### Commands

`skelly -h --help` will get you started.

`skelly -b --basic` creates a basic static file structure.

`skelly -t --test` will output a dummy file structure and is mainly used for debugging or testing purposes.

`skelly -cc --command <action>` `create` `delete` Will provide instructions on creating a command to execute your custom template.

**The delete argument is not implemented at this time, if you want to delete a command you can remove it out of the /configs/commands.json file**

`skelly -td --tempdir` You can change your configs and template directory to somewhere outside of the node environment. This will update all the relative links to be absolute to where you ran this command.

### Creating a template

Creating a template is simple and can be shared across multiple systems that use skelly as long as it's installed in the working skelly config folder of that particular uers's system.

The structure is a JSON object followed by an array of individual objects. Those individual objects can be files or folders (some with children). You nest as deeply as you want.

The following are the available key/value pairs:

`type` file or folder
`name` name of the file **including* the extension (.html, .js, .mjs, .css, etc.)
`templatePath` linked to the template folder. It will always start templates. Example: templates/basic/index.html
`path` the relative directory you want this file to be in.

Here is a snippet: 

**The array must be named `fileTree`

```
{
  "fileTree": [
    {
      "type": "file",
      "name": "index.html",
      "templatePath": "templates/basic/index.html",
      "path": "./"
    },
    {
      "type": "folder",
      "name": "css",
      "path": "./",
      "children": [
        {
          "type": "file",
          "name": "main.css",
          "path": "./css/"
        }
      ]
    }
  ]
}
```

[View the full template](https://github.com/keegankb93/skelly-cli/blob/master/configs/template-configs/basic.json)

