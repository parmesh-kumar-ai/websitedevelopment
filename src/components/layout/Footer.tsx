import { Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-gray-100 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <div>
                        <h3 className="font-serif text-lg font-bold text-primary">The Moody Picasso</h3>
                        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                            Hello world!
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 items-center md:items-end">
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/XXXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </a>
                        </div>
                        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
                            <p>&copy; {new Date().getFullYear()} All rights reserved. <span className="opacity-30 ml-2">v2.2</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
