Model <-> ViewController application structure with broadcasting Events

You should include files on the client side like this:
 - class.extend.js
 - deferred.js
 - jquery-2.0.2.js
 - app.namespace.js
 - app.event.js
 - app.model.js
 - app.widget.js

Then you you can follow the flow below.

Example
```javascript

App.Model.MyAppModel = App.Model.extend({
    // will make it static for the example
    data: {
        dvd: 'The Rock'
        duration: '1hr 30 min'
    }
})

App.Widget.MyApp = App.widget.extend({

    el: jQuery('.my-app'),

    model: new App.Widget.MyAppModel(),

    template: {
        name: myApp.jade, // jade file template name
        toHtml: 'jade.compile' // function to compile jade template to html
    }
});

new App.Widget.MyApp() // template will be rendered and resulting html will be injected into `el` element

```javascript