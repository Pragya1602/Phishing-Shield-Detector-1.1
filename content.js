(function() {
  function checkPhishing() {
    const hostname = window.location.hostname.toLowerCase();
    
    // Safety net: Skip trusted platforms entirely
    const whitelist = ["paypal.com", "microsoft.com", "google.com", "amazon.com", "apple.com", "wikipedia.org", "github.com"];
    if (whitelist.some(domain => hostname.endsWith(domain))) return;

    // Rule 1: Using raw IP addresses
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    
    // Rule 2: Excessive hyphens
    const hyphenCount = (hostname.match(/-/g) || []).length;

    // Rule 3: Phishing keywords
    const targetedKeywords = ["login", "verify", "secure", "banking", "update", "signin", "account", "auth"];
    const containsKeyword = targetedKeywords.some(word => hostname.includes(word));

    // If ANY rule matches, trigger the banner immediately
    if (ipPattern.test(hostname) || hyphenCount >= 3 || containsKeyword) {
      injectBanner(hostname);
    }
  }

  function injectBanner(hostname) {
    // If it already exists, don't duplicate it
    if (document.getElementById("phishing-alert-banner")) return;

    const banner = document.createElement("div");
    banner.id = "phishing-alert-banner";
    banner.innerText = `⚠ WARNING: Phishing Shield flagged this site (${hostname})! Exercise extreme caution.`;
    
    Object.assign(banner.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      backgroundColor: "#d9534f",
      color: "white",
      textAlign: "center",
      padding: "16px 0",
      fontSize: "16px",
      fontWeight: "bold",
      zIndex: "2147483647",
      boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      fontFamily: "Arial, sans-serif"
    });

    // Forcefully force the page down so it doesn't overlap text
    document.documentElement.style.marginTop = "50px";

    // Append it to the page immediately
    if (document.body) {
      document.body.appendChild(banner);
    } else {
      // If body isn't ready yet, watch the page and inject it the exact moment it exists
      const observer = new MutationObserver((mutations, obs) => {
        if (document.body) {
          document.body.appendChild(banner);
          obs.disconnect(); // stop watching once injected
        }
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  // Run the checker immediately
  checkPhishing();
})();
