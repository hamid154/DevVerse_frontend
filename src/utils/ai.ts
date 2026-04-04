export async function askAI(prompt: string) {
  if (!prompt || !prompt.trim()) {
    throw new Error('Prompt cannot be empty');
  }

  // Securely request the custom Node backend
  const response = await fetch("http://localhost:5000/ask-ai", {
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
