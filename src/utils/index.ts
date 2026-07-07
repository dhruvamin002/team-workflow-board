const UNITS = [
    { unit: 'year', ms: 31536000000 },
    { unit: 'month', ms: 2592000000 },
    { unit: 'week', ms: 604800000 },
    { unit: 'day', ms: 86400000 },
    { unit: 'hour', ms: 3600000 },
    { unit: 'minute', ms: 60000 },
];
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
function createNewId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function createTask(data) {
    return {
        id: createNewId(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...data
    }
}

function updateTask(data) {
    return {
        ...data,
        updatedAt: Date.now()
    }
}

function formatRelativeTime(isoDate) {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return 'unknown';

    const diffMs = date.getTime() - Date.now();
    const absDiff = Math.abs(diffMs);

    if (absDiff < 30000) {
        return 'updated just now';
    }

    for (const { unit, ms } of UNITS) {
        if (absDiff >= ms || unit === 'minute') {
        const value = Math.round(diffMs / ms);
        return `updated ${rtf.format(value, unit)}`;
        }
    }

    return 'updated just now';
}

function parseFilterStateFromSearch(search) {
    const params = new URLSearchParams(search)
    const state = {}
    const filter = {}
    const q = params.get('q')
    const priority = params.get('priority')
    const status = params.get('status')
    if (q) filter.search = q
    if (priority) filter.priority = priority
    if (status) filter.status = status.split(',').filter(Boolean)
    if (Object.keys(filter).length > 0) state.filter = filter
    const sortBy = params.get('sort')
    if (sortBy) state.sortBy = sortBy
    const sortDirection = params.get('dir')
    if (sortDirection) state.sortDirection = sortDirection
    return state
}

function buildSearchFromFilterState(state) {
    const params = new URLSearchParams()
    if (state.filter) {
        if (state.filter.search) params.set('q', state.filter.search)
        if (state.filter.priority && state.filter.priority !== 'all') params.set('priority', state.filter.priority)
        if (state.filter.status && state.filter.status.length > 0) params.set('status', state.filter.status.join(','))
    }
    if (state.sortBy) params.set('sort', state.sortBy)
    if (state.sortDirection) params.set('dir', state.sortDirection)
    return params.toString()
}

export { createTask, updateTask, formatRelativeTime, parseFilterStateFromSearch, buildSearchFromFilterState }