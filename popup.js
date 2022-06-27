async function chromeHSTSOpener() {
  document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('test').addEventListener('click', () => {
          chrome.tabs.update({ url: 
            'chrome://net-internals/#hsts' 
          });
      });
      
      // await new Promise((resolve) => {
      //   window.open("about:blank", "_blank", '*')
      //   resolve()
      // })
  });

  let [ lastTab ] = await new Promise((resolve) => chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
    resolve(tab)
  }))
  
  await new Promise((resolve) => {
    chrome.tabs.create({
      url: "chrome://net-internals/#hsts"
    })
    resolve()
  })
  await chrome.tabs.goBack(lastTab.id)
}

chromeHSTSOpener()
