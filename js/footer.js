
function generateFooter() {
    const footerHTML = `
    <footer class="site-footer">
        <div class="footer-container">
            <div class="footer-column">
                <h4>About</h4>
                <p>Te Kete Ako is a collection of teaching resources for Mangakōtukutuku College, developed by the community, for the community.</p>
            </div>
            <div class="footer-column">
                <h4>External Resources</h4>
                <ul>
                    <li><a href="https://nzhistory.govt.nz/" target="_blank">NZ History</a></li>
                    <li><a href="https://www.tki.org.nz/" target="_blank">Te Kete Ipurangi (TKI)</a></li>
                    <li><a href="https://natlib.govt.nz/" target="_blank">National Library of NZ</a></li>
                    <li><a href="https://www.maoritelevision.com/news" target="_blank">Māori Television News</a></li>
                    <li><a href="https://www.stats.govt.nz/" target="_blank">Stats NZ</a></li>
                    <li><a href="https://thespinoff.co.nz/" target="_blank">The Spinoff</a></li>
                    <li><a href="https://www.sciencelearn.org.nz/" target="_blank">Science Learning Hub</a></li>
                    <li><a href="https://creative.govt.nz/" target="_blank">Creative New Zealand</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>Connect</h4>
                <p>&copy; 2025 Te Kete Ako. He waka eke noa.</p>
            </div>
        </div>
    </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

document.addEventListener('DOMContentLoaded', generateFooter);
