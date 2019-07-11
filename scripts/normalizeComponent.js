function createInjectorShadow(shadow) {
  return (inject, { source, map, media }) => {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(source));
    shadow.appendChild(style);
  };
}

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate) {
  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId

  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (style) {
    hook = function() {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

export default normalizeComponent;
