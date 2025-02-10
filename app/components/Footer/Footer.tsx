import Image from "next/image";
import "aos/dist/aos.css";

const Footer = () => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
      <footer 
        className="main-footer style-three bg-cover bg-gradient-to-br from-blue-600 to-blue-900" 
        style={{ backgroundImage: "url(/background/3.png)" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16" data-aos='fade-up' data-aos-delay="500" data-aos-once="true">
          <div className="text-center mb-16 mt-20">
            <h2 className="text-2xl font-semibold text-white font-sans">Subscribe Our Newsletter</h2>
            <p className="text-sm text-gray-200 mb-8">We don't send spam so don't worry.</p>
            
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Your e-mail"
                  className="w-full px-6 py-4 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="mb-6">
                <Image
                  width={154}
                  height={50}
                  src="/AIfree.png"
                  alt=""
                />
              </div>
              <div className="text-white space-y-4">
                <div>
                  <p className="text-gray-300">Call us</p>
                  <p className="text-lg">+62 851-5661-9369</p>
                </div>
                <div>
                  <p>Jl. Tegalsari, Krajan 2 RT 4 RW 1 Tegalsari, Banyuwangi 68485</p>                  
                  <a href="mailto:support@bigkreatif.com" className="hover:text-gray-300 transition-colors">
                    support@bigkreatif.com
                  </a>
                </div>
              </div>
            </div>

            {/* For Candidates */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">For Users</h3>
              <ul className="text-white space-y-2">
                <li><a href="#" className="hover:text-gray-300 transition-colors">Browse AI Solutions</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Explore AI Categories</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">My AI Bookmarks</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">AI Alerts</a></li>                
              </ul>
            </div>

            {/* For Employers */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">For Developers/Businesses</h3>
              <ul className="text-white space-y-2">
                <li><a href="#" className="hover:text-gray-300 transition-colors">Browse AI Talent</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">AI Developer Dashboard</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Add AI</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">AI Service Packages</a></li>
              </ul>
            </div>

            {/* Mobile Apps */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Mobile Apps</h3>
              <p className="text-sm text-white mb-4">Click and Get started in seconds</p>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors">
                  <span className="text-2xl text-white">
                    <i className="fab fa-apple"></i>
                  </span>
                  <div className="text-white">
                    <p className="text-xs text-gray-400">Download on the</p>
                    <p className="font-semibold">Apple Store</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors">
                  <span className="text-2xl text-white">
                    <i className="fab fa-google-play"></i>
                  </span>
                  <div className="text-white">
                    <p className="text-xs text-gray-400">Get it on</p>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-16 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white">
                © {new Date().getFullYear()} Develop by{' '}
                <a href="https://www.instagram.com/bigkreatif/" className="text-gray-300 hover:text-white transition-colors">
                  bigkreatif
                </a>
                . All Right Reserved.
              </p>
              <div className="flex gap-6 text-white">
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>    
    )
}

export default Footer