document.addEventListener('click', function(event) {
    const navItems = document.getElementById('navItems');
    const toggleButton = document.getElementById('toggleNav');
    if (!toggleButton.contains(event.target) && !navItems.contains(event.target)) {
        navItems.classList.remove('opacity-100', 'scale-100');
        navItems.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            navItems.classList.add('hidden');
        }, 500);
    }
});
