# Rebuilding the planning view frontend using Web Component

A POC for the planning view with infinite scroll support.

## Instructions

To run this POC, follow these steps:

- Run the mock server that generates random events:

```
cd event-generator
npm install
npm run dev
```

- Build the Web Component:

```
// in the root directory
npm install
npm run build
```

The build results will be in the `public/lib` folder.

- Use the Web Component inside OpenPaaS (specifically in this case, `linagora.esn.calendar`):
  - Copy the built file `s-infinite-events.js` in `public/lib` folder to `frontend/components/infinite-events` in `linagora.esn.calendar`. Ideally, we should do this using `bower install` when the web component package is published. For now, we'll do it manually since it's just a POC.
  - Inject it via Awesome Module:

  ```js
    webserverWrapper.injectJS('calendar', JSFilesToInject, 'esn');
    // JSFilesToInject = [..., '../components/infinite-events/s-infinite-events.js', ...]
  ```

  - Use the web component in the template just like an HTML Element:

  ```html
    s-infinite-events
      p(slot="loading") Loading...
  ```

  - Since we are using AngularJS 1.3.20 which doesn't support `ng-prop-*` and `ng-on-*` for Web Components, we'll have to get the ref to the web component and then manually set its properties and add the event listener accordingly. You can see all of that stuff in the pull request [linagora.esn.calendar!560](https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.calendar/merge_requests/560).

## Motivation

- You can refer to the original user stories [here](https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.calendar/issues/1667). TL;DR: I'm rebuilding the frontend part of the planning view to support infinite scroll using Web Components since we don't really want to use AngularJS to build a new feature. The purpose of using Web Components here is that they will act as an interop layer that help glues UI frameworks/libraries together.

## Benefits

### Benefits of using Web Components in general

- **Interoperability**: Allowing us to use a UI library inside another. Of course, we'll have to include both libraries. For example, if we build Web Components using VueJS and use them inside our AngularJS app, we'll have to include both VueJS and AngularJS.
- **Reusability**: The web components we have built can be used anywhere. It is, after all, just an extended HTML Element.

### Benefits of building Web Components with VueJS

- Web Components built with VueJS can't really out-benefit those built with SolidJS. There's one benefit I can think of is that the developers wouldn't have to learn a new way of writing code in an another library.

## Caveats

- **Critical `vue-web-component-wrapper`'s bug**: Setting props before mounting the web component causes them to be overwritten by default values (https://github.com/vuejs/vue-web-component-wrapper/issues/34). That means we have to can't really use Web Components built with `vue-web-component-wrapper` since we would have to use `setTimeout` everywhere as a workaround to fix this issue.
- **Bundle size**: The VueJS core library _and_ `vue-web-component-wrapper` weigh about 69.2kB minified, and 25.2kB minified & gzipped. The component itself weighs about 11.9kB minified and 3.4kb minified & gzipped.
- **Styling**: There are some problems regarding using Web Components in a (UI) Design System. For example, how do you build a WC using SolidJS and you need to use a Material Button inside it? This can't be solved unless you also use Web Components to build the Material UI elements.
- AngularJS 1.3.20 doesn't support `ng-prop-*` and `ng-on-*` which are great syntactic sugar for Web Components.


## Notes

- Please share your thoughts and when agreed upon, I'll update them here so that everyone can see.

