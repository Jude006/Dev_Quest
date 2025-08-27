import React from 'react';
import { motion } from 'framer-motion';
import { 
  Quote, 
  Star, 
  Github, 
  Linkedin,
  Twitter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jude Orifa",
      role: "Fullstack Developer",
      company: "Aptech",
      avatar: "JO",
      content: "Dev Quest completely transformed how I approach learning. I've gone from struggling with consistency to maintaining a 45-day coding streak! The gamification makes practice addictive.",
      rating: 5,
      color: "bg-matrix-green/20 text-matrix-green"
    },
    {
      id: 2,
      name: "Ayomide Shotayo",
      role: "Mobile App Developer",
      company: "Apetech Computer Education",
      avatar: "AS",
      content: "As a developer, staying motivated can be tough. Dev Quest's achievement system and leaderboard turned my study sessions into something I actually look forward to every day.",
      rating: 5,
      color: "bg-neon-blue-500/20 text-neon-blue-300"
    },
    {
      id: 3,
      name: "Samuel Eveshorema",
      role: "Computer Science Student",
      company: "Convenant",
      avatar: "SE",
      content: "The community aspect is incredible. I've connected with so many developers at my level, and we push each other to complete challenges. It's like having a study group that's always available.",
      rating: 5,
      color: "bg-cyber-purple-500/20 text-cyber-purple-400"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Bootcamp Graduate",
      company: "Self-Taught",
      avatar: "DK",
      content: "After my bootcamp, I was struggling to keep my skills sharp. Dev Quest gave me the structure I needed with its daily challenges and progress tracking. Landed my first job within 3 months!",
      rating: 5,
      color: "bg-cyber-yellow/20 text-cyber-yellow"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-20 lg:py-28 bg-cyber-gray">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-circle(circle, rgba(74, 144, 226, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl font-heading">
            Loved by <span className="text-matrix-green">Developers</span> Worldwide
          </h2>
          <p className="text-lg text-cyber-purple-300">
            Join thousands of developers who have transformed their coding journey with Dev Quest
          </p>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial card */}
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="relative p-8 border bg-cyber-dark border-cyber-light rounded-2xl lg:p-10"
          >
            {/* Quote icon */}
            <Quote className="absolute w-8 h-8 top-6 right-6 text-cyber-purple-500 opacity-30" />
            
            {/* Content */}
            <div className="flex items-start mb-6">
              {/* Avatar */}
              <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-semibold ${testimonials[currentTestimonial].color}`}>
                {testimonials[currentTestimonial].avatar}
              </div>
              
              {/* User info */}
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-white">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-sm text-cyber-purple-300">
                  {testimonials[currentTestimonial].role} · {testimonials[currentTestimonial].company}
                </p>
                
                {/* Stars */}
                <div className="flex mt-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cyber-yellow text-cyber-yellow" />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Testimonial text */}
            <blockquote className="text-lg italic leading-relaxed text-cyber-purple-200">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
          </motion.div>

          {/* Navigation arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 p-2 transition-colors duration-200 -translate-x-4 -translate-y-1/2 border rounded-full top-1/2 md:-translate-x-6 bg-cyber-light border-cyber-light text-cyber-purple-300 hover:text-neon-blue-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 p-2 transition-colors duration-200 translate-x-4 -translate-y-1/2 border rounded-full top-1/2 md:translate-x-6 bg-cyber-light border-cyber-light text-cyber-purple-300 hover:text-neon-blue-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-neon-blue-300 w-6' 
                    : 'bg-cyber-light hover:bg-cyber-purple-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-sm tracking-wider uppercase text-cyber-purple-300">
            Trusted by developers at
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80">
            <div className="font-mono font-semibold text-cyber-purple-400">Google</div>
            <div className="font-mono font-semibold text-cyber-purple-400">Microsoft</div>
            <div className="font-mono font-semibold text-cyber-purple-400">GitHub</div>
            <div className="font-mono font-semibold text-cyber-purple-400">Netflix</div>
            <div className="font-mono font-semibold text-cyber-purple-400">Stripe</div>
          </div>
        </motion.div>
      </div>

      {/* Background blobs */}
      <div className="absolute bottom-0 right-0 w-64 h-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-cyber-purple-500 filter blur-3xl opacity-5"></div>
      <div className="absolute top-0 left-0 w-48 h-48 -translate-y-1/2 rounded-full bg-neon-blue-500 filter blur-3xl opacity-5"></div>
    </section>
  );
};

export default TestimonialsSection;