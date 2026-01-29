import { useState } from "react";
import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {

    const {toast} = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(()=>{
            toast({
                title:"Message Sent",
                description:"Thank you for your message. I will get back to you soon.",
                variant:"default"
            });
            setIsSubmitting(false);
        },1500);  
    }

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl"> 
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Get In <span className="text-primary">Touch</span></h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                I'm always open to new opportunities and collaborations. 
                Feel free to reach out to me via email or LinkedIn.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                    <div className="space-y-6 justify-center">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Mail className="w-6 h-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">Email</h4>
                                <a href="mailto:shyamshaji2614@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">shyamshaji2614@gmail.com</a>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Phone className="w-6 h-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">Phone</h4>
                                <a href="tel:+918848678248" className="text-muted-foreground hover:text-primary transition-colors">+91 8848678248</a>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <MapPin className="w-6 h-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">Location</h4>
                                <a href="" className="text-muted-foreground hover:text-primary transition-colors">Palakkad, Kerala</a>
                            </div> 
                        </div>
                    </div>
                    <div className="pt-8">
                        <h4 className="font-medium mb-4">Connect With Me</h4>
                        <div className="flex space-x-4 justify-center">
                            <a href="" target="_blank">
                                <Linkedin/>
                            </a>
                            <a href="" target="_blank">
                                <Instagram/>
                            </a>
                            <a href="" target="_blank">
                                <Twitter/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="bg-card p-8 rounded-lg shadow-xs" onSubmit={handleSubmit}>
                    <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
                    <form action="" className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                            <input type="text" id="name" name="name" required 
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden
                            focus:ring-2 focus:ring-primary" placeholder="Shyam Shaji..." 
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                            <input type="email" id="email" name="email" required 
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden
                            focus:ring-2 focus:ring-primary" placeholder="shyamshaji2614@gmail.com" 
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                            <textarea id="message" name="message" required 
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden
                            focus:ring-2 focus:ring-primary resize-none" placeholder="Hello, I'd like to talk about...." 
                            />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={cn("cosmic-button w-full flex items-center justify-center gap-2",

                        )}>
                            <Send size={16}/>{isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ContactSection;