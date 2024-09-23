document.getElementById('toggleNav').addEventListener('click', function() {
    const navItems = document.getElementById('navItems');
    if (navItems.classList.contains('hidden')) {
        navItems.classList.remove('hidden');
        setTimeout(() => {
            navItems.classList.add('opacity-100', 'scale-100');
            navItems.classList.remove('opacity-0', 'scale-95');
        }, 10);
    } else {
        navItems.classList.remove('opacity-100', 'scale-100');
        navItems.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            navItems.classList.add('hidden');
        }, 500);
    }
});
