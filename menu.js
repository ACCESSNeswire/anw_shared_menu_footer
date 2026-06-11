/**
 * ACCESS Newswire Shared Menu
 * Embed with: <script src="https://cdn.jsdelivr.net/gh/ACCESSNeswire/anw_shared_menu_footer@main/menu.js"></script>
 *
 * v5 changes:
 *  - Added "ACCESS Insights & Analytics" link (/insights-and-analytics)
 *    to the Products > Public Relations column, after Social Monitoring.
 *  - De-duplicated Products icons: Whistleblower now uses fa-user-shield
 *    (was fa-shield-alt, clashing with ACCESS Verified) and Conference &
 *    Event Software now uses fa-handshake (was fa-passport, clashing
 *    with All ACCESS).
 *
 * v4 changes (arrow only — nothing else touched):
 *  - The dropdown arrow is now a real element INSIDE each dropdown,
 *    glued to the dropdown's top edge. JS aligns it horizontally under
 *    the hovered link using measured positions, so it cannot drift or
 *    hide regardless of how each page's header sizes the navbar.
 */
(function () {
  'use strict';

  // Prevent double-injection if the script is loaded more than once
  if (window.__ANW_MENU_LOADED__) return;
  window.__ANW_MENU_LOADED__ = true;

  // ---- 1. Load Font Awesome into <head> (only if not already present) ----
  var FA_HREF = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
  if (!document.querySelector('link[href="' + FA_HREF + '"]')) {
    var faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = FA_HREF;
    document.head.appendChild(faLink);
  }

  // ---- 2. Inject the menu CSS into <head> ----
  var css = `
.noDeco { cursor: default; text-decoration: none; }
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 0px 10px 0px 50px !important; background-color: transparent; font-family: 'Montserrat', sans-serif !important; }
.logo { width: 120px; height: auto; overflow: hidden; display: flex; justify-content: center; align-items: center; flex-shrink: 0; margin-right: 40px; }
.logo img { width: 120px; height: auto; max-width: 100%; max-height: 100%; object-fit: contain; }
.mega-menu { flex-grow: 1; flex-shrink: 0; position: relative; }
.menu { display: flex; list-style: none; padding: 0; margin: 0; margin-left: 0px !important; gap: 5px; font-family: 'Montserrat', sans-serif !important; }
.menu > .menu-item { position: relative; padding-bottom: 0px; }
.menu > .menu-item > a { display: block; padding: 5px 5px; color: white !important; text-decoration: none !important; font-size: 14px; font-family: 'Montserrat', sans-serif !important; }
.menu > .menu-item > a:hover { background-color: #fb3c64; color: white; }
.navbar .mega-menu .menu-item.has-dropdown .dropdown { display: block; position: absolute; top: 100%; transform: translateX(-50%); padding: 20px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); z-index: 1000; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0s 0.3s; border-radius: 8px; background: rgba(255,255,255, 1) !important; }
.navbar .mega-menu .menu-item.hover .dropdown { opacity: 1; visibility: visible; transition: opacity 0.3s ease, visibility 0s 0s; }
.navbar .mega-menu .menu-item.hover > a { background-color: #fb3c64; color: white; }
.dropdown-position-left-20 { left: 300px; }
.dropdown-position-center-50 { left: 50%; transform: translateX(-50%); }
.dropdown-position-right-30 { left: -100px; }
.dropdown-size-small { width: 500px; }
.dropdown-size-700 { width: 600px; }
.dropdown-size-medium { width: 800px; }
.dropdown-size-large { width: 900px; }

/* ---- dropdown arrow: a real element glued to the dropdown's top edge.
       JS sets its horizontal position to sit under the hovered link.
       It fades in/out together with the dropdown automatically. ---- */
/* kill any legacy ::after arrow that may survive in old code copies or
   site-wide custom CSS — only the .anw-dd-arrow element may render.
   Scoped to .mega-menu (not .navbar) so it also protects the mobile
   panel after it is moved to <body>. */
.mega-menu .menu-item.has-dropdown > a::after,
.mega-menu .menu-item.has-dropdown > a:hover::after,
.mega-menu .menu-item.has-dropdown.hover > a::after { content: none !important; display: none !important; animation: none !important; border: none !important; }
.navbar .mega-menu .dropdown .anw-dd-arrow { position: absolute; top: -10px; left: 50%; margin-left: -10px; width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 10px solid #fff; pointer-events: none; opacity: 0; transform: translateY(10px); }
.navbar .mega-menu .menu-item.hover .dropdown .anw-dd-arrow { animation: arrow-up 0.8s ease forwards; }
@keyframes arrow-up { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.navbar .mega-menu .dropdown-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.navbar .mega-menu .dropdown-column { width: 100%; padding: 0 5px; display: flex; flex-direction: column; }
.navbar .mega-menu .dropdown-column h3 { font-size: 18px !important; color: #000850; margin-bottom: 10px; font-weight: bold; border-bottom: 1px solid #dedede; padding-bottom: 5px; }
.navbar .mega-menu .dropdown-column a { display: block; color: #000850; text-decoration: none; padding: 5px 0; font-size: 14px; }
.navbar .mega-menu .dropdown-column a:hover { color: #000850; margin-left: 15px; }
.navbar .mega-menu .dropdown-column.pr-column a { padding: 2px 0; }
.navbar .mega-menu .dropdown-column.pr-column .description { margin-top: 2px; margin-bottom: 8px; line-height: 1.3; }
.navbar .mega-menu .dropdown-column.image-column { display: flex; justify-content: right; align-items: right; padding: 10px; }
.navbar .mega-menu .dropdown-column.image-column img { max-width: 100%; height: auto; border-radius: 8px; }
.navbar .mega-menu .dropdown-column .description, .navbar .mega-menu .dropdown-column .description_title { display: block; font-size: 13px; color: #786f80; margin-left: 42px; font-weight: 300; }
.navbar .mega-menu .dropdown-column .description_title { margin-top: -10px; padding: 0px; margin-left: 20px; }
.navbar .mega-menu .dropdown-column .subCategory-title { display: block; font-size: 14px; color: #fb3c64; font-weight: bold; margin-top: 5px; margin-bottom: 0px; padding: 0px; margin-left: 20px; }
.navbar .mega-menu .dropdown-column .left-pad { margin-left: 30px; font-size: 10px !important; }
.navbar .mega-menu .dropdown-column .blog-color { color: #b303ce !important; }
.navbar .mega-menu .dropdown-column .description-link { color: #007bff; text-decoration: underline !important; margin-left: 0px; }
.navbar .mega-menu .dropdown-column .description-link:hover { text-decoration: underline; margin-left: 0px; }
.navbar .login-btn a { display: inline-flex; align-items: center; background-color: transparent; padding: 20px; color: #fff; font-size: 14px; font-family: 'Montserrat', sans-serif !important; text-decoration: none; font-weight: bold; margin-left: 1px; transition: color 0.3s ease, transform 0.3s ease; }
.navbar .login-btn a i { margin-left: 5px; font-size: 12px; color: #fff; transition: transform 0.3s ease; }
.navbar .login-btn a:hover { color: #000850; }
.navbar .login-btn a:hover i { transform: rotate(90deg); }
.navbar .login-btn a:focus { outline: none; color: #000850; }
.navbar .press-btn a { display: inline-flex; align-items: center; background-color: #000850; padding: 20px; color: #fff; font-size: 14px; font-family: 'Montserrat', sans-serif !important; text-decoration: none; font-weight: bold; margin-left: 1px; transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease; white-space: nowrap; }
.navbar .press-btn a i { margin-left: 15px; font-size: 12px; color: #fff; transition: color 0.3s ease, transform 0.3s ease; }
.navbar .press-btn a:hover { color: #fff; background-color: transparent; background-image: linear-gradient(45deg, #b303ce, #fb3c64); background-size: 200% 200%; background-position: 100% 0; transition: color 0.3s ease, background-image 0.3s ease, background-size 0.6s ease, background-position 0.6s ease; }
.navbar .press-btn a:hover i { transform: scale(1.3); }
.navbar .press-btn a:focus { outline: none; color: #fff; }
.navbar .mega-menu .menu-item .dropdown { opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0s 0.3s; }
.navbar .mega-menu .menu-item.hover .dropdown { opacity: 1; visibility: visible; transition: opacity 0.3s ease, visibility 0s 0s; }
.navbar .menu-item i { color: #fb3c64; }
.navbar .menu-item a:hover i, .navbar .login-btn a:hover i, .navbar .press-btn a:hover i { color: #000850 !important; }
::selection { background-color: #fb3c64; color: white; }
.navbar .mega-menu .dropdown-column .dropdown-heading { font-size: 18px !important; color: #000850; margin-bottom: 10px; font-weight: bold; border-bottom: 1px solid #dedede; padding-bottom: 5px; }
.navbar .mega-menu .dropdown-column .dropdown-heading.large { font-size: 22px !important; }
.navbar .mega-menu .dropdown-column .dropdown-heading.medium { font-size: 18px !important; }
.navbar .mega-menu .dropdown-column .dropdown-heading.small { font-size: 16px !important; }
.navbar .mega-menu .dropdown-column .dropdown-heading.blog-color { color: #b303ce !important; }
.navbar .mega-menu .dropdown-column .description { display: block; font-size: 13px; color: #786f80; margin-left: 42px; font-weight: 300; line-height: 1.4; margin-top: 5px; margin-bottom: 15px; }
.navbar .mega-menu .dropdown-column .description.small { font-size: 12px; }
.navbar .mega-menu .dropdown-column .description.medium { font-size: 14px; }
.navbar .mega-menu .dropdown-column .description.large { font-size: 16px; }
.navbar .mega-menu .dropdown-column .description.light { color: #999; }
.navbar .mega-menu .dropdown-column .description.dark { color: #333; }
.navbar .mega-menu .dropdown-column .description.bold { font-weight: 600; }
.navbar .mega-menu .dropdown-column .description.light-weight { font-weight: 300; }
.contact-btn { position: fixed; background-color: #00000030; top: 65px; right: 109px; z-index: 999; }
.contact-btn a { display: inline-flex; align-items: center; padding: 15px; color: #fff; font-size: 14px; font-family: 'Montserrat', sans-serif !important; text-decoration: none; font-weight: bold; transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease; white-space: nowrap; }
.contact-btn a i { margin-left: 15px; font-size: 12px; color: #fff; transition: color 0.3s ease, transform 0.3s ease; }
.contact-btn a:hover { color: #fff; background-color: transparent; background-image: linear-gradient(45deg, #b303ce, #fb3c64); background-size: 200% 200%; background-position: 100% 0; transition: color 0.3s ease, background-image 0.3s ease, background-size 0.6s ease, background-position 0.6s ease; }
.contact-btn a:hover i { transform: scale(1.3); }
.contact-btn a:focus { outline: none; color: #fff; }

/* ---- hamburger + panel close (hidden on desktop) ---- */
.anw-hamburger { display: none; background: none; border: 0; padding: 10px; cursor: pointer; }
.anw-hamburger span { display: block; width: 24px; height: 2px; background: #fff; margin: 5px 0; }
.anw-panel-close { display: none; position: absolute; top: 14px; right: 16px; background: none; border: 0; color: #fff; font-size: 34px; line-height: 1; cursor: pointer; padding: 8px; font-family: 'Montserrat', sans-serif !important; }
.anw-mobile-extra { display: none; }

/* ============================================================
   MOBILE (<= 1100px): hamburger + fullscreen accordion panel.
   The panel is MOVED TO <body> by JS when opened (class
   .anw-panel-open), so Duda header containers can't trap it.
============================================================ */
@media (max-width: 1100px) {
  .navbar { padding: 8px 14px !important; }
  .anw-hamburger { display: block; }
  .navbar .press-btn, .navbar .login-btn { display: none !important; }
  .contact-btn { display: none !important; }

  /* hidden in the navbar on mobile */
  .mega-menu { display: none; }

  /* open state: panel lives directly under <body> */
  .mega-menu.anw-panel-open { display: block; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #000850; z-index: 2147483000; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 70px 22px 50px; font-family: 'Montserrat', sans-serif !important; }
  .mega-menu.anw-panel-open .anw-panel-close { display: block; }

  /* the desktop arrow never renders on mobile, period */
  .anw-dd-arrow { display: none !important; }

  /* stacked list */
  .mega-menu.anw-panel-open .menu { flex-direction: column; gap: 0; }
  .mega-menu.anw-panel-open .menu > .menu-item > a { font-size: 17px; padding: 14px 4px; border-bottom: 1px solid rgba(255, 255, 255, 0.12); }
  .mega-menu.anw-panel-open .menu > .menu-item > a:hover { background-color: transparent; }

  /* mobile-only action links */
  .mega-menu.anw-panel-open .anw-mobile-extra { display: block; }
  .mega-menu.anw-panel-open .anw-mobile-extra > a { color: #fb3c64 !important; font-weight: bold; }

  /* dropdowns become inline accordion sections */
  .mega-menu.anw-panel-open .menu-item.has-dropdown .dropdown { position: static !important; left: auto !important; transform: none !important; width: auto !important; opacity: 1 !important; visibility: visible !important; display: none; box-shadow: none !important; background: transparent !important; padding: 4px 0 14px !important; border-radius: 0 !important; }
  .mega-menu.anw-panel-open .menu-item.anw-open .dropdown { display: block; }
  .mega-menu.anw-panel-open .dropdown-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
  .mega-menu.anw-panel-open .dropdown-column { padding: 0 !important; }
  .mega-menu.anw-panel-open .dropdown-column a { display: flex !important; align-items: flex-start; gap: 16px; color: rgba(255, 255, 255, 0.85) !important; padding: 9px 0 9px 14px !important; font-size: 15px; line-height: 1.45; }
  /* fixed-width icon column: every label starts at the same x position,
     and wrapped lines hang-indent instead of sliding under the icon */
  .mega-menu.anw-panel-open .dropdown-column a i { flex: 0 0 20px; width: 20px; text-align: center; margin: 3px 0 0 0 !important; font-size: 14px !important; color: #fb3c64 !important; }
  .mega-menu.anw-panel-open .dropdown-column .left-pad { margin-left: 0 !important; font-size: 14px !important; }
  .mega-menu.anw-panel-open .dropdown-column a:hover { color: #fff !important; margin-left: 0 !important; }
  /* section headings (e.g. Service Plans / Platform Add-ons): pink,
     uppercase, underlined in pink — unmistakably a divider */
  .mega-menu.anw-panel-open .dropdown-column .dropdown-heading { color: #fb3c64 !important; border-bottom: 1px solid rgba(251, 60, 100, 0.4) !important; margin: 22px 0 6px !important; padding-bottom: 6px !important; font-size: 13px !important; font-weight: 700 !important; text-transform: uppercase; letter-spacing: 0.08em; }
  .mega-menu.anw-panel-open .dropdown-column .description,
  .mega-menu.anw-panel-open .dropdown-column .description_title { display: none !important; }
  .mega-menu.anw-panel-open .dropdown-column.image-column { display: none !important; }
  /* sub-category titles (Public Relations / Investor Relations under
     Resources): the desktop purple is invisible on navy — restyle as
     soft white uppercase labels */
  .mega-menu.anw-panel-open .dropdown-column .subCategory-title { margin: 14px 0 2px !important; font-size: 12px !important; text-transform: uppercase; letter-spacing: 0.08em; }
  .mega-menu.anw-panel-open .dropdown-column .blog-color { color: rgba(255, 255, 255, 0.6) !important; }

  /* +/- accordion indicator — fully neutralizes any legacy arrow CSS
     (borders / absolute positioning / animation) from outside sources */
  .mega-menu.anw-panel-open .menu-item.has-dropdown > a::after,
  .mega-menu.anw-panel-open .menu-item.has-dropdown > a:hover::after,
  .mega-menu.anw-panel-open .menu-item.has-dropdown.hover > a::after { content: '+' !important; position: static !important; float: right; border: none !important; width: auto !important; height: auto !important; top: auto !important; left: auto !important; bottom: auto !important; transform: none !important; animation: none !important; opacity: 1 !important; visibility: visible !important; color: #fb3c64 !important; font-weight: bold; font-size: 18px; line-height: 1; pointer-events: none; }
  .mega-menu.anw-panel-open .menu-item.anw-open > a::after { content: '\\2212' !important; }
}
`;

  var styleEl = document.createElement('style');
  styleEl.setAttribute('data-anw-menu', 'true');
  styleEl.appendChild(document.createTextNode(css));
  document.head.appendChild(styleEl);

  // ---- 3. Build the menu HTML ----
  var html = `
<div class="navbar" data-anw-menu="true">
  <div class="logo">
    <a href="/"><img src="https://irp.cdn-website.com/b585153d/dms3rep/multi/PURE_WHITE.svg" alt="Access Newswire Logo"></a>
  </div>
  <div class="mega-menu">
    <button class="anw-panel-close" aria-label="Close menu" type="button">&times;</button>
    <ul class="menu">
      <li class="menu-item has-dropdown">
        <a class="noDeco">Products</a>
        <div class="dropdown dropdown-position-left-20 dropdown-size-large">
          <div class="dropdown-grid">
            <div class="dropdown-column pr-column">
              <div class="dropdown-heading noDeco">Public Relations</div>
              <p class="description_title"></p>
              <a href="/products/public-relations/access-pr-platform"><i class="fas fa-bullhorn"></i> ACCESS PR Platform</a>
              <p class="description">The first and only All-in-one subscription platform offering all of your PR Distribution and Media Outreach Tools in one single solution. <a href="/pricing/public-relations/pr-subscription" class="description-link">Monthly &amp; Annual Subscriptions.</a></p>
              <a href="/products/public-relations/press-release-distribution"><i class="fas fa-paper-plane"></i> Press Release Distribution</a>
              <p class="description">Explore our distribution packages today.</p>
              <a href="/products/public-relations/media-database"><i class="fas fa-database"></i> Media Database</a>
              <p class="description">Find &amp; create journalist lists with the most up to date database in the industry.</p>
              <a href="/products/public-relations/access-pr-platform#pitch"><i class="fas fa-clipboard-list"></i> Media Pitching</a>
              <p class="description">Personalize and customize your pitch for maximum engagement.</p>
              <a href="/products/public-relations/media-monitoring"><i class="fas fa-search"></i> Media Monitoring</a>
              <p class="description">Discover your brand, industry, and competitor mentions.</p>
              <a href="https://www.accessnewswire.com/social-monitoring"><i class="fas fa-satellite-dish"></i> Social Monitoring</a>
              <p class="description">Now you can track every mention, every conversation, and every shift in sentiment — all from the platform you're already using.</p>
              <a href="/insights-and-analytics"><i class="fas fa-chart-pie"></i> ACCESS Insights &amp; Analytics</a>
              <p class="description">Turn your PR data into actionable intelligence with comprehensive reporting and analytics on every campaign.</p>
              <a href="https://www.accessnewswire.com/ACCESS-Verified"><i class="fas fa-shield-alt"></i> ACCESS Verified</a>
              <p class="description">Catch issues before our editors do. ACCESS Verified gives you a real-time first pass on your press release so you can submit with confidence — every time.</p>
            </div>
            <div class="dropdown-column">
              <div class="dropdown-heading">Investor Relations</div>
              <p class="description_title"></p>
              <a href="/products/investor-relations/access-ir-platform"><i class="fas fa-hand-holding-usd"></i> ACCESS IR Platform</a>
              <p class="description">The first and only All-in-one subscription platform that offers you the ability to manage all of your IR communications needs from a single source. <a href="https://www.accessnewswire.com/products/investor-relations/access-ir-platform" class="description-link">Explore our IR subscriptions</a></p>
              <a href="/products/investor-relations/ir-website"><i class="fas fa-laptop-code"></i> IR Website</a>
              <p class="description">Explore how you can upgrade your IR Site today.</p>
              <a href="/products/investor-relations/ada-compliance"><i class="fas fa-universal-access"></i> ADA Compliance</a>
              <p class="description">Ensure your IR Site is accessible for your entire audience.</p>
              <a href="/products/investor-relations/earnings-calls"><i class="fas fa-microphone-alt"></i> Earnings Calls</a>
              <p class="description">Experience seamless calls with our dedicated team of domestic operators.</p>
              <a href="/products/investor-relations/earnings-press-releases"><i class="fas fa-newspaper"></i> Earnings Press Releases</a>
              <p class="description">Easily send your releases out with quick turnarounds and no extra fees.</p>
              <a href="/products/investor-relations/investor-days"><i class="fas fa-calendar-day"></i> Investor Days</a>
              <p class="description">Host your day knowing you've got the most experienced webcast team in the industry.</p>
              <a href="/products/investor-relations/whistleblower"><i class="fas fa-user-shield"></i> Whistleblower</a>
              <p class="description">Provide a secure and confidential reporting channel to protect your organization and employees.</p>
            </div>
            <div class="dropdown-column">
              <div class="dropdown-heading noDeco">All ACCESS</div>
              <p class="description_title"></p>
              <a href="/products/all-access/all-access"><i class="fas fa-passport"></i> All ACCESS</a>
              <p class="description">Streamline your PR &amp; IR needs with one platform.</p>
            </div>
            <div class="dropdown-column">
              <div class="dropdown-heading noDeco">Conference &amp; Event Software</div>
              <p class="description_title"></p>
              <a href="/products/conference-and-event-software/conference-and-event-software"><i class="fas fa-handshake"></i> Conference &amp; Event Software</a>
              <p class="description">Easily schedule and manage your investor meetings with our comprehensive and easy to use software.</p>
            </div>
          </div>
        </div>
      </li>
      <li class="menu-item has-dropdown">
        <a class="noDeco">Solutions</a>
        <div class="dropdown dropdown-position-left-20 dropdown-size-large">
          <div class="dropdown-grid">
            <div class="dropdown-column">
              <div class="dropdown-heading noDeco">Tailored Solutions for Your Business</div>
              <a href="/solutions/public-companies"><i class="fas fa-building"></i> Public Companies</a>
              <p class="description">Our PR and IR tools are designed to meet all necessary regulatory requirements, giving you the confidence to communicate effectively and compliantly. Streamline your communications needs today with our one-stop shop offering.</p>
              <a href="/solutions/private-companies"><i class="fas fa-industry"></i> Private Companies</a>
              <p class="description">Whether a startup or established brand, we deliver the support, targeted distribution, media outreach, and flexible pricing &amp; payment options needed to amplify your story with confidence.</p>
              <a href="/solutions/agencies"><i class="fas fa-users"></i> Agencies</a>
              <p class="description">We simplify the process of delivering success for both you and your clients. We understand the importance of getting it right, equipping you with seamless billing, flexible plans and payment structures, and clear reporting and analytics to ensure every campaign runs smoothly and achieves measurable results.</p>
            </div>
            <div class="dropdown-column">
              <div class="dropdown-column image-column">
                <img src="https://irp.cdn-website.com/b585153d/dms3rep/multi/image.png" alt="Access Newswire Solutions">
              </div>
              <a href="/solutions/legal"><i class="fas fa-gavel"></i> Legal</a>
              <p class="description">We understand the need to manage high volume of press release distribution efficiently. That's why we offer a dedicated API designed specifically for our legal customers, delivering a streamlined, simple process that ensures value and ease at every step.</p>
              <a href="/solutions/resellers-publishers-and-market-research"><i class="fas fa-chart-bar"></i> Resellers, Publishers &amp; Market Research</a>
              <p class="description">We understand the importance of cost efficiency for high-volume partners, which is why we offer bulk discounts tailored to meet your needs while maximizing value.</p>
            </div>
          </div>
        </div>
      </li>
      <li class="menu-item has-dropdown">
        <a class="noDeco">Pricing</a>
        <div class="dropdown dropdown-position-center-50 dropdown-size-small">
          <div class="dropdown-grid">
            <div class="dropdown-column">
              <div class="dropdown-heading noDeco">Public Relations</div>
              <p class="description_title"></p>
              <a href="/pricing/public-relations/pr-subscription"><i class="fas fa-box-open"></i> Subscription</a>
              <a href="/submit-a-press-release"><i class="fas fa-box-open"></i> Non-Subscription</a>
              <p class="description"></p>
            </div>
          </div>
        </div>
      </li>
      <li class="menu-item has-dropdown">
        <a class="noDeco">Professional Services</a>
        <div class="dropdown dropdown-position-center-50 dropdown-size-700">
          <div class="dropdown-grid">
            <div class="dropdown-column">
              <div class="dropdown-heading noDeco">Service Plans</div>
              <p class="description_title"></p>
              <a href="/professional-services/service-plans/content-pro"><i class="fas fa-box"></i> Content PRO</a>
              <p class="description">Designed for brands that need help consistently fueling their content strategy and calendar with optimized press releases, blogs, and more&hellip;</p>
              <a href="/professional-services/service-plans/content-pro#media"><i class="fas fa-cogs"></i> Media PRO</a>
              <p class="description">Tailored for brands with a solid content strategy seeking support for effectively reaching and engaging the media.</p>
              <a href="/professional-services/service-plans/content-pro#total"><i class="fas fa-cogs"></i> Total PRO</a>
              <p class="description">Made for brands that need more comprehensive support building and managing their content strategy, media outreach and engagement plan.</p>
            </div>
            <div class="dropdown-column">
              <div class="dropdown-heading noDeco">Platform Add-ons</div>
              <p class="description_title"></p>
              <a href="/professional-services/platform-add-ons/premium-onboarding"><i class="fas fa-user-cog"></i> Premium Onboarding</a>
              <p class="description">Personalized support to optimize your platform, including tailored journalist list creation, pitch guidance, and monitoring setup.</p>
              <a href="/professional-services/platform-add-ons/premium-onboarding#management"><i class="fas fa-briefcase"></i> Platform Management</a>
              <p class="description">Continual support and management including ongoing list creation, pitch creation and modifications, monitoring adjustments, and additional reporting and analytics review.</p>
              <a href="/professional-services/platform-add-ons/premium-onboarding#content"><i class="fas fa-pencil-alt"></i> PR Content Writing</a>
              <p class="description">Press Release creation and optimization for SEO and audience engagement</p>
            </div>
          </div>
        </div>
      </li>
      <li class="menu-item has-dropdown">
        <a class="noDeco">Resources</a>
        <div class="dropdown dropdown-position-right-30 dropdown-size-large">
          <div class="dropdown-grid">
            <div class="dropdown-column">
              <div class="dropdown-heading noDeco">Blog Topics</div>
              <p class="subCategory-title blog-color noDeco">Public Relations</p>
              <a href="/blog-topics/public-relations/press-releases-tips"><i class="fas fa-newspaper left-pad"></i> Press Release Tips</a>
              <a href="/blog-topics/public-relations/media-outreach-and-engagement-optimization"><i class="fas fa-bullhorn left-pad"></i> Media Outreach &amp; Engagement Optimization</a>
              <a href="/blog-topics/public-relations/competitor-comparisons"><i class="fas fa-share-alt left-pad"></i> Competitor Comparisons</a>
              <p class="subCategory-title blog-color noDeco">Investor Relations</p>
              <a href="/blog-topics/investor-relations/ir-website-best-practices"><i class="fas fa-laptop-code left-pad"></i> IR Website Best Practices</a>
              <a href="/blog-topics/investor-relations/earnings-call-checklists-and-preparation"><i class="fas fa-phone-alt left-pad"></i> Earnings Call Checklists and Preparation</a>
              <a href="/blog-topics/investor-relations/earnings-press-release-tips"><i class="fas fa-calendar-day left-pad"></i> Earnings Press Release Tips</a>
              <a href="/blog-topics/investor-relations/investor-day-recommendations"><i class="fas fa-calendar-check left-pad"></i> Investor Day Recommendations</a>
            </div>
            <div class="dropdown-column">
              <div class="dropdown-heading noDeco">Templates, Tips &amp; Tools</div>
              <p class="subCategory-title blog-color noDeco">Public Relations</p>
              <p class="description_title"></p>
              <a href="/download-press-release-template"><i class="fas fa-users left-pad"></i> PR Template</a>
              <a href="/download/media-pitch-template"><i class="fas fa-users left-pad"></i> Media Pitch Template</a>
              <a href="/download-press-release-ai"><i class="fas fa-users left-pad"></i> Professional's Guide to AI</a>
              <a href="/download-crisis-communications"><i class="fas fa-users left-pad"></i> Crisis Communications Tip Sheet</a>
              <a href="/press-release-pickup-checklist"><i class="fas fa-users left-pad"></i> PR Pickup Checklist</a>
              <a href="/using-pr-analytics-to-strengthen-your-pr-strategy"><i class="fas fa-users left-pad"></i> Use PR Analytics to Strengthen Your Strategy</a>
              <a href="/download-ai-data-protection-checklist"><i class="fas fa-users left-pad"></i> AI Data Protection Checklist</a>
              <a href="/download-trust-checklist"><i class="fas fa-users left-pad"></i> The Trust Checklist</a>
              <a href="/download/access-outreach"><i class="fas fa-users left-pad"></i> ACCESS Outreach Tooltip</a>
              <a href="/pr-ai-checklist"><i class="fas fa-users left-pad"></i> PR &amp; AI Visibility Checklist</a>
              <p class="subCategory-title blog-color noDeco">Investor Relations</p>
              <p class="description_title"></p>
              <a href="/download/investor-relations-website-essentials"><i class="fas fa-users left-pad"></i> IR Website Essentials</a>
            </div>
          </div>
        </div>
      </li>
      <li class="menu-item has-dropdown">
        <a href="/newsroom">Newsroom</a>
        <div class="dropdown dropdown-position-right-30 dropdown-size-medium">
          <div class="dropdown-grid">
            <div class="dropdown-column">
              <div class="dropdown-heading noDeco">Industries</div>
              <p class="description_title"></p>
              <a href="/newsroom"><i class="fas fa-network-wired"></i> All Industries</a>
              <a href="/newsroom/industry/aerospace-and-defense"><i class="fas fa-fighter-jet"></i> Aerospace &amp; Defense</a>
              <a href="/newsroom/industry/agriculture"><i class="fas fa-tractor"></i> Agriculture</a>
              <a href="/newsroom/industry/automotive"><i class="fas fa-car"></i> Automotive</a>
              <a href="/newsroom/industry/banking-and-financial-services"><i class="fas fa-piggy-bank"></i> Banking &amp; Financial Services</a>
              <a href="/newsroom/industry/biotechnology"><i class="fas fa-dna"></i> Biotechnology</a>
              <a href="/newsroom/industry/blockchain-and-cryptocurrency"><i class="fab fa-btc"></i> Blockchain &amp; Cryptocurrency</a>
              <a href="/newsroom/industry/business-and-professional-services"><i class="fas fa-briefcase"></i> Business &amp; Professional Services</a>
              <a href="/newsroom/industry/chemicals"><i class="fas fa-flask"></i> Chemicals</a>
              <a href="/newsroom/industry/clean-technology"><i class="fas fa-leaf"></i> Clean Technology</a>
              <a href="/newsroom/industry/closed-end-funds-and-trusts"><i class="fas fa-lock"></i> Closed End Funds &amp; Trusts</a>
              <a href="/newsroom/industry/computers-technology-and-internet"><i class="fas fa-laptop"></i> Computers, Technology &amp; Internet</a>
              <a href="/newsroom/industry/consumer-and-retail-products"><i class="fas fa-box"></i> Consumer &amp; Retail Products</a>
              <a href="/newsroom/industry/education"><i class="fas fa-school"></i> Education</a>
              <a href="/newsroom/industry/electronics-and-engineering"><i class="fas fa-microchip"></i> Electronics &amp; Engineering</a>
            </div>
            <div class="dropdown-column">
              <a href="/newsroom/industry/exchange-traded-funds"><i class="fas fa-chart-line"></i> Exchange Traded Funds</a>
              <a href="/newsroom/industry/food-and-beverage-products"><i class="fas fa-utensils"></i> Food &amp; Beverage Products</a>
              <a href="/newsroom/industry/government"><i class="fas fa-landmark"></i> Government</a>
              <a href="/newsroom/industry/healthcare-and-pharmaceutical"><i class="fas fa-medkit"></i> Healthcare &amp; Pharmaceutical</a>
              <a href="/newsroom/industry/industrial-and-manufacturing"><i class="fas fa-industry"></i> Industrial &amp; Manufacturing</a>
              <a href="/newsroom/industry/metals-and-mining"><i class="fas fa-cogs"></i> Metals &amp; Mining</a>
              <a href="/newsroom/industry/oil-gas-and-energy"><i class="fas fa-oil-can"></i> Oil, Gas &amp; Energy</a>
              <a href="/newsroom/industry/paper-and-packaging"><i class="fas fa-box-open"></i> Paper &amp; Packaging</a>
              <a href="/newsroom/industry/publishing-and-media"><i class="fas fa-newspaper"></i> Publishing &amp; Media</a>
              <a href="/newsroom/industry/real-estate"><i class="fas fa-building"></i> Real Estate</a>
              <a href="/newsroom/industry/sports-leisure-and-entertainment"><i class="fas fa-baseball-ball"></i> Sports, Leisure &amp; Entertainment</a>
              <a href="/newsroom/industry/telecommunications"><i class="fas fa-signal"></i> Telecommunications</a>
              <a href="/newsroom/industry/transportation"><i class="fas fa-truck"></i> Transportation</a>
              <a href="/newsroom/industry/travel"><i class="fas fa-plane"></i> Travel</a>
              <a href="/newsroom/industry/utilities"><i class="fas fa-plug"></i> Utilities</a>
            </div>
          </div>
        </div>
      </li>
      <li class="menu-item">
        <a href="/professional-education-program">&#127891; EDU program</a>
      </li>
      <li class="menu-item anw-mobile-extra">
        <a href="/submit-a-press-release">Submit a Press Release <i class="fas fa-paper-plane"></i></a>
      </li>
      <li class="menu-item anw-mobile-extra">
        <a href="https://app.accessnewswire.com/login" target="_blank">Login <i class="fas fa-sign-in-alt"></i></a>
      </li>
      <li class="menu-item anw-mobile-extra">
        <a href="/contact-us">Contact Us <i class="fas fa-envelope"></i></a>
      </li>
    </ul>
  </div>
  <button class="anw-hamburger" aria-label="Open menu" aria-expanded="false" type="button">
    <span></span><span></span><span></span>
  </button>
  <div class="press-btn">
    <a href="/submit-a-press-release">Submit a Press Release <i class="fas fa-paper-plane"></i></a>
  </div>
  <div class="login-btn">
    <a href="https://app.accessnewswire.com/login" target="_blank">Login <i class="fas fa-sign-in-alt"></i></a>
  </div>
</div>
<div class="contact-btn" data-anw-menu="true">
  <a href="/contact-us">Contact Us <i class="fas fa-envelope"></i></a>
</div>
`;

  // ---- 4. Insert HTML at the script tag's location ----
  // document.currentScript works in modern browsers; fallback to last <script> for older ones
  var currentScript = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  // Use a wrapper so we get a single insertion point we can find later
  var wrapper = document.createElement('div');
  wrapper.setAttribute('data-anw-menu-wrapper', 'true');
  wrapper.innerHTML = html;

  if (currentScript && currentScript.parentNode) {
    currentScript.parentNode.insertBefore(wrapper, currentScript);
  } else {
    // Final fallback: append to body once it exists
    if (document.body) {
      document.body.insertBefore(wrapper, document.body.firstChild);
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        document.body.insertBefore(wrapper, document.body.firstChild);
        initMenu();
      });
      return;
    }
  }

  // ---- 5. Behaviour: hover dropdowns + arrow alignment, hamburger, accordion ----
  var MOBILE_BREAKPOINT = 1100;

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function initMenu() {
    var megaMenu = wrapper.querySelector('.mega-menu');
    var hamburger = wrapper.querySelector('.anw-hamburger');
    if (!megaMenu) return;

    var closeBtn = megaMenu.querySelector('.anw-panel-close');
    // remember where the panel lives so we can put it back after closing
    var megaHome = megaMenu.parentNode;
    var megaNext = megaMenu.nextSibling;

    // -- create one arrow element inside each dropdown --
    megaMenu.querySelectorAll('.menu-item.has-dropdown .dropdown').forEach(function (dd) {
      var arrow = document.createElement('span');
      arrow.className = 'anw-dd-arrow';
      dd.appendChild(arrow);
    });

    // Align the arrow horizontally under the hovered link, and open the
    // dropdown just below the NAVBAR's real bottom edge (not the link's),
    // so the vertical position is identical on every page template.
    function alignArrow(item) {
      var link = item.querySelector(':scope > a') || item.firstElementChild;
      var dd = item.querySelector('.dropdown');
      if (!link || !dd) return;
      var navbar = wrapper.querySelector('.navbar');
      if (navbar) {
        var navRect = navbar.getBoundingClientRect();
        var itemRect = item.getBoundingClientRect();
        dd.style.top = Math.round(navRect.bottom - itemRect.top) + 'px';
      }
      var arrow = dd.querySelector('.anw-dd-arrow');
      if (!arrow) return;
      var linkRect = link.getBoundingClientRect();
      var ddRect = dd.getBoundingClientRect();
      var center = linkRect.left + linkRect.width / 2 - ddRect.left;
      // keep the arrow within the dropdown edges (account for radius)
      center = Math.max(14, Math.min(ddRect.width - 14, center));
      arrow.style.left = center + 'px';
      arrow.style.marginLeft = '0px';
    }

    // -- desktop hover dropdowns --
    megaMenu.querySelectorAll('.menu-item').forEach(function (item) {
      var timeout;
      item.addEventListener('mouseenter', function () {
        if (isMobile()) return;
        clearTimeout(timeout);
        item.classList.add('hover');
        if (item.classList.contains('has-dropdown')) alignArrow(item);
      });
      item.addEventListener('mouseleave', function () {
        if (isMobile()) return;
        timeout = setTimeout(function () {
          item.classList.remove('hover');
        }, 250); // grace period so the cursor can cross the gap down to the dropdown
      });
    });

    // -- mobile: open/close. The panel is moved to <body> while open so
    //    no Duda header container (transform / stacking context) can
    //    trap it behind the page content. --
    function openPanel() {
      document.body.appendChild(megaMenu);
      megaMenu.classList.add('anw-panel-open');
      // inline-style kill: no stylesheet anywhere can resurrect the arrows
      megaMenu.querySelectorAll('.anw-dd-arrow').forEach(function (a) {
        a.style.display = 'none';
      });
      if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    function closePanel() {
      megaMenu.classList.remove('anw-panel-open');
      // collapse any open accordion sections
      megaMenu.querySelectorAll('.menu-item.anw-open').forEach(function (item) {
        item.classList.remove('anw-open');
      });
      // restore arrows for desktop use
      megaMenu.querySelectorAll('.anw-dd-arrow').forEach(function (a) {
        a.style.display = '';
      });
      // put the panel back where it belongs in the navbar
      if (megaNext && megaNext.parentNode === megaHome) {
        megaHome.insertBefore(megaMenu, megaNext);
      } else {
        megaHome.appendChild(megaMenu);
      }
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    if (hamburger) {
      hamburger.addEventListener('click', openPanel);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', closePanel);
    }

    // -- mobile: accordion toggles on items that have dropdowns --
    megaMenu.querySelectorAll('.menu-item.has-dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (!megaMenu.classList.contains('anw-panel-open')) return;
        e.preventDefault(); // tap toggles the section, never navigates
        var item = link.parentNode;
        var wasOpen = item.classList.contains('anw-open');
        megaMenu.querySelectorAll('.menu-item.anw-open').forEach(function (other) {
          other.classList.remove('anw-open');
        });
        if (!wasOpen) item.classList.add('anw-open');
      });
    });

    // -- if resized back to desktop while the panel is open, restore it --
    window.addEventListener('resize', function () {
      if (!isMobile() && megaMenu.classList.contains('anw-panel-open')) {
        closePanel();
      }
    });
  }

  initMenu();
})();
