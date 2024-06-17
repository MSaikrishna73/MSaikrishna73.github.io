document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Show header on scroll
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    const profileImage = document.querySelector('.profile-image');
    const heroContent = document.querySelector('.hero .content');
    const headerContainer = document.querySelector('.header-container');
    const headerTitle = document.querySelector('header h1');

    const sections = document.querySelectorAll('section');

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > heroSection.clientHeight - header.clientHeight) {
            header.style.display = 'flex';
        } else {
            header.style.display = 'none';
        }

        // Profile image and title shrinking and moving effect
        if (scrollY > 0) {
            const shrinkRatio = Math.min(scrollY / 200, 1);
            profileImage.style.width = `${50 - shrinkRatio * 30}px`;
            profileImage.style.height = `${50 - shrinkRatio * 30}px`;
            headerTitle.style.fontSize = `${20 - shrinkRatio * 10}px`;
            headerContainer.style.transform = `translate(-${shrinkRatio * 20}px, -${shrinkRatio * 30}px)`;
        } else {
            profileImage.style.width = '50px';
            profileImage.style.height = '50px';
            headerTitle.style.fontSize = '20px';
            headerContainer.style.transform = 'translate(0, 0)';
        }

        // Hero content dynamic effects
        heroContent.style.opacity = 1 - scrollY / 400;
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
    });

    // Download resume button
    const downloadButton = document.getElementById('downloadResume');
    downloadButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'files/resume.pdf';  // Assuming your resume file is stored locally
        link.download = 'Sai_Krishna_Resume.pdf';
        link.click();
    });

    // Handle image click to expand
    const gridItems = document.querySelectorAll('.grid-item img');
    const footer = document.querySelector('footer');

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!item.classList.contains('expanded')) {
                const expandedContainer = document.createElement('div');
                expandedContainer.classList.add('expanded-container');
                
                const expandedImage = item.cloneNode(true);
                expandedContainer.appendChild(expandedImage);

                const backButton = document.createElement('button');
                backButton.innerText = 'Go Back';
                backButton.classList.add('back-button');
                backButton.addEventListener('click', () => {
                    expandedContainer.remove();
                    document.body.classList.remove('no-scroll');
                    footer.classList.remove('hidden');
                });

                expandedContainer.appendChild(backButton);
                document.body.appendChild(expandedContainer);
                document.body.classList.add('no-scroll');
                footer.classList.add('hidden');
            }
        });
    });

    // Assign classes to rows
    const grid = document.querySelector('.grid');
    const gridItemsArray = Array.from(grid.children);
    gridItemsArray.forEach((item, index) => {
        const rowIndex = Math.floor(index / 4) + 1;
        item.classList.add(`row-${rowIndex}`);
    });
});
