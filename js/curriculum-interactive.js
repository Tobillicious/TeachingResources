document.addEventListener('DOMContentLoaded', () => {
    const curriculumBrowser = document.getElementById('curriculum-browser');
    const curriculumNav = document.getElementById('curriculum-nav');

    async function loadCurriculumData() {
        try {
            const [nzcResponse, temataiahoResponse] = await Promise.all([
                fetch('data/nzc.json'),
                fetch('data/temataiaho.json')
            ]);
            const nzcData = await nzcResponse.json();
            const temataiahoData = await temataiahoResponse.json();
            return [nzcData, temataiahoData];
        } catch (error) {
            console.error('Error loading curriculum data:', error);
            return [];
        }
    }

    function createSubjectElement(subject) {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'curriculum-subject';

        const header = document.createElement('div');
        header.className = 'subject-header';
        header.innerHTML = `<h2>${subject.name}</h2><span>▼</span>`;
        header.addEventListener('click', () => {
            const content = subjectDiv.querySelector('.subject-content');
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });

        const content = document.createElement('div');
        content.className = 'subject-content';
        content.style.display = 'none';

        if (subject.levels) { // NZC data
            subject.levels.forEach(level => {
                const levelSection = createLevelElement(level);
                content.appendChild(levelSection);
            });
        } else if (subject.learning_phases) { // Te Mātaiaho data
            subject.learning_phases.forEach(phase => {
                const phaseSection = createPhaseElement(phase);
                content.appendChild(phaseSection);
            });
        }

        subjectDiv.appendChild(header);
        subjectDiv.appendChild(content);
        return subjectDiv;
    }

    function createLevelElement(level) {
        const levelSection = document.createElement('div');
        levelSection.className = 'level-section';

        const header = document.createElement('div');
        header.className = 'level-header';
        header.innerHTML = `<h3>Level ${level.level}</h3>`;
        header.addEventListener('click', () => {
            const content = levelSection.querySelector('.level-content');
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });

        const content = document.createElement('div');
        content.className = 'level-content';
        content.style.display = 'none';

        const strandGrid = document.createElement('div');
        strandGrid.className = 'strand-grid';

        level.strands.forEach(strand => {
            const strandCard = document.createElement('div');
            strandCard.className = 'strand-card';
            let objectivesHtml = strand.achievement_objectives.map(ao => `<p><strong>${ao.id}:</strong> ${ao.statement}</p>`).join('');
            strandCard.innerHTML = `<h4>${strand.name}</h4>${objectivesHtml}`;
            strandGrid.appendChild(strandCard);
        });

        content.appendChild(strandGrid);
        levelSection.appendChild(header);
        levelSection.appendChild(content);
        return levelSection;
    }

    function createPhaseElement(phase) {
        const phaseSection = document.createElement('div');
        phaseSection.className = 'level-section';

        const header = document.createElement('div');
        header.className = 'level-header';
        header.innerHTML = `<h3>Phase ${phase.phase} (Years ${phase.years})</h3>`;
        header.addEventListener('click', () => {
            const content = phaseSection.querySelector('.level-content');
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });

        const content = document.createElement('div');
        content.className = 'level-content';
        content.style.display = 'none';

        const outcomesGrid = document.createElement('div');
        outcomesGrid.className = 'strand-grid';

        phase.progress_outcomes.forEach(outcome => {
            const outcomeCard = document.createElement('div');
            outcomeCard.className = 'strand-card';
            outcomeCard.innerHTML = `<h4>${outcome.type}</h4><p><strong>${outcome.id}:</strong> ${outcome.statement}</p>`;
            outcomesGrid.appendChild(outcomeCard);
        });

        content.appendChild(outcomesGrid);
        phaseSection.appendChild(header);
        phaseSection.appendChild(content);
        return phaseSection;
    }

    function populateNav(subjects) {
        subjects.forEach(subject => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${subject.name.replace(/\s+/g, '-').toLowerCase()}`;
            a.textContent = subject.name;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                // Smooth scroll could be implemented here
                const targetElement = document.getElementById(`${subject.name.replace(/\s+/g, '-').toLowerCase()}`);
                if(targetElement){
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
            li.appendChild(a);
            curriculumNav.appendChild(li);
        });
    }


    async function init() {
        const [nzcData, temataiahoData] = await loadCurriculumData();
        
        if (nzcData) {
            const nzcHeader = document.createElement('h2');
            nzcHeader.textContent = 'New Zealand Curriculum (NZC)';
            curriculumBrowser.appendChild(nzcHeader);
            nzcData.subjects.forEach(subject => {
                const subjectEl = createSubjectElement(subject);
                subjectEl.id = subject.name.replace(/\s+/g, '-').toLowerCase();
                curriculumBrowser.appendChild(subjectEl);
            });
        }

        if (temataiahoData) {
            const temataiahoHeader = document.createElement('h2');
            temataiahoHeader.textContent = 'Te Mātaiaho';
            curriculumBrowser.appendChild(temataiahoHeader);
            temataiahoData.subjects.forEach(subject => {
                const subjectEl = createSubjectElement(subject);
                subjectEl.id = `tm-${subject.name.replace(/\s+/g, '-').toLowerCase()}`;
                curriculumBrowser.appendChild(subjectEl);
            });
        }
        
        const allSubjects = [
            ...(nzcData ? nzcData.subjects : []),
            ...(temataiahoData ? temataiahoData.subjects.map(s => ({...s, name: `TM ${s.name}`})) : [])
        ];
        populateNav(allSubjects);
    }

    init();
});
