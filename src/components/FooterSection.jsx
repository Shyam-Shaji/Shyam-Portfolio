import { ArrowUpIcon } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative py-12 px-4 bg-card border-t border-border mt-12 flex items-center">
  <p className="absolute left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
    &copy; {new Date().getFullYear()} Shyam. All rights reserved.
  </p>
  <a
    href="#hero"
    className="ml-auto p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
  >
    <ArrowUpIcon size={20} />
  </a>
</footer>

  )
}

export default FooterSection;