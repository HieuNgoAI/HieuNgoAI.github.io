// script.js

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content-area');
    const loadingIndicator = document.getElementById('loading-indicator');
    // Ensure this order is the desired display order
    const sectionsToLoad = ['talks', 'articles', 'projects', 'publications', 'activities', 'about'];

    // --- Ensure loading indicator exists and is visible initially ---
    // If it's not in index.html, you could add it here, but better to have it in HTML.
    if (!loadingIndicator) {
        console.warn("Loading indicator element not found in index.html");
    } else {
        // Make sure it's visible if it was hidden by default
        loadingIndicator.style.display = 'block';
    }
    // Clear any potentially leftover static content (safer)
    // Find elements *other than* the loading indicator to remove
    Array.from(mainContent.children).forEach(child => {
        if (child !== loadingIndicator) {
            mainContent.removeChild(child);
        }
    });


    // --- Function to fetch section HTML (returns the text) ---
    const fetchSectionHTML = (sectionId) => {
        return fetch(`sections/${sectionId}.html`)
            .then(response => {
                if (!response.ok) {
                    // Throw an error that includes the sectionId for better debugging
                    throw new Error(`HTTP error! status: ${response.status} for ${sectionId}.html`);
                }
                return response.text(); // Return the HTML text
            })
            .catch(error => {
                console.error(`Error fetching section ${sectionId}:`, error);
                // Return an error message HTML string instead of throwing here
                // This allows Promise.all to complete even if some sections fail
                return `<p style="color: red; text-align: center; padding: 20px;">Failed to load ${sectionId} section.</p>`;
            });
    };

    // --- Load all sections, wait for all, then inject in order ---
    Promise.all(sectionsToLoad.map(id => fetchSectionHTML(id)))
        .then(htmlArray => {
            // htmlArray is now an array of HTML strings, IN THE CORRECT ORDER
            console.log('All sections fetched.');

            // Join the ordered HTML strings
            const combinedHtml = htmlArray.join('');

            // Set the main content area's HTML ONCE
            mainContent.innerHTML = combinedHtml; // Replace existing content

            // Append the loading indicator temporarily if it was removed by innerHTML =''
            // (Or better: ensure loading indicator is outside the main content replacement area,
            // or just hide it cleanly if it's inside)
            // Let's assume it was replaced and hide it conceptually if found, otherwise ignore.
            const potentiallyNewIndicator = mainContent.querySelector('#loading-indicator');
             if (potentiallyNewIndicator) {
                 potentiallyNewIndicator.style.display = 'none'; // Hide if it got re-added
             } else if(loadingIndicator) {
                 loadingIndicator.style.display = 'none'; // Hide original if still there
             }


            // --- Initialize Scrollspy AFTER content is loaded ---
            initializeScrollspy();

            // --- Add Footer AFTER content is loaded ---
            addFooter(); // Make sure this appends *after* setting innerHTML
        })
        .catch(error => {
            // This catch might not be strictly necessary if fetchSectionHTML handles errors
            // but good for catching errors in Promise.all itself
            console.error("Error processing sections:", error);
            if (loadingIndicator) {
                loadingIndicator.textContent = 'Error loading page content.';
                loadingIndicator.style.color = 'red';
                loadingIndicator.style.display = 'block'; // Ensure it's visible
            } else {
                 mainContent.innerHTML = '<p style="color: red; text-align: center; padding: 50px;">Error loading page content.</p>';
            }
        });


    // --- Smooth Scrolling ---
    document.querySelectorAll('.sidebar-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                 targetElement.scrollIntoView({
                     behavior: 'smooth',
                     block: 'start'
                 });
            } else {
                console.warn(`Target element ${targetId} not found for scrolling.`);
            }
        });
    });

    // --- Active Navigation Link Highlighting on Scroll (Scrollspy) ---
    const initializeScrollspy = () => {
        const sections = document.querySelectorAll('.content-section');
        const navLiAnchors = document.querySelectorAll('.sidebar-nav ul li a');
        const offset = 150; // Adjust offset

        if (sections.length === 0) {
            console.warn("Scrollspy: No sections found with class '.content-section'. Check if sections loaded correctly.");
            return;
        }
        console.log(`Scrollspy: Found ${sections.length} sections.`); // Debugging line


        const activateLink = (id) => {
            navLiAnchors.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === `#${id}`) {
                    a.classList.add('active');
                }
            });
        };

        // Set initial active state
        const initialHash = window.location.hash;
        let initialSectionId = sections[0]?.getAttribute('id'); // Default to first section ID

        if (initialHash) {
            const potentialMatch = document.querySelector(initialHash);
            if(potentialMatch && potentialMatch.classList.contains('content-section')) {
                 initialSectionId = initialHash.substring(1);
                 // Optional: Scroll to hash section on load
                 setTimeout(() => {
                     potentialMatch.scrollIntoView({ behavior: 'auto', block: 'start' });
                 }, 150);
             }
        }

        if(initialSectionId){
             activateLink(initialSectionId);
        } else if (navLiAnchors.length > 0) {
            navLiAnchors[0].classList.add('active'); // Fallback if no sections found but links exist
        }


        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            sections.forEach(section => {
                // Ensure section actually has an offsetTop (is visible)
                if (section.offsetTop === undefined) return;

                const sectionTop = section.offsetTop;
                if (scrollPosition >= sectionTop - offset) {
                    current = section.getAttribute('id');
                }
            });

             // Handle reaching the very bottom
             const totalHeight = document.documentElement.scrollHeight;
             const visibleHeight = window.innerHeight;
             if ( (scrollPosition + visibleHeight) >= (totalHeight - 10) && sections.length > 0 ) { // Check if near bottom (increased tolerance)
                  current = sections[sections.length - 1].getAttribute('id');
             }

            if (current) {
                activateLink(current);
            } else {
                 // If scroll is above the first section
                 if (sections.length > 0 && scrollPosition < sections[0].offsetTop - offset) {
                      activateLink(sections[0].getAttribute('id'));
                 }
            }
        }, { passive: true });
    };

    // --- Add Footer Dynamically ---
    const addFooter = () => {
        const footerHTML = `
            <footer class="footer">
                © <span id="current-year">${new Date().getFullYear()}</span> Hieu Ngo. All rights reserved.
            </footer>
        `;
        // Get the main content area element (should already be defined)
        const mainContent = document.getElementById('main-content-area');

        // Append footer strictly INSIDE the main content area
        if (mainContent) {
            // Use insertAdjacentHTML to add it at the very end of mainContent
            mainContent.insertAdjacentHTML('beforeend', footerHTML);
        } else {
            console.error("Cannot add footer: main content area not found.");
        }
    };

}); // End DOMContentLoaded