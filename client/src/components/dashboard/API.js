const API_URL = 'http://localhost:5000';

export async function listLogEntries(){
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json(); 
}

export async function listCategories(){
    const response = await fetch(`${API_URL}/api/cat`);
    return response.json(); 
}

export async function listNumbers(){
    const response = await fetch(`${API_URL}/api/attend/getNumber`);
    return response.json(); 
}

export async function createLogEntry(entry){
    const response = await fetch(`${API_URL}/api/logs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    return response.json(); 
}