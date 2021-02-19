chrome.tabs.onActivated.addListener(tab => {
  console.log('tab from bg.ts---> ', tab);
  chrome.tabs.get(tab.tabId, current_tab_info => {
    if (/^https:\/\/www\.google/.test(current_tab_info.url!)) {
      // chrome.tabs.executeScript(tab.tabId, {file: ''}, () => console.log('I injected foreground.ts'))
      console.log(current_tab_info.url);
    }
  });
});


console.log('from background.ts');