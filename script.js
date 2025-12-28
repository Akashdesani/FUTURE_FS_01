fetch("https://portfolio-backend-07nz.onrender.com/contact")


(function () {
    const hamburger = document.querySelector('.navbar-hamburger');
    const mobileMenu = document.querySelector('.navbar-mobile-menu');
    const navLinks = document.querySelectorAll('.navbar-link, .navbar-cta');

    // Toggle mobile menu
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (hamburger && mobileMenu) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Active link highlighting based on scroll position
    function updateActiveLink() {
        const sections = document.querySelectorAll('[id^="EnVMF96XSxKcsw1765337977"], [id^="DZQJ8K2XwgXDAk1765337963"], [id^="iZAQJyoIoxsXTx1765337968"], [id^="5m2h5vhAIFlRYp1765337984"], [id^="PNZAXuUQ9XXBYV1765337993"]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Smooth scroll for anchor links
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
})();


// Enhanced continuous animation for skill badges
(function () {
    const skillBadges = document.querySelectorAll('.skill-badge');

    skillBadges.forEach((badge, index) => {
        setInterval(() => {
            badge.style.animation = 'none';
            setTimeout(() => {
                badge.style.animation = 'bounceIn 0.6s ease-out';
            }, 10);
        }, 6000 + (index * 300));
    });

    // Smooth scroll for anchor links
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add parallax effect to background shapes
    const shapes = document.querySelectorAll('.shape');
    let scrollY = window.scrollY || window.pageYOffset;

    function updateParallax() {
        scrollY = window.scrollY || window.pageYOffset;
        shapes.forEach((shape, index) => {
            const speed = 0.05 + (index * 0.02);
            const yPos = -(scrollY * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    }

    window.addEventListener('scroll', updateParallax);
    updateParallax();

    // Add hover effect enhancement for image
    const imageWrapper = document.querySelector('.hero-image-wrapper');
    if (imageWrapper) {
        imageWrapper.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
        });

        imageWrapper.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }
})();


(function () {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const animateCounter = (element, target, duration) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    };

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.classList.contains('stat-card')) {
                    const numberElement = entry.target.querySelector('.stat-number');
                    const target = parseInt(numberElement.getAttribute('data-target'));
                    setTimeout(() => {
                        animateCounter(numberElement, target, 2000);
                    }, 300);
                }

                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const elementsToAnimate = [
        document.getElementById('aboutHeader'),
        document.getElementById('mainCard'),
        document.getElementById('journeyCard'),
        document.getElementById('statCard1'),
        document.getElementById('statCard2'),
        document.getElementById('statCard3'),
        document.getElementById('statCard4'),
        document.getElementById('feature1'),
        document.getElementById('feature2'),
        document.getElementById('feature3'),
        document.getElementById('feature4'),
        document.getElementById('ctaSection')
    ];

    elementsToAnimate.forEach((element, index) => {
        if (element) {
            element.style.transitionDelay = (index * 0.08) + 's';
            observer.observe(element);
        }
    });

    // Parallax effect for background blobs
    let ticking = false;
    const aboutSection = document.querySelector('.about-section');

    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const sectionTop = aboutSection.offsetTop;
        const sectionHeight = aboutSection.offsetHeight;
        const windowHeight = window.innerHeight;

        if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            const progress = (scrolled - sectionTop + windowHeight) / (sectionHeight + windowHeight);
            const offset = progress * 50;
            aboutSection.style.setProperty('--parallax-offset', offset + 'px');
        }

        ticking = false;
    };

    const requestParallaxUpdate = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };

    window.addEventListener('scroll', requestParallaxUpdate);
    updateParallax();
})();


// Enhanced hover parallax effect for image
(function () {
    const imageFrame = document.querySelector('.instructor-image-frame');
    const image = document.querySelector('.instructor-img');

    if (imageFrame && image) {
        imageFrame.addEventListener('mousemove', function (e) {
            const rect = imageFrame.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;

            image.style.transform = `scale(1.08) translate(${percentX * 15}px, ${percentY * 15}px)`;
        });

        imageFrame.addEventListener('mouseleave', function () {
            image.style.transform = 'scale(1.08)';
        });
    }
})();



// Stagger animation for expertise items
(function () {
    const expertiseItems = document.querySelectorAll('.expertise-item');
    expertiseItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 1200 + (index * 150));
    });
})();


