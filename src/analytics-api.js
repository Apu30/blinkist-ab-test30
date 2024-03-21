export const trackPageview = ({ URL, ABTestVariant, numberOfViews }) => {
  console.log(`--> Tracking Pageview: URL: ${URL}, AB-test: ${ABTestVariant}, numberOfViews: ${numberOfViews}`);
};

export const trackEvent = ({ Event, URL, clicks }) => {
  console.log(`--> Tracking Event: ${Event}, URL: ${URL}, clicks: ${clicks}`);
};