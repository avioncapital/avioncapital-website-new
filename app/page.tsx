"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Truck,
  Building2,
  Users,
  ChefHat,
  Plane,
  Clock,
  Shield,
  Handshake,
  Mail,
  Phone,
  MapPin,
  FileText,
  Wrench,
  RefreshCw,
  Construction,
  Zap,
} from "lucide-react"

import type React from "react"

// Image carousel component with colored backgrounds and icons
function ImageCarousel({
  items,
  className = "",
}: { items: Array<{ title: string; icon: React.ReactNode; bgColor: string }>; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [items.length])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          } ${item.bgColor}`}
        >
          <div className="text-white mb-4">{item.icon}</div>
          <h3 className="text-white text-xl font-bold text-center px-4">{item.title}</h3>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    financingType: "",
    amount: "",
    timeInBusiness: "",
    annualRevenue: "",
    description: "",
    agreeToTerms: false,
  })

  // Simple math captcha state
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: "" })
  const [captchaValid, setCaptchaValid] = useState(false)

  // Industry items for top carousel
  const industryItems = [
    {
      title: "Heavy Equipment Financing",
      icon: <Construction className="h-20 w-20" />,
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      title: "Trucking & Transportation",
      icon: <Truck className="h-20 w-20" />,
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Aviation Financing",
      icon: <Plane className="h-20 w-20" />,
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      title: "Commercial Aircraft",
      icon: <Zap className="h-20 w-20" />,
      bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    },
    {
      title: "Cargo & Freight",
      icon: <Building2 className="h-20 w-20" />,
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
    },
  ]

  // Canadian/office items for bottom carousel
  const canadianItems = [
    {
      title: "🇨🇦 Proudly Canadian",
      icon: <div className="text-6xl">🇨🇦</div>,
      bgColor: "bg-gradient-to-br from-red-500 to-red-600",
    },
    {
      title: "Success Stories",
      icon: <Users className="h-20 w-20" />,
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      title: "Coast to Coast Coverage",
      icon: <div className="text-6xl">🗺️</div>,
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Toronto Headquarters",
      icon: <Building2 className="h-20 w-20" />,
      bgColor: "bg-gradient-to-br from-slate-500 to-slate-600",
    },
  ]

  // Generate new captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptcha({ num1, num2, answer: "" })
    setCaptchaValid(false)
  }

  // Initialize captcha when form opens
  const handleFormOpen = (open: boolean) => {
    setIsFormOpen(open)
    if (open) {
      generateCaptcha()
    }
  }

  // Validate captcha answer
  const handleCaptchaChange = (value: string) => {
    setCaptcha((prev) => ({ ...prev, answer: value }))
    const correctAnswer = captcha.num1 + captcha.num2
    setCaptchaValid(Number.parseInt(value) === correctAnswer)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate captcha before submission
    if (!captchaValid) {
      alert("Please solve the math problem correctly to verify you're human.")
      return
    }

    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    alert("Thank you for your application! We will contact you within 24 hours.")
    setIsFormOpen(false)
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      industry: "",
      financingType: "",
      amount: "",
      timeInBusiness: "",
      annualRevenue: "",
      description: "",
      agreeToTerms: false,
    })
    setCaptcha({ num1: 0, num2: 0, answer: "" })
    setCaptchaValid(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-slate-900">
                Avion<span className="text-blue-600">Capital</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#home"
                  className="text-slate-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </a>
                <a
                  href="#services"
                  className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Services
                </a>
                <a
                  href="#industries"
                  className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Industries
                </a>
                <a
                  href="#about"
                  className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Get Approved</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
                🇨🇦 Canadian Financing Solutions
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Smart Financing for
                <span className="block text-blue-600">Business Growth</span>
              </h1>
              <p className="mt-6 text-xl text-slate-600 leading-relaxed">
                Fast, flexible capital solutions tailored to Canadian businesses across transportation, construction,
                staffing, hospitality, and aviation. Get the funding you need with minimal red tape and maximum results.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Dialog open={isFormOpen} onOpenChange={handleFormOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Apply for Financing
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">24-48hrs</div>
                  <div className="text-sm text-slate-600">Quick Approvals</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">$10K-$5M</div>
                  <div className="text-sm text-slate-600">Funding Range</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-slate-600">Key Industries</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <ImageCarousel items={industryItems} className="aspect-square rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Our Financing Solutions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive capital solutions designed for your industry's unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Wrench className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Equipment Leasing & Financing</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Finance heavy trucks, trailers, aircraft, restaurant equipment, and more — including new or used
                  assets.
                </p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• Heavy trucks and trailers</li>
                  <li>• Aircraft and aviation equipment</li>
                  <li>• Restaurant and hospitality equipment</li>
                  <li>• Construction machinery</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Invoice Factoring</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Non-recourse and recourse factoring for businesses in trucking, staffing, and construction to improve
                  cash flow.
                </p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• Immediate cash flow improvement</li>
                  <li>• Cover payroll and operational needs</li>
                  <li>• Non-recourse options available</li>
                  <li>• Industry-specific expertise</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Secured Business Loans</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Custom financing packages secured against business assets, contracts, or receivables.
                </p>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• Asset-backed financing</li>
                  <li>• Contract-based lending</li>
                  <li>• Receivables financing</li>
                  <li>• Flexible repayment terms</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Deep expertise across key Canadian business sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-slate-200 hover:shadow-lg transition-shadow group">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Trucking & Logistics</h3>
                <p className="text-slate-600 text-sm">
                  Equipment financing, factoring, and working capital for transportation companies
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow group">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <Building2 className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Construction & Trades</h3>
                <p className="text-slate-600 text-sm">
                  Heavy equipment financing and invoice factoring for contractors and trades
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow group">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Staffing & Payroll Services</h3>
                <p className="text-slate-600 text-sm">
                  Payroll financing and factoring solutions for staffing agencies
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow group">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <ChefHat className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Hospitality & Food Services</h3>
                <p className="text-slate-600 text-sm">Restaurant equipment financing and working capital solutions</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow group md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Plane className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Aviation</h3>
                <p className="text-slate-600 text-sm">Aircraft financing for schools, operators, and owners</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Why Clients Choose Avion Capital</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the difference of working with Canada's trusted financing partner
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Quick Approvals</h3>
              <p className="text-slate-600 text-sm">
                Fast decisions with minimal red tape - get approved in 24-48 hours
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Flexible Terms</h3>
              <p className="text-slate-600 text-sm">Tailored terms that adapt to your business cycles and cash flow</p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Industry Expertise</h3>
              <p className="text-slate-600 text-sm">
                Deep knowledge in transportation, aviation, and specialized industries
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Personal Service</h3>
              <p className="text-slate-600 text-sm">Relationship-based approach with dedicated account management</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">About Avion Capital</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Avion Capital is a leading Canadian financing firm specializing in fast, flexible capital solutions for
                businesses across key industries including transportation, construction, staffing, hospitality, and
                aviation.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our deep industry expertise, especially in transportation and aviation, combined with our personalized,
                relationship-based service approach, makes us the preferred financing partner for growing Canadian
                businesses.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$50M+</div>
                  <div className="text-slate-600">Capital Deployed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                  <div className="text-slate-600">Businesses Funded</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <ImageCarousel items={canadianItems} className="aspect-square rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Ready to Get Funded?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Contact our financing experts today and get approved in 24-48 hours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-slate-200 text-center">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Email</h3>
                <p className="text-slate-600">info@avioncapital.ca</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 text-center">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Phone</h3>
                <p className="text-slate-600">416-908-4902</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 text-center">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Headquarters</h3>
                <p className="text-slate-600">Toronto, Ontario</p>
              </CardContent>
            </Card>
          </div>

          <Dialog open={isFormOpen} onOpenChange={handleFormOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                Apply for Financing Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-slate-900">Apply for Financing</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry">Industry *</Label>
                    <Select onValueChange={(value) => handleInputChange("industry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trucking">Trucking & Logistics</SelectItem>
                        <SelectItem value="construction">Construction & Trades</SelectItem>
                        <SelectItem value="staffing">Staffing & Payroll Services</SelectItem>
                        <SelectItem value="hospitality">Hospitality & Food Services</SelectItem>
                        <SelectItem value="aviation">Aviation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="financingType">Financing Type *</Label>
                    <Select onValueChange={(value) => handleInputChange("financingType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select financing type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equipment">Equipment Leasing & Financing</SelectItem>
                        <SelectItem value="factoring">Invoice Factoring</SelectItem>
                        <SelectItem value="loan">Secured Business Loan</SelectItem>
                        <SelectItem value="unsure">Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="amount">Financing Amount Needed</Label>
                    <Select onValueChange={(value) => handleInputChange("amount", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select amount range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                        <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                        <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                        <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                        <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                        <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                        <SelectItem value="5m+">$5M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timeInBusiness">Time in Business</Label>
                    <Select onValueChange={(value) => handleInputChange("timeInBusiness", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time in business" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup (Less than 1 year)</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="annualRevenue">Annual Revenue</Label>
                    <Select onValueChange={(value) => handleInputChange("annualRevenue", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select annual revenue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-100k">Under $100K</SelectItem>
                        <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                        <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                        <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                        <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                        <SelectItem value="2m-5m">$2M - $5M</SelectItem>
                        <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                        <SelectItem value="10m+">$10M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Tell us about your financing needs</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you need financing for, your business situation, and any specific requirements..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Captcha Section */}
                <div className="bg-slate-50 p-4 rounded-lg border">
                  <Label className="text-sm font-medium text-slate-900 mb-3 block">
                    Verify you're human - Solve this math problem *
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-lg font-mono">
                      <span className="bg-white px-3 py-2 rounded border">{captcha.num1}</span>
                      <span>+</span>
                      <span className="bg-white px-3 py-2 rounded border">{captcha.num2}</span>
                      <span>=</span>
                    </div>
                    <Input
                      type="number"
                      placeholder="?"
                      value={captcha.answer}
                      onChange={(e) => handleCaptchaChange(e.target.value)}
                      className={`w-20 ${captchaValid ? "border-green-500" : captcha.answer ? "border-red-500" : ""}`}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={generateCaptcha}
                      className="flex items-center gap-1 bg-transparent"
                    >
                      <RefreshCw className="h-4 w-4" />
                      New
                    </Button>
                  </div>
                  {captcha.answer && !captchaValid && (
                    <p className="text-red-600 text-sm mt-2">Incorrect answer. Please try again.</p>
                  )}
                  {captchaValid && <p className="text-green-600 text-sm mt-2">✓ Correct! You're verified as human.</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to be contacted by Avion Capital regarding my financing application *
                  </Label>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={!formData.agreeToTerms || !captchaValid}
                  >
                    Submit Application
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold mb-4">
                Avion<span className="text-blue-400">Capital</span>
              </div>
              <p className="text-slate-400 mb-4">Smart financing for business growth across Canada.</p>
              <div className="text-sm text-slate-400">🇨🇦 Proudly Canadian</div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Equipment Financing</li>
                <li>Invoice Factoring</li>
                <li>Secured Business Loans</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Industries</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Trucking & Logistics</li>
                <li>Construction</li>
                <li>Staffing Services</li>
                <li>Hospitality</li>
                <li>Aviation</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Avion Capital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
