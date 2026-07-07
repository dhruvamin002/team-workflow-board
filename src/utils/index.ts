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

export { createTask, updateTask }