(function () {
    // Smooth scroll-triggered animations with Intersection Observer
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all project cards
    var projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function (card) {
        observer.observe(card);
    });

    // Parallax effect for decorative shapes
    var shapes = document.querySelectorAll('.parallax-shape');
    var handleParallax = function () {
        var scrolled = window.pageYOffset;
        var section = document.querySelector('.featured-projects-section');
        if (!section) return;

        var sectionTop = section.offsetTop;
        var sectionHeight = section.offsetHeight;
        var windowHeight = window.innerHeight;

        if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            var relativeScroll = scrolled - sectionTop + windowHeight;
            shapes.forEach(function (shape, index) {
                var speed = index === 0 ? 0.3 : 0.5;
                var yPos = relativeScroll * speed;
                shape.style.transform = 'translateY(' + yPos + 'px)';
            });
        }
    };

    // Throttle parallax for performance
    var parallaxTimeout;
    window.addEventListener('scroll', function () {
        if (parallaxTimeout) {
            window.cancelAnimationFrame(parallaxTimeout);
        }
        parallaxTimeout = window.requestAnimationFrame(handleParallax);
    });

    // CTA button interactions with data saving
    var ctaButtons = document.querySelectorAll('.project-cta');
    ctaButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            var card = this.closest('.project-card');
            var projectTitle = card.querySelector('.project-title').textContent;
            var projectDescription = card.querySelector('.project-description').textContent;
            var techBadges = Array.from(card.querySelectorAll('.tech-badge')).map(function (badge) {
                return badge.textContent;
            });
            var projectId = this.getAttribute('data-project');

            // Visual feedback
            var originalHTML = this.innerHTML;
            this.classList.add('cta-loading');
            this.innerHTML = '<span>Opening...</span>';
            this.style.pointerEvents = 'none';

            // Prepare data payload
            var payload = {
                projectId: projectId,
                projectTitle: projectTitle,
                projectDescription: projectDescription,
                technologies: techBadges,
                timestamp: new Date().toISOString(),
                action: 'view_project_details'
            };

            // Check if saveDataV1 function exists and save data
            if (typeof window.saveDataV1 === 'function') {
                window.saveDataV1(payload, 'featured-projects-interaction')
                    .then(function () {
                        console.log('Project interaction saved successfully:', payload);

                        // Reset button after successful save
                        setTimeout(function () {
                            button.innerHTML = originalHTML;
                            button.classList.remove('cta-loading');
                            button.style.pointerEvents = 'auto';
                        }, 1200);
                    })
                    .catch(function (error) {
                        console.error('Error saving project interaction:', error);

                        // Reset button even if save fails
                        setTimeout(function () {
                            button.innerHTML = originalHTML;
                            button.classList.remove('cta-loading');
                            button.style.pointerEvents = 'auto';
                        }, 1200);
                    });
            } else {
                // If saveDataV1 is not available, just log and reset
                console.log('Project Details (saveDataV1 not available):', payload);

                setTimeout(function () {
                    button.innerHTML = originalHTML;
                    button.classList.remove('cta-loading');
                    button.style.pointerEvents = 'auto';
                }, 1200);
            }
        });
    });

    // Tech badge interactions
    var techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach(function (badge) {
        badge.addEventListener('click', function () {
            var tech = this.textContent;
            var card = this.closest('.project-card');
            var projectTitle = card.querySelector('.project-title').textContent;

            // Prepare tech badge click data
            var payload = {
                technology: tech,
                projectTitle: projectTitle,
                timestamp: new Date().toISOString(),
                action: 'tech_badge_click'
            };

            // Save tech badge interaction if function is available
            if (typeof window.saveDataV1 === 'function') {
                window.saveDataV1(payload, 'tech-badge-interaction')
                    .then(function () {
                        console.log('Tech badge interaction saved:', payload);
                    })
                    .catch(function (error) {
                        console.error('Error saving tech badge interaction:', error);
                    });
            } else {
                console.log('Technology selected:', payload);
            }

            // Add pulse effect
            this.style.animation = 'none';
            setTimeout(function () {
                badge.style.animation = '';
            }, 10);
        });
    });

    // Initial animation trigger
    setTimeout(function () {
        projectCards.forEach(function (card, index) {
            setTimeout(function () {
                card.classList.add('animate-in');
            }, index * 150);
        });
    }, 100);
})();



