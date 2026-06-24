const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Unicorn",
        location: "Remote",
        category: "Tech",
        salary: "$90,000/yr",
        remote: true
    },
    {
        id: 2,
        title: "Financial Analyst",
        company: "B Bank",
        location: "New York, USA",
        category: "Finance",
        salary: "$75,000/yr",
        remote: false
    },
    {
        id: 3,
        title: "Marketing Manager",
        company: "Tech Foals",
        location: "London, UK",
        category: "Marketing",
        salary: "$65,000/yr",
        remote: true
    },
    {
        id: 4,
        title: "Backend Engineer",
        company: "Unicorn",
        location: "Remote",
        category: "Tech",
        salary: "$110,000/yr",
        remote: true
    },
    {
        id: 5,
        title: "Data Scientist",
        company: "B Bank",
        location: "Paris, France",
        category: "Finance",
        salary: "$95,000/yr",
        remote: false
    },
    {
        id: 6,
        title: "UX Designer",
        company: "McBurger",
        location: "Remote",
        category: "Tech",
        salary: "$80,000/yr",
        remote: true
    },
    {
        id: 7,
        title: "Registered Nurse",
        company: "HealthPlus",
        location: "Berlin, Germany",
        category: "Healthcare",
        salary: "$70,000/yr",
        remote: false
    },
    {
        id: 8,
        title: "SEO Specialist",
        company: "Tech Foals",
        location: "Remote",
        category: "Marketing",
        salary: "$55,000/yr",
        remote: true
    }
];

// RENDER: build one job card DOM element from a job object

function createJobCard(job) {
    const card = document.createElement('article');
    card.classList.add('job-card');

    card.innerHTML = `
        <div class="job-card-header">
            <h3>${job.title}</h3>
            <span class="category-badge">${job.category}</span>
        </div>
        <p class="company">${job.company}</p>
        <p class="location">📍 ${job.location}</p>
        <p class="salary">${job.salary}</p>
        ${job.remote ? '<span class="remote-badge">Remote</span>' : ''}
        <button class="apply-btn">Apply now</button>
    `;

    return card;
}

// RENDER: display an array of jobs in the grid

function renderJobs(jobsToRender) {
    const grid = document.getElementById('jobs-grid');
    grid.innerHTML = '';

    if (jobsToRender.length === 0) {
        grid.innerHTML = '<p class="no-results">No jobs found matching your search.</p>';
        return;
    }

    jobsToRender.forEach(function(job) {
        const card = createJobCard(job);
        grid.appendChild(card);
    });
}

let activeCategory = 'all';//"show everything" when the page first loads. When the user clicks "Tech", this variable changes to 'Tech'
let searchQuery = ''; //no search text yet

// FILTER

function filterAndRender() {
    const filtered = jobs.filter(function(job) {
        const categoryMatch = activeCategory === 'all' || job.category === activeCategory;
        const searchMatch =
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && searchMatch;
    });

    renderJobs(filtered);
}

// EVENTS

const searchInput = document.getElementById('job-search');

searchInput.addEventListener('input', function() {
    searchQuery = searchInput.value;
    filterAndRender();
});

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        filterButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        activeCategory = button.dataset.category;
        filterAndRender();
    });
});

// INIT

renderJobs(jobs);