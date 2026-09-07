/**
 * Kamet Cleaning & Property Service
 * Vanilla JavaScript Functionality
 * - Mobile Navigation Menu Toggle
 * - Services Page Accordion & Image Carousels
 * - Contact Form Mailto Handler
 */

document.addEventListener('DOMContentLoaded', () => {
    // ─────────────────────────────────────────
    // 1. MOBILE MENU TOGGLE
    // ─────────────────────────────────────────
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenuBtn && mobileMenu) {
        const toggleMenu = () => {
            const isOpen = mobileMenu.classList.contains('opacity-100');
            if (isOpen) {
                // Close menu
                mobileMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
                mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
                document.body.style.overflow = 'unset';
                if (menuIcon) menuIcon.textContent = 'menu';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            } else {
                // Open menu
                mobileMenu.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2');
                mobileMenu.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
                document.body.style.overflow = 'hidden';
                if (menuIcon) menuIcon.textContent = 'close';
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);

        // Close mobile menu on any link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
                mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
                document.body.style.overflow = 'unset';
                if (menuIcon) menuIcon.textContent = 'menu';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ─────────────────────────────────────────
    // 2. SERVICES ACCORDION & CAROUSEL
    // ─────────────────────────────────────────
    const serviceItems = document.querySelectorAll('.service-item');
    let activeCarouselInterval = null;

    serviceItems.forEach(item => {
        const header = item.querySelector('.service-header');
        const collapse = item.querySelector('.service-collapse');
        const arrow = item.querySelector('.service-arrow');
        const track = item.querySelector('.carousel-track');
        const slides = item.querySelectorAll('.carousel-slide');
        const prevBtn = item.querySelector('.carousel-prev');
        const nextBtn = item.querySelector('.carousel-next');
        const dots = item.querySelectorAll('.carousel-dot');

        let currentIndex = 0;
        const totalSlides = slides.length;

        const updateSlidePosition = (index) => {
            currentIndex = index;
            if (track) {
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
            dots.forEach((dot, dIdx) => {
                if (dIdx === currentIndex) {
                    dot.classList.add('bg-[#d4af37]', 'scale-125');
                    dot.classList.remove('bg-white/70');
                } else {
                    dot.classList.remove('bg-[#d4af37]', 'scale-125');
                    dot.classList.add('bg-white/70');
                }
            });
        };

        const startAutoplay = () => {
            stopAutoplay();
            if (totalSlides > 1) {
                activeCarouselInterval = setInterval(() => {
                    const nextIdx = (currentIndex + 1) % totalSlides;
                    updateSlidePosition(nextIdx);
                }, 3000);
            }
        };

        const stopAutoplay = () => {
            if (activeCarouselInterval) {
                clearInterval(activeCarouselInterval);
                activeCarouselInterval = null;
            }
        };

        if (header && collapse) {
            header.addEventListener('click', () => {
                const isCurrentlyOpen = collapse.classList.contains('opacity-100');

                // Close all other service accordions
                serviceItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherCollapse = otherItem.querySelector('.service-collapse');
                        const otherArrow = otherItem.querySelector('.service-arrow');
                        if (otherCollapse) {
                            otherCollapse.classList.remove('max-h-[500px]', 'opacity-100', 'pb-4', 'sm:pb-5');
                            otherCollapse.classList.add('max-h-0', 'opacity-0');
                        }
                        if (otherArrow) {
                            otherArrow.classList.remove('rotate-180');
                        }
                    }
                });
                stopAutoplay();

                if (isCurrentlyOpen) {
                    // Close this one
                    collapse.classList.remove('max-h-[500px]', 'opacity-100', 'pb-4', 'sm:pb-5');
                    collapse.classList.add('max-h-0', 'opacity-0');
                    if (arrow) arrow.classList.remove('rotate-180');
                } else {
                    // Open this one
                    collapse.classList.remove('max-h-0', 'opacity-0');
                    collapse.classList.add('max-h-[500px]', 'opacity-100', 'pb-4', 'sm:pb-5');
                    if (arrow) arrow.classList.add('rotate-180');
                    updateSlidePosition(0);
                    startAutoplay();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                stopAutoplay();
                const prevIdx = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSlidePosition(prevIdx);
                startAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                stopAutoplay();
                const nextIdx = (currentIndex + 1) % totalSlides;
                updateSlidePosition(nextIdx);
                startAutoplay();
            });
        }

        dots.forEach((dot, dotIdx) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                stopAutoplay();
                updateSlidePosition(dotIdx);
                startAutoplay();
            });
        });
    });

    // ─────────────────────────────────────────
    // 3. CONTACT FORM SUBMISSION
    // ─────────────────────────────────────────
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstName = (quoteForm.elements['firstName']?.value || '').trim();
            const lastName = (quoteForm.elements['lastName']?.value || '').trim();
            const fullName = [firstName, lastName].filter(Boolean).join(' ') || (quoteForm.elements['name']?.value || '').trim();
            const email = (quoteForm.elements['email']?.value || '').trim();
            const service = (quoteForm.elements['service']?.value || '').trim();
            const message = (quoteForm.elements['message']?.value || '').trim();

            const toEmail = 'kametcleaningpropertyservice@gmail.com';
            const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

            if (!fullName || !email || !message) {
                alert('Please fill out your name, email, and message.');
                return;
            }
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            if (!service || service === 'Select Service') {
                alert('Please select a service.');
                return;
            }

            const subject = `Quote Request - ${service}`;
            const body = `Hello Team,

You have received a new contact inquiry from your website.

Contact Details:
Name: ${fullName}
Email: ${email}
Service Interested In: ${service}

Message:
${message}

Please respond to the customer at your earliest convenience.

Best Regards,
Website Contact System`;

            const mailtoLink = `mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        });
    }
});