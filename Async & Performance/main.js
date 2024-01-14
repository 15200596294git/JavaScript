postMessage('a really cool reply')

addEventListener('message', (evt)=> {
  console.log(evt.data);
})