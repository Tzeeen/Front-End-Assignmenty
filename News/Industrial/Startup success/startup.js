// JavaScript for filtering functionality
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');

    // Set current year in footer
    document.querySelector('.copyright').innerHTML = `&copy; ${new Date().getFullYear()} Startup Pulse. All rights reserved.`;

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // Filter news cards
            newsCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const category = card.querySelector('.news-category').textContent.toLowerCase();
                    const tags = card.dataset.tags ? card.dataset.tags.toLowerCase() : '';

                    if (category.includes(filter) || tags.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }

                // Handle featured news spanning two columns
                if (card.classList.contains('featured-news') && card.style.display === 'block') {
                    card.style.gridColumn = filter === 'all' ? 'span 2' : 'span 1';
                }
            });
        });
    });

    // Simulate loading more news when scrolling to bottom
    window.addEventListener('scroll', function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            // In a real app, you would fetch more data here
            console.log('Load more news...');
        }
    });
});