import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl">AI Agent Directory</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your trusted marketplace for AI agent solutions. Find the perfect pre-built agent or request a custom development that fits your exact needs.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/browse" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse All Agents
                </Link>
              </li>
              <li>
                <Link href="/browse?category=Customer+Support" className="text-muted-foreground hover:text-primary transition-colors">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link href="/browse?category=Sales" className="text-muted-foreground hover:text-primary transition-colors">
                  Sales Automation
                </Link>
              </li>
              <li>
                <Link href="/browse?category=Content+Creation" className="text-muted-foreground hover:text-primary transition-colors">
                  Content Creation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/custom-request" className="text-muted-foreground hover:text-primary transition-colors">
                  Request Custom Build
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AI Agent Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