(function () {

    // Enhanced continuous animation for skill badges
    (function () {
        const skillBadges = document.querySelectorAll('.skill-badge');

        skillBadges.forEach((badge, index) => {
            setInterval(() => {
                badge.style.animation = 'none';
                setTimeout(() => {
                    badge.style.animation = 'bounceIn 0.6s ease-out';
                }, 10);
            }, 6000 + (index * 300));
        });

        // Smooth scroll for anchor links
        const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
        ctaButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });



        document.getElementById("footerNewsletterForm").addEventListener("submit", function (e) {
            e.preventDefault(); // reload અટકાવે

            // Direct redirect to your thank you page
            window.location.href = "Thankyou.html";
        });



        // Add parallax effect to background shapes
        const shapes = document.querySelectorAll('.shape');
        let scrollY = window.scrollY || window.pageYOffset;

        function updateParallax() {
            scrollY = window.scrollY || window.pageYOffset;
            shapes.forEach((shape, index) => {
                const speed = 0.05 + (index * 0.02);
                const yPos = -(scrollY * speed);
                shape.style.transform = `translateY(${yPos}px)`;
            });
        }

        window.addEventListener('scroll', updateParallax);
        updateParallax();

        // Add hover effect enhancement for image
        const imageWrapper = document.querySelector('.hero-image-wrapper');
        if (imageWrapper) {
            imageWrapper.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
            });

            imageWrapper.addEventListener('mouseleave', function () {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        }
    })();

})();


(function () {

    (function () {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const animateCounter = (element, target, duration) => {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start) + '+';
                }
            }, 16);
        };

        const handleIntersection = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    if (entry.target.classList.contains('stat-card')) {
                        const numberElement = entry.target.querySelector('.stat-number');
                        const target = parseInt(numberElement.getAttribute('data-target'));
                        setTimeout(() => {
                            animateCounter(numberElement, target, 2000);
                        }, 300);
                    }

                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        const elementsToAnimate = [
            document.getElementById('aboutHeader'),
            document.getElementById('mainCard'),
            document.getElementById('journeyCard'),
            document.getElementById('statCard1'),
            document.getElementById('statCard2'),
            document.getElementById('statCard3'),
            document.getElementById('statCard4'),
            document.getElementById('feature1'),
            document.getElementById('feature2'),
            document.getElementById('feature3'),
            document.getElementById('feature4'),
            document.getElementById('ctaSection')
        ];

        elementsToAnimate.forEach((element, index) => {
            if (element) {
                element.style.transitionDelay = (index * 0.08) + 's';
                observer.observe(element);
            }
        });

        // Parallax effect for background blobs
        let ticking = false;
        const aboutSection = document.querySelector('.about-section');

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const sectionTop = aboutSection.offsetTop;
            const sectionHeight = aboutSection.offsetHeight;
            const windowHeight = window.innerHeight;

            if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const progress = (scrolled - sectionTop + windowHeight) / (sectionHeight + windowHeight);
                const offset = progress * 50;
                aboutSection.style.setProperty('--parallax-offset', offset + 'px');
            }

            ticking = false;
        };

        const requestParallaxUpdate = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestParallaxUpdate);
        updateParallax();
    })();

})();


(function () {

    // Enhanced hover parallax effect for image
    (function () {
        const imageFrame = document.querySelector('.instructor-image-frame');
        const image = document.querySelector('.instructor-img');

        if (imageFrame && image) {
            imageFrame.addEventListener('mousemove', function (e) {
                const rect = imageFrame.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const percentX = (x - centerX) / centerX;
                const percentY = (y - centerY) / centerY;

                image.style.transform = `scale(1.08) translate(${percentX * 15}px, ${percentY * 15}px)`;
            });

            imageFrame.addEventListener('mouseleave', function () {
                image.style.transform = 'scale(1.08)';
            });
        }
    })();

    // Stagger animation for expertise items
    (function () {
        const expertiseItems = document.querySelectorAll('.expertise-item');
        expertiseItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';

            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 1200 + (index * 150));
        });
    })();

})();

