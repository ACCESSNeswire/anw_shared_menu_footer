/**
 * ACCESS Newswire Shared Footer
 * Embed with: <script src="https://accessneswire.github.io/anw_shared_menu_footer/footer.js"></script>
 */
(function () {
  'use strict';

  // Prevent double-injection if the script is loaded more than once
  if (window.__ANW_FOOTER_LOADED__) return;
  window.__ANW_FOOTER_LOADED__ = true;

  // ---- 1. Inject the footer CSS into <head> ----
  var css = `
#mktoForm_1219 label[for="optin"] { color: #fff !important; }
#mktoForm_1219 .mktoFormRow { margin-bottom: 0px !important; }

.site-footer { color: #ecf0f1; padding: 20px 0; }
.site-footer .footer-top { display: flex; flex-wrap: wrap; justify-content: space-between; padding: 20px; max-width: 1200px; margin: 0 auto; }
.site-footer .footer-links { display: flex; flex-wrap: wrap; gap: 20px; }
.site-footer .footer-column { flex: 1 1 200px; margin-bottom: 20px; }
.site-footer .footer-column p { font-size: 18px; margin-bottom: 15px; color: #000850; }
.site-footer .footer-column ul { list-style: none; padding: 0; margin: 0; }
.site-footer .footer-column ul li { margin-bottom: 10px; }
.site-footer .footer-column ul li a { color: #ecf0f1; text-decoration: none; font-size: 14px; }
.site-footer .footer-column ul li a:hover { color: #f1c40f; }
.site-footer .newsletter { flex: 1 1 100%; max-width: 400px; }
.site-footer .newsletter p { font-size: 18px; margin-bottom: 15px; color: #f1c40f; }
.site-footer .footer-bottom { text-align: center; padding: 10px; font-size: 13px; }
.site-footer .footer-bottom a { color: #ecf0f1; text-decoration: none; margin: 0 5px; }
.site-footer .footer-bottom a:hover { color: #f1c40f; }
.site-footer .logo img { max-width: 120px; height: auto; }

@media (max-width: 768px) {
  .site-footer .footer-top { flex-direction: column; align-items: center; text-align: center; }
  .site-footer .footer-links { flex-direction: column; align-items: center; }
  .site-footer .footer-column { flex: 1 1 100%; text-align: center !important; }
  .site-footer .newsletter { max-width: 100%; }
  .site-footer .footer-column ul { padding: 0; }
  .site-footer .footer-column ul li { text-align: center; }
  .site-footer .footer-column ul li a { display: inline-block; text-align: center; }
  .site-footer .footer-column p { text-align: center !important; display: block; width: 100%; margin-left: auto; margin-right: auto; }
}
`;

  var styleEl = document.createElement('style');
  styleEl.setAttribute('data-anw-footer', 'true');
  styleEl.appendChild(document.createTextNode(css));
  document.head.appendChild(styleEl);

  // ---- 2. Build the footer HTML ----
  var html = `
<footer class="site-footer" data-anw-footer="true">
  <div class="footer-top">
    <div class="logo">
      <img src="https://irp.cdn-website.com/b585153d/dms3rep/multi/PURE_WHITE.svg" alt="Company Logo">
    </div>
    <div class="footer-links">
      <div class="footer-column">
        <p>Solutions</p>
        <ul>
          <li><a href="/solutions/public-companies">Public Companies</a></li>
          <li><a href="/solutions/private-companies">Private Companies</a></li>
          <li><a href="/solutions/agencies">Agencies</a></li>
          <li><a href="/solutions/legal">Legal</a></li>
          <li><a href="/solutions/resellers-publishers-and-market-research">Resellers &amp; Market Research</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <p>Public Relations Products</p>
        <ul>
          <li><a href="/products/public-relations/access-pr-platform">Access PR Platform</a></li>
          <li><a href="/products/public-relations/press-release-distribution">Press Release Distribution</a></li>
          <li><a href="/products/public-relations/media-database">Media Database</a></li>
          <li><a href="/products/public-relations/media-pitching">Media Pitching</a></li>
          <li><a href="/products/public-relations/media-monitoring">Media Monitoring</a></li>
          <li><a href="/products/public-relations/media-and-industry-targeting">Media and Industry Targeting</a></li>
          <li><a href="https://www.accessnewswire.com/social-monitoring">Social Monitoring</a></li>
          <li><a href="https://www.accessnewswire.com/ACCESS-Verified">ACCESS Verified</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <p>Investor Relations Products</p>
        <ul>
          <li><a href="/products/investor-relations/access-ir-platform">Access IR Platform</a></li>
          <li><a href="/products/investor-relations/ir-website">IR Website</a></li>
          <li><a href="/products/investor-relations/ada-compliance">ADA Compliance</a></li>
          <li><a href="/products/investor-relations/earnings-calls">Earnings Calls</a></li>
          <li><a href="/products/investor-relations/earnings-press-releases">Earnings Press Releases</a></li>
          <li><a href="/products/investor-relations/investor-days">Investor Days</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <p>All Access</p>
        <ul>
          <li><a href="/products/all-access/all-access">All Access</a></li>
          <li><a href="/products/conference-and-event-software/conference-and-event-software">Conference &amp; Event Software</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <p>Pricing</p>
        <ul>
          <li><a href="/pricing/public-relations/pr-subscription">PR Subscription</a></li>
          <li><a href="/submit-a-press-release">Submit a Press Release</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <p>Professional Services</p>
        <ul>
          <li><a href="/professional-services/service-plans">Service Plans</a></li>
          <li><a href="/professional-services/platform-add-ons">Platform Add-ons</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <p>Blogs</p>
        <ul>
          <li><a href="/blog-topics/public-relations/press-releases-tips">Press Release Topics</a></li>
          <li><a href="/blog-topics/public-relations/media-outreach-and-engagement-optimization">Media Outreach &amp; Engagement Optimization</a></li>
          <li><a href="/blog-topics/public-relations/competitor-comparisons">Competitor Comparisons</a></li>
          <li><a href="/blog-topics/investor-relations/ir-website-best-practices">IR Websites Best Practices</a></li>
          <li><a href="/blog-topics/investor-relations/earnings-call-checklists-and-preparation">Earnings Call, Checklists &amp; Preparation</a></li>
          <li><a href="/blog-topics/investor-relations/earnings-press-release-tips">Earnings Press Release Tips</a></li>
          <li><a href="/blog-topics/investor-relations/investor-day-recommendations">Investor Day Recommendations</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <p>Resources</p>
        <ul>
          <li><a href="/download-press-release-template">Press Release Templates</a></li>
          <li><a href="/newsroom">Press Release Examples</a></li>
          <li><a href="/professional-education-program">🎓 EDU Program</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <p>FAQs</p>
        <ul>
          <li><a href="/#faq">Product</a></li>
          <li><a href="/#faq">Platform</a></li>
          <li><a href="/#faq">Company</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <p>About Us</p>
        <ul>
          <li><a href="/about-us/who-we-are">Who We Are</a></li>
          <li><a href="https://investors.accessnewswire.com/#team" target="_blank">Meet the Team</a></li>
          <li><a href="https://investors.accessnewswire.com" target="_blank">Investor Relations</a></li>
          <li><a href="/careers">Careers</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <p>Our Brands</p>
        <ul>
          <li><a href="https://www.accessnewswire.com">ACCESS Newswire</a></li>
          <li><a href="https://www.newswire.com" target="_blank">Newswire.com</a></li>
          <li><a href="https://pressrelease.com" target="_blank">Pressrelease.com</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <p>Contact Us</p>
        <ul>
          <li><a href="https://app.accessnewswire.com/login" target="_blank">Login</a></li>
          <li><a href="tel:8888082227">+1 888-808-2227</a></li>
          <li><a href="/contact-us">Sales</a></li>
          <li><a href="/contact-us">Customer Support</a></li>
          <li><a href="/contact-us">Editorial</a></li>
          <li><a href="/contact-us">Billing Contact</a></li>
          <li><a href="mailto:partnerinquiry@accessnewswire.com">Distribution Partner Inquiry</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>
      ©2025 ACCESS Newswire Inc. All rights reserved.
      <a href="/terms-of-service">Terms of Service</a> |
      <a href="https://www.accessnewswire.com/privacy-policy">Privacy Policy</a>
    </p>
  </div>
</footer>
`;

  // ---- 3. Insert HTML at the script tag's location ----
  var currentScript = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  var wrapper = document.createElement('div');
  wrapper.setAttribute('data-anw-footer-wrapper', 'true');
  wrapper.innerHTML = html;

  if (currentScript && currentScript.parentNode) {
    currentScript.parentNode.insertBefore(wrapper, currentScript);
  } else {
    if (document.body) {
      document.body.appendChild(wrapper);
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(wrapper);
      });
    }
  }
})();
