// Hamburger Menu JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get hamburger button and sidebar elements
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;
    
    // Check if elements exist before adding event listeners
    if (hamburger && sidebar) {
        
        // Toggle sidebar when hamburger is clicked
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            toggleSidebar();
        });
        
        // Close sidebar when clicking outside of it
        document.addEventListener('click', function(e) {
            const isClickInsideSidebar = sidebar.contains(e.target);
            const isClickOnHamburger = hamburger.contains(e.target);
            
            if (!isClickInsideSidebar && !isClickOnHamburger && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
        
        // Close sidebar when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
        
        // Close sidebar when clicking on navigation links (mobile)
        const navLinks = sidebar.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Only close on mobile screens
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            });
        });
        
        // Handle window resize - close sidebar if screen becomes larger
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
    }
    
    // Function to toggle sidebar
    function toggleSidebar() {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
        
        // Prevent body scroll when sidebar is open on mobile
        if (sidebar.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }
    
    // Function to close sidebar
    function closeSidebar() {
        hamburger.classList.remove('active');
        sidebar.classList.remove('active');
        body.style.overflow = ''; // Restore body scroll
    }
    
    // Function to open sidebar (if needed)
    function openSidebar() {
        hamburger.classList.add('active');
        sidebar.classList.add('active');
        body.style.overflow = 'hidden';
    }
    
    // Optional: Add touch/swipe gestures for mobile
    let startX = null;
    let startY = null;
    
    // Touch start event
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    // Touch move event - detect swipe gestures
    document.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;
        
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        
        // Only trigger if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Swipe right from left edge - open sidebar
            if (startX < 50 && deltaX > 50 && !sidebar.classList.contains('active')) {
                openSidebar();
            }
            // Swipe left when sidebar is open - close sidebar
            else if (deltaX < -50 && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        }
        
        // Reset values
        startX = null;
        startY = null;
    });
    
    // Reset touch values on touch end
    document.addEventListener('touchend', function() {
        startX = null;
        startY = null;
    });
});