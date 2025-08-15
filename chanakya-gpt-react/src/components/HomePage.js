import React, { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };

  useEffect(() => {
    // Typewriter effect for alternating text
    const textArray = ["Chanakya ", "चाणक्य "];
    let textIndex = 0;
    let characterIndex = 0;

    function typeText() {
      const textElement = document.getElementById('text');
      if (!textElement) return;

      if (characterIndex < textArray[textIndex].length) {
        textElement.innerHTML = textArray[textIndex].substr(0, characterIndex) + '<span class="cursor">|</span>';
        characterIndex++;
        setTimeout(typeText, 100);
      } else {
        setTimeout(function () {
          textElement.innerHTML = "";
          characterIndex = 0;
          textIndex++;
          if (textIndex >= textArray.length) textIndex = 0;
          typeText();
        }, 2000);
      }
    }

    typeText();

    // Navbar scroll effect
    const handleScroll = () => {
      const navBar = document.getElementById('navBar');
      if (navBar) {
        if (window.pageYOffset > 0) {
          navBar.classList.add('shadow');
        } else {
          navBar.classList.remove('shadow');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden relative w-full bg-white">
      {/* NAVBAR FOR LARGER SCREENS */}
      <div id="navBar" className="lg:h-[88px] h-[62px] w-full fixed z-50 bg-white">
        <div className="max-w-[1290px] w-11/12 lg:h-[88px] h-[62px] mx-auto flex flex-row items-center justify-between">
          <img src="assets/img/logo.png" className="lg:h-[50px] h-[40px]" alt="ChanakyaGPT Logo" />
          <div className="flex flex-row gap-[30px] items-center">
            <svg
              id="hamburger"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '24px', height: '20px', cursor: 'pointer', display: mobileMenuOpen ? 'none' : 'block' }}
              viewBox="0 0 448 512"
              onClick={toggleMobileMenu}
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
            <svg
              id="cross"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '24px', height: '24px', cursor: 'pointer', display: mobileMenuOpen ? 'block' : 'none' }}
              viewBox="0 0 384 512"
              onClick={toggleMobileMenu}
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
            <a
              id="nav-hide"
              href="https://chanakyagpt.in/"
              className="text-lg focus:outline-none focus:shadow-outline font-bold hover-underline-animation"
              style={{ color: '#004AAD' }}
            >
              Home
            </a>
            <a
              id="nav-hide"
              href="#features"
              className="text-lg focus:outline-none focus:shadow-outline font-bold hover-underline-animation"
              style={{ color: '#004AAD' }}
            >
              Features
            </a>
            <a
              id="nav-hide"
              href="#faq"
              className="text-lg focus:outline-none focus:shadow-outline font-bold hover-underline-animation"
              style={{ color: '#004AAD' }}
            >
              FAQ's
            </a>
            <a
              id="nav-hide"
              href="https://forms.gle/26xSUP2vbmEDQeR26"
              className="text-lg focus:outline-none focus:shadow-outline font-bold hover-underline-animation"
              style={{ color: '#004AAD' }}
            >
              Contact Us
            </a>

            <div
              id="nav-hide"
              className="cursor-pointer animated-gradient drop-shadow-lg hover:scale-[1.02] hover:duration-300 transition ease-in-out"
              style={{ borderRadius: '6px' }}
              onClick={handleLogin}
            >
              <div className="m-[2px] bg-white px-[8px] py-[3px] flex flex-row gap-[10px] items-center" style={{ borderRadius: '5px' }}>
                <img src="assets/img/trylog.svg" className="w-[24px]" alt="button logo" />
                <p className="text-lg focus:outline-none focus:shadow-outline font-bold gradient-text" style={{ color: '#004AAD' }}>
                  Try Now
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* NAVBAR FOR LARGER SCREENS ENDS HERE */}

      {/* NAVBAR FOR SMALLER SCREENS */}
      <div
        id="mobileMenu"
        className={`mobile-menu fixed top-12 left-0 w-full h-full bg-white z-40 pt-5 ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}
      >
        <ul className="text-center mt-10">
          <li className="py-6">
            <div className="mx-[20px]">
              <span
                className="text-2xl focus:outline-none focus:shadow-outline font-bold hover-underline-animation cursor-pointer"
                style={{ color: '#004AAD' }}
                onClick={() => window.location.href = 'https://chanakyagpt.in/'}
              >
                Home
              </span>
            </div>
          </li>
          <li className="py-6">
            <div className="mx-[20px]">
              <span
                className="text-2xl focus:outline-none focus:shadow-outline font-bold hover-underline-animation cursor-pointer"
                style={{ color: '#004AAD' }}
                onClick={() => window.location.href = '#features'}
              >
                Features
              </span>
            </div>
          </li>
          <li className="py-6">
            <div className="mx-[20px]">
              <span
                className="text-2xl focus:outline-none focus:shadow-outline font-bold hover-underline-animation cursor-pointer"
                style={{ color: '#004AAD' }}
                onClick={() => window.location.href = '#faq'}
              >
                FAQ's
              </span>
            </div>
          </li>
          <li className="py-6">
            <div className="mx-[20px]">
              <span
                className="text-2xl focus:outline-none focus:shadow-outline font-bold hover-underline-animation cursor-pointer"
                style={{ color: '#004AAD' }}
                onClick={() => window.location.href = 'https://forms.gle/26xSUP2vbmEDQeR26'}
              >
                Contact Us
              </span>
            </div>
          </li>
        </ul>
        <div
          className="fixed bottom-8 left-4 right-4 mt-5 w-auto cursor-pointer animated-gradient drop-shadow-lg hover:scale-[1.02] hover:duration-300 transition ease-in-out"
          style={{ borderRadius: '6px' }}
          onClick={handleLogin}
        >
          <div className="m-[2px] bg-white px-[14px] py-[16px] flex flex-row gap-[10px] items-center justify-center w-auto" style={{ borderRadius: '5px' }}>
            <img src="assets/img/glogo.webp" className="w-[24px]" alt="button logo" />
            <span className="min-[1150px]:text-xl text-lg focus:outline-none focus:shadow-outline font-bold gradient-text" style={{ color: '#004AAD' }}>
              Login to Start Using
            </span>
          </div>
        </div>
      </div>
      {/* NAVBAR FOR SMALLER SCREENS ENDS HERE */}

      {/* HERO SECTION BEGINS HERE */}
      <div className="w-full lg:mt-[88px] mt-[62px]" style={{
        backgroundImage: 'radial-gradient(#f8990092 1.2000000000000002px, transparent 1.2000000000000002px), radial-gradient(#F8980092 1.2000000000000002px, #ffffff00 1.2000000000000002px)',
        backgroundSize: '48px 48px',
        backgroundPosition: '0 0,24px 24px'
      }}>
        <div className="flex flex-row min-[1150px]:justify-between justify-center items-center max-w-[1290px] w-11/12 mx-auto max-[1150px]:py-[80px]">
          <div className="flex flex-col max-[1150px]:items-center">
            <h1 className="text-[#004AAD] min-[1150px]:text-5xl text-4xl min-[1150px]:leading-[60px] font-bold drop-shadow-lg max-[1150px]:text-center">
              <span className="gradient-text">ChanakyaGPT</span> <br />Intelligent Insights,<br /> Ancient Wisdom
            </h1>
            <h1 className="text-gray-500 min-[1150px]:text-2xl text-xl font-bold drop-shadow-lg mt-[30px] min-[1150px]:w-[620px] max-[1150px]:text-center max-[1150px]:max-w-[500px] max-[1150px]:w-11/12">
              Your Personal Guide to Navigating Life's Challenges, Inspired by <span className="gradient-text" id="text"></span>
            </h1>

            <div className="flex min-[1150px]:flex-row flex-col min-[1150px]:gap-[10px] items-center mt-[30px]">
              <div
                className="cursor-pointer animated-gradient drop-shadow-lg min-[1150px]:mt-[30px] hover:scale-[1.02] hover:duration-300 transition ease-in-out w-fit max-[1150px]:w-[280px]"
                style={{ borderRadius: '6px' }}
                onClick={handleLogin}
              >
                <div className="m-[2px] bg-white px-[14px] py-[8px] flex flex-row gap-[10px] items-center w-fit max-[1150px]:w-[276px] max-[1150px]:justify-center" style={{ borderRadius: '5px' }}>
                  <img src="assets/img/glogo.webp" className="w-[24px]" alt="button logo" />
                  <p className="min-[1150px]:text-xl text-lg focus:outline-none focus:shadow-outline font-bold gradient-text" style={{ color: '#004AAD' }}>
                    Login to Start Using
                  </p>
                </div>
              </div>
              <div className="cursor-pointer animated-gradient drop-shadow-lg min-[1150px]:mt-[30px] mt-[10px] hover:scale-[1.02] max-[1150px]:w-[280px] hover:duration-300 transition ease-in-out w-fit px-[16px] py-[10px] flex flex-row gap-[10px] items-center max-[1150px]:justify-center" style={{ borderRadius: '6px' }} onClick={() => window.location.href = '#features'}>
                <p className="text-lg focus:outline-none focus:shadow-outline font-bold" style={{ color: '#FFFFFF' }}>Learn More</p>
              </div>
            </div>
          </div>
          <div className="herohide w-[600px] relative">
            <img src="assets/img/chakra.png" className="image-to-rotate" alt="Chakra" />
            <img src="assets/img/heroavatar.png" className="image-to-superimpose float-3" alt="Hero Avatar" />
            {/* LEVITATING 01 */}
            <div className="float-2 absolute z-20 top-20 -left-6 sm:top-32 sm:left-10 md:top-40 md:left-16 lg:-left-0 lg:top-52">
              <div className="m-2 p-[0.2px] cursor-pointer animated-gradient drop-shadow-lg hover:scale-[1.02] hover:duration-300 transition ease-in-out" style={{ borderRadius: '6px' }} onClick={handleLogin}>
                <div className="m-[2px] bg-white px-[8px] py-[3px] flex flex-row gap-[10px] items-center" style={{ borderRadius: '5px' }}>
                  <img src="assets/img/trylog.svg" className="w-[24px]" alt="button logo" />
                  <span className="text-md focus:outline-none focus:shadow-outline font-bold gradient-text leading-[20px]" style={{ color: '#004AAD' }}>
                    What is the key <br />to success?
                  </span>
                </div>
              </div>
            </div>
            {/* LEVITATING 02 */}
            <div className="float absolute z-20 top-20 right-10 sm:right-24 sm:top-28 md:top-36 md:right-32 lg:top-32 lg:right-16">
              <div className="m-2 p-[0.2px] cursor-pointer animated-gradient drop-shadow-lg hover:scale-[1.02] hover:duration-300 transition ease-in-out" style={{ borderRadius: '10px' }} onClick={handleLogin}>
                <div className="m-[2px] bg-white px-[8px] py-[6px]" style={{ borderRadius: '8px' }}>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" className="flex h-[32px]" style={{ width: 32, height: 32 }} data-new="" aria-hidden="true" data-v-3154cec8="">
                    <defs>
                      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%" spreadMethod="pad">
                        <stop offset="0%" stopColor="#FB6D3B" stopOpacity="1" />
                        <stop offset="50%" stopColor="#F95999" stopOpacity="1" />
                        <stop offset="100%" stopColor="#845EC2" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    <g fill="url(#logo-gradient)" data-v-3154cec8="">
                      <path d="m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            {/* LEVITATING 03 */}
            <div className="float absolute z-20 bottom-14 -left-4 sm:left-2 sm:bottom-20 lg:bottom-24 lg:-left-4">
              <div className="m-2 p-[0.2px] cursor-pointer animated-gradient drop-shadow-lg hover:scale-[1.02] hover:duration-300 transition ease-in-out" style={{ borderRadius: '6px' }} onClick={handleLogin}>
                <div className="m-[2px] bg-white px-[8px] py-[3px] flex flex-row gap-[10px] items-center" style={{ borderRadius: '5px' }}>
                  <img src="assets/img/trylog.svg" className="w-[24px]" alt="button logo" />
                  <span className="text-md focus:outline-none focus:shadow-outline font-bold gradient-text" style={{ color: '#004AAD' }}>
                    How to study?
                  </span>
                </div>
              </div>
            </div>
            {/* LEVITATING 04 */}
            <div className="float-2 absolute z-20 bottom-20 md:bottom-48 lg:bottom-52 -right-6 lg:right-8">
              <div className="m-[1.02] p-[0.2px] cursor-pointer animated-gradient drop-shadow-lg hover:scale-[1.02] hover:duration-300 transition ease-in-out" style={{ borderRadius: '6px' }} onClick={handleLogin}>
                <div className="m-[2px] bg-white px-[8px] py-[6px] flex flex-row gap-[10px] items-center" style={{ borderRadius: '5px' }}>
                  <img src="assets/img/trylog.svg" className="w-[24px]" alt="button logo" />
                  <span className="text-sm focus:outline-none focus:shadow-outline font-bold gradient-text leading-[20px]" style={{ color: '#004AAD', fontFamily: "'Tiro Devanagari Hindi', serif" }}>
                    काम को टालने की<br />आदत से कैसे बचें?
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION BEGINS HERE */}
      <div className="flex flex-col mt-[60px] max-w-[1290px] w-11/12 mx-auto" id="features">
        <h1 className="text-[#004AAD] min-[1150px]:text-[45px] text-center text-[30px] min-[1150px]:leading-[60px] leading-none font-bold drop-shadow-lg gradient-text">
          Discover the Features of ChanakyaGPT
        </h1>
        <h1 className="text-gray-500 min-[1150px]:text-lg text-[16px] max-[1150px]:mt-[30px] text-center font-bold drop-shadow-lg mt-[10px] min-[1150px]:w-[720px] mx-auto">
          Dive into our unique features designed to provide an engaging, accessible, and enlightening experience for all wisdom seekers
        </h1>
        <div className="flex flex-row my-[50px] justify-between gap-[20px]">
          <div className="grid gap-4 row-gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col justify-between p-5 border rounded-[10px] shadow-sm">
              <div>
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#fffcf3]" style={{ border: '1px solid #ECE8D8' }}>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" className="flex h-8 w-8" data-new="" aria-hidden="true" data-v-3154cec8="">
                    <defs>
                      <linearGradient id="logo-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%" spreadMethod="pad">
                        <stop offset="0%" stopColor="#FB6D3B" stopOpacity="1" />
                        <stop offset="50%" stopColor="#F95999" stopOpacity="1" />
                        <stop offset="100%" stopColor="#845EC2" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    <g fill="url(#logo-gradient-2)" data-v-3154cec8="">
                      <path d="m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z"></path>
                    </g>
                  </svg>
                </div>
                <h6 className="mb-2 font-bold leading-5 gradient-text">Immersive Conversations</h6>
                <p className="mb-3 text-sm text-gray-800 font-semibold">
                  Engage with our GPT-4 powered chatbot that leverages the wisdom of Chanakya, offering deep, insightful, and meaningful interactions.
                </p>
              </div>
              <a href="#faq" aria-label="" className="inline-flex items-center font-semibold transition-colors duration-200 text-[#004AAD] hover:text-gray-900">
                Learn more
              </a>
            </div>
            <div className="flex flex-col justify-between p-5 border rounded-[10px] shadow-sm">
              <div>
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#fffcf3]" style={{ border: '1px solid #ECE8D8' }}>
                  <img src="assets/img/om.png" className="w-8 h-8" alt="Om symbol" />
                </div>
                <h6 className="mb-2 font-bold leading-5 gradient-text">Guidance and Inspiration</h6>
                <p className="mb-3 text-sm text-gray-800 font-semibold">
                  Draw from Chanakya's principles to find guidance for your personal and professional challenges, inspiring you towards thoughtful action.
                </p>
              </div>
              <a href="#faq" aria-label="" className="inline-flex items-center font-semibold transition-colors duration-200 text-[#004AAD] hover:text-gray-900">
                Learn more
              </a>
            </div>
            <div className="flex flex-col justify-between p-5 border rounded-[10px] shadow-sm">
              <div>
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#fffcf3]" style={{ border: '1px solid #ECE8D8' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 448 512">
                    <defs>
                      <linearGradient id="logo-gradient-3" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FB6D3B' }} />
                        <stop offset="50%" style={{ stopColor: '#F95999' }} />
                        <stop offset="100%" style={{ stopColor: '#845EC2' }} />
                      </linearGradient>
                    </defs>
                    <path fill="url(#logo-gradient-3)" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                  </svg>
                </div>
                <h6 className="mb-2 font-bold leading-5 gradient-text">Secure & Private</h6>
                <p className="mb-3 text-sm text-gray-800 font-semibold">
                  Your conversations are confidential and not stored, ensuring your privacy and peace of mind. Chat freely without any hesitation.
                </p>
              </div>
              <a href="#faq" aria-label="" className="inline-flex items-center font-semibold transition-colors duration-200 text-[#004AAD] hover:text-gray-900">
                Learn more
              </a>
            </div>
            <div className="flex flex-col justify-between p-5 border rounded-[10px] shadow-sm">
              <div>
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#fffcf3]" style={{ border: '1px solid #ECE8D8' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="language-translation" fill="url(#logo-gradient-4)" className="w-10 h-10">
                    <defs>
                      <linearGradient id="logo-gradient-4" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FB6D3B' }} />
                        <stop offset="50%" style={{ stopColor: '#F95999' }} />
                        <stop offset="100%" style={{ stopColor: '#845EC2' }} />
                      </linearGradient>
                    </defs>
                    <path d="M21.05566,12h-2a1,1,0,0,0,0,2v2H17.8714a2.96481,2.96481,0,0,0,.18426-1A2.99955,2.99955,0,0,0,12.458,13.50049a.99992.99992,0,1,0,1.73242.999A1.0009,1.0009,0,0,1,15.05566,14a1,1,0,0,1,0,2,1,1,0,0,0,0,2,1,1,0,1,1,0,2,1.0009,1.0009,0,0,1-.86523-.49951.99992.99992,0,1,0-1.73242.999A2.99955,2.99955,0,0,0,18.05566,19a2.96481,2.96481,0,0,0-.18426-1h1.18426v3a1,1,0,0,0,2,0V14a1,1,0,1,0,0-2ZM9.08594,11.24268a.99963.99963,0,1,0,1.93945-.48536L9.26855,3.72754a2.28044,2.28044,0,0,0-4.4248,0L3.08594,10.75732a.99963.99963,0,1,0,1.93945.48536L5.58618,9H8.52545ZM6.0863,7l.6969-2.78711a.29222.29222,0,0,1,.5459,0L8.02563,7Zm7.96936,0h1a1.001,1.001,0,0,1,1,1V9a1,1,0,0,0,2,0V8a3.00328,3.00328,0,0,0-3-3h-1a1,1,0,0,0,0,2Zm-4,9h-1a1.001,1.001,0,0,1-1-1V14a1,1,0,0,0-2,0v1a3.00328,3.00328,0,0,0,3,3h1a1,1,0,0,0,0-2Z"></path>
                  </svg>
                </div>
                <h6 className="mb-2 font-bold leading-5 gradient-text">Multilingual Support</h6>
                <p className="mb-3 text-sm text-gray-800 font-semibold">
                  ChanakyaGPT is now multilingual! Experience the wisdom of Chanakya in your preferred language i.e. Hindi, Telugu, Gujarati, Bengali, & English
                </p>
              </div>
              <a href="#faq" aria-label="" className="inline-flex items-center font-semibold transition-colors duration-200 text-[#004AAD] hover:text-gray-900">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* FEATURES SECTION ENDS HERE */}

      {/* FAQ'S SECTION BEGINS HERE */}
      <FAQSection />

      {/* FOOTER SECTION BEGINS HERE */}
      <div className="mt-[60px] w-full bg-[#141534]">
        <footer className="bg-[#141534] max-w-[1290px] w-11/12 mx-auto">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="flex items-center justify-between max-[643px]:flex-col max-[643px]:gap-[10px]">
              <a href="#">
                <img src="assets/img/white_logo.png" className="w-36 max-[643px]:mr-3" alt="ChanakyaGPT Logo" />
              </a>
              <ul className="lgfoothide flex flex-wrap items-center mb-6 sm:mb-0">
                <li className="hover:scale-[1.02] hover:duration-300 cursor-pointer">
                  <a href="https://chanakyagpt.in/" className="mr-4 font-semibold text-gray-200 text-sm md:mr-6">Home</a>
                </li>
                <li className="hover:scale-[1.02] hover:duration-300 cursor-pointer">
                  <a href="#features" className="mr-4 font-semibold text-gray-200 text-sm md:mr-6">Features</a>
                </li>
                <li className="hover:scale-[1.02] hover:duration-300 cursor-pointer">
                  <a href="#faq" className="mr-4 font-semibold text-gray-200 text-sm md:mr-6">FAQ's</a>
                </li>
                <li className="hover:scale-[1.02] hover:duration-300 cursor-pointer">
                  <a href="https://forms.gle/26xSUP2vbmEDQeR26" className="font-semibold text-gray-200 text-sm">Contact Us</a>
                </li>
              </ul>
              <ul className="smfoothide grid grid-cols-2 gap-4 justify-items-center">
                <li className="hover:scale-[1.02] hover:duration-300 cursor-pointer">
                  <a href="https://chanakyagpt.in/" className="font-semibold text-gray-200 text-sm">Home</a>
                </li>
                <li className="hover:scale-[1.02] hover:duration-300 cursor-pointer">
                  <a href="#features" className="font-semibold text-gray-200 text-sm">Features</a>
                </li>
                <li className="hover:scale-[1.02] hover:duration-300 cursor-pointer">
                  <a href="#faq" className="font-semibold text-gray-200 text-sm">FAQ's</a>
                </li>
                <li className="hover:scale-[1.02] hover:duration-300 cursor-pointer">
                  <a href="https://forms.gle/26xSUP2vbmEDQeR26" className="font-semibold text-gray-200 text-sm">Contact Us</a>
                </li>
              </ul>
            </div>
            <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
            <span className="block text-sm text-gray-300 text-center font-semibold">
              © 2023 <a href="https://chanakyagpt.in/">ChanakyaGPT</a>. Created with ❤️ by{' '}
              <span
                className="underline text-gray-100 cursor-pointer"
                onClick={() => window.location.href = 'https://twitter.com/samunicode'}
              >
                Sameer Chauhan
              </span>
            </span>
          </div>
        </footer>
      </div>
      {/* FOOTER SECTION ENDS HERE */}
    </div>
  );
};

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is ChanakyaGPT?",
      answer: "ChanakyaGPT is an AI-driven chatbot inspired by the wisdom of the ancient Indian philosopher, Chanakya. It combines cutting-edge artificial intelligence with timeless philosophy, providing users with unique insights and guidance."
    },
    {
      question: "How does ChanakyaGPT operate?",
      answer: "ChanakyaGPT leverages advanced GPT-4 AI Model by OpenAI trained on Chanakya's persona to understand your questions and provide thoughtful, relevant responses. It's designed to mimic the wise counsel of Chanakya, creating a conversation that feels natural and engaging."
    },
    {
      question: "Can ChanakyaGPT replace reading books like the Arthashastra?",
      answer: "While ChanakyaGPT is designed to share wisdom inspired by Chanakya, it's not intended to replace comprehensive sources like the Arthashastra. Consider it as a companion that can provide quick insights and guidance. For a deeper understanding of Chanakya's teachings, studying the original texts is recommended"
    },
    {
      question: "Is the knowledge of ChanakyaGPT current?",
      answer: "Yes, ChanakyaGPT is up-to-date with its AI training. However, its wisdom and responses are based on the teachings of Chanakya, which are timeless in nature. The blend of advanced AI with ancient philosophy allows it to provide relevant and insightful responses"
    },
    {
      question: "Which languages does ChanakyaGPT support?",
      answer: "ChanakyaGPT supports multiple languages, making it accessible to users from different linguistic backgrounds. Experience the wisdom of Chanakya in your preferred language i.e. Hindi, Telugu, Gujarati, Bengali, & English"
    },
    {
      question: "Are my conversations with ChanakyaGPT secure and private?",
      answer: "Yes, your conversations with ChanakyaGPT are secure and private. We do not store the content of your interactions, prioritizing your privacy and data security."
    }
  ];

  return (
    <div className="flex flex-col mt-[60px] max-w-[1290px] w-11/12 mx-auto" id="faq">
      <h1 className="text-[#004AAD] min-[1150px]:text-[45px] text-center text-[30px] min-[1150px]:leading-[60px] leading-none font-bold drop-shadow-lg gradient-text">
        Frequently Asked Questions
      </h1>
      <h1 className="text-gray-500 min-[1150px]:text-lg text-[16px] max-[1150px]:mt-[30px] text-center font-bold drop-shadow-lg mt-[10px] min-[1150px]:w-[720px] mx-auto">
        Uncover Answers to Your Queries: Understand more about ChanakyaGPT through our comprehensive list of frequently asked questions
      </h1>

      <div className="space-y-4 my-[50px]">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-[10px]">
            <button
              type="button"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openFAQ === index ? 'true' : 'false'}
              aria-label="Open item"
              title="Open item"
              className="flex items-center justify-between w-full p-4 focus:outline-none"
            >
              <p className="min-[1150px]:text-lg text-md text-left font-bold gradient-text">
                {faq.question}
              </p>
              <div className="w-4 flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className={`text-gray-600 transition-transform duration-200 ${openFAQ === index ? 'transform rotate-180' : ''}`}
                >
                  <polyline
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    points="2,7 12,17 22,7"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
            {openFAQ === index && (
              <div className="p-4 pt-0">
                <p className="text-gray-800 font-semibold">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;