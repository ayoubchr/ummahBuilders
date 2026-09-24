
import React from 'react';
import { GlassPanel } from '../../components/GlassPanel';

const BLOG_POSTS = [
  {
    id: 1,
    title: "Privacy in the Age of Surveillance",
    excerpt: "How Muslim engineers are building decentralized authentication protocols to protect identities in high-surveillance regions.",
    date: "Shawwal 1445",
    author: "Zaid Ali",
    tags: ["Privacy", "Security"]
  },
  {
    id: 2,
    title: "Ethical AI: Beyond the Algorithm",
    excerpt: "Exploring the intersections of Islamic ethics and machine learning. Why representation in datasets matters more than ever.",
    date: "Ramadan 1445",
    author: "Amina Hussein",
    tags: ["AI", "Ethics"]
  },
  {
    id: 3,
    title: "The Rise of Islamic Fintech",
    excerpt: "A deep dive into the new wave of Sharia-compliant financial tools being built by our collective members.",
    date: "Shaban 1445",
    author: "Karim Yusuf",
    tags: ["Finance", "Fintech"]
  },
  {
    id: 4,
    title: "Building Community Platforms",
    excerpt: "Lessons learned from scaling Ummah Builders. How to foster trust and coordination in a global network.",
    date: "Rajab 1445",
    author: "Hana Malik",
    tags: ["Community", "Growth"]
  }
];

export const Blog: React.FC = () => {
  return (
    <div className="h-full bg-neutral-50 dark:bg-[#0a0a0a] overflow-y-auto p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-4xl font-light text-neutral-900 dark:text-white tracking-tighter">Community Blog</h1>
          <p className="text-sm text-neutral-500 font-light">Updates, case studies, and stories from the collective.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map(post => (
            <GlassPanel 
              key={post.id} 
              className="flex flex-col h-full bg-white dark:bg-[#121212] p-8 group cursor-pointer hover:border-teal-500/30 transition-all border border-neutral-100 dark:border-neutral-800"
            >
              <div className="space-y-4 flex-1">
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <h3 className="text-xl font-medium text-neutral-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{post.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3 font-light">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-neutral-50 dark:border-neutral-800 flex justify-between items-center text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                <span>By {post.author}</span>
                <span>{post.date}</span>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
};
