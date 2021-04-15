# Fudge Advanced Dropdown with Tag Support

###
Other Dropdown plugins did not have the functionality/filesize/requirements that I wanted/needed...so I built Fudge.

## Demo
View demo and different usage examples: https://www.fudge.webengineer.co.za

## Features
- Lightweight
  - Minified & Gzipped ~ 5Kb  
- Dependency free
  - No jQuery or other libraries required
- Can be used as ES6 module or native JavaScript plugin or Vue component
  - From the same code base
- Filter dropdown options
  - Highlights matching filtered texts
- Add new options to the dropdown options
- Tags mode
- Sync events with the source/target element
- Easily customize styles
  - Use classes and inline styles on the source/target element
    - Easily inherit styles from Tailwind or Bootstrap etc
  - Style with SASS/CSS or CSS variables  
  - Create custom themes easily
  - Custom icons
- Aria accessible
  - Use with a keyboard / mouse / touch 



## Installation
- *This is not yet on packagist and so cannot be installed with npm/yarn yet*
- Clone or download the repository
- Run
  
        npm install
        npm run build
    
- See [Demo](https://fudge.webengineer.co.za) for more detailed usage examples
- Import as an ES6 module
  
        import Fudge from "src/fudge.js"
        new Fudge(document.querySelector("#target"), {})
  
- Native JavaScript

        <link rel="stylesheet" href="dist/fudge.min.css">
        <script type="text/javascript" src="dist/fudge.min.js"></script>
        <script type="text/javascript">
            new window.Fudge.default(document.querySelector("#target"), {})
        </script>

- Vue Component
    - *Requires some additional work to make development easier, without running in a full Vue app*
      - See comments in /src/Fudge.vue & /demo/vue.html for more details
    - You can use the same data attributes to apply options


    import Fudge from './Fudge.vue'

    <fudge fudge-class="form-control" options="::Please Select,1::One,Two,Three" data-add="true" v-model="fudgeValue"></fudge>

- *Adjust paths to correspond to your requirements, if needed*

## Usage
- To instantiate the plugin, it requires the target element and the options.  
- The plugin options can be passed in as an Object in the second parameter (camelCase) or via data attributes (data-snake_case) on the target element.   
- You can use the data attributes in a few ways 
    - data-mode="select"
    - data-fudge-mode="select"
    - data-fudgeignore-mode="" (if you need to ignore a conflicting data attribute: data-mode will be ignored by Fudge)

## Options
See [Demo](https://fudge.webengineer.co.za) for examples

Option | Default | Type | Explanation 
------ | ------- | ----- | --- |
options | [] | array or string | Allows you to specify the options in different ways, if they are not obtained from the target select options.<br />Examples:<br />[{value:"1",text:"One"},{value:"2"},{value:"Three"}]<br />["1", "2", "Three"]<br />"1::One,2,Three"<br />These are equivalent to:<br />&lt;select&gt;<br />&lt;option value="1"&gt;One&lt;/option&gt;<br />&lt;option value="2"&gt;2&lt;/option&gt;<br />&lt;option value="Three"&gt;Three&lt;/option&gt;<br />&lt;/select&gt;
mode | select | "tags" or "select" | Specify if the plugin is in select mode (Enhanced select element)<br />or tag mode where you can select multiple tags
add | false | boolean | Allow new options to be added
tagLimit | -1 | integer | You can specify the number of selectable tags.<br />-1 means there is no limit
closeOnTagLimit | true | boolean | If true, the dropdown will close when the tagLimit has been reached
glue | "," | string | "One,Two,Three"
glueOption | "::" | string | "1::One,2::Two,3::Three"
glueEnd | true | boolean | Append the glue to the end of the tag list output <br /> Useful to explicitly denote the end of a tag with similar substrings <br /> Example output: One,Two One,
msgNoResults | "No Matching Results" | string | The message to display when there are no matching options
theme | "" | string | Apply a theme to the plugin.<br />Basically equivalent to adding additional classes to the target class
zindex | null | integer | If you need to specify a z-index for the dropdown 
maxDropdownHeight | "" | string | You can override the maximum dropdown height.<br />Set as 200px as default in CSS
showTarget | false | boolean | For debugging, you can show the target element if needed
placeholder | "" | string | The text to use as the placeholder text.<br />You can also set the placeholder attribute on the target element
|&nbsp;||
**Custom Icons** | *From Font Awesome* | | Specify a SVG in a string to set a custom icons 
iconDropdown | FA angle-down | svg string | The icon on the right to denote there is a dropdown list
iconSearch | FA search | svg string | The icon on the left of the input field to denote options can be filtered
iconAdd | FA plus | svg string | The icon on the left of the input field to denote that a new option can be added
iconRemove | FA times | svg string | The icon on the right of a tag to denote that the tag can be removed


## Development
    npm run start
- Starts Webpack with Hot Module Replacement to allow for quicker development
- /src/dev/dev.html & /src/dev/dev.js are used to work in development mode
  - You can copy from the demos into /src/dev/dev.html or create setup the features you want work on in the dev files  

## Production 
    npm run prod
- Runs the following commands: 
  - Runs Prettier & Linter (to format/verify/ensure code style)
  - Runs Tests (checks that functionality is working correctly)
  - Runs the default build (build the dist code)

## Styles
- Styles are built with Sass
- Sass variables or CSS variables can be used to set the different colours
- *See the comments in the .scss files for more details*
- /src/styles/fudge.scss contains the main styles
- Themes
    - /src/styles/fudge-dark.scss<br />Dark theme implemented with CSS variables
    - /src/styles/fudge-dark2.scss<br />Dark theme implemented with Sass variables<br />(can be used to apply to a single dropdown only, instead of all)
    - /src/styles/fudge-firefox.scss<br />Adds a gray background color to the dropdown icon to resemble FireFox's native select element
    - /src/styles/fudge-templatetheme.scss<br />Starting template to create a custom theme from



## Prettier and Linting
    # For files just in src directory:
    npm run pretty:lint

    # For all files except for /dist & /demo
    npm run pretty:lint:all 
- Runs Prettier and then ESLint
    - For me Prettier is too opinionated and makes certain things more difficult to read
    - So I run ESLint after prettier to undo some of Prettier's changes
    - My desired output is not achievable running Prettier as an ESLint plugin 
- Config files:
    - /prettier.config.js
    - /.eslintrc.js (quite a few custom rules specified)

## Demos
- Demos can be found in the /demo directory demonstrating with different use cases and options
- They link to assets in the /dist and /src directory so you can test the latest builds
- To run online you can copy and link the required assets into the /demo directory
    
        # To copy and link assets in the demo directory ("../dist/fudge.js" -> "./dist/fudge.js")
        node demo-online.js
  
        # To restore links to the dist and src directory  ("./dist/fudge.js" -> "../dist/fudge.js") 
        node demo-local.js

## Testing
    npm run test
- Tests can be found in the /tests directory
- Tests use the Jest Testing Framework
- Config file: jest.config.json



## Webpack
- There are multiple jobs in the webpack build
  - common (common values merged with the custom jobs below), 
  - serve, bundle, minifiedJs, unminifiedCss, minifiedCssAndUnminifiedJs, styles
    

- Start HMR development build (serve)


    npm run start  

- Build native minified and unminified assets with source maps (minifiedJs, unminifiedCss, minifiedCssAndUnminifiedJs)


    npm run build


- Build bundle (bundle)


    npm run bundle

    # Or development mode bundle
    npm run bundle:dev

- Just build the styles (styles)


    npm run styles

