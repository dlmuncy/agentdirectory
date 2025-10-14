'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">AI Agent Directory</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors">
              Browse Agents
            </Link>
            <Link href="/compare" className="text-sm font-medium hover:text-primary transition-colors">
              Compare
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:text-primary transition-colors">
              Resources
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link href="/custom-request" className="hidden md:block">
              <Button>Request Custom Build</Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors">
                Browse Agents
              </Link>
              <Link href="/compare" className="text-sm font-medium hover:text-primary transition-colors">
                Compare
              </Link>
              <Link href="/resources" className="text-sm font-medium hover:text-primary transition-colors">
                Resources
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/custom-request">
                <Button className="w-full">Request Custom Build</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
