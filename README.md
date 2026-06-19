# Phishing-Shield-Detector-1.1
A lightweight Chrome Extension (Manifest V3) that utilizes real-time heuristic analysis to detect, flag, and visually isolate suspicious phishing URLs instantly.
# Phishing Shield Detector 🛡️

A lightweight, signature-less Google Chrome extension designed to analyze web domains in real time. Built entirely using **Manifest V3**, this extension flags potential social engineering and phishing threats on the fly using local heuristic evaluations.

## 🚀 Features

* **Zero-Delay Analysis:** Evaluates URLs locally before the page fully renders, bypassing the need for slow external database queries.
* **Smart Heuristics Engine:**
  * **IP Obfuscation Detection:** Flags sites using raw IP addresses instead of standard domain names.
  * **Structural Analysis:** Catches typosquatting and domain spoofing that rely on excessive character hyphens.
  * **Keyword Spoof Traps:** Scans subdomains for heavily targeted authentication words (e.g., `login`, `secure`, `banking`).
* **Active Injection DOM Protection:** Utilizes a `MutationObserver` wrapper to forcefully stamp a high-visibility security warning banner onto flagged pages instantly.

## 🛠️ Tech Stack

* **Architecture:** Chrome Extensions Manifest V3
* **Languages:** JavaScript (ES6+), HTML5, CSS3
