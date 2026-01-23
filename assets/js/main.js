/**
 * Wavy Studios - Main JavaScript v1.0.0
 */
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initMobileMenu();
        initDropdowns();
        initScrollAnimations();
        initSmoothScroll();
        initForms();
        setActiveNavLink();
    });

    // Navigation scroll behavior
    function initNavigation() {
        var header = document.querySelector('.site-header');
        if (!header) return;

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        }, { passive: true });
    }

    // Mobile menu toggle
    function initMobileMenu() {
        var toggle = document.querySelector('.mobile-menu-toggle');
        var mobileNav = document.querySelector('.mobile-nav');
        if (!toggle || !mobileNav) return;

        toggle.addEventListener('click', function() {
            var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            mobileNav.classList.toggle('is-open');
            document.body.classList.toggle('menu-open');
        });

        // Mobile dropdown toggles
        var mobileToggles = document.querySelectorAll('.mobile-dropdown-toggle');
        mobileToggles.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var parent = btn.closest('.mobile-nav-item');
                var dropdown = parent.querySelector('.mobile-dropdown');
                
                document.querySelectorAll('.mobile-dropdown.is-open').forEach(function(d) {
                    if (d !== dropdown) d.classList.remove('is-open');
                });
                
                dropdown.classList.toggle('is-open');
                btn.setAttribute('aria-expanded', dropdown.classList.contains('is-open'));
            });
        });

        // Close on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
                toggle.setAttribute('aria-expanded', 'false');
                mobileNav.classList.remove('is-open');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Desktop dropdown menus
    function initDropdowns() {
        var dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
        
        dropdownItems.forEach(function(item) {
            var link = item.querySelector('.nav-link');
            var dropdown = item.querySelector('.nav-dropdown');
            if (!link || !dropdown) return;

            item.addEventListener('mouseenter', function() {
                link.setAttribute('aria-expanded', 'true');
                dropdown.classList.add('is-open');
            });

            item.addEventListener('mouseleave', function() {
                link.setAttribute('aria-expanded', 'false');
                dropdown.classList.remove('is-open');
            });

            // Keyboard navigation
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    var isExpanded = link.getAttribute('aria-expanded') === 'true';
                    link.setAttribute('aria-expanded', !isExpanded);
                    dropdown.classList.toggle('is-open');
                    
                    if (!isExpanded) {
                        var firstLink = dropdown.querySelector('.dropdown-link');
                        if (firstLink) firstLink.focus();
                    }
                }
                
                if (e.key === 'Escape') {
                    link.setAttribute('aria-expanded', 'false');
                    dropdown.classList.remove('is-open');
                    link.focus();
                }

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    link.setAttribute('aria-expanded', 'true');
                    dropdown.classList.add('is-open');
                    var firstLink = dropdown.querySelector('.dropdown-link');
                    if (firstLink) firstLink.focus();
                }
            });

            // Dropdown link navigation
            var dropdownLinks = dropdown.querySelectorAll('.dropdown-link');
            dropdownLinks.forEach(function(dLink, index) {
                dLink.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        link.setAttribute('aria-expanded', 'false');
                        dropdown.classList.remove('is-open');
                        link.focus();
                    }
                    if (e.key === 'ArrowDown' && dropdownLinks[index + 1]) {
                        e.preventDefault();
                        dropdownLinks[index + 1].focus();
                    }
                    if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        if (dropdownLinks[index - 1]) {
                            dropdownLinks[index - 1].focus();
                        } else {
                            link.focus();
                        }
                    }
                });
            });
        });

        // Close dropdowns on outside click
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-item.has-dropdown')) {
                document.querySelectorAll('.nav-dropdown.is-open').forEach(function(dropdown) {
                    dropdown.classList.remove('is-open');
                    var link = dropdown.parentElement.querySelector('.nav-link');
                    if (link) link.setAttribute('aria-expanded', 'false');
                });
            }
        });
    }

    // Set active navigation link
    function setActiveNavLink() {
        var currentPath = window.location.pathname;
        var currentPage = currentPath.split('/').pop() || 'index.html';
        
        document.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link, .mobile-dropdown-link').forEach(function(link) {
            var href = link.getAttribute('href');
            if (href && (href === currentPage || href === './' + currentPage)) {
                link.classList.add('active');
                
                var parentItem = link.closest('.nav-item.has-dropdown');
                if (parentItem) {
                    var parentLink = parentItem.querySelector('.nav-link');
                    if (parentLink) parentLink.classList.add('active');
                }
            }
        });
    }

    // Scroll animations
    function initScrollAnimations() {
        var observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    
                    var staggerChildren = entry.target.querySelectorAll('[data-stagger]');
                    staggerChildren.forEach(function(child, index) {
                        child.style.transitionDelay = (index * 0.1) + 's';
                        child.classList.add('is-visible');
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal, [data-reveal]').forEach(function(el) {
            observer.observe(el);
        });

        // Auto-observe common elements
        var selectors = '.card, .service-card, .case-card, .feature-card, .stat-item, .process-step, .testimonial-card';
        document.querySelectorAll(selectors).forEach(function(el) {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
                observer.observe(el);
            }
        });
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href === '#') return;
                
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    var header = document.querySelector('.site-header');
                    var headerHeight = header ? header.offsetHeight : 0;
                    var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    history.pushState(null, null, href);
                }
            });
        });
    }

    // Form handling
    function initForms() {
        // Newsletter forms
        document.querySelectorAll('.newsletter-form').forEach(function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                var emailInput = form.querySelector('input[type="email"]');
                var submitBtn = form.querySelector('button[type="submit"]');
                
                if (!emailInput || !emailInput.value) return;

                if (!isValidEmail(emailInput.value)) {
                    showFormError(emailInput, 'Please enter a valid email address');
                    return;
                }

                submitBtn.disabled = true;
                submitBtn.textContent = 'Subscribing...';

                setTimeout(function() {
                    form.innerHTML = '<p style="color: var(--accent-lime); font-size: 0.9rem;">Thanks for subscribing! 🎉</p>';
                }, 1000);
            });
        });

        // Multi-step form
        var partnerForm = document.getElementById('partnerForm');
        if (partnerForm) {
            initMultiStepForm(partnerForm);
        }
    }

    function initMultiStepForm(form) {
        var currentStep = 1;
        var totalSteps = form.querySelectorAll('.form-step').length;
        var progressFill = document.getElementById('progressFill');

        window.nextStep = function() {
            if (currentStep < totalSteps) {
                var currentStepEl = form.querySelector('.form-step[data-step="' + currentStep + '"]');
                var requiredFields = currentStepEl.querySelectorAll('[required]');
                var isValid = true;

                requiredFields.forEach(function(field) {
                    if (!field.value.trim()) {
                        isValid = false;
                        showFormError(field, 'This field is required');
                    } else {
                        clearFormError(field);
                    }
                });

                if (!isValid) return;

                currentStep++;
                showStep(currentStep);
            }
        };

        window.prevStep = function() {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        };

        function showStep(step) {
            form.querySelectorAll('.form-step').forEach(function(s) {
                s.classList.remove('active');
            });
            var targetStep = form.querySelector('.form-step[data-step="' + step + '"]');
            if (targetStep) targetStep.classList.add('active');

            if (progressFill) {
                progressFill.style.width = ((step / totalSteps) * 100) + '%';
            }

            document.querySelectorAll('.progress-step').forEach(function(s, i) {
                s.classList.remove('active', 'completed');
                if (i + 1 === step) s.classList.add('active');
                else if (i + 1 < step) s.classList.add('completed');
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            form.querySelectorAll('.form-step').forEach(function(s) {
                s.classList.remove('active');
            });
            var progress = document.querySelector('.form-progress');
            if (progress) progress.style.display = 'none';
            var success = document.getElementById('formSuccess');
            if (success) success.classList.add('active');
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormError(field, message) {
        clearFormError(field);
        field.classList.add('has-error');
        field.style.borderColor = 'var(--accent-coral)';
        var error = document.createElement('span');
        error.className = 'form-error';
        error.textContent = message;
        error.style.cssText = 'color: var(--accent-coral); font-size: 0.75rem; margin-top: 0.25rem; display: block;';
        field.parentNode.appendChild(error);
    }

    function clearFormError(field) {
        field.classList.remove('has-error');
        field.style.borderColor = '';
        var existingError = field.parentNode.querySelector('.form-error');
        if (existingError) existingError.remove();
    }

    // Expose to global scope
    window.WavyStudios = {
        initScrollAnimations: initScrollAnimations,
        initSmoothScroll: initSmoothScroll
    };
})();
