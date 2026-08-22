const BLOG_POSTS_KEY = 'shri-digital-blog-posts';

const defaultBlogPosts = [
  {
    slug: 'digital-strategy-for-growing-businesses',
    title: 'Why Digital Strategy Matters for Growing Businesses',
    category: 'Strategy',
    date: '2026-08-22',
    excerpt: 'A practical guide to connecting business goals, customer insight and digital execution before investing in tools or campaigns.',
    body: 'Growth becomes easier to measure when your digital activity is tied to a clear business outcome. Start with the customer problem, define the commercial goal, and then choose the channels and technology that support it.\n\nA strong strategy creates focus across content, search, design and development. It also gives your team a simple way to decide what to build now, what to test next and what to leave behind.\n\nAt Shri Digital Consultancy, we turn that clarity into an actionable roadmap with priorities, owners and measurable milestones.'
  },
  {
    slug: 'seo-foundations-that-compound',
    title: 'SEO Foundations That Compound Over Time',
    category: 'SEO',
    date: '2026-08-15',
    excerpt: 'The essential technical, content and measurement habits that help a website earn qualified attention consistently.',
    body: 'Sustainable SEO is built from useful pages, clear site structure and a fast experience. Begin by mapping the questions your best customers ask, then create focused pages that answer those questions better than generic competitor content.\n\nTechnical hygiene matters too: descriptive titles, crawlable links, sensible headings, structured data and strong mobile performance make it easier for search engines and people to understand your site.\n\nReview performance monthly, learn from the pages already earning traction, and improve them before chasing every new keyword.'
  },
  {
    slug: 'website-conversion-checklist',
    title: 'A Website Conversion Checklist for Better Enquiries',
    category: 'Web',
    date: '2026-08-08',
    excerpt: 'Small improvements in clarity, trust and friction can turn more of your existing traffic into meaningful conversations.',
    body: 'A converting website answers three questions quickly: what do you do, who is it for, and what should I do next? Make the primary action visible, use specific proof, and remove unnecessary fields from enquiry forms.\n\nYour pages should also load quickly and work comfortably on a phone. Test the complete journey from first visit to form confirmation, including the message a visitor sees after submitting their details.\n\nConversion optimisation is an ongoing practice, not a redesign event. Track completed enquiries and use real user questions to refine the experience.'
  }
];

function getBlogPosts(){
  try {
    const saved = JSON.parse(localStorage.getItem(BLOG_POSTS_KEY));
    return Array.isArray(saved) && saved.length ? saved : defaultBlogPosts;
  } catch(error) {
    return defaultBlogPosts;
  }
}

function saveBlogPosts(posts){
  localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
}
