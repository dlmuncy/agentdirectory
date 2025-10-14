'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customRequestSchema, useCases, integrations, industries } from '@/lib/schemas/customRequest';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';

export default function CustomRequestPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadScore, setLeadScore] = useState(null);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger
  } = useForm({
    resolver: zodResolver(customRequestSchema),
    mode: 'onBlur',
    defaultValues: {
      use_case: [],
      integrations_needed: []
    }
  });
  
  const useCaseValue = watch('use_case') || [];
  const integrationsValue = watch('integrations_needed') || [];
  
  // Auto-save to localStorage
  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem('custom_request_draft', JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  
  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('custom_request_draft');
    if (draft) {
      try {
        const data = JSON.parse(draft);
        Object.keys(data).forEach(key => {
          setValue(key, data[key]);
        });
      } catch (e) {
        console.error('Error loading draft:', e);
      }
    }
  }, [setValue]);
  
  const handleNext = async () => {
    let fieldsToValidate = [];
    
    if (step === 1) {
      fieldsToValidate = ['company_name', 'contact_name', 'email', 'company_size', 'industry'];
    } else if (step === 2) {
      fieldsToValidate = ['problem_description', 'use_case', 'integrations_needed'];
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };
  
  const handleBack = () => {
    setStep(step - 1);
  };
  
  const onSubmit = async (data) => {
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/custom-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setLeadScore(result.leadScore);
        setSubmitted(true);
        localStorage.removeItem('custom_request_draft');
      } else {
        alert('Error submitting request. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  const toggleArrayValue = (field, value) => {
    const currentValues = watch(field) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setValue(field, newValues, { shouldValidate: true });
  };
  
  if (submitted) {
    return (
      <div className=\"container mx-auto px-4 py-16 max-w-2xl\">
        <Card>
          <CardContent className=\"pt-12 pb-12 text-center\">
            <CheckCircle className=\"w-16 h-16 text-green-500 mx-auto mb-6\" />
            <h1 className=\"text-3xl font-bold mb-4\">Request Submitted Successfully!</h1>
            <p className=\"text-lg text-muted-foreground mb-6\">
              Thank you for your custom agent request. Our team will review your requirements and get back to you within 24-48 hours.
            </p>
            {leadScore && (
              <div className=\"bg-gray-50 rounded-lg p-4 mb-6\">
                <p className=\"text-sm text-muted-foreground mb-1\">Your Project Score</p>
                <p className=\"text-2xl font-bold text-primary\">{leadScore}/100</p>
                <p className=\"text-sm text-muted-foreground mt-2\">
                  {leadScore >= 80 && 'High-priority lead - Expect a response within 24 hours'}
                  {leadScore >= 60 && leadScore < 80 && 'Strong lead - We\'ll be in touch soon'}
                  {leadScore < 60 && 'We\'ve received your request and will review it'}
                </p>
              </div>
            )}
            <p className=\"text-sm text-muted-foreground mb-6\">
              A confirmation email has been sent to your inbox.
            </p>
            <div className=\"flex gap-3 justify-center\">
              <Button onClick={() => window.location.href = '/browse'}>
                Browse Agents
              </Button>
              <Button variant=\"outline\" onClick={() => window.location.reload()}>
                Submit Another Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className=\"container mx-auto px-4 py-8\">
      <div className=\"max-w-3xl mx-auto\">
        <div className=\"mb-8\">
          <h1 className=\"text-4xl font-bold mb-4\">Request a Custom AI Agent</h1>
          <p className=\"text-muted-foreground\">
            Tell us about your needs and we'll match you with the perfect development partner
          </p>
        </div>
        
        {/* Progress Indicator */}
        <div className=\"mb-8\">
          <div className=\"flex items-center justify-between mb-2\">
            <span className=\"text-sm font-medium\">Step {step} of 3</span>
            <span className=\"text-sm text-muted-foreground\">
              {step === 1 && 'About Your Business'}
              {step === 2 && 'Your AI Agent Needs'}
              {step === 3 && 'Timeline & Investment'}
            </span>
          </div>
          <div className=\"h-2 bg-gray-200 rounded-full overflow-hidden\">
            <div
              className=\"h-full bg-primary transition-all duration-300\"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardContent className=\"pt-6\">
              {/* Step 1: About Your Business */}
              {step === 1 && (
                <div className=\"space-y-6\">
                  <div>
                    <Label htmlFor=\"company_name\">Company Name *</Label>
                    <Input
                      id=\"company_name\"
                      {...register('company_name')}
                      placeholder=\"Acme Inc.\"
                    />
                    {errors.company_name && (
                      <p className=\"text-sm text-red-500 mt-1\">{errors.company_name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor=\"contact_name\">Your Name *</Label>
                    <Input
                      id=\"contact_name\"
                      {...register('contact_name')}
                      placeholder=\"John Doe\"
                    />
                    {errors.contact_name && (
                      <p className=\"text-sm text-red-500 mt-1\">{errors.contact_name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor=\"email\">Work Email *</Label>
                    <Input
                      id=\"email\"
                      type=\"email\"
                      {...register('email')}
                      placeholder=\"john@acme.com\"
                    />
                    {errors.email && (
                      <p className=\"text-sm text-red-500 mt-1\">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor=\"phone\">Phone Number (Optional)</Label>
                    <Input
                      id=\"phone\"
                      {...register('phone')}
                      placeholder=\"+1 (555) 123-4567\"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor=\"company_size\">Company Size *</Label>
                    <Select onValueChange={(value) => setValue('company_size', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder=\"Select company size\" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=\"1-10\">1-10 employees</SelectItem>
                        <SelectItem value=\"11-50\">11-50 employees</SelectItem>
                        <SelectItem value=\"51-200\">51-200 employees</SelectItem>
                        <SelectItem value=\"201-1,000\">201-1,000 employees</SelectItem>
                        <SelectItem value=\"1,000+\">1,000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.company_size && (
                      <p className=\"text-sm text-red-500 mt-1\">{errors.company_size.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor=\"industry\">Industry *</Label>
                    <Select onValueChange={(value) => setValue('industry', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder=\"Select industry\" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.industry && (
                      <p className=\"text-sm text-red-500 mt-1\">{errors.industry.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor=\"website\">Company Website (Optional)</Label>
                    <Input
                      id=\"website\"
                      type=\"url\"
                      {...register('website')}
                      placeholder=\"https://www.acme.com\"
                    />
                    {errors.website && (
                      <p className=\"text-sm text-red-500 mt-1\">{errors.website.message}</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Step 2: Your AI Agent Needs */}
              {step === 2 && (
                <div className=\"space-y-6\">
                  <div>
                    <Label htmlFor=\"problem_description\">Problem Description *</Label>
                    <Textarea
                      id=\"problem_description\"
                      {...register('problem_description')}
                      placeholder=\"Describe the problem you're trying to solve with AI... (minimum 100 characters)\"
                      rows={5}
                    />
                    {errors.problem_description && (
                      <p className=\"text-sm text-red-500 mt-1\">{errors.problem_description.message}</p>
                    )}
                    <p className=\"text-sm text-muted-foreground mt-1\">
                      {watch('problem_description')?.length || 0} / 100 characters minimum
                    </p>
                  </div>
                  
                  <div>
                    <Label>Primary Use Case * (Select up to 3)</Label>
                    <div className=\"grid grid-cols-1 md:grid-cols-2 gap-3 mt-2\">
                      {useCases.map((useCase) => (
                        <div key={useCase} className=\"flex items-center gap-2\">
                          <Checkbox
                            id={`use-${useCase}`}
                            checked={useCaseValue.includes(useCase)}
                            onCheckedChange={() => {
                              if (useCaseValue.length < 3 || useCaseValue.includes(useCase)) {
                                toggleArrayValue('use_case', useCase);
                              }
                            }}
                            disabled={useCaseValue.length >= 3 && !useCaseValue.includes(useCase)}
                          />
                          <Label htmlFor={`use-${useCase}`} className=\"cursor-pointer text-sm\">
                            {useCase}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.use_case && (
                      <p className=\"text-sm text-red-500 mt-1\">{errors.use_case.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label>Integrations Needed *</Label>
                    <div className=\"grid grid-cols-1 md:grid-cols-2 gap-3 mt-2\">
                      {integrations.map((integration) => (
                        <div key={integration} className=\"flex items-center gap-2\">
                          <Checkbox
                            id={`int-${integration}`}
                            checked={integrationsValue.includes(integration)}
                            onCheckedChange={() => toggleArrayValue('integrations_needed', integration)}
                          />
                          <Label htmlFor={`int-${integration}`} className=\"cursor-pointer text-sm\">
                            {integration}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.integrations_needed && (
                      <p className=\"text-sm text-red-500 mt-1\">{errors.integrations_needed.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor=\"expected_volume\">Expected Volume/Scale (Optional)</Label>
                    <Input
                      id=\"expected_volume\"
                      {...register('expected_volume')}
                      placeholder=\"e.g., 10,000 queries per day, 50 users\"
                    />
                  </div>
                </div>
              )}
              
              {/* Step 3: Timeline & Investment */}
              {step === 3 && (
                <div className=\"space-y-6\">
                  <div>
                    <Label>Timeline *</Label>
                    <div className=\"space-y-2 mt-2\">
                      {[
                        'ASAP (2-4 weeks)',
                        '1-2 months',
                        '2-3 months',
                        '3-6 months',
                        'Just exploring'
                      ].map((timeline) => (
                        <div key={timeline} className=\"flex items-center gap-2\">
                          <input
                            type=\"radio\"
                            id={`timeline-${timeline}`}
                            {...register('timeline')}
                            value={timeline}
                            className=\"w-4 h-4\"
                          />
                          <Label htmlFor={`timeline-${timeline}`} className=\"cursor-pointer\">
                            {timeline}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.timeline && (
                      <p className=\"text-sm text-red-500 mt-1\">{errors.timeline.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label>Budget Range *</Label>
                    <div className=\"space-y-2 mt-2\">
                      {[
                        '$5,000 - $15,000',
                        '$15,000 - $30,000',
                        '$30,000 - $75,000',
                        '$75,000 - $150,000',
                        '$150,000+',
                        'Not sure yet'
                      ].map((budget) => (
                        <div key={budget} className=\"flex items-center gap-2\">
                          <input
                            type=\"radio\"
                            id={`budget-${budget}`}
                            {...register('budget_range')}
                            value={budget}
                            className=\"w-4 h-4\"
                          />
                          <Label htmlFor={`budget-${budget}`} className=\"cursor-pointer\">
                            {budget}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.budget_range && (
                      <p className=\"text-sm text-red-500 mt-1\">{errors.budget_range.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label>Previous AI Experience *</Label>
                    <div className=\"space-y-2 mt-2\">
                      {[
                        'No, this is our first',
                        'Yes, looking to improve/expand',
                        'We have an internal AI team'
                      ].map((exp) => (
                        <div key={exp} className=\"flex items-center gap-2\">
                          <input
                            type=\"radio\"
                            id={`exp-${exp}`}
                            {...register('previous_ai_experience')}
                            value={exp}
                            className=\"w-4 h-4\"
                          />
                          <Label htmlFor={`exp-${exp}`} className=\"cursor-pointer\">
                            {exp}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.previous_ai_experience && (
                      <p className=\"text-sm text-red-500 mt-1\">{errors.previous_ai_experience.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor=\"how_heard\">How did you hear about us? (Optional)</Label>
                    <Input
                      id=\"how_heard\"
                      {...register('how_heard')}
                      placeholder=\"e.g., Google search, referral, social media\"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor=\"additional_notes\">Additional Notes (Optional)</Label>
                    <Textarea
                      id=\"additional_notes\"
                      {...register('additional_notes')}
                      placeholder=\"Any other details we should know?\"
                      rows={4}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Navigation Buttons */}
          <div className=\"flex justify-between mt-6\">
            <Button
              type=\"button\"
              variant=\"outline\"
              onClick={handleBack}
              disabled={step === 1 || submitting}
            >
              <ChevronLeft className=\"w-4 h-4 mr-2\" />
              Back
            </Button>
            
            {step < 3 ? (
              <Button type=\"button\" onClick={handleNext}>
                Next
                <ChevronRight className=\"w-4 h-4 ml-2\" />
              </Button>
            ) : (
              <Button type=\"submit\" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className=\"w-4 h-4 mr-2 animate-spin\" />
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
