import { Diamond, Shield, Clock, MapPin } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                    {/* Note: Placeholder for high-end video or image */}
                    <div className="w-full h-full bg-neutral-900 animate-pulse" />
                </div>

                <div className="relative z-10 text-center px-4">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        NEXORS
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-gray-400 mb-8 max-w-2xl mx-auto">
                        The Global Operating System for Elite Transportation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all">
                            Book a Ride
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all">
                            Manage Fleet
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-4 bg-black">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
                    <div className="space-y-4">
                        <div className="flex justify-center"><Diamond className="w-12 h-12 text-premium-gold" /></div>
                        <h3 className="text-xl font-bold">White-Label</h3>
                        <p className="text-gray-500">Your brand, our infrastructure.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-center"><Shield className="w-12 h-12 text-premium-gold" /></div>
                        <h3 className="text-xl font-bold">Secure Payments</h3>
                        <p className="text-gray-500">Global integration with PayPal & Mercado Pago.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-center"><Clock className="w-12 h-12 text-premium-gold" /></div>
                        <h3 className="text-xl font-bold">Real-time</h3>
                        <p className="text-gray-500">Precision tracking at 50ms latency.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-center"><MapPin className="w-12 h-12 text-premium-gold" /></div>
                        <h3 className="text-xl font-bold">Global Scale</h3>
                        <p className="text-gray-500">Operating in 20+ languages.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-neutral-800 text-center text-gray-600">
                <p>© 2025 NEXORS. Powered by Antigravity & KIMI 2.</p>
            </footer>
        </main>
    );
}
