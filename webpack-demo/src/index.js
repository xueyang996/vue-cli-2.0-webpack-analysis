import _ from "lodash";
// import printMe from './print'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

function component() {
  var element = document.createElement("div");

    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    btn.classList='hello'
    btn.innerHTML = 'Click me and check the console!';
    // btn.onclick = printMe;

    // Note that because a network request is involved, some indication
    // of loading would need to be shown in a production-level site/app.
    // btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    //   var print = module.default;

    //   print();
    // });

    element.appendChild(btn);
  return element;
}
let element = component();
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    document.body.removeChild(element);
      element = component(); // Re-render the "component" to update the click handler
      document.body.appendChild(element);
  })
}
