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


what if i want to navigate to another page?
https://stackoverflow.com/questions/37295377/how-to-navigate-from-one-page-to-another-in-react-js
```
There are two approaches here, both fairly easy.

Approach 1: Using React Router

Make sure you have the route set up somewhere in your project already. It should contain this information at the very least: path and component. It should be defined something like this:

import YourComponent from "./path/of/your/component"; 

<Route path="/insert/your/path/here" component={YourComponent} /> 
Next, you want to update your handleClick function to use a Link from react-router-dom (may have to install this package if you don't already have it using npm i react-router-dom).

Delete this (your handleClick function you don't need it with Link):

handleClick(){
  alert('---');
}
    render() {
        return <button onClick={this.handleClick}>hello</button>
    }

}
Now change your render method to this:

    render() {
        return (
          <div>
            <Link to="/insert/your/path/here" className="btn btn-primary">hello</Link>
         </div>
       ); 
    }

}
Give Link the same classNames that you would your button so it's styled as a button and not an anchor tag.

Putting it all together.

//Wherever your router is with your routes

    import YourComponent from "./path/of/your/component";

    <Router>
      <Route exact path="/insert/your/path/here" component={YourComponent} />
    </Router>
//The component that has the handleClick function

import { Link } from "react-router-dom"; 

class App extends Component {
  render() {
     return(
       <div>
         <Link to="/insert/your/path/here" className="btn btn-primary">hello</Link>
      </div>
     );
  }
}
Approach 2: Using window.open

Still make sure you have the route set up like above. The difference here is that you will not be using Link which means you will need your handleClick function. That will be the only thing that changes.

Change this:

handleClick(){
  alert('---');
}
to this:

handleClick(){
  window.open("/insert/your/path/here");
  //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here". 
}
That's it. If you want to make your paths dynamic, meaning they include variables like id's or names etc. See below.

Dynamic Paths

Dynamic paths can include names and id's or whatever variable you would like. You first have to adjust your route and then change your Link or locations accordingly.

Change the Route to this:

<Route path="/insert/your/path/here/:name" component={YourComponent} />
Notice the colon (:), this allows you to inject a string here via variable.

Update your Link to this:

<Link to={`/insert/your/path/here/${variableName}`}>hello</Link>
And if you are using window.open update it like so:

window.open(`/insert/your/path/here/${variableName}`); 
A few things to point out here. You are using brackets after the equal sign because that tells React, hey I need to input a variable here. Next notice the back ticks ` this tells React that you are using a string literal which means hey I want you to interpret this as a string but first get the value of my variable in here and turn into a string for me. And the ${} allows you to place a variable so React can properly interpret it. So all together, react reads that line as: take the user to path "/insert/your/path/here/valueOfVariablName" then React checks the routes for that path and says hey we have something that is "/insert/your/path/here/:name" so :name must equal valueOfVariableName. Hope that makes a little sense. You can verify dynamic path's in your console. Log your props. You should see an object that contains location, history, etc.

You can also read more about React-Router here. Raw link: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

If anyone has a better resource. Please feel free to edit my answer or leave a comment with it.

I hope this helps anyone who comes across this question. Btw you can pass state through the Link as well. Please post another question if you would like to know how to do that.


```