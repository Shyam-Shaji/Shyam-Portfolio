import { useState } from "react";
import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {

    const {toast} = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required";
        else if (formData.message.trim().length < 5) newErrors.message = "Message must be at least 5 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log("Validation failed! Errors:", errors);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
                    ...formData,
                    subject: `New Contact Form Submission from ${formData.name}`,
                    from_name: "Portfolio Contact Form",
                }),
            });

            const result = await response.json();
            
            if (result.success) {
                toast({
                    title: "Message Sent",
                    description: "Thank you for your message. I'll get back to you soon!",
                    variant: "default",
                });
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast({
                    title: "Submission Error",
                    description: result.message || "Failed to send the message. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Network Error",
                description: "Something went wrong. Please check your connection and try again.",
                variant: "destructive",
            });
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            <a href="https://www.linkedin.com/in/shyam-shaji" target="_blank">
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
                <div className="bg-card p-8 rounded-lg shadow-xs">
                    <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
                    <form action="" className="space-y-6" onSubmit={handleSubmit} noValidate>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                            <input type="text" id="name" name="name" 
                            value={formData.name} onChange={handleChange}
                            className={cn("w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary transition-all",
                                errors.name && "border-destructive focus:ring-destructive"
                            )} placeholder="Shyam Shaji..." 
                            />
                            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                            <input type="email" id="email" name="email" 
                            value={formData.email} onChange={handleChange}
                            className={cn("w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary transition-all",
                                errors.email && "border-destructive focus:ring-destructive"
                            )} placeholder="shyamshaji2614@gmail.com" 
                            />
                            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                            <textarea id="message" name="message" rows={4}
                            value={formData.message} onChange={handleChange}
                            className={cn("w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none transition-all",
                                errors.message && "border-destructive focus:ring-destructive"
                            )} placeholder="Hello, I'd like to talk about...." 
                            />
                            {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
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