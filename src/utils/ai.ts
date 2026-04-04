import { API_BASE_URL } from '../config';

export async function askAI(prompt: string) {
  if (!prompt || !prompt.trim()) {
    throw new Error('Prompt cannot be empty');
  }

  // Securely request the custom Node backend
  const response = await fetch(`${API_BASE_URL}/ask-ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to connect to the backend AI route");
  }

  if (!data.text) {
    throw new Error("Empty response from backend AI route");
  }

  return data.text;
}
