
const BLOG_POSTS_KEY = 'shri-digital-blog-posts';

const defaultBlogPosts = [

  {
    slug: 'how-digital-marketing-helps-businesses-grow-2026',

    title: 'How Digital Marketing Helps Businesses Grow in 2026',

    category: 'Digital Marketing',

    date: '2026-09-21',

    image: 'assets/images/Blog1.png',

    excerpt: 'In today’s competitive business environment, having a strong online presence is no longer optional. Customers increasingly discover brands through search engines, social media, online advertisements, and digital platforms before making a purchase decision.',

    body: '',

    url: 'Blogs/how-digital-marketing-helps-businesses-grow-2026.html'
  },


  {
    slug: 'why-your-business-needs-a-professional-website-in-2026',

    title: 'Why Your Business Needs a Professional Website in 2026',

    category: 'Web Development',

    date: '2026-09-21',

    image: 'assets/images/Blog2.png',

    excerpt: 'Your website is more than an online brochure. In 2026, it can work as a digital storefront, lead-generation platform, sales channel, customer-support resource, and important part of your brand identity.',

    body: '',

    url: 'Blogs/why-your-business-needs-a-professional-website-in-2026.html'
  },


  {
    slug: 'seo-vs-aeo-vs-geo-future-of-search-optimization',

    title: 'SEO vs AEO vs GEO: The Future of Search Optimization',

    category: 'SEO',

    date: '2026-09-21',

    image: 'assets/images/Blog3.png',

    excerpt: 'Search is changing rapidly. People are no longer using search engines only to find a list of websites. They are increasingly asking complete questions and expecting direct, useful answers.',

    body: '',

    url: 'Blogs/seo-vs-aeo-vs-geo-future-of-search-optimization.html'
  },


  {
    slug: 'how-to-build-a-successful-ecommerce-website-for-your-business',

    title: 'How to Build a Successful E-commerce Website for Your Business',

    category: 'E-commerce',

    date: '2026-09-21',

    image: 'assets/images/Blog4.png',

    excerpt: 'Online shopping has become an important part of modern consumer behaviour. Customers expect convenient product discovery, simple navigation, secure payments, fast websites, and transparent delivery information.',

    body: '',

    url: 'Blogs/how-to-build-a-successful-ecommerce-website-for-your-business.html'
  },


  {
    slug: 'how-performance-marketing-can-generate-better-leads-and-sales',

    title: 'How Performance Marketing Can Generate Better Leads and Sales',

    category: 'Performance Marketing',

    date: '2026-09-21',

    image: 'assets/images/Blog5.png',

    excerpt: 'Businesses today want more than visibility. They want measurable results such as qualified leads, enquiries, sales, registrations, and revenue.',

    body: '',

    url: 'Blogs/how-performance-marketing-can-generate-better-leads-and-sales.html'
  },


  {
    slug: 'ai-search-geo-in-2026-how-businesses-can-get-found-on-google-chatgpt-ai-search',

    title: 'AI Search & GEO in 2026: How Businesses Can Get Found on Google, ChatGPT & AI Search',

    category: 'SEO',

    date: '2026-09-24',

    image: 'assets/images/Blog6.png',

    excerpt: 'The way people search for businesses, products and services is changing rapidly. In 2026, customers are increasingly using AI-powered search experiences and platforms such as ChatGPT, Gemini and other conversational tools to research brands, compare services and find answers.',

    body: '',

    url: 'Blogs/ai-search-geo-in-2026-how-businesses-can-get-found-on-google-chatgpt-ai-search.html'
  }

];


/* =========================================
   GET BLOG POSTS
========================================= */

function getBlogPosts() {

  try {

    const saved = localStorage.getItem(BLOG_POSTS_KEY);

    if (saved) {

      const posts = JSON.parse(saved);

      if (Array.isArray(posts) && posts.length > 0) {

        return posts;

      }

    }

  } catch (error) {

    console.error(
      'Unable to load blog posts:',
      error
    );

  }

  return defaultBlogPosts;

}


/* =========================================
   SAVE BLOG POSTS
========================================= */

function saveBlogPosts(posts) {

  try {

    localStorage.setItem(
      BLOG_POSTS_KEY,
      JSON.stringify(posts)
    );

  } catch (error) {

    console.error(
      'Unable to save blog posts:',
      error
    );

  }

}
