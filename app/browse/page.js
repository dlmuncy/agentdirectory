'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AgentCard from '@/components/agents/AgentCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';

const categories = [
  'Customer Support',
  'Sales',
  'Content Creation',
  'Marketing Automation',
  'Data Processing'
];

const industries = [
  'SaaS',
  'E-commerce',
  'B2B',
  'Enterprise',
  'Small Business',
  'Healthcare',
  'Financial Services'
];

const priceRanges = [
  { value: 'free', label: 'Free' },
  { value: 'under-100', label: 'Under $100/mo' },
  { value: '100-500', label: '$100 - $500/mo' },
  { value: '500-1000', label: '$500 - $1,000/mo' },
  { value: '1000-plus', label: '$1,000+/mo' },
  { value: 'custom', label: 'Custom Pricing' }
];

const difficulties = ['Low', 'Medium', 'High'];

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  
  // Comparison state
  const [compareAgents, setCompareAgents] = useState([]);
  
  useEffect(() => {
    // Initialize from URL params
    const category = searchParams.get('category');
    const industry = searchParams.get('industry');
    const price = searchParams.get('price');
    const search = searchParams.get('search');
    
    if (category) setSelectedCategories(category.split(','));
    if (industry) setSelectedIndustries(industry.split(','));
    if (price) setSelectedPrice(price);
    if (search) setSearchQuery(search);
  }, []);
  
  useEffect(() => {
    fetchAgents();
  }, [selectedCategories, selectedIndustries, selectedPrice, selectedDifficulties, searchQuery, sortBy, pagination.page]);
  
  const fetchAgents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (selectedCategories.length > 0) {
        params.append('category', selectedCategories.join(','));
      }
      if (selectedIndustries.length > 0) {
        params.append('industry', selectedIndustries.join(','));
      }
      if (selectedPrice) {
        params.append('price', selectedPrice);
      }
      if (selectedDifficulties.length > 0) {
        params.append('difficulty', selectedDifficulties.join(','));
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      params.append('sort', sortBy);
      params.append('page', pagination.page);
      params.append('limit', '12');
      
      const response = await fetch(`/api/agents?${params.toString()}`);
      const data = await response.json();
      
      setAgents(data.agents || []);
      setPagination(data.pagination || { page: 1, total: 0, pages: 1 });
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCategoryChange = (category, checked) => {
    setSelectedCategories(prev =>
      checked ? [...prev, category] : prev.filter(c => c !== category)
    );
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  
  const handleIndustryChange = (industry, checked) => {
    setSelectedIndustries(prev =>
      checked ? [...prev, industry] : prev.filter(i => i !== industry)
    );
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  
  const handleDifficultyChange = (difficulty, checked) => {
    setSelectedDifficulties(prev =>
      checked ? [...prev, difficulty] : prev.filter(d => d !== difficulty)
    );
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedIndustries([]);
    setSelectedPrice('');
    setSelectedDifficulties([]);
    setSearchQuery('');
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  
  const handleCompareChange = (agent, checked) => {
    if (checked && compareAgents.length < 3) {
      setCompareAgents(prev => [...prev, agent.id]);
    } else {
      setCompareAgents(prev => prev.filter(id => id !== agent.id));
    }
  };
  
  const goToComparison = () => {
    if (compareAgents.length > 0) {
      window.location.href = `/compare?agents=${compareAgents.join(',')}`;
    }
  };
  
  const activeFiltersCount = selectedCategories.length + selectedIndustries.length + 
    selectedDifficulties.length + (selectedPrice ? 1 : 0);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Browse AI Agents</h1>
        <p className="text-muted-foreground">
          Discover and compare {pagination.total} verified AI solutions
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className=\"flex gap-6\">
        {/* Filters Sidebar */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
          <Card className=\"sticky top-20\">
            <CardContent className=\"pt-6\">
              <div className=\"flex items-center justify-between mb-4\">
                <h2 className=\"font-semibold\">Filters</h2>
                {activeFiltersCount > 0 && (
                  <Button
                    variant=\"ghost\"
                    size=\"sm\"
                    onClick={clearFilters}
                    className=\"text-xs\"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              {/* Category Filter */}
              <div className=\"mb-6\">
                <h3 className=\"font-medium mb-3 text-sm\">Category</h3>
                <div className=\"space-y-2\">
                  {categories.map((category) => (
                    <div key={category} className=\"flex items-center gap-2\">
                      <Checkbox
                        id={`cat-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked)}
                      />
                      <Label htmlFor={`cat-${category}`} className=\"text-sm cursor-pointer\">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Industry Filter */}
              <div className=\"mb-6\">
                <h3 className=\"font-medium mb-3 text-sm\">Industry</h3>
                <div className=\"space-y-2\">
                  {industries.map((industry) => (
                    <div key={industry} className=\"flex items-center gap-2\">
                      <Checkbox
                        id={`ind-${industry}`}
                        checked={selectedIndustries.includes(industry)}
                        onCheckedChange={(checked) => handleIndustryChange(industry, checked)}
                      />
                      <Label htmlFor={`ind-${industry}`} className=\"text-sm cursor-pointer\">
                        {industry}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Filter */}
              <div className=\"mb-6\">
                <h3 className=\"font-medium mb-3 text-sm\">Price Range</h3>
                <div className=\"space-y-2\">
                  {priceRanges.map((range) => (
                    <div key={range.value} className=\"flex items-center gap-2\">
                      <input
                        type=\"radio\"
                        id={`price-${range.value}`}
                        name=\"price\"
                        checked={selectedPrice === range.value}
                        onChange={() => {
                          setSelectedPrice(range.value);
                          setPagination(prev => ({ ...prev, page: 1 }));
                        }}
                        className=\"w-4 h-4\"
                      />
                      <Label htmlFor={`price-${range.value}`} className=\"text-sm cursor-pointer\">
                        {range.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Difficulty Filter */}
              <div className=\"mb-6\">
                <h3 className=\"font-medium mb-3 text-sm\">Technical Difficulty</h3>
                <div className=\"space-y-2\">
                  {difficulties.map((difficulty) => (
                    <div key={difficulty} className=\"flex items-center gap-2\">
                      <Checkbox
                        id={`diff-${difficulty}`}
                        checked={selectedDifficulties.includes(difficulty)}
                        onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked)}
                      />
                      <Label htmlFor={`diff-${difficulty}`} className=\"text-sm cursor-pointer\">
                        {difficulty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
        
        {/* Main Content */}
        <div className=\"flex-1\">
          {/* Top Bar */}
          <div className=\"flex items-center justify-between mb-6\">
            <div className=\"flex items-center gap-4\">
              <Button
                variant=\"outline\"
                size=\"sm\"
                onClick={() => setShowFilters(!showFilters)}
                className=\"lg:hidden\"
              >
                <Filter className=\"w-4 h-4 mr-2\" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
              <p className=\"text-sm text-muted-foreground\">
                Showing {agents.length} of {pagination.total} results
              </p>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className=\"w-48\">
                <SelectValue placeholder=\"Sort by\" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=\"popular\">Most Popular</SelectItem>
                <SelectItem value=\"rating\">Highest Rated</SelectItem>
                <SelectItem value=\"price-low\">Lowest Price</SelectItem>
                <SelectItem value=\"price-high\">Highest Price</SelectItem>
                <SelectItem value=\"newest\">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Agent Grid */}
          {loading ? (
            <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className=\"h-80 animate-pulse\">
                  <div className=\"h-full bg-gray-200 rounded-lg\" />
                </Card>
              ))}
            </div>
          ) : agents.length === 0 ? (
            <Card className=\"p-12 text-center\">
              <p className=\"text-muted-foreground mb-4\">No agents found matching your criteria</p>
              <Button onClick={clearFilters} variant=\"outline\">Clear Filters</Button>
            </Card>
          ) : (
            <>
              <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">
                {agents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    showCompare={true}
                    onCompareChange={(e) => handleCompareChange(agent, e.target.checked)}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className=\"flex justify-center gap-2 mt-8\">
                  <Button
                    variant=\"outline\"
                    disabled={pagination.page === 1}
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  >
                    Previous
                  </Button>
                  <div className=\"flex items-center gap-2\">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === pagination.page ? 'default' : 'outline'}
                        size=\"sm\"
                        onClick={() => setPagination(prev => ({ ...prev, page }))}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant=\"outline\"
                    disabled={pagination.page === pagination.pages}
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Compare Bar */}
      {compareAgents.length > 0 && (
        <div className=\"fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-4 shadow-lg\">
          <div className=\"container mx-auto flex items-center justify-between\">
            <div className=\"flex items-center gap-4\">
              <span className=\"font-medium\">
                {compareAgents.length} agent{compareAgents.length > 1 ? 's' : ''} selected for comparison
              </span>
              <Button
                variant=\"secondary\"
                size=\"sm\"
                onClick={() => setCompareAgents([])}
              >
                <X className=\"w-4 h-4 mr-2\" />
                Clear
              </Button>
            </div>
            <Button
              variant=\"secondary\"
              onClick={goToComparison}
              disabled={compareAgents.length === 0}
            >
              Compare Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
