// JavaScript functionality
document.addEventListener('DOMContentLoaded', function () {
    // Search functionality
    const searchButton = document.getElementById('search-button');
    const searchInput = document.querySelector('.search-bar input');

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
            // In a real implementation, this would filter news articles
        }
    });

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // Company filter tags
    const companyTags = document.querySelectorAll('.company-tag');

    companyTags.forEach(tag => {
        tag.addEventListener('click', function () {
            // Remove active class from all tags
            companyTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            this.classList.add('active');

            const company = this.textContent;
            alert(`Filtering by: ${company}`);
            // In a real implementation, this would filter news articles
        });
    });

    // Simulate loading more news when scrolling to bottom
    window.addEventListener('scroll', function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            // In a real implementation, this would load more articles via AJAX
            console.log('Loading more news...');
        }
    });

    // Mobile menu toggle would be added here for smaller screens
});

const newsURL = "https://example.com/latest-news"; // Change this to your actual news link

document.getElementById('facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(newsURL)}`;
document.getElementById('twitter').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(newsURL)}`;
document.getElementById('linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(newsURL)}`;
document.getElementById('email').href = `mailto:?subject=Check out this news!&body=${encodeURIComponent(newsURL)}`;

function toggleShareMenu() {
    const menu = document.getElementById('shareMenu');
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function copyLink(event) {
    event.preventDefault();
    navigator.clipboard.writeText(newsURL).then(() => {
        alert("Link copied to clipboard!");
    });
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    const shareContainer = document.querySelector(".share-container");
    if (!shareContainer.contains(event.target)) {
        document.getElementById('shareMenu').style.display = "none";
    }
});