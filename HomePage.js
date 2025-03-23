function internship(){
    console.log("Redirecting to internship page");
    window.location.href = "Internship.html";
}

// Toggle button functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Debug elements
    const menuToggleElement = document.getElementById('menuToggle');
    const dropdownMenuElement = document.getElementById('dropdownMenu');
    
    console.log('Menu toggle exists:', !!menuToggleElement);
    console.log('Dropdown menu exists:', !!dropdownMenuElement);
    
    if (menuToggleElement) {
        console.log('Menu toggle position:', menuToggleElement.getBoundingClientRect());
    }
    
    if (dropdownMenuElement) {
        console.log('Dropdown menu position:', dropdownMenuElement.getBoundingClientRect());
        console.log('Dropdown menu display:', window.getComputedStyle(dropdownMenuElement).display);
        console.log('Dropdown menu visibility:', window.getComputedStyle(dropdownMenuElement).visibility);
    }
    
    // Menu toggle functionality with simplified approach
    const menuToggle = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (menuToggle && dropdownMenu) {
        console.log('Menu elements found and ready for interaction');
        
        // Initialize dropdown state
        let isDropdownOpen = false;
        
        // Toggle menu when clicked
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Menu toggle clicked');
            isDropdownOpen = !isDropdownOpen;
            
            console.log('Dropdown state changed to:', isDropdownOpen);
            
            if (isDropdownOpen) {
                // Open dropdown
                dropdownMenu.classList.add('active');
                console.log('Added active class to dropdown');
                console.log('Dropdown has active class:', dropdownMenu.classList.contains('active'));
                
                // Directly apply styles in addition to class
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(10px)';
                
                menuToggle.querySelector('.menu-icon').style.transform = 'rotate(180deg)';
                
                // Force reflow to ensure styles are applied
                void dropdownMenu.offsetWidth;
                
                // Animate dropdown items with staggered delay
                const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
                console.log('Found dropdown items:', dropdownItems.length);
                
                dropdownItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-10px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.transitionDelay = (index * 0.05) + 's';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 10);
                });
                
                // Check dropdown visibility after applying styles
                setTimeout(() => {
                    console.log('Dropdown visibility after applying styles:');
                    console.log('- display:', window.getComputedStyle(dropdownMenu).display);
                    console.log('- visibility:', window.getComputedStyle(dropdownMenu).visibility);
                    console.log('- opacity:', window.getComputedStyle(dropdownMenu).opacity);
                    console.log('- transform:', window.getComputedStyle(dropdownMenu).transform);
                }, 50);
            } else {
                // Close dropdown
                closeDropdown();
            }
        });
        
        // Function to close dropdown
        function closeDropdown() {
            console.log('Closing dropdown');
            isDropdownOpen = false;
            dropdownMenu.classList.remove('active');
            console.log('Removed active class from dropdown');
            
            // Directly reset styles
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            dropdownMenu.style.transform = 'translateY(20px)';
            
            menuToggle.querySelector('.menu-icon').style.transform = 'rotate(0deg)';
            
            // Reset item animations
            const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.style.transition = 'none';
                item.style.transitionDelay = '0s';
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (isDropdownOpen && !menuToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                console.log('Clicked outside dropdown - closing');
                closeDropdown();
            }
        });
        
        // Hover effects for dropdown items
        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            item.addEventListener('mouseleave', function() {
                if (isDropdownOpen) {
                    this.style.transform = 'translateX(0)';
                }
            });
        });
    } else {
        console.error('Menu toggle or dropdown menu elements not found. Check your HTML structure and IDs.');
    }
    
    // Toggle button functionality
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const toggleContainer = document.querySelector('.toggle-container');
    const mainNavigation = document.querySelector('.main-navigation');
    
    // Add scroll effect to navigation
    function handleScroll() {
        if (window.scrollY > 50) {
            mainNavigation.style.background = 'linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(248, 240, 255, 0.95))';
            mainNavigation.style.boxShadow = '0 4px 30px rgba(156, 50, 204, 0.08)';
            mainNavigation.style.padding = '8px 50px';
        } else {
            mainNavigation.style.background = 'linear-gradient(to right, rgba(255, 255, 255, 0.97), rgba(248, 240, 255, 0.97))';
            mainNavigation.style.boxShadow = '0 4px 20px rgba(156, 50, 204, 0.05)';
            mainNavigation.style.padding = '12px 50px';
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Add scroll detection for the Course text
    const observePlacementText = () => {
        const courseTexts = document.querySelectorAll('.heading-purple');
        
        if (courseTexts.length === 0) return;
        
        // Set initial state
        courseTexts.forEach(text => {
            // Initially set to flipped state
            text.style.transform = 'scaleX(-1)';
            text.style.opacity = '0.7';
            // Clear any lingering transition or animation
            text.style.animation = 'none';
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is visible - flip to normal
                    requestAnimationFrame(() => {
                        entry.target.classList.add('visible');
                        
                        // Reset any inline styles that might interfere with the animation
                        entry.target.style.transform = '';
                        entry.target.style.opacity = '';
                        entry.target.style.transition = '';
                        
                        // Force a reflow before adding the animation class
                        entry.target.offsetWidth;
                        
                        // Add animation class after a small delay
                        setTimeout(() => {
                            entry.target.classList.add('animate-flip');
                        }, 50);
                    });
                } else {
                    // Element is not visible - revert back
                    entry.target.classList.remove('visible', 'animate-flip');
                    
                    // Use requestAnimationFrame to ensure styles are applied after class removal
                    requestAnimationFrame(() => {
                        entry.target.style.transform = 'scaleX(-1)';
                        entry.target.style.opacity = '0.7';
                        entry.target.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
                    });
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
        
        courseTexts.forEach(text => {
            observer.observe(text);
        });
    };
    
    // Call the observe function
    observePlacementText();
    
    // sliding indicator
    const indicator = document.createElement('span');
    indicator.className = 'slider-indicator';
    toggleContainer.appendChild(indicator);
    
    // Position indicator on load
    setTimeout(() => {
        const activeBtn = document.querySelector('.toggle-btn.active');
        if (activeBtn) {
            moveIndicator(activeBtn);
            // Add initial animation class
            indicator.style.opacity = '1';
        }
    }, 100);
    
    // Set up event listeners
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('active')) return;
            
            // Remove active class from all buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button with slight delay for smoother effect
            setTimeout(() => {
                this.classList.add('active');
                
                // Add animation to enhance visibility
                indicator.style.animation = 'none';
                setTimeout(() => {
                    indicator.style.animation = 'pulse 1.5s infinite';
                }, 10);
            }, 50);
            
            // Move indicator
            moveIndicator(this);
            
            // Handle navigation or filtering based on selection
            const selection = this.textContent.trim();
            console.log(`${selection} selected`);
            
            if (selection === 'INTERNSHIP') {
                // Optionally redirect: window.location.href = "Internship.html";
            } else if (selection === 'FULL-TIME') {
                // Optionally redirect: window.location.href = "Placement.html";
            }
        });
    });
    
    // Function to move indicator
    function moveIndicator(element) {
        const indicator = document.querySelector('.slider-indicator');
        
        if (!indicator) return;
        
        // Add transition class for smooth movement
        indicator.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        indicator.style.width = `${element.offsetWidth}px`;
        indicator.style.height = `${element.offsetHeight}px`;
        indicator.style.left = `${element.offsetLeft}px`;
        indicator.style.top = `${element.offsetTop}px`;
        
        // Reset animation
        indicator.style.animation = 'none';
        indicator.offsetHeight; // Trigger reflow
        indicator.style.animation = 'pulse 1.5s infinite';
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const activeBtn = document.querySelector('.toggle-btn.active');
        if (activeBtn) {
            moveIndicator(activeBtn);
        }
    });
});