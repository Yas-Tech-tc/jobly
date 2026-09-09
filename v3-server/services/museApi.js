const fetch = require('node-fetch')

const MUSE_BASE = 'https://www.themuse.com/api/public/jobs'

function mapCategory(museCategories) {
    if (!museCategories || museCategories.length === 0) return 'Tech'
    const name = museCategories[0].name.toLowerCase()
    if (name.includes('engineer') || name.includes('software') ||
        name.includes('data') || name.includes('design')) return 'Tech'
    if (name.includes('finance') || name.includes('account')) return 'Finance'
    if (name.includes('market') || name.includes('sales')) return 'Marketing'
    if (name.includes('health') || name.includes('nurs')) return 'Healthcare'
    if (name.includes('teach') || name.includes('educat')) return 'Education'
    return 'Tech'
}

function transformJob(museJob) {
    return {
        _id: `muse_${museJob.id}`,
        title: museJob.name,
        company: museJob.company?.name || 'Unknown Company',
        location: museJob.locations?.[0]?.name || 'Remote',
        category: mapCategory(museJob.categories),
        salary: 'Competitive',
        remote: museJob.locations?.some(l =>
            l.name.toLowerCase().includes('remote')
        ) || false,
        description: 'Visit the job page for full details.',
        externalUrl: museJob.refs?.landing_page || ''
    }
}

async function fetchMuseJobs(search = '', category = '', page = 1) {
    try {
        const params = new URLSearchParams({ page })
        if (search) params.append('name', search)

        const url = `${MUSE_BASE}?${params}`

        // Add 5 second timeout
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 5000)

        const res = await fetch(url, { signal: controller.signal })
        clearTimeout(timeout)

        const data = await res.json()
        let jobs = data.results.map(transformJob)

        if (category && category !== 'all') {
            jobs = jobs.filter(job => job.category === category)
        }

        return jobs

    } catch (error) {
        // If Muse fails or times out, just return empty array
        // Your DB jobs will still show
        console.log('Muse API unavailable, showing DB jobs only')
        return []
    }
}

module.exports = { fetchMuseJobs }