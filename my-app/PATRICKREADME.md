https://stackoverflow.com/questions/31852933/why-es6-react-component-works-only-with-export-default

exporting default or non default and why ^



```
Exporting without default means it's a "named export". You can have multiple named exports in a single file. So if you do this,

class Template {}
class AnotherTemplate {}

export { Template, AnotherTemplate }
then you have to import these exports using their exact names. So to use these components in another file you'd have to do,

import {Template, AnotherTemplate} from './components/templates'
Alternatively if you export as the default export like this,

export default class Template {}
Then in another file you import the default export without using the {}, like this,

import Template from './components/templates'
There can only be one default export per file. In React it's a convention to export one component from a file, and to export it is as the default export.

You're free to rename the default export as you import it,

import TheTemplate from './components/templates'
And you can import default and named exports at the same time,

import Template,{AnotherTemplate} from './components/templates'

```