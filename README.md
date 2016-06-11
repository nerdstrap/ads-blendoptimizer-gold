## Pattern Lab Starter
- [Pattern Lab Website](http://patternlab.io/)
- [About Pattern Lab](http://patternlab.io/about.html)
- [Documentation](http://patternlab.io/docs/index.html)
- [Demo](http://demo.patternlab.io/)

## Getting Started

### Requirements
* [Node](https://nodejs.org/download/): `>=0.10.0`
* [npm](https://docs.npmjs.com/getting-started/installing-node): `>=2.0.0`
* [Sass](http://sass-lang.com/install): `>= 3.4.13`
* [Pattern Lab Requirements](http://patternlab.io/docs/requirements.html)

## Run Modes

### Development
Sass maps, no minification, and live server.
From the project root, run the following command line:

```
  npm run dev
```

### Production Build

Minifies CSS and images. 
From the project root, run the following command line:

```
  npm run production
```

### FTP Deploy 
Push "public" directory to an FTP server.
Update gulpfile.js to include your FTP information in "deploy" task. 
From the project root, run the following command line:

```
  npm run deploy
```


## Working with Dynamic Data in Patterns

### Colors

Colors are generated by the data in the `colors.json` file, located in `source/_data/`.

```
{
  "colors": [
    {
      "name": "base-color",
      "value": "#000"
    }, {
      "name": "color-primary",
      "value": "green",
      "extended": ["button-bg", "watching-test"]
    }, {
      "name": "color-secondary",
      "value": "blue",
      "extended": ["foo", "bar"]
    }
  ]
}
```
Required starting objects: `base-color`, `color-primary` and `color-secondary`.

The `name` object outputs the Sass variable name, stored in `source/sass/_00-settings_colors.scss`. The `value` object outputs the Sass variables color property. The `extended` object is an extension of the parent variable for actionable items using the same color value.

### IcoMoon Icons

Icons can be updated by importing the `selection.json` file located in `source/fonts/icomoon` to the [IcoMoon App](https://icomoon.io/app/#/select). Select additonal icons then generate the font. Download and unzip the `icomoon.zip` file. Once complete, overwrite the `icomoon` folder located in `source/font` with the newly downloaded icomoon folder.