(function () {

    (function () {
        // Smooth scroll-triggered animations with Intersection Observer
        var observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px'
        };

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all project cards
        var projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(function (card) {
            observer.observe(card);
        });

        // Parallax effect for decorative shapes
        var shapes = document.querySelectorAll('.parallax-shape');
        var handleParallax = function () {
            var scrolled = window.pageYOffset;
            var section = document.querySelector('.featured-projects-section');
            if (!section) return;

            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var windowHeight = window.innerHeight;

            if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                var relativeScroll = scrolled - sectionTop + windowHeight;
                shapes.forEach(function (shape, index) {
                    var speed = index === 0 ? 0.3 : 0.5;
                    var yPos = relativeScroll * speed;
                    shape.style.transform = 'translateY(' + yPos + 'px)';
                });
            }
        };

        // Throttle parallax for performance
        var parallaxTimeout;
        window.addEventListener('scroll', function () {
            if (parallaxTimeout) {
                window.cancelAnimationFrame(parallaxTimeout);
            }
            parallaxTimeout = window.requestAnimationFrame(handleParallax);
        });

        // CTA button interactions with data saving
        var ctaButtons = document.querySelectorAll('.project-cta');
        ctaButtons.forEach(function (button) {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                var card = this.closest('.project-card');
                var projectTitle = card.querySelector('.project-title').textContent;
                var projectDescription = card.querySelector('.project-description').textContent;
                var techBadges = Array.from(card.querySelectorAll('.tech-badge')).map(function (badge) {
                    return badge.textContent;
                });
                var projectId = this.getAttribute('data-project');

                // Visual feedback
                var originalHTML = this.innerHTML;
                this.classList.add('cta-loading');
                this.innerHTML = '<span>Opening...</span>';
                this.style.pointerEvents = 'none';

                // Prepare data payload
                var payload = {
                    projectId: projectId,
                    projectTitle: projectTitle,
                    projectDescription: projectDescription,
                    technologies: techBadges,
                    timestamp: new Date().toISOString(),
                    action: 'view_project_details'
                };

                // Check if saveDataV1 function exists and save data
                if (typeof window.saveDataV1 === 'function') {
                    window.saveDataV1(payload, 'featured-projects-interaction')
                        .then(function () {
                            console.log('Project interaction saved successfully:', payload);

                            // Reset button after successful save
                            setTimeout(function () {
                                button.innerHTML = originalHTML;
                                button.classList.remove('cta-loading');
                                button.style.pointerEvents = 'auto';
                            }, 1200);
                        })
                        .catch(function (error) {
                            console.error('Error saving project interaction:', error);

                            // Reset button even if save fails
                            setTimeout(function () {
                                button.innerHTML = originalHTML;
                                button.classList.remove('cta-loading');
                                button.style.pointerEvents = 'auto';
                            }, 1200);
                        });
                } else {
                    // If saveDataV1 is not available, just log and reset
                    console.log('Project Details (saveDataV1 not available):', payload);

                    setTimeout(function () {
                        button.innerHTML = originalHTML;
                        button.classList.remove('cta-loading');
                        button.style.pointerEvents = 'auto';
                    }, 1200);
                }
            });
        });

        // Tech badge interactions
        var techBadges = document.querySelectorAll('.tech-badge');
        techBadges.forEach(function (badge) {
            badge.addEventListener('click', function () {
                var tech = this.textContent;
                var card = this.closest('.project-card');
                var projectTitle = card.querySelector('.project-title').textContent;

                // Prepare tech badge click data
                var payload = {
                    technology: tech,
                    projectTitle: projectTitle,
                    timestamp: new Date().toISOString(),
                    action: 'tech_badge_click'
                };

                // Save tech badge interaction if function is available
                if (typeof window.saveDataV1 === 'function') {
                    window.saveDataV1(payload, 'tech-badge-interaction')
                        .then(function () {
                            console.log('Tech badge interaction saved:', payload);
                        })
                        .catch(function (error) {
                            console.error('Error saving tech badge interaction:', error);
                        });
                } else {
                    console.log('Technology selected:', payload);
                }

                // Add pulse effect
                this.style.animation = 'none';
                setTimeout(function () {
                    badge.style.animation = '';
                }, 10);
            });
        });

        // Initial animation trigger
        setTimeout(function () {
            projectCards.forEach(function (card, index) {
                setTimeout(function () {
                    card.classList.add('animate-in');
                }, index * 150);
            });
        }, 100);
    })();

})();


document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you! I will contact you soon.");
  this.reset();
});

