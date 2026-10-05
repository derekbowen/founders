import { Listing } from '../types/marketplace';
import { covers } from './images';

export const listings: Listing[] = [
{
  id: 'l-brand-identity',
  title: 'Complete brand identity & logo system',
  freelancerId: 'u-maya',
  category: 'design',
  skills: ['Brand identity', 'Logo design', 'Typography'],
  startingPrice: 950,
  deliveryDays: 10,
  rating: 4.9,
  reviewCount: 128,
  cover: covers.brandIdentity,
  gallery: [covers.brandIdentity, covers.webflowLanding, covers.illustration, covers.saasUi],
  summary: 'Logo, color, type and a guideline book your whole team can use from day one.',
  description: [
  'A strong identity makes every touchpoint feel intentional. I start with a short discovery workshop to understand your audience, competitors and ambitions, then explore three distinct creative routes before refining one into a complete system.',
  'You receive production-ready files for print and digital, plus a guideline book that explains how to use everything — so your brand stays consistent long after our project ends.'],

  includes: ['Discovery workshop (60 min)', '3 initial logo concepts', 'Color palette & type system', 'Brand guideline PDF', 'Source files (AI, SVG, PNG)'],
  faq: [
  { question: 'How many revisions are included?', answer: 'Two rounds of revisions on the chosen direction are included. Additional rounds can be added to your offer.' },
  { question: 'Do I own the final logo?', answer: 'Yes. Full copyright transfers to you once the project is completed and paid.' },
  { question: 'Can you also design a website?', answer: 'I can deliver a homepage design as an add-on. Mention it in your brief and I will include it in my offer.' }],

  languages: ['English', 'French'],
  location: 'Nigeria',
  featured: true
},
{
  id: 'l-saas-ui',
  title: 'SaaS dashboard UI/UX design in Figma',
  freelancerId: 'u-lucas',
  category: 'design',
  skills: ['UI design', 'UX research', 'Figma', 'Design systems'],
  startingPrice: 1200,
  deliveryDays: 14,
  rating: 4.9,
  reviewCount: 86,
  cover: covers.saasUi,
  gallery: [covers.saasUi, covers.webflowLanding, covers.mobileApp, covers.brandIdentity],
  summary: 'Clean, data-dense dashboards with a reusable component library.',
  description: [
  'I design SaaS products that feel effortless even when the underlying workflow is complex. We start with a review of your existing product and user flows, then I map the key jobs-to-be-done before moving into high-fidelity screens.',
  'Every project ships with an organized Figma file, auto-layout components, and a clickable prototype your developers and stakeholders can explore.'],

  includes: ['UX audit of current flows', 'Up to 8 high-fidelity screens', 'Component library with variants', 'Interactive prototype', 'Developer handoff session'],
  faq: [
  { question: 'Do you work with existing design systems?', answer: 'Absolutely — I can extend your current system or build a new one from scratch.' },
  { question: 'Which tools do you use?', answer: 'Figma for design and prototyping, FigJam for workshops, and Loom for async walkthroughs.' }],

  languages: ['English', 'German'],
  location: 'Germany',
  featured: true
},
{
  id: 'l-editorial-illustration',
  title: 'Custom editorial illustrations for blogs & launches',
  freelancerId: 'u-sofia',
  category: 'design',
  skills: ['Illustration', 'Character design', 'Editorial'],
  startingPrice: 280,
  deliveryDays: 5,
  rating: 5.0,
  reviewCount: 61,
  cover: covers.illustration,
  gallery: [covers.illustration, covers.explainer, covers.brandIdentity, covers.socialMedia],
  summary: 'Bold, playful illustrations that make abstract ideas memorable.',
  description: [
  'Whether it is a blog header, a product launch hero or a full illustration set, I create images with personality that match your brand. I share rough sketches first so we agree on composition before I move to color.',
  'Illustrations are delivered in high resolution with layered source files, sized for web, social and print.'],

  includes: ['1 detailed illustration', 'Sketch round before color', 'Web, social & print sizes', 'Layered source file'],
  faq: [
  { question: 'Can you match our existing illustration style?', answer: 'Yes, share examples in your brief and I will adapt my approach to fit.' },
  { question: 'Do you offer bundles?', answer: 'Sets of 5 or 10 illustrations get a discounted rate — just mention the quantity in your request.' }],

  languages: ['English', 'Spanish'],
  location: 'Spain'
},
{
  id: 'l-react-webapp',
  title: 'Full-stack React & Node web application',
  freelancerId: 'u-arjun',
  category: 'development',
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  startingPrice: 2500,
  deliveryDays: 21,
  rating: 4.8,
  reviewCount: 92,
  cover: covers.reactWebapp,
  gallery: [covers.reactWebapp, covers.technicalWriting, covers.saasUi, covers.mobileApp],
  summary: 'Production-grade MVPs with auth, payments, and a clean, typed codebase.',
  description: [
  'I build MVPs and internal tools that are ready for real users on day one. Expect a typed React front end, a Node/Express or tRPC API, a Postgres database, and automated deploys to your cloud of choice.',
  'I work in weekly milestones with demo links, so you always know where the project stands and can steer priorities as we go.'],

  includes: ['Technical scoping call', 'Auth, roles & permissions', 'Stripe payments integration', 'CI/CD & staging environment', '30 days of post-launch support'],
  faq: [
  { question: 'Who owns the code?', answer: 'You do. All work is committed to your repository from day one.' },
  { question: 'Can you work from our designs?', answer: 'Yes, I regularly implement from Figma and can flag UX improvements along the way.' },
  { question: 'Do you offer ongoing maintenance?', answer: 'After launch I offer monthly retainers for features and maintenance.' }],

  languages: ['English', 'Hindi'],
  location: 'India',
  featured: true
},
{
  id: 'l-shopify-store',
  title: 'Shopify store setup & custom theme',
  freelancerId: 'u-emma',
  category: 'development',
  skills: ['Shopify', 'Liquid', 'CRO'],
  startingPrice: 800,
  deliveryDays: 7,
  rating: 4.9,
  reviewCount: 110,
  cover: covers.shopify,
  gallery: [covers.shopify, covers.emailMarketing, covers.webflowLanding, covers.paidAds],
  summary: 'A fast, conversion-optimized Shopify store tailored to your brand.',
  description: [
  'From a fresh setup to a full theme customization, I build Shopify stores that load fast and sell well. I configure products, collections, shipping, taxes and the apps you actually need — nothing bloated.',
  'Every store includes a recorded training session so your team can confidently manage products, discounts and content.'],

  includes: ['Store setup & configuration', 'Custom theme sections', 'Up to 25 products imported', 'Speed optimization', 'Team training session'],
  faq: [
  { question: 'Can you migrate from WooCommerce?', answer: 'Yes, I handle product, customer and order migrations from WooCommerce, Squarespace and BigCommerce.' },
  { question: 'Do you design the store too?', answer: 'I can work from your designs or adapt a premium theme to your brand guidelines.' }],

  languages: ['English', 'Czech', 'German'],
  location: 'Czechia'
},
{
  id: 'l-react-native-app',
  title: 'iOS & Android app with React Native',
  freelancerId: 'u-daniel',
  category: 'development',
  skills: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
  startingPrice: 3200,
  deliveryDays: 30,
  rating: 4.7,
  reviewCount: 41,
  cover: covers.mobileApp,
  gallery: [covers.mobileApp, covers.saasUi, covers.reactWebapp, covers.product3d],
  summary: 'Cross-platform mobile apps with native-feeling performance.',
  description: [
  'I take your app from Figma to the App Store and Google Play using React Native and Expo. Smooth animations, offline support and push notifications are standard.',
  'I handle store submission, TestFlight betas and crash reporting, so your launch is calm instead of chaotic.'],

  includes: ['Cross-platform iOS & Android build', 'Push notifications', 'Analytics & crash reporting', 'App Store & Play submission'],
  faq: [
  { question: 'Do I need a developer account?', answer: 'Yes, you will need Apple and Google developer accounts. I will guide you through setup.' },
  { question: 'Can you add a backend?', answer: 'I typically use Firebase or Supabase, and can integrate with your existing API.' }],

  languages: ['English', 'Korean'],
  location: 'South Korea'
},
{
  id: 'l-seo-articles',
  title: 'SEO blog articles for SaaS & tech',
  freelancerId: 'u-hannah',
  category: 'writing',
  skills: ['SEO writing', 'Blog posts', 'Keyword research'],
  startingPrice: 180,
  deliveryDays: 3,
  rating: 4.9,
  reviewCount: 240,
  cover: covers.seoBlog,
  gallery: [covers.seoBlog, covers.copywriting, covers.technicalWriting, covers.socialMedia],
  summary: 'Long-form articles researched to rank and written to convert.',
  description: [
  'Each article starts with keyword and SERP research, followed by an outline you approve before I write. I interview your subject-matter experts when needed so the content carries real expertise.',
  'You receive a polished, on-brand article with meta title, description, internal link suggestions and an optimized structure.'],

  includes: ['Keyword & SERP research', 'Outline for approval', '1,500-word article', 'Meta title & description', 'One revision round'],
  faq: [
  { question: 'Do you use AI writing tools?', answer: 'No. Every article is researched and written by me, and I can share my research notes.' },
  { question: 'Can you upload to our CMS?', answer: 'Yes — WordPress, Webflow, Ghost and HubSpot are all fine.' }],

  languages: ['English'],
  location: 'United States',
  featured: true
},
{
  id: 'l-website-copy',
  title: 'Conversion-focused website copy',
  freelancerId: 'u-oliver',
  category: 'writing',
  skills: ['Copywriting', 'Messaging', 'UX writing'],
  startingPrice: 450,
  deliveryDays: 5,
  rating: 4.8,
  reviewCount: 77,
  cover: covers.copywriting,
  gallery: [covers.copywriting, covers.webflowLanding, covers.seoBlog, covers.brandIdentity],
  summary: 'Homepage and landing page copy grounded in real customer research.',
  description: [
  'Great copy is mostly research. I review your customer interviews, reviews and sales calls to find the exact words your buyers use, then craft messaging that speaks directly to them.',
  'Deliverables include a wireframe-ready copy document with headline variations for A/B testing.'],

  includes: ['Messaging & positioning review', 'Homepage or landing page copy', '3 headline variations', 'Wireframe-ready doc'],
  faq: [
  { question: 'How long does the research take?', answer: 'Usually 1–2 days. If you have customer interviews, I will start there.' },
  { question: 'Do you write product copy?', answer: 'Yes, including onboarding flows, empty states and in-app messaging.' }],

  languages: ['English'],
  location: 'United Kingdom'
},
{
  id: 'l-api-docs',
  title: 'API documentation & technical writing',
  freelancerId: 'u-arjun',
  category: 'writing',
  skills: ['Technical writing', 'API docs', 'Markdown'],
  startingPrice: 600,
  deliveryDays: 7,
  rating: 4.9,
  reviewCount: 38,
  cover: covers.technicalWriting,
  gallery: [covers.technicalWriting, covers.reactWebapp, covers.seoBlog, covers.saasUi],
  summary: 'Developer docs written by an engineer, for engineers.',
  description: [
  'I write reference docs, quick-start guides and tutorials that help developers succeed on their first try. I test every code sample against your API before it ships.',
  'Docs can be delivered as Markdown, in your docs platform (Mintlify, ReadMe, Docusaurus) or as an OpenAPI spec.'],

  includes: ['Docs structure & IA', 'Quick-start guide', 'Endpoint reference pages', 'Tested code samples'],
  faq: [
  { question: 'Can you generate docs from OpenAPI?', answer: 'Yes, and I will enrich the generated reference with real examples and guides.' },
  { question: 'Which languages do your samples cover?', answer: 'cURL, JavaScript, Python and Go by default.' }],

  languages: ['English', 'Hindi'],
  location: 'India'
},
{
  id: 'l-explainer-video',
  title: 'Animated 2D explainer video',
  freelancerId: 'u-kenji',
  category: 'video',
  skills: ['2D animation', 'Motion graphics', 'After Effects'],
  startingPrice: 1100,
  deliveryDays: 14,
  rating: 5.0,
  reviewCount: 52,
  cover: covers.explainer,
  gallery: [covers.explainer, covers.illustration, covers.product3d, covers.videoEditing],
  summary: 'A 60–90 second explainer with script, voiceover and sound design.',
  description: [
  'I turn complex products into clear, delightful stories. We begin with a script and storyboard, then I design the style frames and animate every scene with smooth, intentional motion.',
  'Professional voiceover, licensed music and sound effects are included, and you get versions for web, social and presentations.'],

  includes: ['Script & storyboard', 'Custom illustrated style frames', 'Professional voiceover', 'Music & sound design', '16:9, 1:1 and 9:16 exports'],
  faq: [
  { question: 'Can you use our brand illustrations?', answer: 'Yes. I can animate your existing assets or create a new style that fits your brand.' },
  { question: 'What languages are available for voiceover?', answer: 'English and Japanese in-house, with partners for 20+ other languages.' }],

  languages: ['English', 'Japanese'],
  location: 'Japan',
  featured: true
},
{
  id: 'l-youtube-editing',
  title: 'YouTube video editing & color grading',
  freelancerId: 'u-priya',
  category: 'video',
  skills: ['Video editing', 'Color grading', 'Premiere Pro'],
  startingPrice: 150,
  deliveryDays: 2,
  rating: 4.9,
  reviewCount: 180,
  cover: covers.videoEditing,
  gallery: [covers.videoEditing, covers.explainer, covers.socialMedia, covers.product3d],
  summary: 'Retention-focused edits with captions, color and pacing that hooks.',
  description: [
  'Send me your raw footage and I will return a tightly paced edit with B-roll, motion titles, captions and a cinematic grade. I study your channel analytics to edit for retention.',
  'Short-form cutdowns for Shorts, Reels and TikTok are available in the same order.'],

  includes: ['Edit up to 15 minutes of final runtime', 'Color correction & grade', 'Captions & motion titles', 'Licensed music'],
  faq: [
  { question: 'How do I send footage?', answer: 'Upload to Google Drive, Dropbox or Frame.io and share the link in your brief.' },
  { question: 'Do you design thumbnails?', answer: 'Yes, thumbnails can be added to any offer.' }],

  languages: ['English', 'Hindi'],
  location: 'Canada'
},
{
  id: 'l-3d-product-renders',
  title: '3D product renders & motion loops',
  freelancerId: 'u-kenji',
  category: 'video',
  skills: ['3D rendering', 'Cinema 4D', 'Motion graphics'],
  startingPrice: 700,
  deliveryDays: 7,
  rating: 5.0,
  reviewCount: 25,
  cover: covers.product3d,
  gallery: [covers.product3d, covers.mobileApp, covers.explainer, covers.shopify],
  summary: 'Photoreal product visuals for launches, stores and ads.',
  description: [
  'No studio shoot needed. I model your product from CAD files or reference photos and produce photoreal stills and seamless motion loops.',
  'Renders are delivered at up to 4K with transparent background versions ready for your store and ads.'],

  includes: ['3D model from CAD or photos', '5 still renders', '1 ten-second motion loop', 'Transparent PNG versions'],
  faq: [
  { question: 'What files do you need?', answer: 'CAD (STEP/OBJ) is ideal, but detailed photos and dimensions work too.' },
  { question: 'Can you do exploded views?', answer: 'Yes — exploded and cross-section animations are a specialty.' }],

  languages: ['English', 'Japanese'],
  location: 'Japan'
},
{
  id: 'l-paid-ads',
  title: 'Meta & Google Ads campaign management',
  freelancerId: 'u-carlos',
  category: 'marketing',
  skills: ['Meta Ads', 'Google Ads', 'Analytics'],
  startingPrice: 650,
  deliveryDays: 7,
  rating: 4.8,
  reviewCount: 101,
  cover: covers.paidAds,
  gallery: [covers.paidAds, covers.emailMarketing, covers.socialMedia, covers.shopify],
  summary: 'Account audit, tracking setup and campaigns built to scale profitably.',
  description: [
  'I audit your ad accounts, fix tracking (Pixel, CAPI, GA4) and rebuild campaigns around clear testing frameworks. You get weekly reporting focused on CAC and ROAS — not vanity metrics.',
  'Ongoing management is available after the initial setup sprint.'],

  includes: ['Full account audit', 'Pixel, CAPI & GA4 tracking', 'Campaign structure & launch', 'Creative testing plan', 'Weekly performance report'],
  faq: [
  { question: 'Is ad spend included?', answer: 'No, ad spend is billed directly by Meta and Google to your account.' },
  { question: 'What budgets do you work with?', answer: 'Typically $5K–$150K per month in ad spend.' }],

  languages: ['English', 'Portuguese', 'Spanish'],
  location: 'Brazil'
},
{
  id: 'l-social-strategy',
  title: 'Social media strategy & 90-day content calendar',
  freelancerId: 'u-chloe',
  category: 'marketing',
  skills: ['Social strategy', 'Content calendar', 'Instagram', 'TikTok'],
  startingPrice: 400,
  deliveryDays: 5,
  rating: 4.9,
  reviewCount: 73,
  cover: covers.socialMedia,
  gallery: [covers.socialMedia, covers.illustration, covers.videoEditing, covers.paidAds],
  summary: 'A clear social strategy and a calendar your team can actually execute.',
  description: [
  'I research your audience and competitors, define 3–4 content pillars, and map a 90-day calendar with post formats, hooks and captions.',
  'You also receive a lightweight workflow template for Notion so planning and approvals stay simple.'],

  includes: ['Audience & competitor research', 'Content pillars & tone guide', '90-day content calendar', 'Notion workflow template'],
  faq: [
  { question: 'Which platforms do you cover?', answer: 'Instagram, TikTok, LinkedIn and Pinterest.' },
  { question: 'Do you also post for us?', answer: 'Community management can be added as a monthly retainer.' }],

  languages: ['English', 'French'],
  location: 'France',
  featured: true
},
{
  id: 'l-klaviyo-email',
  title: 'Email marketing automation in Klaviyo',
  freelancerId: 'u-carlos',
  category: 'marketing',
  skills: ['Klaviyo', 'Email automation', 'Copywriting'],
  startingPrice: 550,
  deliveryDays: 10,
  rating: 4.8,
  reviewCount: 48,
  cover: covers.emailMarketing,
  gallery: [covers.emailMarketing, covers.shopify, covers.paidAds, covers.copywriting],
  summary: 'Welcome, abandoned cart and post-purchase flows that drive revenue.',
  description: [
  'I design and build the core Klaviyo flows that typically generate 25–40% of e-commerce email revenue. Copy, design and segmentation are all included.',
  'Flows are A/B tested from launch so they keep improving after handoff.'],

  includes: ['Welcome series (3 emails)', 'Abandoned cart flow', 'Post-purchase flow', 'Segmentation setup'],
  faq: [
  { question: 'Do you migrate from Mailchimp?', answer: 'Yes, including lists, templates and historical data where possible.' },
  { question: 'Are templates mobile-friendly?', answer: 'Every template is tested across major clients and devices.' }],

  languages: ['English', 'Portuguese', 'Spanish'],
  location: 'Brazil'
},
{
  id: 'l-webflow-landing',
  title: 'High-converting landing page in Webflow',
  freelancerId: 'u-jordan',
  category: 'design',
  skills: ['Webflow', 'Landing pages', 'UI design'],
  startingPrice: 900,
  deliveryDays: 7,
  rating: 4.9,
  reviewCount: 31,
  cover: covers.webflowLanding,
  gallery: [covers.webflowLanding, covers.saasUi, covers.copywriting, covers.brandIdentity],
  summary: 'Designed and built in Webflow, with CMS and analytics ready to go.',
  description: [
  'I design and develop landing pages that load fast and convert. You get a responsive Webflow build with interactions, CMS collections and analytics wired up.',
  'Includes a walkthrough video so your team can update content without a developer.'],

  includes: ['Custom design in Figma', 'Responsive Webflow build', 'CMS & form setup', 'Analytics integration'],
  faq: [
  { question: 'Do I need a Webflow plan?', answer: 'Yes, a Site plan is required to publish on your custom domain.' },
  { question: 'Can you write the copy?', answer: 'I partner with a copywriter and can include copy in my offer.' }],

  languages: ['English', 'Spanish'],
  location: 'United States'
}];